// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {IERC1155} from './IERC1155.sol';
import {IERC1155Receiver} from './IERC1155Receiver.sol';
import {ERC1155BaseStorage} from './ERC1155BaseStorage.sol';
import {AddressUtils} from '../../utils/AddressUtils.sol';

/**
 * @title Base ERC1155 contract
 * @dev derived from https://github.com/OpenZeppelin/openzeppelin-contracts/ (MIT license)
 */
abstract contract ERC1155Base is IERC1155 {
  using AddressUtils for address;

  /**
   * @notice query the balance of given token held by given address
   * @param account address to query
   * @param id token to query
   * @return token balance
   */
  function balanceOf (
    address account,
    uint id
  ) override public view returns (uint) {
    require(account != address(0), 'ERC1155: balance query for the zero address');
    return ERC1155BaseStorage.layout().balances[id][account];
  }

  /**
   * @notice query the balances of given tokens held by given addresses
   * @param accounts addresss to query
   * @param ids tokens to query
   * @return token balances
   */
  function balanceOfBatch (
    address[] memory accounts,
    uint[] memory ids
  ) override public view returns (uint[] memory) {
    require(accounts.length == ids.length, 'ERC1155: accounts and ids length mismatch');

    mapping (uint => mapping (address => uint)) storage balances = ERC1155BaseStorage.layout().balances;

    uint[] memory batchBalances = new uint[](accounts.length);

    for (uint i; i < accounts.length; i++) {
      require(accounts[i] != address(0), 'ERC1155: batch balance query for the zero address');
      batchBalances[i] = balances[ids[i]][accounts[i]];
    }

    return batchBalances;
  }

  /**
   * @notice query approval status of given operator with respect to given address
   * @param account address to query for approval granted
   * @param operator address to query for approval received
   * @return whether operator is approved to spend tokens held by account
   */
  function isApprovedForAll (
    address account,
    address operator
  ) override public view returns (bool) {
    return ERC1155BaseStorage.layout().operatorApprovals[account][operator];
  }

  /**
   * @notice grant approval to or revoke approval from given operator to spend held tokens
   * @param operator address whose approval status to update
   * @param status whether operator should be considered approved
   */
  function setApprovalForAll (
    address operator,
    bool status
  ) override public {
    require(msg.sender != operator, 'ERC1155: setting approval status for self');
    ERC1155BaseStorage.layout().operatorApprovals[msg.sender][operator] = status;
    emit ApprovalForAll(msg.sender, operator, status);
  }

  /**
   * @notice transfer tokens between given addresses, checking for ERC1155Receiver implementation if applicable
   * @param from sender of tokens
   * @param to receiver of tokens
   * @param id token ID
   * @param amount quantity of tokens to transfer
   * @param data data payload
   */
  function safeTransferFrom (
    address from,
    address to,
    uint id,
    uint amount,
    bytes memory data
  ) override public {
    require(from == msg.sender || isApprovedForAll(from, msg.sender), 'ERC1155: caller is not owner nor approved');
    _safeTransfer(msg.sender, from, to, id, amount, data);
  }

  /**
   * @notice transfer batch of tokens between given addresses, checking for ERC1155Receiver implementation if applicable
   * @param from sender of tokens
   * @param to receiver of tokens
   * @param ids list of token IDs
   * @param amounts list of quantities of tokens to transfer
   * @param data data payload
   */
  function safeBatchTransferFrom (
    address from,
    address to,
    uint[] memory ids,
    uint[] memory amounts,
    bytes memory data
  ) override public {
    require(from == msg.sender || isApprovedForAll(from, msg.sender), 'ERC1155: caller is not owner nor approved');
    _safeTransferBatch(msg.sender, from, to, ids, amounts, data);
  }

  /**
   * @notice mint given quantity of tokens for given address
   * @dev ERC1155Receiver implemenation is not checked
   * @param account beneficiary of minting
   * @param id token ID
   * @param amount quantity of tokens to mint
   * @param data data payload
   */
  function _mint (
    address account,
    uint id,
    uint amount,
    bytes memory data
  ) virtual internal {
    require(account != address(0), 'ERC1155: mint to the zero address');

    _beforeTokenTransfer(msg.sender, address(0), account, _asSingletonArray(id), _asSingletonArray(amount), data);

    mapping (address => uint) storage balances = ERC1155BaseStorage.layout().balances[id];
    balances[account] += amount;

    emit TransferSingle(msg.sender, address(0), account, id, amount);
  }

  /**
   * @notice mint given quantity of tokens for given address
   * @param account beneficiary of minting
   * @param id token ID
   * @param amount quantity of tokens to mint
   * @param data data payload
   */
  function _safeMint (
    address account,
    uint id,
    uint amount,
    bytes memory data
  ) virtual internal {
    _doSafeTransferAcceptanceCheck(msg.sender, address(0), account, id, amount, data);
    _mint(account, id, amount, data);
  }

  /**
   * @notice mint batch of tokens for given address
   * @dev ERC1155Receiver implemenation is not checked
   * @param account beneficiary of minting
   * @param ids list of token IDs
   * @param amounts list of quantities of tokens to mint
   * @param data data payload
   */
  function _mintBatch (
    address account,
    uint[] memory ids,
    uint[] memory amounts,
    bytes memory data
  ) virtual internal {
    require(account != address(0), 'ERC1155: mint to the zero address');
    require(ids.length == amounts.length, 'ERC1155: ids and amounts length mismatch');

    _beforeTokenTransfer(msg.sender, address(0), account, ids, amounts, data);

    mapping (uint => mapping (address => uint)) storage balances = ERC1155BaseStorage.layout().balances;

    for (uint i; i < ids.length; i++) {
      uint id = ids[i];
      balances[id][account] += amounts[i];
    }

    emit TransferBatch(msg.sender, address(0), account, ids, amounts);
  }

  /**
   * @notice mint batch of tokens for given address
   * @param account beneficiary of minting
   * @param ids list of token IDs
   * @param amounts list of quantities of tokens to mint
   * @param data data payload
   */
  function _safeMintBatch (
    address account,
    uint[] memory ids,
    uint[] memory amounts,
    bytes memory data
  ) virtual internal {
    _doSafeBatchTransferAcceptanceCheck(msg.sender, address(0), account, ids, amounts, data);
    _mintBatch(account, ids, amounts, data);
  }

  /**
   * @notice burn given quantity of tokens held by given address
   * @param account holder of tokens to burn
   * @param id token ID
   * @param amount quantity of tokens to burn
   */
  function _burn (
    address account,
    uint id,
    uint amount
  ) virtual internal {
    require(account != address(0), 'ERC1155: burn from the zero address');

    _beforeTokenTransfer(msg.sender, account, address(0), _asSingletonArray(id), _asSingletonArray(amount), '');

    mapping (address => uint) storage balances = ERC1155BaseStorage.layout().balances[id];
    require(balances[account] >= amount, 'ERC1155: burn amount exceeds balances');
    balances[account] -= amount;

    emit TransferSingle(msg.sender, account, address(0), id, amount);
  }

  /**
   * @notice burn given batch of tokens held by given address
   * @param account holder of tokens to burn
   * @param ids token IDs
   * @param amounts quantities of tokens to burn
   */
  function _burnBatch (
    address account,
    uint[] memory ids,
    uint[] memory amounts
  ) virtual internal {
    require(account != address(0), 'ERC1155: burn from the zero address');
    require(ids.length == amounts.length, 'ERC1155: ids and amounts length mismatch');

    _beforeTokenTransfer(msg.sender, account, address(0), ids, amounts, '');

    mapping (uint => mapping (address => uint)) storage balances = ERC1155BaseStorage.layout().balances;

    for (uint i; i < ids.length; i++) {
      uint id = ids[i];
      require(balances[id][account] >= amounts[i], 'ERC1155: burn amount exceeds balance');
      balances[id][account] -= amounts[i];
    }

    emit TransferBatch(msg.sender, account, address(0), ids, amounts);
  }

  /**
   * @notice transfer tokens between given addresses
   * @dev ERC1155Receiver implemenation is not checked
   * @param operator executor of transfer
   * @param sender sender of tokens
   * @param recipient receiver of tokens
   * @param id token ID
   * @param amount quantity of tokens to transfer
   * @param data data payload
   */
  function _transfer (
    address operator,
    address sender,
    address recipient,
    uint id,
    uint amount,
    bytes memory data
  ) virtual internal {
    require(recipient != address(0), 'ERC1155: transfer to the zero address');

    _beforeTokenTransfer(operator, sender, recipient, _asSingletonArray(id), _asSingletonArray(amount), data);

    mapping (uint => mapping (address => uint)) storage balances = ERC1155BaseStorage.layout().balances;

    uint256 senderBalance = balances[id][sender];
    require(senderBalance >= amount, 'ERC1155: insufficient balances for transfer');
    unchecked {
      balances[id][sender] = senderBalance - amount;
    }
    balances[id][recipient] += amount;

    emit TransferSingle(operator, sender, recipient, id, amount);
  }

  /**
   * @notice transfer tokens between given addresses
   * @param operator executor of transfer
   * @param sender sender of tokens
   * @param recipient receiver of tokens
   * @param id token ID
   * @param amount quantity of tokens to transfer
   * @param data data payload
   */
  function _safeTransfer (
    address operator,
    address sender,
    address recipient,
    uint id,
    uint amount,
    bytes memory data
  ) virtual internal {
    _doSafeTransferAcceptanceCheck(operator, sender, recipient, id, amount, data);
    _transfer(operator, sender, recipient, id, amount, data);
  }

  /**
   * @notice transfer batch of tokens between given addresses
   * @dev ERC1155Receiver implemenation is not checked
   * @param operator executor of transfer
   * @param sender sender of tokens
   * @param recipient receiver of tokens
   * @param ids token IDs
   * @param amounts quantities of tokens to transfer
   * @param data data payload
   */
  function _transferBatch (
    address operator,
    address sender,
    address recipient,
    uint[] memory ids,
    uint[] memory amounts,
    bytes memory data
  ) virtual internal {
    require(recipient != address(0), 'ERC1155: transfer to the zero address');
    require(ids.length == amounts.length, 'ERC1155: ids and amounts length mismatch');

    _beforeTokenTransfer(operator, sender, recipient, ids, amounts, data);

    mapping (uint => mapping (address => uint)) storage balances = ERC1155BaseStorage.layout().balances;

    for (uint i; i < ids.length; i++) {
      uint token = ids[i];
      uint amount = amounts[i];

      uint256 senderBalance = balances[token][sender];
      require(senderBalance >= amount, 'ERC1155: insufficient balances for transfer');
      unchecked {
        balances[token][sender] = senderBalance - amount;
      }
      balances[token][recipient] += amount;
    }

    emit TransferBatch(operator, sender, recipient, ids, amounts);
  }

  /**
   * @notice transfer batch of tokens between given addresses
   * @param operator executor of transfer
   * @param sender sender of tokens
   * @param recipient receiver of tokens
   * @param ids token IDs
   * @param amounts quantities of tokens to transfer
   * @param data data payload
   */
  function _safeTransferBatch (
    address operator,
    address sender,
    address recipient,
    uint[] memory ids,
    uint[] memory amounts,
    bytes memory data
  ) virtual internal {
    _doSafeBatchTransferAcceptanceCheck(operator, sender, recipient, ids, amounts, data);
    _transferBatch(operator, sender, recipient, ids, amounts, data);
  }

  /**
   * @notice wrap given element in array of length 1
   * @param element element to wrap
   * @return singleton array
   */
  function _asSingletonArray (
    uint element
  ) private pure returns (uint[] memory) {
    uint[] memory array = new uint[](1);
    array[0] = element;
    return array;
  }

  /**
   * @notice revert if applicable transfer recipient is not valid ERC1155Receiver
   * @param operator executor of transfer
   * @param from sender of tokens
   * @param to receiver of tokens
   * @param id token ID
   * @param amount quantity of tokens to transfer
   * @param data data payload
   */
  function _doSafeTransferAcceptanceCheck (
    address operator,
    address from,
    address to,
    uint id,
    uint amount,
    bytes memory data
  ) private {
    if (to.isContract()) {
      try IERC1155Receiver(to).onERC1155Received(operator, from, id, amount, data) returns (bytes4 response) {
        require(
          response == IERC1155Receiver.onERC1155Received.selector,
          'ERC1155: ERC1155Receiver rejected tokens'
        );
      } catch Error(string memory reason) {
        revert(reason);
      } catch {
        revert('ERC1155: transfer to non ERC1155Receiver implementer');
      }
    }
  }

  /**
  * @notice revert if applicable transfer recipient is not valid ERC1155Receiver
   * @param operator executor of transfer
   * @param from sender of tokens
   * @param to receiver of tokens
   * @param ids token IDs
   * @param amounts quantities of tokens to transfer
   * @param data data payload
   */
  function _doSafeBatchTransferAcceptanceCheck (
    address operator,
    address from,
    address to,
    uint[] memory ids,
    uint[] memory amounts,
    bytes memory data
  ) private {
    if (to.isContract()) {
      try IERC1155Receiver(to).onERC1155BatchReceived(operator, from, ids, amounts, data) returns (bytes4 response) {
        require(
          response == IERC1155Receiver.onERC1155BatchReceived.selector,
          'ERC1155: ERC1155Receiver rejected tokens'
        );
      } catch Error(string memory reason) {
        revert(reason);
      } catch {
        revert('ERC1155: transfer to non ERC1155Receiver implementer');
      }
    }
  }

  /**
   * @notice ERC1155 hook, called before all transfers including mint and burn
   * @dev function should be overridden and new implemenation must call super
   * @dev called for both single and batch transfers
   * @param operator executor of transfer
   * @param from sender of tokens
   * @param to receiver of tokens
   * @param ids token IDs
   * @param amounts quantities of tokens to transfer
   * @param data data payload
   */
  function _beforeTokenTransfer (
    address operator,
    address from,
    address to,
    uint[] memory ids,
    uint[] memory amounts,
    bytes memory data
  ) virtual internal {}
}
