# SolidState Contracts

SolidState contract library. Part of the SolidState Solidity monorepo.

## Installation

Install the package as a development dependency:

```bash
npm install --save-dev @solidstate/contracts
# or
yarn add --dev @solidstate/contracts
```

## Layout

SolidState maintains "recommended" implementations of various EIP standards, which are suitable for most users. Internally, these implementations may be composed of several modules, which themselves may be composed of several visibility layers. Layers are subject to a consistent naming convention so that their purposes may be easily identified.

For example, the `ERC20` contract contains `ERC20Base`, `ERC20Extended` and `ERC20Metadata` modules. The `ERC20Base` module is composed of the external functions specified by the `IERC20` interface, `ERC20BaseInternal`, and `ERC20BaseStorage`.

An overview of the uses of each visibility layer is as follows:

| layer      | contents                            | description                                                                                                                                                                                        | example                 |
| ---------- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `external` | external and public functions       | set of functions that constitute a module's external interface; useful for most common situations                                                                                                  | `ERC20Base.sol`         |
| `internal` | internal functions, events          | set of internal functions that define a module's core logic; may be called by inheriting contracts                                                                                                 | `ERC20BaseInternal.sol` |
| `storage`  | internal library functions, structs | library for accessing and modifying storage; useful when sharing access to storage between implementation contracts that will be deployed separately (such as in the "diamond" proxy architecture) | `ERC20BaseStorage.sol`  |
