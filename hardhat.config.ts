import '@nomiclabs/hardhat-waffle';
import '@solidstate/hardhat-4byte-uploader';
import '@typechain/hardhat';
import fs from 'fs';
import 'hardhat-abi-exporter';
import 'hardhat-contract-sizer';
import 'hardhat-gas-reporter';
import 'hardhat-spdx-license-identifier';
import { task } from 'hardhat/config';
import path from 'path';
import 'solidity-coverage';

export default {
  solidity: {
    version: '0.8.16',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
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
    enabled: true,
  },

  spdxLicenseIdentifier: {
    overwrite: false,
    runOnCompile: true,
  },

  typechain: {
    alwaysGenerateOverloads: true,
  },
};
