// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { ERC2981, IERC2981 } from './ERC2981.sol';
import { ERC2981Storage } from './ERC2981Storage.sol';

import { IERC165, ERC165, ERC165Storage } from '../../../introspection/ERC165.sol';

contract ERC2981Mock is ERC2981, ERC165 {
    using ERC165Storage for ERC165Storage.Layout;

    constructor(
        uint16 defaultRoyaltyBPS,
        uint16[] memory royaltiesBPS,
        address defaultRoyaltyReceiver
    ) {
        {
            ERC2981Storage.Layout storage l = ERC2981Storage.layout();
            l.defaultRoyaltyBPS = defaultRoyaltyBPS;
            l.defaultRoyaltyReceiver = defaultRoyaltyReceiver;

            for (uint8 i = 0; i < royaltiesBPS.length; i++) {
                l.royaltiesBPS[i] = royaltiesBPS[i];
            }
        }

        {
            ERC165Storage.Layout storage l = ERC165Storage.layout();
            l.setSupportedInterface(type(IERC165).interfaceId, true);
            l.setSupportedInterface(type(IERC2981).interfaceId, true);
        }
    }

    function setRoyalty(uint16 defaultRoyaltyBPS) external {
        ERC2981Storage.layout().defaultRoyaltyBPS = defaultRoyaltyBPS;
    }
}
