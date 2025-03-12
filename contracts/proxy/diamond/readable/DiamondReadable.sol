// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC2535DiamondLoupe } from '../../../interfaces/IERC2535DiamondLoupe.sol';
import { ERC165Base } from '../../../introspection/ERC165/base/ERC165Base.sol';
import { DiamondBaseStorage } from '../base/DiamondBaseStorage.sol';
import { DiamondCommon } from '../common/DiamondCommon.sol';
import { IDiamondReadable } from './IDiamondReadable.sol';
import { _DiamondReadable } from './_DiamondReadable.sol';

/**
 * @title EIP-2535 "Diamond" proxy introspection contract
 * @dev derived from https://github.com/mudgen/diamond-2 (MIT license)
 */
abstract contract DiamondReadable is
    IDiamondReadable,
    _DiamondReadable,
    DiamondCommon,
    ERC165Base
{
    /**
     * @inheritdoc IERC2535DiamondLoupe
     */
    function facets() external view returns (Facet[] memory diamondFacets) {
        diamondFacets = _facets();
    }

    /**
     * @inheritdoc IERC2535DiamondLoupe
     */
    function facetFunctionSelectors(
        address facet
    ) external view returns (bytes4[] memory selectors) {
        selectors = _facetFunctionSelectors(facet);
    }

    /**
     * @inheritdoc IERC2535DiamondLoupe
     */
    function facetAddresses()
        external
        view
        returns (address[] memory addresses)
    {
        addresses = _facetAddresses();
    }

    /**
     * @inheritdoc IERC2535DiamondLoupe
     */
    function facetAddress(
        bytes4 selector
    ) external view returns (address facet) {
        facet = _facetAddress(selector);
    }
}
