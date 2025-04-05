// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { ERC173Storage } from '../../../storage/ERC173Storage.sol';
import { _Ownable } from '../_Ownable.sol';
import { _ISafeOwnable } from './_ISafeOwnable.sol';

abstract contract _SafeOwnable is _ISafeOwnable, _Ownable {
    modifier onlyNomineeOwner() {
        if (_msgSender() != _nomineeOwner())
            revert SafeOwnable__NotNomineeOwner();
        _;
    }

    /**
     * @notice get the nominated owner who has permission to call acceptOwnership
     */
    function _nomineeOwner() internal view virtual returns (address) {
        return
            ERC173Storage
                .layout(ERC173Storage.DEFAULT_STORAGE_SLOT)
                .nomineeOwner;
    }

    /**
     * @notice query the current timelock and timelock duration
     * @return transferTimelock timestamp when nomineeOwner can call acceptOwnership
     * @return transferTimelockDuration waiting period after timelock is set
     */
    function _transferTimelock()
        internal
        view
        virtual
        returns (uint128 transferTimelock, uint128 transferTimelockDuration)
    {
        ERC173Storage.Layout storage $ = ERC173Storage.layout(
            ERC173Storage.DEFAULT_STORAGE_SLOT
        );

        transferTimelock = $.transferTimelock;
        transferTimelockDuration = $.transferTimelockDuration;
    }

    /**
     * @notice accept transfer of contract ownership
     */
    function _acceptOwnership() internal virtual onlyNomineeOwner {
        ERC173Storage.Layout storage $ = ERC173Storage.layout(
            ERC173Storage.DEFAULT_STORAGE_SLOT
        );

        if (block.timestamp < $.transferTimelock)
            revert SafeOwnable__TimelockActive();

        _setOwner(_msgSender());

        delete $.nomineeOwner;
        delete $.transferTimelock;
    }

    /**
     * @notice grant permission to given address to claim contract ownership
     */
    function _transferOwnership(
        address account
    ) internal virtual override onlyOwner {
        _setNomineeOwner(account);
        _setTransferTimelock();
    }

    /**
     * @notice set nominee owner
     */
    function _setNomineeOwner(address account) internal virtual {
        ERC173Storage
            .layout(ERC173Storage.DEFAULT_STORAGE_SLOT)
            .nomineeOwner = account;
    }

    /**
     * @notice set the transfer timelock relative to current timestamp
     */
    function _setTransferTimelock() internal virtual {
        (, uint128 transferTimelockDuration) = _transferTimelock();

        unchecked {
            ERC173Storage
                .layout(ERC173Storage.DEFAULT_STORAGE_SLOT)
                .transferTimelock =
                uint128(block.timestamp) +
                transferTimelockDuration;
        }
    }
}
