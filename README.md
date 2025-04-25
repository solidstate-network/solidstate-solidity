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

Install dependencies via Yarn:

```bash
yarn install
```

Setup Husky to format code on commit:

```bash
yarn prepare
```

Compile contracts via Hardhat:

```bash
yarn run hardhat compile
```

Automatically upgrade dependencies with yarn-up:

```bash
yarn upgrade-dependencies
```

### Testing

Test contracts with Hardhat and generate gas report using `hardhat-gas-reporter`:

```bash
yarn run hardhat test
```

Generate a code coverage report using `solidity-coverage`:

```bash
yarn run hardhat coverage
```

### Publication

Publish packages via Lerna:

```bash
yarn lerna-publish
```
