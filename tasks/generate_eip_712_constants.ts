import fs from 'fs';
import { task, types } from 'hardhat/config';
import path from 'path';

const filename = 'EIP712Constants.sol';
const filepath = 'cryptography';

task('generate-eip-712-constants', `Generate ${filename}`).setAction(
  async (args, hre) => {
    const domainFields = [
      'string name',
      'string version',
      'uint256 chainId',
      'address verifyingContract',
      'bytes32 salt',
    ];

    const domainHashes = [];

    for (let i = 0; i < 2 ** domainFields.length; i++) {
      const fieldsBinString = i.toString(2).padStart(5, '0');

      const components = domainFields.filter((f, j) => i & (2 ** j));

      const domainString = `EIP712Domain(${components.join(',')})`;

      domainHashes.push(
        `
        /**
         * @dev EIP712Domain hash corresponding to ERC5267 fields value ${fieldsBinString} (${components.map((c) => c.split(' ').pop()).join(', ')})
         * @dev evaluates to ${hre.ethers.solidityPackedKeccak256(['string'], [domainString])}
         */
        bytes32 internal constant EIP_712_DOMAIN_HASH_${fieldsBinString} = keccak256('${domainString}');
        `,
      );
    }

    const content = `
      pragma solidity ^0.8.20;

      library ${filename.split('.').shift()} {
        ${domainHashes.join('\n')}
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
