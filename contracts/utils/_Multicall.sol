// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IMulticall } from './_IMulticall.sol';

abstract contract _Multicall is _IMulticall {
    function _multicall(
        bytes[] calldata data
    ) internal virtual returns (bytes[] memory results) {
        results = new bytes[](data.length);

        unchecked {
            for (uint256 i; i < data.length; i++) {
                (bool success, bytes memory returndata) = address(this)
                    .delegatecall(data[i]);

                if (success) {
                    results[i] = returndata;
                } else {
                    assembly {
                        returndatacopy(0, 0, returndatasize())
                        revert(0, returndatasize())
                    }
                }
            }
        }

        return results;
    }
}
