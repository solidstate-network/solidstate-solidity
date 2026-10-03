# Solidstate Spec

Portable specifications for Solidstate contracts. Part of the Solidstate Solidity monorepo.

## Installation

Install the package as a development dependency:

```bash
npm install --save-dev @solidstate/spec
# or
pnpm add -D @solidstate/spec
```

## Usage

Where possible, automated tests are designed to be imported by repositories which make use of the Solidstate contracts and run against any derived contracts. This is to help prevent unintended changes to the base contract behavior.

For example, consider a custom `FungibleToken` implementation:

```solidity
import '@solidstate/contracts/token/fungible/FungibleToken.sol';

contract CustomToken is FungibleToken {
  // custom code...
}
```

Rather than rewrite the `FungibleToken` tests or assume that all core behavior remains untouched, one can import the included tests and run them against the custom implementation. Each `describeBehaviorOf*` function takes the Hardhat network connection used to deploy the contract as its first argument:

```javascript
import { network } from 'hardhat';

const connection = await network.create();

describe('CustomToken', () => {
  let instance;

  beforeEach(async () => {
    instance = await connection.ethers.deployContract('CustomToken');
  });

  describeBehaviorOfFungibleToken(
    connection,
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
describeBehaviorOfFungibleToken(
  connection,
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
