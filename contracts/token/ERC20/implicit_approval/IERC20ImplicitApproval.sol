// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC20Base } from '../base/IERC20Base.sol';
import { IERC20ImplicitApprovalInternal } from './IERC20ImplicitApprovalInternal.sol';

interface IERC20ImplicitApproval is
    IERC20ImplicitApprovalInternal,
    IERC20Base
{}
