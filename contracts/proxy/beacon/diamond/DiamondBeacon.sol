// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { OwnableInternal } from '../../../access/ownable/Ownable.sol';
import { Ownable } from '../../../access/ownable/Ownable.sol';
import { DiamondReadable } from '../../diamond/readable/DiamondReadable.sol';
import { DiamondWritable } from '../../diamond/writable/DiamondWritable.sol';
import { DiamondWritableInternal } from '../../diamond/writable/DiamondWritableInternal.sol';
import { IDiamondBeacon } from './IDiamondBeacon.sol';
import { DiamondBeaconInternal } from './DiamondBeaconInternal.sol';

/**
 * @title Beacon contract which imitates the upgrade mechanism of an EIP-2535 diamond proxy.
 * @dev Configure this beacon using diamondCut as if it were a diamond proxy.  Proxies can fetch their implementations by calling facetAddress.
 */
contract DiamondBeacon is
    IDiamondBeacon,
    DiamondBeaconInternal,
    DiamondReadable,
    DiamondWritable,
    Ownable
{
    /**
     * @inheritdoc DiamondBeaconInternal
     */
    function _diamondCut(
        FacetCut[] memory facetCuts,
        address target,
        bytes memory data
    )
        internal
        virtual
        override(DiamondWritableInternal, DiamondBeaconInternal)
    {
        super._diamondCut(facetCuts, target, data);
    }
}
