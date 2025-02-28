// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC165 } from '../../../interfaces/IERC165.sol';
import { ERC165Base } from '../../../introspection/ERC165/base/ERC165Base.sol';
import { NFTRoyalty, INFTRoyalty } from './NFTRoyalty.sol';
import { NFTRoyaltyStorage } from './NFTRoyaltyStorage.sol';

contract NFTRoyaltyMock is NFTRoyalty, ERC165Base {
    constructor(
        uint16 defaultRoyaltyBPS,
        uint16[] memory royaltiesBPS,
        address defaultRoyaltyReceiver
    ) {
        NFTRoyaltyStorage.Layout storage l = NFTRoyaltyStorage.layout();
        l.defaultRoyaltyBPS = defaultRoyaltyBPS;
        l.defaultRoyaltyReceiver = defaultRoyaltyReceiver;

        for (uint8 i = 0; i < royaltiesBPS.length; i++) {
            l.royaltiesBPS[i] = royaltiesBPS[i];
        }

        _setSupportsInterface(type(IERC165).interfaceId, true);
        _setSupportsInterface(type(INFTRoyalty).interfaceId, true);
    }

    function setRoyalty(uint16 defaultRoyaltyBPS) external {
        NFTRoyaltyStorage.layout().defaultRoyaltyBPS = defaultRoyaltyBPS;
    }
}
