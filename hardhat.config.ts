import '@nomicfoundation/hardhat-chai-matchers';
import '@nomiclabs/hardhat-ethers';
import '@solidstate/hardhat-4byte-uploader';
import '@typechain/hardhat';
import 'hardhat-abi-exporter';
import 'hardhat-contract-sizer';
import 'hardhat-gas-reporter';
import 'hardhat-linearization';
import 'hardhat-spdx-license-identifier';
import 'solidity-coverage';

export default {
  solidity: {
    version: '0.8.17',
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
