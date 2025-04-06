// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import './access/access_control/AccessControl.sol';
import './access/access_control/AccessControlDefaultAdminRules.sol';
import './access/access_control/IAccessControl.sol';
import './access/access_control/IAccessControlDefaultAdminRules.sol';
import './access/access_control/_AccessControl.sol';
import './access/access_control/_AccessControlDefaultAdminRules.sol';
import './access/access_control/_IAccessControl.sol';
import './access/access_control/_IAccessControlDefaultAdminRules.sol';
import './access/initializable/IInitializable.sol';
import './access/initializable/Initializable.sol';
import './access/initializable/_IInitializable.sol';
import './access/initializable/_Initializable.sol';
import './access/ownable/IOwnable.sol';
import './access/ownable/Ownable.sol';
import './access/ownable/_IOwnable.sol';
import './access/ownable/_Ownable.sol';
import './access/ownable/safe/ISafeOwnable.sol';
import './access/ownable/safe/SafeOwnable.sol';
import './access/ownable/safe/_ISafeOwnable.sol';
import './access/ownable/safe/_SafeOwnable.sol';
import './access/partially_pausable/IPartiallyPausable.sol';
import './access/partially_pausable/PartiallyPausable.sol';
import './access/partially_pausable/_IPartiallyPausable.sol';
import './access/partially_pausable/_PartiallyPausable.sol';
import './access/pausable/IPausable.sol';
import './access/pausable/Pausable.sol';
import './access/pausable/_IPausable.sol';
import './access/pausable/_Pausable.sol';
import './access/reentrancy_guard/IReentrancyGuard.sol';
import './access/reentrancy_guard/ITransientReentrancyGuard.sol';
import './access/reentrancy_guard/ReentrancyGuard.sol';
import './access/reentrancy_guard/TransientReentrancyGuard.sol';
import './access/reentrancy_guard/_IReentrancyGuard.sol';
import './access/reentrancy_guard/_ITransientReentrancyGuard.sol';
import './access/reentrancy_guard/_ReentrancyGuard.sol';
import './access/reentrancy_guard/_TransientReentrancyGuard.sol';
import './beacon/Beacon.sol';
import './beacon/IBeacon.sol';
import './beacon/_Beacon.sol';
import './beacon/_IBeacon.sol';
import './beacon/diamond/DiamondBeacon.sol';
import './beacon/diamond/IDiamondBeacon.sol';
import './beacon/diamond/_DiamondBeacon.sol';
import './beacon/diamond/_IDiamondBeacon.sol';
import './cryptography/ECDSA.sol';
import './cryptography/EIP712.sol';
import './cryptography/MerkleProof.sol';
import './data/Bytes32Builder.sol';
import './data/DoublyLinkedList.sol';
import './data/EnumerableMap.sol';
import './data/EnumerableSet.sol';
import './data/IncrementalMerkleTree.sol';
import './data/PackedDoublyLinkedList.sol';
import './data/Slot.sol';
import './factory/CloneFactory.sol';
import './factory/Factory.sol';
import './factory/MinimalProxyFactory.sol';
import './interfaces/IERC1155.sol';
import './interfaces/IERC1155Metadata.sol';
import './interfaces/IERC1155Receiver.sol';
import './interfaces/IERC1271.sol';
import './interfaces/IERC1404.sol';
import './interfaces/IERC165.sol';
import './interfaces/IERC173.sol';
import './interfaces/IERC1967Beacon.sol';
import './interfaces/IERC1967Proxy.sol';
import './interfaces/IERC20.sol';
import './interfaces/IERC20Metadata.sol';
import './interfaces/IERC2535DiamondCut.sol';
import './interfaces/IERC2535DiamondLoupe.sol';
import './interfaces/IERC2612.sol';
import './interfaces/IERC2771.sol';
import './interfaces/IERC2981.sol';
import './interfaces/IERC3156FlashBorrower.sol';
import './interfaces/IERC3156FlashLender.sol';
import './interfaces/IERC4626.sol';
import './interfaces/IERC5267.sol';
import './interfaces/IERC5313.sol';
import './interfaces/IERC721.sol';
import './interfaces/IERC721Enumerable.sol';
import './interfaces/IERC721Metadata.sol';
import './interfaces/IERC721Receiver.sol';
import './interfaces/IWETH.sol';
import './interfaces/_IERC1155.sol';
import './interfaces/_IERC1155Metadata.sol';
import './interfaces/_IERC1155Receiver.sol';
import './interfaces/_IERC1271.sol';
import './interfaces/_IERC1404.sol';
import './interfaces/_IERC165.sol';
import './interfaces/_IERC173.sol';
import './interfaces/_IERC1967Beacon.sol';
import './interfaces/_IERC1967Proxy.sol';
import './interfaces/_IERC20.sol';
import './interfaces/_IERC20Metadata.sol';
import './interfaces/_IERC2535DiamondCut.sol';
import './interfaces/_IERC2535DiamondLoupe.sol';
import './interfaces/_IERC2612.sol';
import './interfaces/_IERC2771.sol';
import './interfaces/_IERC2981.sol';
import './interfaces/_IERC3156FlashBorrower.sol';
import './interfaces/_IERC3156FlashLender.sol';
import './interfaces/_IERC4626.sol';
import './interfaces/_IERC5267.sol';
import './interfaces/_IERC5313.sol';
import './interfaces/_IERC721.sol';
import './interfaces/_IERC721Enumerable.sol';
import './interfaces/_IERC721Metadata.sol';
import './interfaces/_IERC721Receiver.sol';
import './interfaces/_IWETH.sol';
import './introspection/IIntrospectable.sol';
import './introspection/Introspectable.sol';
import './introspection/_IIntrospectable.sol';
import './introspection/_Introspectable.sol';
import './meta/Context.sol';
import './meta/ForwardedMetaTransactionContext.sol';
import './meta/IContext.sol';
import './meta/IForwardedMetaTransactionContext.sol';
import './meta/_Context.sol';
import './meta/_ForwardedMetaTransactionContext.sol';
import './meta/_IContext.sol';
import './meta/_IForwardedMetaTransactionContext.sol';
import './proxy/IProxy.sol';
import './proxy/Proxy.sol';
import './proxy/_IProxy.sol';
import './proxy/_Proxy.sol';
import './proxy/beacon/BeaconProxy.sol';
import './proxy/beacon/IBeaconProxy.sol';
import './proxy/beacon/_BeaconProxy.sol';
import './proxy/beacon/_IBeaconProxy.sol';
import './proxy/beacon/diamond/DiamondBeaconProxy.sol';
import './proxy/beacon/diamond/IDiamondBeaconProxy.sol';
import './proxy/beacon/diamond/_DiamondBeaconProxy.sol';
import './proxy/beacon/diamond/_IDiamondBeaconProxy.sol';
import './proxy/beacon/transparent/ITransparentBeaconProxy.sol';
import './proxy/beacon/transparent/ITransparentBeaconProxyWithAdminFunctions.sol';
import './proxy/beacon/transparent/TransparentBeaconProxy.sol';
import './proxy/beacon/transparent/_ITransparentBeaconProxy.sol';
import './proxy/beacon/transparent/_ITransparentBeaconProxyWithAdminFunctions.sol';
import './proxy/beacon/transparent/_TransparentBeaconProxy.sol';
import './proxy/diamond/DiamondProxy.sol';
import './proxy/diamond/IDiamondProxy.sol';
import './proxy/diamond/ISolidstateDiamondProxy.sol';
import './proxy/diamond/SolidstateDiamondProxy.sol';
import './proxy/diamond/_DiamondProxy.sol';
import './proxy/diamond/_IDiamondProxy.sol';
import './proxy/diamond/_ISolidstateDiamondProxy.sol';
import './proxy/diamond/_SolidstateDiamondProxy.sol';
import './proxy/diamond/fallback/DiamondProxyFallback.sol';
import './proxy/diamond/fallback/IDiamondProxyFallback.sol';
import './proxy/diamond/fallback/_DiamondProxyFallback.sol';
import './proxy/diamond/fallback/_IDiamondProxyFallback.sol';
import './proxy/diamond/readable/DiamondProxyReadable.sol';
import './proxy/diamond/readable/IDiamondProxyReadable.sol';
import './proxy/diamond/readable/_DiamondProxyReadable.sol';
import './proxy/diamond/readable/_IDiamondProxyReadable.sol';
import './proxy/diamond/writable/DiamondProxyWritable.sol';
import './proxy/diamond/writable/IDiamondProxyWritable.sol';
import './proxy/diamond/writable/_DiamondProxyWritable.sol';
import './proxy/diamond/writable/_IDiamondProxyWritable.sol';
import './proxy/transparent/ITransparentProxy.sol';
import './proxy/transparent/ITransparentProxyWithAdminFunctions.sol';
import './proxy/transparent/TransparentProxy.sol';
import './proxy/transparent/_ITransparentProxy.sol';
import './proxy/transparent/_ITransparentProxyWithAdminFunctions.sol';
import './proxy/transparent/_TransparentProxy.sol';
import './signature/contract_signer/ContractSigner.sol';
import './signature/contract_signer/IContractSigner.sol';
import './signature/contract_signer/_ContractSigner.sol';
import './signature/contract_signer/_IContractSigner.sol';
import './signature/contract_signer/ownable/ContractSignerOwnable.sol';
import './signature/contract_signer/ownable/IContractSignerOwnable.sol';
import './signature/contract_signer/ownable/_ContractSignerOwnable.sol';
import './signature/contract_signer/ownable/_IContractSignerOwnable.sol';
import './token/common/royalty/INFTRoyalty.sol';
import './token/common/royalty/NFTRoyalty.sol';
import './token/common/royalty/_INFTRoyalty.sol';
import './token/common/royalty/_NFTRoyalty.sol';
import './token/fungible/FungibleToken.sol';
import './token/fungible/IFungibleToken.sol';
import './token/fungible/ISolidstateFungibleToken.sol';
import './token/fungible/SolidstateFungibleToken.sol';
import './token/fungible/_FungibleToken.sol';
import './token/fungible/_IFungibleToken.sol';
import './token/fungible/_ISolidstateFungibleToken.sol';
import './token/fungible/_SolidstateFungibleToken.sol';
import './token/fungible/extended/FungibleTokenExtended.sol';
import './token/fungible/extended/IFungibleTokenExtended.sol';
import './token/fungible/extended/_FungibleTokenExtended.sol';
import './token/fungible/extended/_IFungibleTokenExtended.sol';
import './token/fungible/metadata/FungibleTokenMetadata.sol';
import './token/fungible/metadata/IFungibleTokenMetadata.sol';
import './token/fungible/metadata/_FungibleTokenMetadata.sol';
import './token/fungible/metadata/_IFungibleTokenMetadata.sol';
import './token/fungible/permit/FungibleTokenPermit.sol';
import './token/fungible/permit/IFungibleTokenPermit.sol';
import './token/fungible/permit/_FungibleTokenPermit.sol';
import './token/fungible/permit/_IFungibleTokenPermit.sol';
import './token/fungible/restricted/IRestrictedFungibleToken.sol';
import './token/fungible/restricted/RestrictedFungibleToken.sol';
import './token/fungible/restricted/_IRestrictedFungibleToken.sol';
import './token/fungible/restricted/_RestrictedFungibleToken.sol';
import './token/fungible/snapshot/FungibleTokenSnapshot.sol';
import './token/fungible/snapshot/IFungibleTokenSnapshot.sol';
import './token/fungible/snapshot/_FungibleTokenSnapshot.sol';
import './token/fungible/snapshot/_IFungibleTokenSnapshot.sol';
import './token/fungible/vault/FungibleVaultToken.sol';
import './token/fungible/vault/IFungibleVaultToken.sol';
import './token/fungible/vault/_FungibleVaultToken.sol';
import './token/fungible/vault/_IFungibleVaultToken.sol';
import './token/multi/IMultiToken.sol';
import './token/multi/ISolidstateMultiToken.sol';
import './token/multi/MultiToken.sol';
import './token/multi/SolidstateMultiToken.sol';
import './token/multi/_IMultiToken.sol';
import './token/multi/_ISolidstateMultiToken.sol';
import './token/multi/_MultiToken.sol';
import './token/multi/_SolidstateMultiToken.sol';
import './token/multi/enumerable/IMultiTokenEnumerable.sol';
import './token/multi/enumerable/MultiTokenEnumerable.sol';
import './token/multi/enumerable/_IMultiTokenEnumerable.sol';
import './token/multi/enumerable/_MultiTokenEnumerable.sol';
import './token/multi/metadata/IMultiTokenMetadata.sol';
import './token/multi/metadata/MultiTokenMetadata.sol';
import './token/multi/metadata/_IMultiTokenMetadata.sol';
import './token/multi/metadata/_MultiTokenMetadata.sol';
import './token/non_fungible/INonFungibleToken.sol';
import './token/non_fungible/ISolidstateNonFungibleToken.sol';
import './token/non_fungible/NonFungibleToken.sol';
import './token/non_fungible/SolidstateNonFungibleToken.sol';
import './token/non_fungible/_INonFungibleToken.sol';
import './token/non_fungible/_ISolidstateNonFungibleToken.sol';
import './token/non_fungible/_NonFungibleToken.sol';
import './token/non_fungible/_SolidstateNonFungibleToken.sol';
import './token/non_fungible/enumerable/INonFungibleTokenEnumerable.sol';
import './token/non_fungible/enumerable/NonFungibleTokenEnumerable.sol';
import './token/non_fungible/enumerable/_INonFungibleTokenEnumerable.sol';
import './token/non_fungible/enumerable/_NonFungibleTokenEnumerable.sol';
import './token/non_fungible/metadata/INonFungibleTokenMetadata.sol';
import './token/non_fungible/metadata/NonFungibleTokenMetadata.sol';
import './token/non_fungible/metadata/_INonFungibleTokenMetadata.sol';
import './token/non_fungible/metadata/_NonFungibleTokenMetadata.sol';
import './utils/Address.sol';
import './utils/Array.sol';
import './utils/Block.sol';
import './utils/Bool.sol';
import './utils/Bytes32.sol';
import './utils/IMulticall.sol';
import './utils/Int256.sol';
import './utils/Math.sol';
import './utils/Multicall.sol';
import './utils/Panic.sol';
import './utils/SafeCast.sol';
import './utils/SafeERC20.sol';
import './utils/Uint256.sol';
import './utils/_IMulticall.sol';
import './utils/_Multicall.sol';
import './utils/time/Duration.sol';
import './utils/time/Timelock.sol';
import './utils/time/Timestamp.sol';
