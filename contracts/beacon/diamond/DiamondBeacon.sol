// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { Ownable } from '../../access/ownable/Ownable.sol';
import {
    _DiamondProxyWritable
} from '../../proxy/diamond/writable/_DiamondProxyWritable.sol';
import {
    DiamondProxyWritable
} from '../../proxy/diamond/writable/DiamondProxyWritable.sol';
import { _DiamondProxy } from '../../proxy/diamond/_DiamondProxy.sol';
import { _DiamondBeacon } from './_DiamondBeacon.sol';
import { IDiamondBeacon } from './IDiamondBeacon.sol';

/**
 * @title Beacon contract which imitates the upgrade mechanism of an EIP-2535 diamond proxy.
 * @dev Configure this beacon using diamondCut as if it were a diamond proxy.
 */
contract DiamondBeacon is
    IDiamondBeacon,
    _DiamondBeacon,
    DiamondProxyWritable,
    Ownable
{
    /**
     * @inheritdoc IDiamondBeacon
     */
    function implementation(
        bytes4 selector
    ) external view returns (address implementationContract) {
        implementationContract = _implementation(selector);
    }

    /**
     * @inheritdoc _DiamondBeacon
     */
    function _diamondCut(
        FacetCut[] memory facetCuts,
        address target,
        bytes memory data
    ) internal virtual override(_DiamondProxy, _DiamondBeacon) {
        super._diamondCut(facetCuts, target, data);
    }

    /**
     * TODO: standardize use of externally accessible functions with "External" suffix
     */
    function _diamondCutExternal(
        FacetCut[] memory facetCuts,
        address target,
        bytes memory data
    ) internal virtual override(_DiamondProxyWritable, _DiamondBeacon) {
        super._diamondCutExternal(facetCuts, target, data);
    }
}
