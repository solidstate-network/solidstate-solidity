import fs from 'fs';
import { task, types } from 'hardhat/config';
import path from 'path';

const filename = 'EIP712Constants.sol';
const filepath = 'cryptography';

task('generate-eip-712-constants', `Generate ${filename}`).setAction(
  async (args, hre) => {
    const domainFields = [
      'name',
      'version',
      'chainId',
      'verifyingContract',
      'salt',
    ] as const;

    const domainFieldParameterMap = {
      name: 'string name',
      version: 'string version',
      chainId: 'uint256 chainId',
      verifyingContract: 'address verifyingContract',
      salt: 'bytes32 salt',
    };

    // TODO: remove chainId and verifyingContract
    const domainSeparatorCalculatorParameterMap = {
      name: 'bytes32 nameHash',
      version: 'bytes32 versionHash',
      chainId: 'uint256 chainId',
      verifyingContract: 'address verifyingContract',
      salt: 'bytes32 salt',
    };

    const assemblyReferencesMap = {
      name: 'nameHash',
      version: 'versionHash',
      chainId: 'chainid()',
      verifyingContract: 'address()',
      salt: 'salt',
    };

    const domainHashes = [];
    const domainSeparatorCalculators = [];

    for (let i = 0; i < 2 ** domainFields.length; i++) {
      const fieldsBinString = i.toString(2).padStart(5, '0');
      const includedFields = domainFields.filter((f, j) => i & (2 ** j));

      const domainStringComponents = includedFields.map(
        (f) => domainFieldParameterMap[f],
      );

      const domainSeparatorCalculatorComponents = includedFields
        .filter((c) => !['chainId', 'verifyingContract'].includes(c))
        .map((c) => domainSeparatorCalculatorParameterMap[c]);
      const assemblyComponents = includedFields.map(
        (c, j) =>
          `mstore(add(pointer, ${(j + 1) * 32}), ${assemblyReferencesMap[c]})`,
      );

      const domainString = `EIP712Domain(${domainStringComponents.join(',')})`;
      const keccak = hre.ethers.solidityPackedKeccak256(
        ['string'],
        [domainString],
      );

      domainHashes.push(
        `
        /**
         * @dev EIP712Domain hash corresponding to ERC5267 fields value ${fieldsBinString} (${domainStringComponents.map((c) => c.split(' ').pop()).join(', ')})
         * @dev evaluates to ${keccak}
         */
        bytes32 internal constant EIP_712_DOMAIN_HASH_${fieldsBinString} = keccak256('${domainString}');
        `,
      );

      domainSeparatorCalculators.push(
        `
        /**
         * @notice TODO
         */
        function calculateDomainSeparator_${fieldsBinString}(${domainSeparatorCalculatorComponents.join(', ')}) internal view returns (bytes32 domainSeparator) {
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
        ${domainHashes.join('\n')}

        ${domainSeparatorCalculators.join('\n')}
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
