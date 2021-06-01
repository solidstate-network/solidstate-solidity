// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {Ownable} from '../../access/Ownable.sol';
import {OwnableStorage} from '../../access/OwnableStorage.sol';
import {ManagedProxy, ManagedProxyOwnable} from './ManagedProxyOwnable.sol';

 contract ManagedProxyOwnableMock is ManagedProxyOwnable, Ownable {
   using OwnableStorage for OwnableStorage.Layout;

   constructor (
     address manager,
     bytes4 managerSelector
   ) ManagedProxy(managerSelector) {
     setOwner(manager);
   }

   function getImplementation () external view returns (address) {
     return _getImplementation();
   }

   function getManager () external view returns (address) {
     return _getManager();
   }

   function setOwner (
     address owner
   ) public {
     OwnableStorage.layout().setOwner(owner);
   }

   /**
    * @dev suppress compiler warning
    */
   receive () external payable {}
 }
