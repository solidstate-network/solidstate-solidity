// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { IERC1271 } from '../../interfaces/IERC1271.sol';
import { _IContractSigner } from './_IContractSigner.sol';

interface IContractSigner is _IContractSigner, IERC1271 {}
