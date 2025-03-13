# Solidstate Spec

Portable specifications for Solidstate contracts. Part of the Solidstate Solidity monorepo.

## Installation

Install the package as a development dependency:

```bash
npm install --save-dev @solidstate/spec
# or
yarn add --dev @solidstate/spec
```

## Usage

Where possible, automated tests are designed to be imported by repositories which make use of the Solidstate contracts and run against any derived contracts. This is to help prevent unintended changes to the base contract behavior.

For example, consider a custom `ERC20Base` implementation:

```solidity
import '@solidstate/contracts/token/ERC20/base/ERC20Base.sol';

contract CustomToken is ERC20Base {
  // custom code...
}
```

Rather than rewrite the `ERC20Base` tests or assume that all core behavior remains untouched, one can import the included tests and run them against the custom implementation:

```javascript
describe('CustomToken', () => {
  let instance;

  beforeEach(async () => {
    const factory = await ethers.getContractFactory('CustomToken');
    instance = await factory.deploy();
    await instance.deployed();
  });

  describeBehaviorOfERC20Base(
    async () => instance,
    {
      args: ...,
    }
  );

  // custom tests...
});
```

If parts of the base implementation are changed intentionally, tests can be selectively skipped:

```javascript
describeBehaviorOfERC20Base(
  async () => instance,
  {
    args: ...
  },
  ['#balanceOf'],
);

describe('#balanceOf', () => {
  // custom tests
});
```
