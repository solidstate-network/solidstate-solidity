// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { ERC173Storage } from '../../../storage/ERC173Storage.sol';
import { Duration, duration } from '../../../utils/time/Duration.sol';
import { Timelock, timelock } from '../../../utils/time/Timelock.sol';
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
     * @notice query the waiting period after an ownership transfer is initiated before the nomineeOwner can claim ownership
     * @return transferTimelockDuration duration of waiting period
     */
    function _getTransferTimelockDuration()
        internal
        view
        virtual
        returns (duration transferTimelockDuration)
    {
        transferTimelockDuration = ERC173Storage
            .layout(ERC173Storage.DEFAULT_STORAGE_SLOT)
            .transferTimelockDuration;
    }

    /**
     * @notice accept transfer of contract ownership
     */
    function _acceptOwnership() internal virtual onlyNomineeOwner {
        ERC173Storage.Layout storage $ = ERC173Storage.layout(
            ERC173Storage.DEFAULT_STORAGE_SLOT
        );

        $.transferTimelock.requireUnlocked();

        _setOwner(_msgSender());

        delete $.nomineeOwner;
    }

    /**
     * @notice grant permission to given address to claim contract ownership
     */
    function _transferOwnership(
        address account
    ) internal virtual override onlyOwner {
        _setNomineeOwner(account);
        timelock transferTimelock = _setTransferTimelock();
        emit OwnershipTransferInitiated(
            _owner(),
            account,
            transferTimelock.getEndTimestamp()
        );
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
    function _setTransferTimelock()
        internal
        virtual
        returns (timelock transferTimelock)
    {
        transferTimelock = Timelock.create(_getTransferTimelockDuration());

        ERC173Storage
            .layout(ERC173Storage.DEFAULT_STORAGE_SLOT)
            .transferTimelock = transferTimelock;
    }

    /**
     * @notice set the duration used when creating transfer timelocks
     * @param transferTimelockDuration duration of transfer timelock
     */
    function _setTransferTimelockDuration(
        duration transferTimelockDuration
    ) internal virtual {
        ERC173Storage
            .layout(ERC173Storage.DEFAULT_STORAGE_SLOT)
            .transferTimelockDuration = transferTimelockDuration;
    }
}
