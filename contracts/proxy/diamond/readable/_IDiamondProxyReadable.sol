// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _IERC2535DiamondLoupe } from '../../../interfaces/_IERC2535DiamondLoupe.sol';
import { _IIntrospectable } from '../../../introspection/_IIntrospectable.sol';
import { _IDiamondProxy } from '../_IDiamondProxy.sol';

/**
 * @title Diamond proxy introspection interface needed for internal functions
 * @dev see https://eips.ethereum.org/EIPS/eip-2535
 */
interface _IDiamondProxyReadable is
    _IERC2535DiamondLoupe,
    _IDiamondProxy,
    _IIntrospectable
{}
