// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IContractSigner } from '../IContractSigner.sol';
import { _IContractSignerOwnable } from './_IContractSignerOwnable.sol';

interface IContractSignerOwnable is _IContractSignerOwnable, IContractSigner {}
