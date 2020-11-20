# SolidState Contracts

Upgradable-first Solidity smart contract development library.

> Warning: this library is in a pre-release state; contracts are not sufficiently tested for production use, documentation may be missing or inaccurate, and the API may change at any time.

## Usage

Install the package as a development dependency:

```bash
npm install --save-dev @solidstate/contracts
# or
yarn add --dev @solidistate/contracts
```

### Contracts

All contracts are designed to either be deployed through the standard `constructor` method, or referenced by a proxy.  To this end, the [diamond storage](https://medium.com/1milliondevs/new-storage-layout-for-proxy-contracts-and-diamonds-98d01d0eadb) pattern is employed exclusively.

### Portable Tests

Where possible, automated tests are designed to be imported by repositories which make use of SolidState and run against any derived contracts.  This is to help prevent unintended changes to to the base contract behavior.

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
  let deploy = async function () {
    let factory = await ethers.getContractFactory('CustomToken');
    let instance = await factory.deploy();
    return await instance.deployed();
  }

  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfERC20Base({ deploy });

  // custom tests...
});
```

## Development

Install dependencies via Yarn:

```bash
yarn install
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

### Testing

Test contracts via Hardhat:

```bash
yarn run hardhat test
```
