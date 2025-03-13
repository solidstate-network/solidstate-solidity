// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC1155 } from '../../../interfaces/IERC1155.sol';
import { IERC165Base } from '../../../introspection/ERC165/base/IERC165Base.sol';
import { _IMultiTokenBase } from './_IMultiTokenBase.sol';

/**
 * @title MultiToken base interface
 */
interface IMultiTokenBase is _IMultiTokenBase, IERC1155, IERC165Base {}
