// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { IOwnable, Ownable, OwnableInternal, OwnableStorage } from '../../access/ownable/Ownable.sol';
import { ISafeOwnable, SafeOwnable } from '../../access/ownable/SafeOwnable.sol';
import { IERC173 } from '../../access/IERC173.sol';
import { ERC165, IERC165, ERC165Storage } from '../../introspection/ERC165.sol';
import { DiamondBase, DiamondBaseStorage } from './base/DiamondBase.sol';
import { DiamondReadable, IDiamondReadable } from './readable/DiamondReadable.sol';
import { DiamondWritable, IDiamondWritable } from './writable/DiamondWritable.sol';
import { ISolidStateDiamond } from './ISolidStateDiamond.sol';

/**
 * @title SolidState "Diamond" proxy reference implementation
 */
abstract contract SolidStateDiamond is
    ISolidStateDiamond,
    DiamondBase,
    DiamondReadable,
    DiamondWritable,
    SafeOwnable,
    ERC165
{
    using DiamondBaseStorage for DiamondBaseStorage.Layout;
    using ERC165Storage for ERC165Storage.Layout;
    using OwnableStorage for OwnableStorage.Layout;

    constructor() {
        ERC165Storage.Layout storage erc165 = ERC165Storage.layout();
        bytes4[] memory selectors = new bytes4[](12);

        // register DiamondWritable

        selectors[0] = IDiamondWritable.diamondCut.selector;

        erc165.setSupportedInterface(type(IDiamondWritable).interfaceId, true);

        // register DiamondReadable

        selectors[1] = IDiamondReadable.facets.selector;
        selectors[2] = IDiamondReadable.facetFunctionSelectors.selector;
        selectors[3] = IDiamondReadable.facetAddresses.selector;
        selectors[4] = IDiamondReadable.facetAddress.selector;

        erc165.setSupportedInterface(type(IDiamondReadable).interfaceId, true);

        // register ERC165

        selectors[5] = IERC165.supportsInterface.selector;

        erc165.setSupportedInterface(type(IERC165).interfaceId, true);

        // register SafeOwnable

        selectors[6] = Ownable.owner.selector;
        selectors[7] = SafeOwnable.nomineeOwner.selector;
        selectors[8] = Ownable.transferOwnership.selector;
        selectors[9] = SafeOwnable.acceptOwnership.selector;

        erc165.setSupportedInterface(type(IERC173).interfaceId, true);

        // register Diamond

        selectors[10] = SolidStateDiamond.getFallbackAddress.selector;
        selectors[11] = SolidStateDiamond.setFallbackAddress.selector;

        // diamond cut

        FacetCut[] memory facetCuts = new FacetCut[](1);

        facetCuts[0] = FacetCut({
            target: address(this),
            action: IDiamondWritable.FacetCutAction.ADD,
            selectors: selectors
        });

        DiamondBaseStorage.layout().diamondCut(facetCuts, address(0), '');

        // set owner

        OwnableStorage.layout().setOwner(msg.sender);
    }

    receive() external payable {}

    /**
     * @inheritdoc ISolidStateDiamond
     */
    function getFallbackAddress() external view returns (address) {
        return DiamondBaseStorage.layout().fallbackAddress;
    }

    /**
     * @inheritdoc ISolidStateDiamond
     */
    function setFallbackAddress(address fallbackAddress) external onlyOwner {
        DiamondBaseStorage.layout().fallbackAddress = fallbackAddress;
    }

    function _transferOwnership(address account)
        internal
        virtual
        override(OwnableInternal, SafeOwnable)
    {
        super._transferOwnership(account);
    }
}
