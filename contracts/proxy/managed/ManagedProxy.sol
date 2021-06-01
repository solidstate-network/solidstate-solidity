// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {Proxy} from '../Proxy.sol';

/**
 * @title Proxy with externally controlled implementation
 * @dev implementation fetched using immutable function selector
 */
 abstract contract ManagedProxy is Proxy {
   bytes4 internal immutable _managerSelector;

   /**
    * @param managerSelector function selector used to fetch implementation from manager
    */
   constructor (
     bytes4 managerSelector
   ) {
     _managerSelector = managerSelector;
   }

   /**
    * @inheritdoc Proxy
    */
   function _getImplementation () override internal view returns (address) {
     (bool success, bytes memory data) = _getManager().staticcall(abi.encodePacked(_managerSelector));
     require(success, 'ManagedProxy: failed to fetch implementation');
     return abi.decode(data, (address));
   }

   /**
    * @notice get manager of proxy implementation
    * @return manager address
    */
   function _getManager () virtual internal view returns (address);
 }
