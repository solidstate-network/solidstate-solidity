// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IFungibleToken } from '../IFungibleToken.sol';
import { _IFungibleTokenImplicitApproval } from './_IFungibleTokenImplicitApproval.sol';

interface IFungibleTokenImplicitApproval is
    _IFungibleTokenImplicitApproval,
    IFungibleToken
{}
