# Proxy Contracts

-

## Variants

### Transparent Proxies

The EIP-173 `owner` account (from the `Ownable` contract) is not used as the proxy admin because the implementation contract might make use of the same storage slot. The owner of a proxy

### Beacon Proxies

`BeaconProxy` is used when multiple proxies must reference the same implementation contract. The implementation address is stored in a `Beacon` and exposed though its external interface. If the implementation address is changed, all proxies are upgraded at once.

`DiamondBeacon` is a beacon which supports multiple implementations.

### Diamond Proxies

ERC-2535 "Diamond" proxies are

For a properly configured diamond proxy, the "transparent" behavior of `TransparentProxy` is not required because the upgrade function (`diamondCut`) validates that no function selector clashes occur.

The diamond proxy modules are unique in that they are defined separately, despite the the ERC's requirement that all diamonds implement the `IERC2535DiamondLoupe` functions.

| module                 | description | required? |
| ---------------------- | ----------- | --------- |
| `DiamondProxy`         |             | yes       |
| `DiamondProxyReadable` |             | yes       |
| `DiamondProxyWritable` |             | no        |
| `DiamondProxyFallback` |             | no        |
