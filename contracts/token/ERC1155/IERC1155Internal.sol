// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {IERC165} from '../../introspection/IERC165.sol';

/**
 * @notice ERC1155 interface
 * @dev see https://github.com/ethereum/EIPs/issues/1155
 */
interface IERC1155Internal {
  event TransferSingle (
    address indexed operator,
    address indexed from,
    address indexed to,
    uint256 id,
    uint256 value
  );

  event TransferBatch (
    address indexed operator,
    address indexed from,
    address indexed to,
    uint256[] ids,
    uint256[] values
  );

  event ApprovalForAll (
    address indexed account,
    address indexed operator,
    bool approved
  );

  event URI (
    string value,
    uint256 indexed id
  );
}
