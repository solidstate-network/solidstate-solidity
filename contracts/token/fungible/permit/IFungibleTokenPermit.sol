// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

import { IERC2612 } from '../../../interfaces/IERC2612.sol';
import { IERC5267 } from '../../../interfaces/IERC5267.sol';
import { _IFungibleTokenPermit } from './_IFungibleTokenPermit.sol';

interface IFungibleTokenPermit is _IFungibleTokenPermit, IERC2612, IERC5267 {}
