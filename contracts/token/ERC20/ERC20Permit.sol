// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC20Base.sol";
import "./ERC20PermitStorage.sol";
import "./IERC2612Permit.sol";
import "./ERC20Metadata.sol";
import {ECDSA} from '../../cryptography/ECDSA.sol';

// ERC20-Permit implementation from soliditylabs ( https://github.com/soliditylabs/ERC20-Permit )

/**
 * @dev Extension of {ERC20} that allows token holders to use their tokens
 * without sending any transactions by setting {IERC20-allowance} with a
 * signature using the {permit} method, and then spend them via
 * {IERC20-transferFrom}.
 *
 * The {permit} signature mechanism conforms to the {IERC2612Permit} interface.
 */
abstract contract ERC20Permit is ERC20Base, ERC20Metadata, IERC2612Permit {
  using ECDSA for bytes32;
  /**
   * @dev See {IERC2612Permit-permit}.
   *
   * If https://eips.ethereum.org/EIPS/eip-1344[ChainID] ever changes, the
   * EIP712 Domain Separator is automatically recalculated.
   */
  function permit(
    address owner,
    address spender,
    uint256 amount,
    uint256 deadline,
    uint8 v,
    bytes32 r,
    bytes32 s
  ) public virtual override {
    require(block.timestamp <= deadline, "ERC20Permit: expired deadline");

    // Assembly for more efficiently computing:
    // bytes32 hashStruct = keccak256(
    //   abi.encode(
    //     _PERMIT_TYPEHASH,
    //     owner,
    //     spender,
    //     amount,
    //     _nonces[owner].current(),
    //     deadline
    //   )
    // );

    bytes32 hashStruct;
    uint256 nonce = ERC20PermitStorage.layout().nonces[owner];

    assembly {
    // Load free memory pointer
      let memPtr := mload(64)

    // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)")
      mstore(memPtr, 0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9)
      mstore(add(memPtr, 32), owner)
      mstore(add(memPtr, 64), spender)
      mstore(add(memPtr, 96), amount)
      mstore(add(memPtr, 128), nonce)
      mstore(add(memPtr, 160), deadline)

      hashStruct := keccak256(memPtr, 192)
    }

    bytes32 eip712DomainHash = _domainSeparator();

    // Assembly for more efficient computing:
    // bytes32 hash = keccak256(
    //   abi.encodePacked(uint16(0x1901), eip712DomainHash, hashStruct)
    // );

    bytes32 hash;

    assembly {
    // Load free memory pointer
      let memPtr := mload(64)

      mstore(memPtr, 0x1901000000000000000000000000000000000000000000000000000000000000)  // EIP191 header
      mstore(add(memPtr, 2), eip712DomainHash)                      // EIP712 domain hash
      mstore(add(memPtr, 34), hashStruct)                         // Hash of struct

      hash := keccak256(memPtr, 66)
    }

    address signer = hash.recover(v, r, s);

    require(signer == owner, "ERC20Permit: invalid signature");

    ERC20PermitStorage.layout().nonces[owner]++;
    _approve(owner, spender, amount);
  }

  /**
   * @dev See {IERC2612Permit-nonces}.
   */
  function nonces(address owner) public override view returns (uint256) {
    return ERC20PermitStorage.layout().nonces[owner];
  }

  function _updateDomainSeparator() private returns (bytes32) {
    uint256 chainID = _chainID();

    // no need for assembly, running very rarely
    bytes32 newDomainSeparator = keccak256(
      abi.encode(
        keccak256(
          "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
        ),
        keccak256(bytes(name())), // ERC-20 Name
        keccak256(bytes("1")),  // Version
        chainID,
        address(this)
      )
    );

    ERC20PermitStorage.layout().domainSeparators[chainID] = newDomainSeparator;

    return newDomainSeparator;
  }

  // Returns the domain separator, updating it if chainID changes
  function _domainSeparator() private returns (bytes32) {
    bytes32 domainSeparator = ERC20PermitStorage.layout().domainSeparators[_chainID()];

    if (domainSeparator != 0x00) {
      return domainSeparator;
    }

    return _updateDomainSeparator();
  }

  function _chainID() private view returns (uint256) {
    uint256 chainID;
    assembly {
      chainID := chainid()
    }

    return chainID;
  }
}
