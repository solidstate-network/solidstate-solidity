// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { Factory } from './Factory.sol';
import { MetamorphicFactoryStorage } from './MetamorphicFactoryStorage.sol';

/**
 * @title Factory for the deployment of metamorphic contracts
 * @dev derived from https://github.com/0age/metamorphic (MIT license)
 */
abstract contract MetamorphicFactory is Factory {
    using MetamorphicFactoryStorage for MetamorphicFactoryStorage.Layout;

    bytes private constant METAMORPHIC_INIT_CODE =
        hex'5860208158601c335a63_9c223603_8752fa158151803b80938091923cf3';
    bytes32 private constant METAMORPHIC_INIT_CODE_HASH =
        keccak256(METAMORPHIC_INIT_CODE);

    /**
     * @notice get metamorphic prototype deployment location for copying
     * @dev function selector must match that referenced by initialization code
     * @return implementation address of metamorphic implementation
     */
    function getMetamorphicImplementation()
        external
        view
        returns (address implementation)
    {
        return MetamorphicFactoryStorage.layout().metamorphicImplementation;
    }

    /**
     * @notice deploy a metamorphic contract
     * @param target reference contract to copy to metamorphic address
     * @param salt input for deterministic address calculation
     * @return metamorphicContract address of deployed metamorphic implementation
     */
    function _deployMetamorphicContract(address target, bytes32 salt)
        internal
        returns (address metamorphicContract)
    {
        MetamorphicFactoryStorage.Layout storage l = MetamorphicFactoryStorage
            .layout();
        l.setMetamorphicImplementation(target);
        metamorphicContract = _deploy(METAMORPHIC_INIT_CODE, salt);
        l.setMetamorphicImplementation(address(0));
    }

    /**
     * @notice calculate the deployment address for a given salt
     * @param salt input for deterministic address calculation
     * @return deployment address
     */
    function _calculateMetamorphicDeploymentAddress(bytes32 salt)
        internal
        view
        returns (address)
    {
        return _calculateDeploymentAddress(METAMORPHIC_INIT_CODE_HASH, salt);
    }
}
