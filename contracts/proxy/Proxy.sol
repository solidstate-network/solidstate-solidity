// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IProxy } from './IProxy.sol';
import { ProxyInternal } from './ProxyInternal.sol';

/**
 * @title Base proxy contract
 */
abstract contract Proxy is IProxy, ProxyInternal {
    fallback() external payable virtual {
        bytes memory returnData = _handleDelegateCall();

        assembly {
            let returnData_size := mload(returnData)
            return(add(32, returnData), returnData_size)
        }
    }
}
