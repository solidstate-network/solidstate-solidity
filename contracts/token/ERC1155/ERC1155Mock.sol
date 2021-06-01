// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {ERC1155} from './ERC1155.sol';
import {IERC1155} from './IERC1155.sol';
import {ERC165Storage} from '../../introspection/ERC165Storage.sol';
import {IERC165} from '../../introspection/IERC165.sol';

contract ERC1155Mock is ERC1155 {
  using ERC165Storage for ERC165Storage.Layout;

  constructor () {
    ERC165Storage.layout().setSupportedInterface(type(IERC165).interfaceId, true);
    ERC165Storage.layout().setSupportedInterface(type(IERC1155).interfaceId, true);
  }

  function mint (
    address account,
    uint id,
    uint amount
  ) external {
    _mint(account, id, amount, '');
  }

  function burn (
    address account,
    uint id,
    uint amount
  ) external {
    _burn(account, id, amount);
  }
}
