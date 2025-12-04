// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

import { IERC2981 } from '../../../interfaces/IERC2981.sol';
import { IIntrospectable } from '../../../introspection/IIntrospectable.sol';
import { _INFTRoyalty } from './_INFTRoyalty.sol';

interface INFTRoyalty is _INFTRoyalty, IERC2981, IIntrospectable {}
