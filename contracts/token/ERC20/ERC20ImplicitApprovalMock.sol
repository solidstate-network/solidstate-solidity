// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './ERC20ImplicitApproval.sol';

contract ERC20ImplicitApprovalMock is ERC20ImplicitApproval {
  constructor(
    address[] memory approvedAccounts
  ) {
    ERC20ImplicitApprovalStorage.Layout storage l = ERC20ImplicitApprovalStorage.layout();

    for (uint i; i < approvedAccounts.length; i++) {
      l.implicitApprovals[approvedAccounts[i]] = true;
    }
  }

  function isImplicitlyApproved (
    address account
  ) external view returns (bool) {
    return _isImplicitlyApproved(account);
  }
}
