// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

import { IOwnable } from '../../ownable/IOwnable.sol';
import { IAccessControl } from '../IAccessControl.sol';
import { _IAccessControlOwnable } from './_IAccessControlOwnable.sol';

/**
 * @title AccessControlOwnable interface
 */
interface IAccessControlOwnable is
    _IAccessControlOwnable,
    IAccessControl,
    IOwnable
{}
