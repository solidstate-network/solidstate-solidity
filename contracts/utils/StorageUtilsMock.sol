// SPDX-License-Identifier: MIT

import { Ownable } from '../access/ownable/Ownable.sol';
import { StorageUtils } from './StorageUtils.sol';

contract StorageUtilsMock is Ownable {
    constructor() {
        _setOwner(msg.sender);
    }

    function read(uint256 slot) external view returns (bytes32 data) {
        data = StorageUtils.read(slot);
    }

    function write(uint256 slot, bytes32 data) external {
        StorageUtils.write(slot, data);
    }
}
