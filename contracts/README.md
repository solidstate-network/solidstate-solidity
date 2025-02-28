# SolidState Contracts

SolidState contract library. Part of the SolidState Solidity monorepo.

> **Note**: An old version of this library has been audited by Hacken. More details are available in [the report](https://hacken.io/wp-content/uploads/2021/10/15092021_Premia_SC_Audit_Report.pdf).

## Installation

Install the package as a development dependency:

```bash
npm install --save-dev @solidstate/contracts
# or
yarn add --dev @solidstate/contracts
```

## Layout

Each of the Solidstate contracts is split into multiple "layers" across multiple files: external contracts, internal contracts, external interfaces, internal interfaces, and storage libraries.

This is done to give the developer granular control over which functions are available in each context. Some examples:

- A proxy may need to be initialized by calling some `internal` functions. It should not inherit any `external` functions because these should be defined on its implementation contract. Instead, it can inherit `internal` functions only from an internal contract and call them in its `constructor`.
- A diamond proxy may require that some code be shared among its implementation contracts. To avoid code duplication or making external calls between implementations, each implementation can inherit the shared `internal` functions from a single internal contract.
- On the client side, a diamond proxy is typically interacted with through the use of a composite ABI which includes the functions, errors, and events from each of the implementation contracts. The compiler can create such an ABI if the implementations are all inherited into a single contract, but this composite contract may exceed the size limit. Instead, the implementations' respective interfaces may be imported and combined without running this risk.
- An upgradeable contract might change drastically over its lifetime, and some of its functions (including `internal` functions) might be removed entirely. The storage data corresponding to old code will remain, however, and can be accessed using a storage library.

An overview of the uses of each layer is as follows:

| layer              | contents                                                                                                         | description                                                                                                                                                                                        | example                  |
| ------------------ | ---------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| External Contract  | `external` functions                                                                                             | set of externally callable functions                                                                                                                                                               | `ERC20Base.sol`          |
| Internal Contract  | `internal` functions                                                                                             | set of internal functions that define a module's core logic; may be called by inheriting contracts                                                                                                 | `ERC20BaseInternal.sol`  |
| External Interface | `external` function declarations and NatSpec documentation                                                       | set of function declarations that constitute a module's external interface                                                                                                                         | `IERC20Base.sol`         |
| Internal Interface | `event`, `error`, `enum`, `struct`                                                                               | set of non-function elements of a module's interface                                                                                                                                               | `IERC20BaseInternal.sol` |
| Storage Library    | storage layout `struct` (`Layout`), getter function (`layout()`), and standard storage location (`STORAGE_SLOT`) | library for accessing and modifying storage; useful when sharing access to storage between implementation contracts that will be deployed separately (such as in the "diamond" proxy architecture) | `ERC20BaseStorage.sol`   |

### SolidState Pre-Configured Contracts

SolidState maintains "recommended" implementations of various standards, which are suitable for most users. Internally, these implementations may be composed of several modules, which themselves may be composed of several "visibility layers". Visibility layers are subject to a consistent naming convention so that their purposes may be easily identified.

For example, the `SolidStateERC20` contract contains `ERC20Base`, `ERC20Extended` and `ERC20Metadata` modules (among others), which are recommended for most projects.

### Standard Interfaces

The repository also contains a set of standard interfaces for interacting with third-party contracts. These interfaces are typically taken directly from their EIPs (`IERC20`, `IERC721`) sometimes correspond to conventions that aren't defined standards (`IWETH`). These are found in the [interfaces/](./interfaces/) directory, and also follow the layers pattern.
