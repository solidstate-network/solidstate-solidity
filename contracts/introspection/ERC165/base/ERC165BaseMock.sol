// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { IERC165 } from '../../../interfaces/IERC165.sol';
import { ERC165Base, ERC165BaseStorage, IERC165Base } from './ERC165Base.sol';

contract ERC165BaseMock is ERC165Base {
    using ERC165BaseStorage for ERC165BaseStorage.Layout;

    constructor() {
        _setSupportsInterface(type(IERC165).interfaceId, true);
    }
}
