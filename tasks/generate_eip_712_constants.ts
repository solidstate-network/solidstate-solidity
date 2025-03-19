import fs from 'fs';
import { task, types } from 'hardhat/config';
import path from 'path';

const name = 'EIP712Constants';
const filepath = 'cryptography';

task('generate-eip-712-constants', `Generate ${name}`).setAction(
  async (args, hre) => {
    const fields = [
      'name',
      'version',
      'chainId',
      'verifyingContract',
      'salt',
    ] as const;

    const domainStringParametersMap = {
      name: 'string name',
      version: 'string version',
      chainId: 'uint256 chainId',
      verifyingContract: 'address verifyingContract',
      salt: 'bytes32 salt',
    };

    const calculatorParametersMap = {
      name: 'bytes32 nameHash',
      version: 'bytes32 versionHash',
      chainId: 'uint256 chainId',
      verifyingContract: 'address verifyingContract',
      salt: 'bytes32 salt',
    };

    const calculatorCommentsMap = {
      name: '* @param nameHash hash of human-readable signing domain name',
      version: '* @param versionHash hash of signing domain version',
      chainId: null,
      verifyingContract: null,
      salt: '* @param salt disambiguating salt',
    };

    const assemblyReferencesMap = {
      name: 'nameHash',
      version: 'versionHash',
      chainId: 'chainid()',
      verifyingContract: 'address()',
      salt: 'salt',
    };

    const constants = [];
    const calculators = [];

    const describeHashes = [];
    const describeCalculators = [];

    for (let i = 0; i < 2 ** fields.length; i++) {
      const fieldsBinString = i.toString(2).padStart(5, '0');
      const includedFields = fields.filter((f, j) => i & (2 ** j));

      const hashName = `EIP_712_DOMAIN_HASH_${fieldsBinString}`;
      const calculatorName = `calculateDomainSeparator_${fieldsBinString}`;

      const domainStringParameters = includedFields.map(
        (f) => domainStringParametersMap[f],
      );

      const calculatorParameters = includedFields
        .filter((c) => !['chainId', 'verifyingContract'].includes(c))
        .map((c) => calculatorParametersMap[c]);

      const calculatorComments = includedFields
        .map((c) => calculatorCommentsMap[c])
        .filter((c) => c);

      const assemblyComponents = includedFields.map(
        (c, j) =>
          `mstore(add(pointer, ${(j + 1) * 32}), ${assemblyReferencesMap[c]})`,
      );

      const calculatorTestTypes = includedFields.map((c) =>
        calculatorParametersMap[c].split(' ').shift(),
      );

      const domainString = `EIP712Domain(${domainStringParameters.join(',')})`;
      const keccak = hre.ethers.solidityPackedKeccak256(
        ['string'],
        [domainString],
      );

      const calculatorVisibility =
        includedFields.includes('chainId') ||
        includedFields.includes('verifyingContract')
          ? 'view'
          : 'pure';

      constants.push(
        `
        /**
         * @dev EIP712Domain hash corresponding to ERC5267 fields value ${fieldsBinString} (${domainStringParameters.map((c) => c.split(' ').pop()).join(', ')})
         * @dev evaluates to ${keccak}
         */
        bytes32 internal constant ${hashName} = keccak256('${domainString}');
        `,
      );

      calculators.push(
        `
        /**
         * @notice calculate unique EIP-712 domain separator${calculatorComments.map((c) => `\n${c}`).join('')}
         * @return domainSeparator domain separator
         */
        function ${calculatorName}(${calculatorParameters.join(', ')}) internal ${calculatorVisibility} returns (bytes32 domainSeparator) {
          assembly {
            let pointer := mload(64)

            mstore(pointer, ${keccak})
            ${assemblyComponents.join('\n')}

            domainSeparator := keccak256(pointer, ${(assemblyComponents.length + 1) * 32})

          }
        }
        `,
      );

      describeHashes.push(
        `
        describe('#${hashName}()', () => {
          it('resolves to expected value', async () => {
            expect(await instance.$${hashName}.staticCall()).to.equal('${keccak}');
          });
        });
        `,
      );

      describeCalculators.push(
        `
        describe('#${calculatorName}(${calculatorTestTypes.join(',')})', () => {
          it('returns domain separator', async () => {
            const typeHash = await instance.$${hashName}.staticCall();

            const types: string[] = ['bytes32', ${calculatorTestTypes.map((c) => `'${c}'`).join(', ')}]
            const values: string[] = [typeHash, ${includedFields.join(', ')}]

            const domainSeparator = ethers.keccak256(
              ethers.AbiCoder.defaultAbiCoder().encode(types,values));

            expect(await instance.$${calculatorName}.staticCall(${includedFields.filter((c) => !['chainId', 'verifyingContract'].includes(c))})).to.equal(domainSeparator)
          });
        });
        `,
      );
    }

    const contractContent = `
      pragma solidity ^0.8.20;

      library ${name} {
        ${constants.join('\n')}

        ${calculators.join('\n')}
      }
`;

    const testContent = `
import { $${name}, $${name}__factory } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('${name}', () => {
  let instance: $${name};
  const name = ethers.solidityPackedKeccak256(['string'], ['NAME']);
  const version = ethers.solidityPackedKeccak256(['string'], ['VERSION']);
  let verifyingContract: string;
  let chainId: string;
  let salt = ethers.solidityPackedKeccak256(['string'], ['SALT']);

  before(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new $${name}__factory(deployer).deploy();
    verifyingContract = await instance.getAddress();
    chainId = await ethers.provider.send('eth_chainId');
  });

  ${describeHashes.join('\n')}

  ${describeCalculators.join('\n')}
});
`;

    await fs.promises.mkdir(path.resolve(hre.config.paths.sources, filepath), {
      recursive: true,
    });

    await fs.promises.mkdir(path.resolve(hre.config.paths.tests, filepath), {
      recursive: true,
    });

    await fs.promises.writeFile(
      path.resolve(hre.config.paths.sources, filepath, `${name}.sol`),
      contractContent,
    );

    await fs.promises.writeFile(
      path.resolve(hre.config.paths.tests, filepath, `${name}.ts`),
      testContent,
    );
  },
);
