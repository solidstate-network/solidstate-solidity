// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IERC2771 } from './_IERC2771.sol';

interface IERC2771 is _IERC2771 {
    function isTrustedForwarder(address forwarder) external view returns (bool);
}
