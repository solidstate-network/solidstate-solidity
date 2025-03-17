// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IProxy } from './IProxy.sol';
import { _Proxy } from './_Proxy.sol';

/**
 * @title Base proxy contract
 */
abstract contract Proxy is IProxy, _Proxy {
    /**
     * @notice delegate all calls to implementation contract
     * @dev reverts if implementation address contains no code, for compatibility with metamorphic contracts
     * @dev memory location in use by assembly may be unsafe in other contexts
     */
    fallback() external payable virtual {
        bytes memory returnData = _handleDelegateCall();

        assembly {
            let returnData_size := mload(returnData)
            return(add(32, returnData), returnData_size)
        }
    }
}
