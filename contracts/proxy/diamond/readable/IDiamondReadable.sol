// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC2535DiamondLoupe } from '../../../interfaces/IERC2535DiamondLoupe.sol';
import { IERC165Base } from '../../../introspection/ERC165/base/IERC165Base.sol';
import { IDiamondCommon } from '../common/IDiamondCommon.sol';
import { _IDiamondReadable } from './_IDiamondReadable.sol';

/**
 * @title Diamond proxy introspection interface
 * @dev see https://eips.ethereum.org/EIPS/eip-2535
 */
interface IDiamondReadable is
    _IDiamondReadable,
    IERC2535DiamondLoupe,
    IDiamondCommon,
    IERC165Base
{}
