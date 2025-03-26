// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { IERC2535DiamondLoupe } from '../../../interfaces/IERC2535DiamondLoupe.sol';
import { Introspectable } from '../../../introspection/Introspectable.sol';
import { ERC2535Storage } from '../../../storage/ERC2535Storage.sol';
import { DiamondProxy } from '../DiamondProxy.sol';
import { IDiamondProxyReadable } from './IDiamondProxyReadable.sol';
import { _DiamondProxyReadable } from './_DiamondProxyReadable.sol';

/**
 * @title EIP-2535 "Diamond" proxy introspection contract
 * @dev derived from https://github.com/mudgen/diamond-2 (MIT license)
 */
abstract contract DiamondProxyReadable is
    IDiamondProxyReadable,
    _DiamondProxyReadable,
    Introspectable
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
