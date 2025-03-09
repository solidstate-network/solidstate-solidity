// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC20Base } from '../base/IERC20Base.sol';
import { _IERC20ImplicitApproval } from './_IERC20ImplicitApproval.sol';

interface IERC20ImplicitApproval is _IERC20ImplicitApproval, IERC20Base {}
