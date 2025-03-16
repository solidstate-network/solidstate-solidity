// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC1155 } from '../../interfaces/IERC1155.sol';
import { IIntrospectable } from '../../introspection/IIntrospectable.sol';
import { _IMultiToken } from './_IMultiToken.sol';

/**
 * @title MultiToken base interface
 */
interface IMultiToken is _IMultiToken, IERC1155, IIntrospectable {}
