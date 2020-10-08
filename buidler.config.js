usePlugin('@nomiclabs/buidler-waffle');
usePlugin('buidler-spdx-license-identifier');

module.exports = {
  solc: {
    version: '0.7.2',
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },

  networks: {
    generic: {
      // set URL for external network, such as Infura
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
