// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { ERC20ImplicitApprovalStorage } from './ERC20ImplicitApprovalStorage.sol';

/**
 * @title ERC20ImplicitApproval internal functions
 */
abstract contract ERC20ImplicitApprovalInternal {
    /**
     * @notice get whether address is implicitly approved to spend tokens
     * @param account address to query
     * @return implicit approval status
     */
    function _isImplicitlyApproved(address account)
        internal
        view
        returns (bool)
    {
        return ERC20ImplicitApprovalStorage.layout().implicitApprovals[account];
    }
}
