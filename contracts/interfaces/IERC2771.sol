// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _IERC2771 } from './_IERC2771.sol';

/**
 * @title ERC2771 interface
 * @dev see https://eips.ethereum.org/EIPS/eip-2771
 */
interface IERC2771 is _IERC2771 {
    /**
     * @notice query whether account is a trusted ERC2771 forwarder
     * @param account address to query
     * @return trustedStatus whether account is a trusted forwarder
     */
    function isTrustedForwarder(
        address account
    ) external view returns (bool trustedStatus);
}
