import ejs from 'ejs';
import fs from 'fs';
import { task } from 'hardhat/config';
import path from 'path';

const name = 'EIP712';
const filepath = 'cryptography';

const TEMPLATE_SOL = `
pragma solidity ^0.8.20;

/**
 * @title Procedurally generated EIP-712 typed structured data hashing and signing library
 * @dev see https://eips.ethereum.org/EIPS/eip-712
 **/
library <%- name %> {
    <% for (const el of fieldsConstantDefinitions) { %>
    /**
     * @dev ERC5267 fields value <%- el.bin %> (<%- el.fields.join(', ') %>)
     */
    bytes1 internal constant <%- el.name %> = hex'<%- el.hex %>';
    <% } %>

    <% for (const el of constantDefinitions) { %>
    /**
     * @dev EIP712Domain hash corresponding to ERC5267 fields value <%- el.binString %> (<%- el.fields.join(', ') %>)
     * @dev evaluates to <%- el.keccak %>
     */
    bytes32 internal constant <%- el.name %> = keccak256('<%- el.domainString %>');
    <% } %>

    <% for (const el of functionDefinitions) { %>
    /**
     * @notice calculate unique EIP-712 domain separator
    <%_ for (const f of el.fields.filter((f) => data[f].description)) { _%>
     * @param <%- data[f].packedName ?? f %> <%- data[f].description %>
    <%_ } _%>
     * @return domainSeparator domain separator
     */
    function <%- el.name %>(<%- el.parameters %>) internal <%- el.visibility %> returns (bytes32 domainSeparator) {
        bytes32 typeHash = <%- el.hashName %>;

        assembly {
            let pointer := mload(64)

            mstore(pointer, typeHash)
            <%_ for (let i = 0; i < el.assemblyReferences.length; i++) { _%>
            mstore(add(pointer, <%- (i + 1) * 32 %>), <%- el.assemblyReferences[i] %>)
            <%_ } _%>

            domainSeparator := keccak256(pointer, <%- (el.fields.length + 1) * 32 %>)
        }
    }
    <% } %>
}
`;

const TEMPLATE_TS = `
import { $<%- name %>, $<%- name %>__factory } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('<%- name %>', () => {
  let instance: $<%- name %>;
  const nameHash = ethers.solidityPackedKeccak256(['string'], ['NAME']);
  const versionHash = ethers.solidityPackedKeccak256(['string'], ['VERSION']);
  let verifyingContract: string;
  let chainId: string;
  let salt = ethers.solidityPackedKeccak256(['string'], ['SALT']);

  before(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new $<%- name %>__factory(deployer).deploy();
    verifyingContract = await instance.getAddress();
    chainId = await ethers.provider.send('eth_chainId');
  });

  <% for (const el of fieldsConstantDefinitions) { %>
  describe('#<%- el.name %>()', () => {
    it('resolves to expected value', async () => {
      expect(await instance.$<%- el.name %>.staticCall()).to.hexEqual('0x<%- el.hex %>');
    });
  });
  <% } %>

  <% for (const c of constantDefinitions) { %>
  describe('#<%- c.name %>()', () => {
    it('resolves to expected value', async () => {
      expect(await instance.$<%- c.name %>.staticCall()).to.equal('<%- c.keccak %>');
    });
  });
  <% } %>

  <% for (const fn of functionDefinitions) { %>
  describe('#<%- fn.name %>(<%- fn.sigTypes %>)', () => {
    it('returns domain separator', async () => {
      const typeHash = await instance.$<%- fn.hashName %>.staticCall();

      const types: string[] = ['bytes32', <%- fn.hashTypes %>];
      const values: string[] = [typeHash, <%- fn.hashFields %>];

      const domainSeparator = ethers.keccak256(
        ethers.AbiCoder.defaultAbiCoder().encode(types,values));

      expect(await instance.$<%- fn.name %>.staticCall(<%- fn.callNames %>)).to.equal(domainSeparator)
    });
  });
  <% } %>
});
`;

task('generate-eip-712', `Generate ${name}`).setAction(async (args, hre) => {
  const validFields = [
    'name',
    'version',
    'chainId',
    'verifyingContract',
    'salt',
  ] as const;

  const data: {
    [field: string]: {
      type: string;
      packedType?: string;
      packedName?: string;
      description?: string;
      assemblyReference?: string;
    };
  } = {
    name: {
      packedName: 'nameHash',
      type: 'string',
      packedType: 'bytes32',
      description: 'hash of human-readable signing domain name',
    },
    version: {
      packedName: 'versionHash',
      type: 'string',
      packedType: 'bytes32',
      description: 'hash of signing domain version',
    },
    chainId: {
      type: 'uint256',
      assemblyReference: 'chainid()',
    },
    verifyingContract: {
      type: 'address',
      assemblyReference: 'address()',
    },
    salt: {
      type: 'bytes32',
      description: 'disambiguating salt',
    },
  };

  const fieldsConstantDefinitions = [];
  const constantDefinitions = [];
  const functionDefinitions = [];

  for (let i = 0; i < 2 ** validFields.length; i++) {
    const binString = i.toString(2).padStart(5, '0');
    const fields = validFields.filter((f, j) => i & (2 ** j));

    const constantName = `EIP_712_DOMAIN_HASH_${binString}`;
    const functionName = `calculateDomainSeparator_${binString}`;

    const domainString = `EIP712Domain(${fields.map((f) => `${data[f].type} ${f}`).join(',')})`;
    const keccak = hre.ethers.solidityPackedKeccak256(
      ['string'],
      [domainString],
    );

    fieldsConstantDefinitions.push({
      fields,
      name: `ERC5267_FIELDS_${binString}`,
      bin: binString,
      hex: i.toString(16).padStart(2, '0'),
    });

    constantDefinitions.push({
      fields,
      name: constantName,
      binString,
      keccak,
      domainString,
    });

    functionDefinitions.push({
      fields,
      name: functionName,
      hashName: constantName,
      parameters: fields
        .filter((f) => data[f].description)
        .map(
          (f) =>
            `${data[f].packedType ?? data[f].type} ${data[f].packedName ?? f}`,
        )
        .join(', '),
      visibility:
        fields.includes('chainId') || fields.includes('verifyingContract')
          ? 'view'
          : 'pure',
      assemblyReferences: fields.map(
        (f) => data[f].assemblyReference ?? data[f].packedName ?? f,
      ),
      keccak,
      sigTypes: fields
        .filter((f) => data[f].description)
        .map((f) => data[f].packedType ?? data[f].type),
      hashTypes: fields
        .map((f) => data[f].packedType ?? data[f].type)
        .map((t) => `"${t}"`)
        .join(', '),
      hashFields: fields.map((f) => data[f].packedName ?? f).join(', '),
      callNames: fields
        .filter((f) => data[f].description)
        .map((f) => data[f].packedName ?? f),
    });
  }

  const templateData = {
    data,
    name,
    fieldsConstantDefinitions,
    constantDefinitions,
    functionDefinitions,
  };

  const contractContent = ejs.render(TEMPLATE_SOL, templateData);
  const testContent = ejs.render(TEMPLATE_TS, templateData);

  const contractPath = path.resolve(
    hre.config.paths.sources,
    filepath,
    `${name}.sol`,
  );
  const testPath = path.resolve(hre.config.paths.tests, filepath, `${name}.ts`);

  await fs.promises.mkdir(path.dirname(contractPath), {
    recursive: true,
  });

  await fs.promises.mkdir(path.dirname(testPath), {
    recursive: true,
  });

  await fs.promises.writeFile(contractPath, contractContent);
  await fs.promises.writeFile(testPath, testContent);
});
