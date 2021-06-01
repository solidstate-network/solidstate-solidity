// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {ERC20Base} from './ERC20Base.sol';
import {ERC20Extended} from './ERC20Extended.sol';
import {ERC20Metadata} from './ERC20Metadata.sol';

abstract contract ERC20 is ERC20Base, ERC20Extended, ERC20Metadata {}
