// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { SafeOwnableInternal } from '../../access/ownable/SafeOwnableInternal.sol';
import { OwnableInternal } from '../../access/ownable/OwnableInternal.sol';
import { ERC165BaseInternal } from '../../introspection/ERC165/base/ERC165BaseInternal.sol';
import { DiamondBaseInternal } from './base/DiamondBaseInternal.sol';
import { DiamondFallbackInternal } from './fallback/DiamondFallbackInternal.sol';
import { DiamondReadableInternal } from './readable/DiamondReadableInternal.sol';
import { DiamondWritableInternal } from './writable/DiamondWritableInternal.sol';
import { ISolidStateDiamondInternal } from './ISolidStateDiamondInternal.sol';

abstract contract SolidStateDiamondInternal is
    ISolidStateDiamondInternal,
    DiamondBaseInternal,
    DiamondFallbackInternal,
    DiamondReadableInternal,
    DiamondWritableInternal,
    SafeOwnableInternal,
    ERC165BaseInternal
{
    function _transferOwnership(
        address account
    ) internal virtual override(OwnableInternal, SafeOwnableInternal) {
        super._transferOwnership(account);
    }

    /**
     * @inheritdoc DiamondFallbackInternal
     */
    function _getImplementation()
        internal
        view
        virtual
        override(DiamondBaseInternal, DiamondFallbackInternal)
        returns (address implementation)
    {
        implementation = super._getImplementation();
    }
}
