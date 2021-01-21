// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import '@openzeppelin/contracts/math/SafeMath.sol';

// TODO: remove ERC165

import './IERC1155.sol';
import './IERC1155Receiver.sol';
import './ERC1155BaseStorage.sol';
import '../../introspection/ERC165.sol';
import '../../utils/AddressUtils.sol';

abstract contract ERC1155Base is IERC1155, ERC165 {
  using AddressUtils for address;
  using SafeMath for uint;

  function balanceOf (
    address account,
    uint id
  ) override public view returns (uint) {
    require(account != address(0), 'ERC1155: balance query for the zero address');
    return ERC1155BaseStorage.layout().balances[id][account];
  }

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

  function isApprovedForAll (
    address account,
    address operator
  ) override public view returns (bool) {
    return ERC1155BaseStorage.layout().operatorApprovals[account][operator];
  }

  function setApprovalForAll (
    address operator,
    bool status
  ) override public {
    require(msg.sender != operator, 'ERC1155: setting approval status for self');
    ERC1155BaseStorage.layout().operatorApprovals[msg.sender][operator] = status;
    emit ApprovalForAll(msg.sender, operator, status);
  }

  function safeTransferFrom (
    address from,
    address to,
    uint id,
    uint amount,
    bytes memory data
  ) override public {
    require(to != address(0), 'ERC1155: transfer to the zero address');
    require(from == msg.sender || isApprovedForAll(from, msg.sender), 'ERC1155: calleris not owner nor approved');

    _beforeTokenTransfer(msg.sender, from, to, _asSingletonArray(id), _asSingletonArray(amount), data);

    mapping (address => uint) storage balances = ERC1155BaseStorage.layout().balances[id];
    balances[from] = balances[from].sub(amount, 'ERC1155: insufficient balance for transfer');
    balances[to] = balances[to].add(amount);

    emit TransferSingle(msg.sender, from, to, id, amount);

    _doSafeTransferAcceptanceCheck(msg.sender, from, to, id, amount, data);
  }

  function safeBatchTransferFrom (
    address from,
    address to,
    uint[] memory ids,
    uint[] memory amounts,
    bytes memory data
  ) override public {
    require(ids.length == amounts.length, 'ERC1155: ids and amounts length mismatch');
    require(to != address(0), 'ERC1155: transfer to the zero address');
    require(from == msg.sender || isApprovedForAll(from, msg.sender), 'ERC1155: caller is not owner nor approved');

    _beforeTokenTransfer(msg.sender, from, to, ids, amounts, data);

    mapping (uint => mapping (address => uint)) storage balances = ERC1155BaseStorage.layout().balances;

    for (uint i; i < ids.length; i++) {
      uint id = ids[i];
      uint amount = amounts[i];

      balances[id][from] = balances[id][from].sub(amount, 'ERC1155: insufficient balances for transfer');
      balances[id][to] = balances[id][to].add(amount);
    }

    emit TransferBatch(msg.sender, from, to, ids, amounts);

    _doSafeBatchTransferAcceptanceCheck(msg.sender, from, to, ids, amounts, data);
  }

  function _mint (
    address account,
    uint id,
    uint amount,
    bytes memory data
  ) internal {
    require(account != address(0), 'ERC1155: mint to the zero address');

    _beforeTokenTransfer(msg.sender, address(0), account, _asSingletonArray(id), _asSingletonArray(amount), data);

    mapping (address => uint) storage balances = ERC1155BaseStorage.layout().balances[id];
    balances[account] = balances[account].add(amount);

    emit TransferSingle(msg.sender, address(0), account, id, amount);

    _doSafeTransferAcceptanceCheck(msg.sender, address(0), account, id, amount, data);
  }

  function _mintBatch (
    address account,
    uint[] memory ids,
    uint[] memory amounts,
    bytes memory data
  ) internal {
    require(account != address(0), 'ERC1155: mint to the zero address');
    require(ids.length == amounts.length, 'ERC1155: ids and amounts length mismatch');

    _beforeTokenTransfer(msg.sender, address(0), account, ids, amounts, data);

    mapping (uint => mapping (address => uint)) storage balances = ERC1155BaseStorage.layout().balances;

    for (uint i; i < ids.length; i++) {
      uint id = ids[i];
      balances[id][account] = balances[id][account].add(amounts[i]);
    }

    emit TransferBatch(msg.sender, address(0), account, ids, amounts);

    _doSafeBatchTransferAcceptanceCheck(msg.sender, address(0), account, ids, amounts, data);
  }

  function _burn (
    address account,
    uint id,
    uint amount
  ) internal {
    require(account != address(0), 'ERC1155: burn from the zero address');

    _beforeTokenTransfer(msg.sender, account, address(0), _asSingletonArray(id), _asSingletonArray(amount), '');

    mapping (address => uint) storage balances = ERC1155BaseStorage.layout().balances[id];
    balances[account] = balances[account].sub(amount, 'ERC1155: burn amount exceeds balance');

    emit TransferSingle(msg.sender, account, address(0), id, amount);
  }

  function _burnBatch (
    address account,
    uint[] memory ids,
    uint[] memory amounts
  ) internal {
    require(account != address(0), 'ERC1155: burn from the zero address');
    require(ids.length == amounts.length, 'ERC1155: ids and amounts length mismatch');

    _beforeTokenTransfer(msg.sender, account, address(0), ids, amounts, '');

    mapping (uint => mapping (address => uint)) storage balances = ERC1155BaseStorage.layout().balances;

    for (uint i; i < ids.length; i++) {
      uint id = ids[i];
      balances[id][account] = balances[id][account].sub(amounts[i], 'ERC1155: burn amount exceeds balance');
    }

    emit TransferBatch(msg.sender, account, address(0), ids, amounts);
  }

  function _asSingletonArray (
    uint element
  ) private pure returns (uint[] memory) {
    uint[] memory array = new uint[](1);
    array[0] = element;
    return array;
  }

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
        if (response != IERC1155Receiver(to).onERC1155Received.selector) {
          revert('ERC1155: ERC1155Receiver rejected tokens');
        }
      } catch Error(string memory reason) {
        revert(reason);
      } catch {
        revert('ERC1155: transfer to non ERC1155Receiver implementer');
      }
    }
  }

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
        if (response != IERC1155Receiver(to).onERC1155BatchReceived.selector) {
          revert('ERC1155: ERC1155Receiver rejected tokens');
        }
      } catch Error(string memory reason) {
        revert(reason);
      } catch {
        revert('ERC1155: transfer to non ERC1155Receiver implementer');
      }
    }
  }

  function _beforeTokenTransfer (
    address operator,
    address from,
    address to,
    uint[] memory ids,
    uint[] memory amounts,
    bytes memory data
  ) virtual internal {}
}
