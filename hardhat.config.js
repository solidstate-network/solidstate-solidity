const fs = require('fs');
const path = require('path');

require('@nomiclabs/hardhat-waffle');
require('hardhat-abi-exporter');
require('hardhat-gas-reporter');
require('hardhat-spdx-license-identifier');
require('solidity-coverage');

const {
  TASK_COMPILE,
} = require('hardhat/builtin-tasks/task-names');

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

module.exports = {
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
      url: `${ process.env.URL }`,
      accounts: {
        mnemonic: `${ process.env.MNEMONIC }`,
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
};
