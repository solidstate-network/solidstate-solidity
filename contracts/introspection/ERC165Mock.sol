// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { ERC165, ERC165Storage, IERC165 } from './ERC165.sol';

contract ERC165Mock is ERC165 {
    using ERC165Storage for ERC165Storage.Layout;

    constructor() {
        ERC165Storage.layout().setSupportedInterface(
            type(IERC165).interfaceId,
            true
        );
    }
}
