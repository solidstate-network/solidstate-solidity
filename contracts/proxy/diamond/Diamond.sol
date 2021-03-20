// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '../../access/SafeOwnable.sol';
import '../../introspection/ERC165.sol';
import './DiamondBase.sol';
import './DiamondCuttable.sol';
import './DiamondLoupe.sol';

/**
 * @notice SolidState "Diamond" proxy reference implementation
 */
contract Diamond is DiamondBase, DiamondCuttable, DiamondLoupe, SafeOwnable, ERC165 {
  using DiamondBaseStorage for DiamondBaseStorage.Layout;
  using ERC165Storage for ERC165Storage.Layout;
  using OwnableStorage for OwnableStorage.Layout;

  constructor () {
    ERC165Storage.Layout storage erc165 = ERC165Storage.layout();
    FacetCut[] memory facetCuts = new FacetCut[](4);

    // register DiamondCuttable

    bytes4[] memory selectorsDiamondCuttable = new bytes4[](1);
    selectorsDiamondCuttable[0] = IDiamondCuttable.diamondCut.selector;

    facetCuts[0] = FacetCut({
      target: address(this),
      action: IDiamondCuttable.FacetCutAction.ADD,
      selectors: selectorsDiamondCuttable
    });

    erc165.setSupportedInterface(type(IDiamondCuttable).interfaceId, true);

    // register DiamondLoupe

    bytes4[] memory selectorsDiamondLoupe = new bytes4[](4);
    selectorsDiamondLoupe[0] = IDiamondLoupe.facets.selector;
    selectorsDiamondLoupe[1] = IDiamondLoupe.facetFunctionSelectors.selector;
    selectorsDiamondLoupe[2] = IDiamondLoupe.facetAddresses.selector;
    selectorsDiamondLoupe[3] = IDiamondLoupe.facetAddress.selector;

    facetCuts[1] = FacetCut({
      target: address(this),
      action: IDiamondCuttable.FacetCutAction.ADD,
      selectors: selectorsDiamondLoupe
    });

    erc165.setSupportedInterface(type(IDiamondLoupe).interfaceId, true);

    // register ERC165

    bytes4[] memory selectorsERC165 = new bytes4[](1);
    selectorsERC165[0] = IERC165.supportsInterface.selector;

    facetCuts[2] = FacetCut({
      target: address(this),
      action: IDiamondCuttable.FacetCutAction.ADD,
      selectors: selectorsERC165
    });

    erc165.setSupportedInterface(type(IERC165).interfaceId, true);

    // register SafeOwnable

    bytes4[] memory selectorsSafeOwnable = new bytes4[](4);
    selectorsSafeOwnable[0] = Ownable.owner.selector;
    selectorsSafeOwnable[1] = SafeOwnable.nomineeOwner.selector;
    selectorsSafeOwnable[2] = SafeOwnable.transferOwnership.selector;
    selectorsSafeOwnable[3] = SafeOwnable.acceptOwnership.selector;

    facetCuts[3] = FacetCut({
      target: address(this),
      action: IDiamondCuttable.FacetCutAction.ADD,
      selectors: selectorsSafeOwnable
    });

    erc165.setSupportedInterface(type(IERC173).interfaceId, true);

    // diamond cut

    DiamondBaseStorage.layout().diamondCut(facetCuts, address(0), '');

    // set owner

    OwnableStorage.layout().setOwner(msg.sender);
  }
}
