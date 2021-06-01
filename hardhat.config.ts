import fs from 'fs';
import path from 'path';

import { task } from 'hardhat/config';
import { TASK_COMPILE } from 'hardhat/builtin-tasks/task-names';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import 'hardhat-abi-exporter';
import 'hardhat-gas-reporter';
import 'hardhat-spdx-license-identifier';
import 'solidity-coverage';
import 'tsconfig-paths/register';
import Dotenv from 'dotenv';

Dotenv.config();

task(TASK_COMPILE, async function (args, hre, runSuper) {
  // preserve @solidstate/abi package data when ABI export directory is cleared

  const data = ['package.json', 'README.md'].map(function (name) {
    const filePath = path.resolve(hre.config.abiExporter.path, name);
    return {
      filePath,
      contents: fs.readFileSync(filePath, 'utf8'),
    };
  });

  await runSuper();

  data.forEach(function ({ filePath, contents }) {
    fs.writeFileSync(filePath, contents);
  });
});

export default {
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },

  networks: {
    generic: {
      // set URL for external network
      url: `${process.env.URL}`,
      accounts: {
        mnemonic: `${process.env.MNEMONIC}`,
      },
    },
  },

  abiExporter: {
    clear: true,
    flat: true,
    except: ['.*Mock$'],
  },

  gasReporter: {
    enabled: process.env.REPORT_GAS === 'true',
  },

  spdxLicenseIdentifier: {
    overwrite: false,
    runOnCompile: true,
  },

  typechain: {
    alwaysGenerateOverloads: true,
  },
};
