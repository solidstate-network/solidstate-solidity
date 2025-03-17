// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { Ownable } from '../../access/ownable/Ownable.sol';
import { _Ownable } from '../../access/ownable/_Ownable.sol';
import { ISafeOwnable } from '../../access/ownable/ISafeOwnable.sol';
import { SafeOwnable } from '../../access/ownable/SafeOwnable.sol';
import { IERC165 } from '../../interfaces/IERC165.sol';
import { IERC173 } from '../../interfaces/IERC173.sol';
import { IERC2535DiamondCut } from '../../interfaces/IERC2535DiamondCut.sol';
import { IERC2535DiamondLoupe } from '../../interfaces/IERC2535DiamondLoupe.sol';
import { _Proxy } from '../_Proxy.sol';
import { DiamondProxy } from './DiamondProxy.sol';
import { _DiamondProxy } from './_DiamondProxy.sol';
import { DiamondProxyFallback } from './fallback/DiamondProxyFallback.sol';
import { IDiamondProxyFallback } from './fallback/IDiamondProxyFallback.sol';
import { _DiamondProxyFallback } from './fallback/_DiamondProxyFallback.sol';
import { DiamondProxyReadable } from './readable/DiamondProxyReadable.sol';
import { DiamondProxyWritable } from './writable/DiamondProxyWritable.sol';
import { ISolidstateDiamondProxy } from './ISolidstateDiamondProxy.sol';
import { _SolidstateDiamondProxy } from './_SolidstateDiamondProxy.sol';

/**
 * @title Solidstate "Diamond" proxy reference implementation
 */
abstract contract SolidstateDiamondProxy is
    ISolidstateDiamondProxy,
    _SolidstateDiamondProxy,
    DiamondProxy,
    DiamondProxyFallback,
    DiamondProxyReadable,
    DiamondProxyWritable,
    SafeOwnable
{
    constructor() {
        bytes4[] memory selectors = new bytes4[](12);
        uint256 selectorIndex;

        // register DiamondProxyFallback

        selectors[selectorIndex++] = IDiamondProxyFallback
            .getFallbackAddress
            .selector;
        selectors[selectorIndex++] = IDiamondProxyFallback
            .setFallbackAddress
            .selector;

        _setSupportsInterface(type(IDiamondProxyFallback).interfaceId, true);

        // register DiamondProxyWritable

        selectors[selectorIndex++] = IERC2535DiamondCut.diamondCut.selector;

        _setSupportsInterface(type(IERC2535DiamondCut).interfaceId, true);

        // register DiamondProxyReadable

        selectors[selectorIndex++] = IERC2535DiamondLoupe.facets.selector;
        selectors[selectorIndex++] = IERC2535DiamondLoupe
            .facetFunctionSelectors
            .selector;
        selectors[selectorIndex++] = IERC2535DiamondLoupe
            .facetAddresses
            .selector;
        selectors[selectorIndex++] = IERC2535DiamondLoupe.facetAddress.selector;

        _setSupportsInterface(type(IERC2535DiamondLoupe).interfaceId, true);

        // register ERC165

        selectors[selectorIndex++] = IERC165.supportsInterface.selector;

        _setSupportsInterface(type(IERC165).interfaceId, true);

        // register SafeOwnable

        selectors[selectorIndex++] = Ownable.owner.selector;
        selectors[selectorIndex++] = SafeOwnable.nomineeOwner.selector;
        selectors[selectorIndex++] = Ownable.transferOwnership.selector;
        selectors[selectorIndex++] = SafeOwnable.acceptOwnership.selector;

        _setSupportsInterface(type(IERC173).interfaceId, true);

        // diamond cut

        FacetCut[] memory facetCuts = new FacetCut[](1);

        facetCuts[0] = FacetCut({
            target: address(this),
            action: FacetCutAction.ADD,
            selectors: selectors
        });

        _diamondCut(facetCuts, address(0), '');

        // set owner

        _setOwner(_msgSender());
    }

    receive() external payable {}

    function _transferOwnership(
        address account
    )
        internal
        virtual
        override(SafeOwnable, _Ownable, _SolidstateDiamondProxy)
    {
        super._transferOwnership(account);
    }

    /**
     * @inheritdoc _DiamondProxyFallback
     */
    function _getImplementation()
        internal
        view
        override(
            _DiamondProxy,
            DiamondProxy,
            DiamondProxyFallback,
            _SolidstateDiamondProxy
        )
        returns (address implementation)
    {
        implementation = super._getImplementation();
    }
}
