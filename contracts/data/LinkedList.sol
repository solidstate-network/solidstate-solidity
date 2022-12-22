// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/**
 * @title Linked list implementation
 * @dev derived from https://github.com/vittominacori/solidity-linked-list/ (MIT license)
 */
library LinkedList {
    uint256 private constant NULL = 0;
    uint256 private constant HEAD = 0;

    uint256 internal constant MAX_UINT256 = type(uint256).max;

    bool private constant PREV = false;
    bool private constant NEXT = true;

    error LinkedList__InsertInvalid();

    struct List {
        mapping(uint256 => mapping(bool => uint256)) list;
    }

    /**
     * @dev Checks if the node exists
     * @param self stored linked list from contract
     * @param _node a node to search for
     * @return bool true if node exists, false otherwise
     */
    function nodeExists(
        List storage self,
        uint256 _node
    ) internal view returns (bool) {
        if (self.list[_node][PREV] == HEAD && self.list[_node][NEXT] == HEAD) {
            if (self.list[HEAD][NEXT] == _node) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }

    /**
     * @dev Returns the links of a node as a tuple
     * @param self stored linked list from contract
     * @param _node id of the node to get
     * @return bool, uint256, uint256 true if node exists or false otherwise, previous node, next node
     */
    function getNode(
        List storage self,
        uint256 _node
    ) internal view returns (bool, uint256, uint256) {
        if (!nodeExists(self, _node)) {
            return (false, 0, 0);
        } else {
            return (true, self.list[_node][PREV], self.list[_node][NEXT]);
        }
    }

    /**
     * @dev Returns the link of a node `_node` in direction `_direction`.
     * @param self stored linked list from contract
     * @param _node id of the node to step from
     * @param _direction direction to step in
     * @return node in _direction (0 if no match before, MAX_UINT if no match after)
     */
    function getAdjacent(
        List storage self,
        uint256 _node,
        bool _direction
    ) internal view returns (uint256) {
        if (!nodeExists(self, _node)) {
            if (_direction == PREV) return 0;
            return MAX_UINT256;
        } else {
            return self.list[_node][_direction];
        }
    }

    /**
     * @dev Returns the link of a node `_node` in direction `_NEXT`.
     * @param self stored linked list from contract
     * @param _node id of the node to step from
     * @return next node (MAX_UINT if no match)
     */
    function getNextNode(
        List storage self,
        uint256 _node
    ) internal view returns (uint256) {
        return getAdjacent(self, _node, NEXT);
    }

    /**
     * @dev Returns the link of a node `_node` in direction `_PREV`.
     * @param self stored linked list from contract
     * @param _node id of the node to step from
     * @return previous node (0 if no match)
     */
    function getPreviousNode(
        List storage self,
        uint256 _node
    ) internal view returns (uint256) {
        return getAdjacent(self, _node, PREV);
    }

    /**
     * @dev Insert node `_new` beside existing node `_node` in direction `_NEXT`.
     * @param self stored linked list from contract
     * @param _node existing node
     * @param _new  new node to insert
     * @return bool true if success, false otherwise
     */
    function insertAfter(
        List storage self,
        uint256 _node,
        uint256 _new
    ) internal returns (bool) {
        if (_new == 0 || _new == MAX_UINT256)
            revert LinkedList__InsertInvalid();

        return _insert(self, _node, _new, NEXT);
    }

    /**
     * @dev Insert node `_new` beside existing node `_node` in direction `_PREV`.
     * @param self stored linked list from contract
     * @param _node existing node
     * @param _new  new node to insert
     * @return bool true if success, false otherwise
     */
    function insertBefore(
        List storage self,
        uint256 _node,
        uint256 _new
    ) internal returns (bool) {
        if (_new == 0 || _new == MAX_UINT256)
            revert LinkedList__InsertInvalid();

        return _insert(self, _node, _new, PREV);
    }

    /**
     * @dev Removes an entry from the linked list
     * @param self stored linked list from contract
     * @param _node node to remove from the list
     * @return uint256 the removed node
     */
    function remove(
        List storage self,
        uint256 _node
    ) internal returns (uint256) {
        if ((_node == NULL) || (!nodeExists(self, _node))) {
            return 0;
        }
        _createLink(self, self.list[_node][PREV], self.list[_node][NEXT], NEXT);
        delete self.list[_node][PREV];
        delete self.list[_node][NEXT];

        return _node;
    }

    /**
     * @dev Pushes an entry to the head of the linked list
     * @param self stored linked list from contract
     * @param _node new entry to push to the head
     * @return bool true if success, false otherwise
     */
    function unshift(List storage self, uint256 _node) internal returns (bool) {
        return _push(self, _node, NEXT);
    }

    /**
     * @dev Pushes an entry to the tail of the linked list
     * @param self stored linked list from contract
     * @param _node new entry to push to the tail
     * @return bool true if success, false otherwise
     */
    function push(List storage self, uint256 _node) internal returns (bool) {
        return _push(self, _node, PREV);
    }

    /**
     * @dev Pops the first entry from the head of the linked list
     * @param self stored linked list from contract
     * @return uint256 the removed node
     */
    function shift(List storage self) internal returns (uint256) {
        return _pop(self, NEXT);
    }

    /**
     * @dev Pops the first entry from the tail of the linked list
     * @param self stored linked list from contract
     * @return uint256 the removed node
     */
    function pop(List storage self) internal returns (uint256) {
        return _pop(self, PREV);
    }

    /**
     * @dev Pushes an entry to the head of the linked list
     * @param self stored linked list from contract
     * @param _node new entry to push to the head
     * @param _direction push to the head (_NEXT) or tail (_PREV)
     * @return bool true if success, false otherwise
     */
    function _push(
        List storage self,
        uint256 _node,
        bool _direction
    ) private returns (bool) {
        return _insert(self, HEAD, _node, _direction);
    }

    /**
     * @dev Pops the first entry from the linked list
     * @param self stored linked list from contract
     * @param _direction pop from the head (_NEXT) or the tail (_PREV)
     * @return uint256 the removed node
     */
    function _pop(
        List storage self,
        bool _direction
    ) private returns (uint256) {
        uint256 adj = getAdjacent(self, HEAD, _direction);
        return remove(self, adj);
    }

    /**
     * @dev Insert node `_new` beside existing node `_node` in direction `_direction`.
     * @param self stored linked list from contract
     * @param _node existing node
     * @param _new  new node to insert
     * @param _direction direction to insert node in
     * @return bool true if success, false otherwise
     */
    function _insert(
        List storage self,
        uint256 _node,
        uint256 _new,
        bool _direction
    ) private returns (bool) {
        if (!nodeExists(self, _new) && nodeExists(self, _node)) {
            uint256 c = self.list[_node][_direction];
            _createLink(self, _node, _new, _direction);
            _createLink(self, _new, c, _direction);

            return true;
        }

        return false;
    }

    /**
     * @dev Creates a bidirectional link between two nodes on direction `_direction`
     * @param self stored linked list from contract
     * @param _node existing node
     * @param _link node to link to in the _direction
     * @param _direction direction to insert node in
     */
    function _createLink(
        List storage self,
        uint256 _node,
        uint256 _link,
        bool _direction
    ) private {
        self.list[_link][!_direction] = _node;
        self.list[_node][_direction] = _link;
    }
}
