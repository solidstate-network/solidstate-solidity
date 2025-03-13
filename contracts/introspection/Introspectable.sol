// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC165 } from '../interfaces/IERC165.sol';
import { IIntrospectable } from './IIntrospectable.sol';
import { _Introspectable } from './_Introspectable.sol';
import { ERC165BaseStorage } from './ERC165BaseStorage.sol';

/**
 * @title ERC165 implementation
 */
abstract contract Introspectable is IIntrospectable, _Introspectable {
    /**
     * @inheritdoc IERC165
     */
    function supportsInterface(
        bytes4 interfaceId
    ) external view returns (bool) {
        return _supportsInterface(interfaceId);
    }
}
