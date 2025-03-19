import fs from 'fs';
import { task, types } from 'hardhat/config';
import path from 'path';

const filename = 'EIP712Constants.sol';
const filepath = 'cryptography';

task('generate-eip-712-constants', `Generate ${filename}`).setAction(
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

    for (let i = 0; i < 2 ** fields.length; i++) {
      const fieldsBinString = i.toString(2).padStart(5, '0');
      const includedFields = fields.filter((f, j) => i & (2 ** j));

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
        bytes32 internal constant EIP_712_DOMAIN_HASH_${fieldsBinString} = keccak256('${domainString}');
        `,
      );

      calculators.push(
        `
        /**
         * @notice calculate unique EIP-712 domain separator${calculatorComments.map((c) => `\n${c}`).join('')}
         * @return domainSeparator domain separator
         */
        function calculateDomainSeparator_${fieldsBinString}(${calculatorParameters.join(', ')}) internal ${calculatorVisibility} returns (bytes32 domainSeparator) {
          assembly {
            let pointer := mload(64)

            mstore(pointer, ${keccak})
            ${assemblyComponents.join('\n')}

            domainSeparator := keccak256(pointer, ${(assemblyComponents.length + 1) * 32})

          }
        }
        `,
      );
    }

    const content = `
      pragma solidity ^0.8.20;

      library ${filename.split('.').shift()} {
        ${constants.join('\n')}

        ${calculators.join('\n')}
      }
`;

    await fs.promises.mkdir(path.resolve(hre.config.paths.sources, filepath), {
      recursive: true,
    });

    await fs.promises.writeFile(
      path.resolve(hre.config.paths.sources, filepath, filename),
      content,
    );
  },
);
