// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { EnumerableSet } from '../../../data/EnumerableSet.sol';
import { ERC1155Storage } from '../../../storage/ERC1155Storage.sol';
import { _MultiToken } from '../_MultiToken.sol';
import { _IMultiTokenEnumerable } from './_IMultiTokenEnumerable.sol';

/**
 * @title MultiTokenEnumerable internal functions
 */
abstract contract _MultiTokenEnumerable is _IMultiTokenEnumerable, _MultiToken {
    using EnumerableSet for EnumerableSet.AddressSet;
    using EnumerableSet for EnumerableSet.UintSet;

    /**
     * @notice query total minted supply of given token
     * @param id token id to query
     * @return token supply
     */
    function _totalSupply(uint256 id) internal view virtual returns (uint256) {
        return
            ERC1155Storage
                .layout(ERC1155Storage.DEFAULT_STORAGE_SLOT)
                .totalSupply[id];
    }

    /**
     * @notice query total number of holders for given token
     * @param id token id to query
     * @return quantity of holders
     */
    function _totalHolders(uint256 id) internal view virtual returns (uint256) {
        return
            ERC1155Storage
                .layout(ERC1155Storage.DEFAULT_STORAGE_SLOT)
                .accountsByToken[id]
                .length();
    }

    /**
     * @notice query holders of given token
     * @param id token id to query
     * @return list of holder addresses
     */
    function _accountsByToken(
        uint256 id
    ) internal view virtual returns (address[] memory) {
        EnumerableSet.AddressSet storage accounts = ERC1155Storage
            .layout(ERC1155Storage.DEFAULT_STORAGE_SLOT)
            .accountsByToken[id];

        address[] memory addresses = new address[](accounts.length());

        unchecked {
            for (uint256 i; i < accounts.length(); i++) {
                addresses[i] = accounts.at(i);
            }
        }

        return addresses;
    }

    /**
     * @notice query tokens held by given address
     * @param account address to query
     * @return list of token ids
     */
    function _tokensByAccount(
        address account
    ) internal view virtual returns (uint256[] memory) {
        EnumerableSet.UintSet storage tokens = ERC1155Storage
            .layout(ERC1155Storage.DEFAULT_STORAGE_SLOT)
            .tokensByAccount[account];

        uint256[] memory ids = new uint256[](tokens.length());

        unchecked {
            for (uint256 i; i < tokens.length(); i++) {
                ids[i] = tokens.at(i);
            }
        }

        return ids;
    }

    /**
     * @notice ERC1155 hook: update aggregate values
     * @inheritdoc _MultiToken
     */
    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);

        if (from != to) {
            ERC1155Storage.Layout storage $ = ERC1155Storage.layout(
                ERC1155Storage.DEFAULT_STORAGE_SLOT
            );
            mapping(uint256 => EnumerableSet.AddressSet)
                storage tokenAccounts = $.accountsByToken;
            EnumerableSet.UintSet storage fromTokens = $.tokensByAccount[from];
            EnumerableSet.UintSet storage toTokens = $.tokensByAccount[to];

            for (uint256 i; i < ids.length; ) {
                uint256 amount = amounts[i];

                if (amount > 0) {
                    uint256 id = ids[i];

                    if (from == address(0)) {
                        $.totalSupply[id] += amount;
                    } else if (_balanceOf(from, id) == amount) {
                        tokenAccounts[id].remove(from);
                        fromTokens.remove(id);
                    }

                    if (to == address(0)) {
                        $.totalSupply[id] -= amount;
                    } else if (_balanceOf(to, id) == 0) {
                        tokenAccounts[id].add(to);
                        toTokens.add(id);
                    }
                }

                unchecked {
                    i++;
                }
            }
        }
    }
}
