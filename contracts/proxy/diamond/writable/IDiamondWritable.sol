// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC2535DiamondCut } from '../../../interfaces/IERC2535DiamondCut.sol';
import { IIntrospectable } from '../../../introspection/IIntrospectable.sol';
import { IDiamondCommon } from '../common/IDiamondCommon.sol';
import { _IDiamondWritable } from './_IDiamondWritable.sol';

/**
 * @title Diamond proxy upgrade interface
 * @dev see https://eips.ethereum.org/EIPS/eip-2535
 */
interface IDiamondWritable is
    _IDiamondWritable,
    IERC2535DiamondCut,
    IDiamondCommon,
    IIntrospectable
{}
