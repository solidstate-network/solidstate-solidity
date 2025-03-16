// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC2535DiamondLoupe } from '../../../interfaces/IERC2535DiamondLoupe.sol';
import { IIntrospectable } from '../../../introspection/IIntrospectable.sol';
import { _IDiamondProxyReadable } from './_IDiamondProxyReadable.sol';

/**
 * @title Diamond proxy introspection interface
 * @dev see https://eips.ethereum.org/EIPS/eip-2535
 */
interface IDiamondProxyReadable is
    _IDiamondProxyReadable,
    IERC2535DiamondLoupe,
    IIntrospectable
{}
