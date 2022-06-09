// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { ERC20BaseInternal, ERC20BaseStorage } from '../base/ERC20Base.sol';
import { IERC20Extended } from './IERC20Extended.sol';

/**
 * @title ERC20 safe approval extensions
 * @dev mitigations for transaction-ordering vulnerability (see https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729)
 */
abstract contract ERC20Extended is IERC20Extended, ERC20BaseInternal {
    /**
     * @inheritdoc IERC20Extended
     */
    function increaseAllowance(address spender, uint256 amount)
        public
        virtual
        returns (bool)
    {
        unchecked {
            mapping(address => uint256) storage allowances = ERC20BaseStorage
                .layout()
                .allowances[msg.sender];

            uint256 allowance = allowances[spender];
            require(
                allowance + amount >= allowance,
                'ERC20Extended: excessive allowance'
            );

            _approve(
                msg.sender,
                spender,
                allowances[spender] = allowance + amount
            );

            return true;
        }
    }

    /**
     * @inheritdoc IERC20Extended
     */
    function decreaseAllowance(address spender, uint256 amount)
        public
        virtual
        returns (bool)
    {
        unchecked {
            mapping(address => uint256) storage allowances = ERC20BaseStorage
                .layout()
                .allowances[msg.sender];

            uint256 allowance = allowances[spender];
            require(
                amount <= allowance,
                'ERC20Extended: insufficient allowance'
            );

            _approve(
                msg.sender,
                spender,
                allowances[spender] = allowance - amount
            );

            return true;
        }
    }
}
