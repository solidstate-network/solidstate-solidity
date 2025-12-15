// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

import { IERC2535DiamondCut } from '../../../interfaces/IERC2535DiamondCut.sol';
import { IIntrospectable } from '../../../introspection/IIntrospectable.sol';
import { _IDiamondProxyWritable } from './_IDiamondProxyWritable.sol';

/**
 * @title Diamond proxy upgrade interface
 * @dev see https://eips.ethereum.org/EIPS/eip-2535
 */
interface IDiamondProxyWritable is
    _IDiamondProxyWritable,
    IERC2535DiamondCut,
    IIntrospectable
{}
