// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { ERC165, IERC165, ERC165Storage } from '../../../introspection/ERC165.sol';
import { DiamondBase, DiamondBaseStorage } from '../base/DiamondBase.sol';
import { IDiamondWritable } from '../writable/IDiamondWritable.sol';
import { DiamondReadable, IDiamondReadable } from './DiamondReadable.sol';

contract DiamondReadableMock is DiamondBase, DiamondReadable, ERC165 {
    using DiamondBaseStorage for DiamondBaseStorage.Layout;
    using ERC165Storage for ERC165Storage.Layout;

    constructor(IDiamondWritable.FacetCut[] memory cuts) {
        DiamondBaseStorage.layout().diamondCut(cuts, address(0), '');
        ERC165Storage.layout().setSupportedInterface(
            type(IERC165).interfaceId,
            true
        );
        ERC165Storage.layout().setSupportedInterface(
            type(IDiamondReadable).interfaceId,
            true
        );
    }

    /**
     * @dev suppress compiler warning
     */
    receive() external payable {}
}
