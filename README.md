# SolidState Solidity

> Warning: this library is in a pre-release state; contracts are not sufficiently tested for production use, documentation may be missing or inaccurate, and the API may change at any time.

SolidState is an upgradeable-first Solidity smart contract development library.

It consists of the following packages:

| package                 | description                                                                           | 📕                          |
| ----------------------- | ------------------------------------------------------------------------------------- | --------------------------- |
| `@solidstate/abi`       | contract ABIs                                                                         | [📖](./abi/README.md)       |
| `@solidstate/contracts` | core contracts                                                                        | [📖](./contracts/README.md) |
| `@solidstate/library`   | functions for interacting with and validating contracts                               | [📖](./lib/README.md)       |
| `@solidstate/spec`      | portable tests which may be run against third-party implementations of core contracts | [📖](./spec/README.md)      |

### Contracts

All contracts are designed to either be deployed through the standard `constructor` method, or referenced by a proxy. To this end, the [diamond storage](https://medium.com/1milliondevs/new-storage-layout-for-proxy-contracts-and-diamonds-98d01d0eadb) pattern is employed exclusively.

### Spec

Where possible, automated tests are designed to be imported by repositories which make use of the SolidState contracts and run against any derived contracts. This is to help prevent unintended changes to to the base contract behavior.

For example, consider a custom `ERC20Base` implementation:

```solidity
import '@solidstate/contracts/token/ERC20/ERC20Base.sol';

contract CustomToken is ERC20Base {
  // custom code...
}

```

Rather than rewrite the `ERC20Base` tests or assume that all core behavior remains untouched, one can import the included tests and run them against the custom implementation:

```javascript
describe('CustomToken', function () {
  let instance;

  beforeEach(async function () {
    const factory = await ethers.getContractFactory('CustomToken');
    instance = await factory.deploy();
    await instance.deployed();
  });

  describeBehaviorOfERC20Base(
    {
      deploy: () => instance,
    },
    [],
  );

  // custom tests...
});
```

If parts of the base implementation are changed intentionally, tests can be selectively skipped:

```javascript
describeBehaviorOfERC20Base(
  {
    deploy: () => instance,
  },
  ['#balanceOf'],
);

describe('#balanceOf', function () {
  // custom tests
});
```

## Development

Install dependencies via Yarn:

```bash
yarn install
```

Setup Husky to format code on commit:

```bash
yarn prepare
```

Link local packages and install remaining dependencies via Lerna:

```bash
yarn run lerna bootstrap
```

Compile contracts via Hardhat:

```bash
yarn run hardhat compile
```

### Networks

By default, Hardhat uses the Hardhat Network in-process.

To use an external network via URL, set the `URL` environment variable and append commands with `--network generic`:

```bash
URL="[NODE_URL]" yarn run hardhat test --network generic
```

### Publication

Publish packages via Lerna:

```bash
yarn lerna-publish
```

### Testing

Test contracts via Hardhat:

```bash
yarn run hardhat test
```

Activate gas usage reporting by setting the `REPORT_GAS` environment variable to `"true"`:

```bash
REPORT_GAS=true yarn run hardhat test
```

Generate a code coverage report using `solidity-coverage`:

```bash
yarn run hardhat coverage
```

## Sponsor

[<img src="./premia-logo.svg" alt="premia.finance" height="200">](https://premia.finance)

[![frexa.io](./frexa-logo.png)](http://frexa.io)
