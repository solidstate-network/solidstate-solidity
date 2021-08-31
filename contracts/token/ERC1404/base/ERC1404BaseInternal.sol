// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {ERC20Base, ERC20BaseInternal} from '../../ERC20/ERC20Base.sol';
import {IERC1404} from '../IERC1404.sol';
import {ERC1404Storage} from './ERC1404Storage.sol';

/**
 * @title Base ERC1404 implementation
 */
abstract contract ERC1404BaseInternal is ERC20BaseInternal {
  using ERC1404Storage for ERC1404Storage.Layout;

  function _detectTransferRestriction (
    address from,
    address to,
    uint amount
  ) virtual internal view returns (uint8);

  function _messageForTransferRestriction (
    uint8 restrictionCode
  ) virtual internal view returns (string memory) {
    return ERC1404Storage.layout().getRestrictionMessage(restrictionCode);
  }

  /**
   * @notice ERC20 hook: detect and handle transfer restriction
   * @inheritdoc ERC20BaseInternal
   */
  function _beforeTokenTransfer (
    address from,
    address to,
    uint amount
  ) virtual override internal {
    super._beforeTokenTransfer(from, to, amount);

    uint8 restrictionCode = _detectTransferRestriction(from, to, amount);

    if (restrictionCode > 0) {
      revert(_messageForTransferRestriction(restrictionCode));
    }
  }
}
