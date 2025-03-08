// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC2981 } from '../../../interfaces/IERC2981.sol';
import { IERC165Base } from '../../../introspection/ERC165/base/IERC165Base.sol';
import { _INFTRoyalty } from './_INFTRoyalty.sol';

interface INFTRoyalty is _INFTRoyalty, IERC2981, IERC165Base {}
