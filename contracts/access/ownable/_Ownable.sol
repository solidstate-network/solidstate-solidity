// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { IERC173 } from '../../interfaces/IERC173.sol';
import { ERC173Storage } from '../../storage/ERC173Storage.sol';
import { Address } from '../../utils/Address.sol';
import { _Context } from '../../meta/_Context.sol';
import { _IOwnable } from './_IOwnable.sol';

abstract contract _Ownable is _IOwnable, _Context {
    using Address for address;

    modifier onlyOwner() {
        if (_msgSender() != _owner()) revert Ownable__NotOwner();
        _;
    }

    modifier onlyTransitiveOwner() {
        if (_msgSender() != _transitiveOwner())
            revert Ownable__NotTransitiveOwner();
        _;
    }

    function _owner() internal view virtual returns (address) {
        return ERC173Storage.layout(ERC173Storage.DEFAULT_STORAGE_SLOT).owner;
    }

    function _transitiveOwner() internal view virtual returns (address owner) {
        owner = _owner();

        while (owner.isContract()) {
            try IERC173(owner).owner() returns (address transitiveOwner) {
                owner = transitiveOwner;
            } catch {
                break;
            }
        }
    }

    function _transferOwnership(address account) internal virtual onlyOwner {
        _setOwner(account);
    }

    function _setOwner(address account) internal virtual {
        ERC173Storage.Layout storage $ = ERC173Storage.layout(
            ERC173Storage.DEFAULT_STORAGE_SLOT
        );
        emit OwnershipTransferred($.owner, account);
        $.owner = account;
    }
}
