# Proxy Contracts

## Variants

### Base Proxy

Solidstate includes a base `Proxy` implementation which handle call delegation to an implementation contract. To get one running, inherit from `Proxy` and do either of the following:

- Add a constructor which writes an implementation address to `ERC1967Storage.implementation`.
- Override `_getImplementation` to return a constant or immutable implementation address.

The latter approach is recommended for basic proxies because it is more gas-efficient. The storage-based approach is useful only for upgradeable proxies.

### Transparent Proxies

A `TransparentProxy` is a secure upgradeable proxy. It is "transparent" in the sense that no administrative functions are defined on its interface; instead, calls made by the admin with certain selectors are routed internally to administrative functions. This prevents undetected function selector clashes between the proxy and its implementation, which can cause security issues in some situations.

The EIP-173 `owner` account (from the `Ownable` contract) is not used as the proxy admin because the implementation contract might make use of the same storage slot. The owner of a proxy cannot fall back to the implementation contract, preventing accidental invocation of implementation functions.

### Beacon Proxies

`BeaconProxy` is used when multiple proxies must reference the same implementation contract. The implementation address is stored in a `Beacon` and exposed though its external interface. If the implementation address is changed, all proxies are upgraded at once.

`DiamondBeacon` is a beacon which supports multiple implementations.

| beacon proxy             | beacon          | description                                                                                      |
| ------------------------ | --------------- | ------------------------------------------------------------------------------------------------ |
| `BeaconProxy`            | `Beacon`        | Standard beacon which fetches its implementation through `IERC1967Beacon#implementation()`.      |
| `TransparentBeaconProxy` | `Beacon`        | Variant of `BeaconProxy` with transparently upgradeable beacon address.                          |
| `DiamondBeaconProxy`     | `DiamondBeacon` | Nonstandard beacon variant with support for multiple function-selector-specific implementations. |

See the `contracts/beacon/` directory for the beacon implementations.

### Diamond Proxies

ERC-2535 "Diamond" proxies support multiple implementations.

The diamond proxy modules are unique in that they are defined separately, despite the ERC's requirement that all diamonds implement the `IERC2535DiamondLoupe` functions. However, they also rely on shared behavior defined in `_DiamondProxy`; the internal module contracts inherit from `_DiamondProxy`, but not all of the external module contracts inherit from `DiamondProxy`.

| module                 | description                                                                                                                                                | required? |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `DiamondProxy`         | Base diamond proxy implementation without external accessors to its internal structure.                                                                    | yes       |
| `DiamondProxyReadable` | External interface for the "Diamond Loupe" view functions.                                                                                                 | yes       |
| `DiamondProxyWritable` | External interface for the `diamondCut` function.                                                                                                          | no        |
| `DiamondProxyFallback` | Extension of proxy functionality which introduces a last-resort fallback for situations in which no matching selector has been added to the diamond proxy. | no        |

The `SolidstateDiamondProxy` includes all of these modules in the same contract, and registers their selectors as "immutable".

The ERC stipulates that all instances of `DiamondProxy` must register their immutable function selectors. This precludes the need for "transparent" administration - any new functions added via `diamondCut` are validated against the existing funtions to prevent selector clashes.

### Minimal Proxies

EIP-1167 minimal proxies can be deployed by the `MinimalProxyFactory` library. These are the most gas-efficient proxies, but come with two drawbacks:

- Constructors are not supported, so any initialization must be done through a dedicated external function (see `Initializable`).
- Upgrades are not possible.

### Summary

| proxy type                 | upgradeable | multi-instance | multi-implementation | notes                                                                                             |
| -------------------------- | ----------- | -------------- | -------------------- | ------------------------------------------------------------------------------------------------- |
| `Proxy`                    |             |                |                      | Extensible for advanced use-cases. Base contract for most other proxies.                          |
| `TransparentProxy`         | ✔️          |                |                      | Simple and safely upgradeable.                                                                    |
| `BeaconProxy`              | ✔️          | ✔️             |                      | Multiple deployments can be upgraded at once via a `Beacon`.                                      |
| `DiamondProxy`             | ✔️          |                | ✔️                   | Most flexible upgradeability. Workaround for the contract size limit.                             |
| `TransparentBeaconProxy`   | ✔️          | ✔️             |                      | Same as `BeaconProxy`, but the beacon can be updated.                                             |
| `DiamondBeaconProxy`       | ✔️          | ✔️             | ✔️                   | Same as `BeaconProxy`, but the beacon is a `DiamondBeacon` and supports multiple implementations. |
| **EIP-1167 minimal proxy** |             | ✔️             |                      | Most gas-efficient multi-instance solution.                                                       |
