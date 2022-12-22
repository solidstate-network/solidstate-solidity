// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { LinkedList } from './LinkedList.sol';

contract LinkedListMock {
    using LinkedList for LinkedList.List;

    LinkedList.List private list;

    function nodeExists(uint256 node) external view returns (bool) {
        return list.nodeExists(node);
    }

    function getNode(
        uint256 node
    ) external view returns (bool, uint256, uint256) {
        return list.getNode(node);
    }

    function getAdjacent(
        uint256 node,
        bool direction
    ) external view returns (uint256) {
        return list.getAdjacent(node, direction);
    }

    function getNextNode(uint256 node) external view returns (uint256) {
        return list.getNextNode(node);
    }

    function getPreviousNode(uint256 node) external view returns (uint256) {
        return list.getPreviousNode(node);
    }

    function insertAfter(
        uint256 node,
        uint256 newNode
    ) external returns (bool) {
        return list.insertAfter(node, newNode);
    }

    function insertBefore(
        uint256 node,
        uint256 newNode
    ) external returns (bool) {
        return list.insertBefore(node, newNode);
    }

    function remove(uint256 node) external returns (uint256) {
        return list.remove(node);
    }

    function unshift(uint256 node) external returns (bool) {
        return list.unshift(node);
    }

    function push(uint256 node) external returns (bool) {
        return list.push(node);
    }

    function shift() external returns (uint256) {
        return list.shift();
    }

    function pop() external returns (uint256) {
        return list.pop();
    }
}
