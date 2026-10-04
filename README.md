<div align="center">
  <h1>Solidstate Solidity</h1>
  <br/>
  <img width=240 src="./assets/solidstate_mark.png" alt="solidstate logo"/>
  <h5 align="center">The Solidstate smart contract development library.</h5>
  <br/>
  <img src="https://img.shields.io/npm/v/@solidstate/contracts?color=FDF685&style=flat-square" />
  <img src="https://img.shields.io/github/stars/solidstate-network/solidstate-solidity?color=FDF685&style=flat-square" />
  <img src="https://img.shields.io/github/contributors/solidstate-network/solidstate-solidity?color=FDF685&style=flat-square" />
  <img src="https://img.shields.io/npm/dy/@solidstate/contracts?color=FDF685&style=flat-square" />
  <br/>
  <br/>
</div>

## Packages

Solidstate is an upgradeable-first Solidity smart contract development library.

It consists of the following packages:

| package                 | description                                                                           | 📕                          |
| ----------------------- | ------------------------------------------------------------------------------------- | --------------------------- |
| `@solidstate/abi`       | contract ABIs                                                                         | [📖](./abi/README.md)       |
| `@solidstate/contracts` | core contracts                                                                        | [📖](./contracts/README.md) |
| `@solidstate/library`   | functions for interacting with and validating contracts                               | [📖](./lib/README.md)       |
| `@solidstate/spec`      | portable tests which may be run against third-party implementations of core contracts | [📖](./spec/README.md)      |

## Development

Install dependencies:

```bash
pnpm install
```

Setup Husky to format code on commit:

```bash
pnpm prepare
```

Compile contracts via Hardhat:

```bash
pnpm hardhat build
```

### Testing

Test contracts with Hardhat:

```bash
pnpm hardhat test
```

Generate a gas usage report:

```bash
pnpm hardhat test --gas-stats
```

Generate a code coverage report:

```bash
pnpm hardhat test --coverage
```

### Publication

Publish packages via Lerna:

```bash
pnpm lerna-publish
```
