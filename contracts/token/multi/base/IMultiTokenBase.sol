// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC1155 } from '../../../interfaces/IERC1155.sol';
import { IIntrospectable } from '../../../introspection/IIntrospectable.sol';
import { _IMultiTokenBase } from './_IMultiTokenBase.sol';

/**
 * @title MultiToken base interface
 */
interface IMultiTokenBase is _IMultiTokenBase, IERC1155, IIntrospectable {}
