require('@nomiclabs/hardhat-waffle');
require('hardhat-spdx-license-identifier');

module.exports = {
  solidity: {
    version: '0.7.4',
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
      url: `${ process.env.URL }`,
      accounts: {
        mnemonic: `${ process.env.MNEMONIC }`,
      },
    },
  },

  spdxLicenseIdentifier: {
    overwrite: false,
    runOnCompile: true,
  },
};
