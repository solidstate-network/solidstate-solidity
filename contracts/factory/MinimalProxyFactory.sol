// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { Factory } from './Factory.sol';

/**
 * @title Factory for the deployment of EIP1167 minimal proxies
 * @dev derived from https://github.com/optionality/clone-factory (MIT license)
 */
library MinimalProxyFactory {
    bytes private constant MINIMAL_PROXY_INIT_CODE_PREFIX =
        hex'3d602d80600a3d3981f3_363d3d373d3d3d363d73';
    bytes private constant MINIMAL_PROXY_INIT_CODE_SUFFIX =
        hex'5af43d82803e903d91602b57fd5bf3';

    /**
     * @notice deploy an EIP1167 minimal proxy using "CREATE" opcode
     * @param target implementation contract to proxy
     * @return minimalProxy address of deployed proxy
     */
    function deployMinimalProxy(
        address target
    ) internal returns (address minimalProxy) {
        return Factory.deploy(generateMinimalProxyInitCode(target));
    }

    /**
     * @notice deploy an EIP1167 minimal proxy using "CREATE2" opcode
     * @dev reverts if deployment is not successful (likely because salt has already been used)
     * @param target implementation contract to proxy
     * @param salt input for deterministic address calculation
     * @return minimalProxy address of deployed proxy
     */
    function deployMinimalProxy(
        address target,
        bytes32 salt
    ) internal returns (address minimalProxy) {
        return Factory.deploy(generateMinimalProxyInitCode(target), salt);
    }

    /**
     * @notice calculate the deployment address for a given target and salt
     * @param target implementation contract to proxy
     * @param salt input for deterministic address calculation
     * @return deployment address
     */
    function calculateMinimalProxyDeploymentAddress(
        address target,
        bytes32 salt
    ) internal view returns (address) {
        return
            Factory.calculateDeploymentAddress(
                keccak256(generateMinimalProxyInitCode(target)),
                salt
            );
    }

    /**
     * @notice concatenate elements to form EIP1167 minimal proxy initialization code
     * @param target implementation contract to proxy
     * @return bytes memory initialization code
     */
    function generateMinimalProxyInitCode(
        address target
    ) internal pure returns (bytes memory) {
        return
            abi.encodePacked(
                MINIMAL_PROXY_INIT_CODE_PREFIX,
                target,
                MINIMAL_PROXY_INIT_CODE_SUFFIX
            );
    }
}
