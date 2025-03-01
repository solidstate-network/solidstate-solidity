// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC165 } from '../../../interfaces/IERC165.sol';
import { IERC2981 } from '../../../interfaces/IERC2981.sol';
import { ERC165Base } from '../../../introspection/ERC165/base/ERC165Base.sol';
import { NFTRoyalty } from './NFTRoyalty.sol';
import { NFTRoyaltyStorage } from './NFTRoyaltyStorage.sol';

contract NFTRoyaltyMock is NFTRoyalty, ERC165Base {
    constructor(
        uint16 defaultRoyaltyBPS,
        uint16[] memory royaltiesBPS,
        address defaultRoyaltyReceiver
    ) {
        NFTRoyaltyStorage.Layout storage l = NFTRoyaltyStorage.layout();
        _setDefaultRoyaltyBPS(defaultRoyaltyBPS);
        l.defaultRoyaltyReceiver = defaultRoyaltyReceiver;

        for (uint8 i = 0; i < royaltiesBPS.length; i++) {
            _setRoyaltyBPS(i, royaltiesBPS[i]);
        }

        _setSupportsInterface(type(IERC165).interfaceId, true);
        _setSupportsInterface(type(IERC2981).interfaceId, true);
    }

    function getRoyaltyBPS(
        uint256 tokenId
    ) external view returns (uint16 royaltyBPS) {
        royaltyBPS = _getRoyaltyBPS(tokenId);
    }

    function getRoyaltyReceiver(
        uint256 tokenId
    ) external view returns (address royaltyReceiver) {
        royaltyReceiver = _getRoyaltyReceiver(tokenId);
    }

    function setRoyaltyBPS(uint256 tokenId, uint16 royaltyBPS) external {
        _setRoyaltyBPS(tokenId, royaltyBPS);
    }

    function setDefaultRoyaltyBPS(uint16 defaultRoyaltyBPS) external {
        _setDefaultRoyaltyBPS(defaultRoyaltyBPS);
    }

    function setRoyaltyReceiver(uint256 tokenId, address receiver) external {
        _setRoyaltyReceiver(tokenId, receiver);
    }

    function setDefaultRoyaltyReceiver(address defaultReceiver) external {
        _setDefaultRoyaltyReceiver(defaultReceiver);
    }
}
