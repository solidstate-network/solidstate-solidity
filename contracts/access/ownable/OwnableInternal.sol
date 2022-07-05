// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { AddressUtils } from '../../utils/AddressUtils.sol';
import { IERC173 } from '../IERC173.sol';
import { IOwnableInternal } from './IOwnableInternal.sol';
import { OwnableStorage } from './OwnableStorage.sol';

abstract contract OwnableInternal is IOwnableInternal {
    using AddressUtils for address;
    using OwnableStorage for OwnableStorage.Layout;

    modifier onlyOwner() {
        require(msg.sender == _owner(), 'Ownable: sender must be owner');
        _;
    }

    modifier onlyTransitiveOwner() {
        require(
            msg.sender == _transitiveOwner(),
            'Ownable: sender must be transitive owner'
        );
        _;
    }

    function _owner() internal view virtual returns (address) {
        return OwnableStorage.layout().owner;
    }

    function _transitiveOwner() internal view virtual returns (address) {
        address owner = _owner();

        while (owner.isContract()) {
            try IERC173(owner).owner() returns (address transitiveOwner) {
                owner = transitiveOwner;
            } catch {
                return owner;
            }
        }

        return owner;
    }

    function _transferOwnership(address account) internal virtual {
        OwnableStorage.layout().setOwner(account);
        emit OwnershipTransferred(msg.sender, account);
    }
}
