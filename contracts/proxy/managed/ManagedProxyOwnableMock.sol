// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '../../access/Ownable.sol';
import '../../access/OwnableStorage.sol';
import './ManagedProxyOwnable.sol';

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
