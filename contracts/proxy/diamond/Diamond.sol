// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { SafeOwnable, OwnableStorage, Ownable } from '../../access/SafeOwnable.sol';
import { IERC173 } from '../../access/IERC173.sol';
import { ERC165, IERC165, ERC165Storage } from '../../introspection/ERC165.sol';
import { DiamondBase, DiamondBaseStorage } from './DiamondBase.sol';
import { DiamondCuttable, IDiamondCuttable } from './DiamondCuttable.sol';
import { DiamondLoupe, IDiamondLoupe } from './DiamondLoupe.sol';

/**
 * @notice SolidState "Diamond" proxy reference implementation
 */
abstract contract Diamond is
    DiamondBase,
    DiamondCuttable,
    DiamondLoupe,
    SafeOwnable,
    ERC165
{
    using DiamondBaseStorage for DiamondBaseStorage.Layout;
    using ERC165Storage for ERC165Storage.Layout;
    using OwnableStorage for OwnableStorage.Layout;

    constructor() {
        ERC165Storage.Layout storage erc165 = ERC165Storage.layout();
        bytes4[] memory selectors = new bytes4[](12);

        // register DiamondCuttable

        selectors[0] = IDiamondCuttable.diamondCut.selector;

        erc165.setSupportedInterface(type(IDiamondCuttable).interfaceId, true);

        // register DiamondLoupe

        selectors[1] = IDiamondLoupe.facets.selector;
        selectors[2] = IDiamondLoupe.facetFunctionSelectors.selector;
        selectors[3] = IDiamondLoupe.facetAddresses.selector;
        selectors[4] = IDiamondLoupe.facetAddress.selector;

        erc165.setSupportedInterface(type(IDiamondLoupe).interfaceId, true);

        // register ERC165

        selectors[5] = IERC165.supportsInterface.selector;

        erc165.setSupportedInterface(type(IERC165).interfaceId, true);

        // register SafeOwnable

        selectors[6] = Ownable.owner.selector;
        selectors[7] = SafeOwnable.nomineeOwner.selector;
        selectors[8] = SafeOwnable.transferOwnership.selector;
        selectors[9] = SafeOwnable.acceptOwnership.selector;

        erc165.setSupportedInterface(type(IERC173).interfaceId, true);

        // register Diamond

        selectors[10] = Diamond.getFallbackAddress.selector;
        selectors[11] = Diamond.setFallbackAddress.selector;

        // diamond cut

        FacetCut[] memory facetCuts = new FacetCut[](1);

        facetCuts[0] = FacetCut({
            target: address(this),
            action: IDiamondCuttable.FacetCutAction.ADD,
            selectors: selectors
        });

        DiamondBaseStorage.layout().diamondCut(facetCuts, address(0), '');

        // set owner

        OwnableStorage.layout().setOwner(msg.sender);
    }

    receive() external payable {}

    /**
     * @notice get the address of the fallback contract
     * @return fallback address
     */
    function getFallbackAddress() external view returns (address) {
        return DiamondBaseStorage.layout().fallbackAddress;
    }

    /**
     * @notice set the address of the fallback contract
     * @param fallbackAddress fallback address
     */
    function setFallbackAddress(address fallbackAddress) external onlyOwner {
        DiamondBaseStorage.layout().fallbackAddress = fallbackAddress;
    }
}
