// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _IOwnable } from '../../../access/ownable/_IOwnable.sol';
import { _IContractSigner } from '../_IContractSigner.sol';

interface _IContractSignerOwnable is _IContractSigner, _IOwnable {}
