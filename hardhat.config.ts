import fs from 'fs';
import path from 'path';

import { task } from 'hardhat/config';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import 'hardhat-abi-exporter';
import 'hardhat-gas-reporter';
import 'hardhat-spdx-license-identifier';
import 'solidity-coverage';
import Dotenv from 'dotenv';

Dotenv.config();

export default {
  solidity: {
    version: '0.8.10',
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
    runOnCompile: true,
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
    outDir: 'typechain',
  },
};
