// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { IERC173 } from './IERC173.sol';
import { OwnableInternal } from './OwnableInternal.sol';
import { OwnableStorage } from './OwnableStorage.sol';

/**
 * @title Ownership access control based on ERC173
 */
abstract contract Ownable is IERC173, OwnableInternal {
    using OwnableStorage for OwnableStorage.Layout;

    /**
     * @inheritdoc IERC173
     */
    function owner() public view virtual override returns (address) {
        return OwnableStorage.layout().owner;
    }

    /**
     * @inheritdoc IERC173
     */
    function transferOwnership(address account)
        public
        virtual
        override
        onlyOwner
    {
        OwnableStorage.layout().setOwner(account);
        emit OwnershipTransferred(msg.sender, account);
    }
}
