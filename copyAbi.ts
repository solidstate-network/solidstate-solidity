import fs from 'fs';
import rimraf from 'rimraf';

rimraf.sync('./abiTypechain');

if (!fs.existsSync('./abiTypechain')) {
  fs.mkdirSync('./abiTypechain');
}

////////////
// Access //
////////////

fs.copyFileSync(
  './artifacts/contracts/access/Ownable.sol/Ownable.json',
  './abi/Ownable.json',
);

fs.copyFileSync(
  './artifacts/contracts/access/SafeOwnable.sol/SafeOwnable.json',
  './abi/SafeOwnable.json',
);

/////////////
// Factory //
/////////////

fs.copyFileSync(
  './artifacts/contracts/factory/CloneFactory.sol/CloneFactory.json',
  './abi/CloneFactory.json',
);

fs.copyFileSync(
  './artifacts/contracts/factory/Factory.sol/Factory.json',
  './abi/Factory.json',
);

fs.copyFileSync(
  './artifacts/contracts/factory/MetamorphicFactory.sol/MetamorphicFactory.json',
  './abi/MetamorphicFactory.json',
);

fs.copyFileSync(
  './artifacts/contracts/factory/MinimalProxyFactory.sol/MinimalProxyFactory.json',
  './abi/MinimalProxyFactory.json',
);

///////////////////
// Introspection //
///////////////////

fs.copyFileSync(
  './artifacts/contracts/introspection/ERC165.sol/ERC165.json',
  './abi/ERC165.json',
);

//////////////
// Multisig //
//////////////

fs.copyFileSync(
  './artifacts/contracts/multisig/ECDSAMultisigWallet.sol/ECDSAMultisigWallet.json',
  './abi/ECDSAMultisigWallet.json',
);

///////////////////
// Proxy //
///////////////////

fs.copyFileSync(
  './artifacts/contracts/proxy/diamond/Diamond.sol/Diamond.json',
  './abi/Diamond.json',
);

fs.copyFileSync(
  './artifacts/contracts/proxy/diamond/DiamondBase.sol/DiamondBase.json',
  './abi/DiamondBase.json',
);

fs.copyFileSync(
  './artifacts/contracts/proxy/diamond/DiamondCuttable.sol/DiamondCuttable.json',
  './abi/DiamondCuttable.json',
);

fs.copyFileSync(
  './artifacts/contracts/proxy/diamond/DiamondLoupe.sol/DiamondLoupe.json',
  './abi/DiamondLoupe.json',
);

fs.copyFileSync(
  './artifacts/contracts/proxy/managed/ManagedProxy.sol/ManagedProxy.json',
  './abi/ManagedProxy.json',
);

fs.copyFileSync(
  './artifacts/contracts/proxy/Proxy.sol/Proxy.json',
  './abi/Proxy.json',
);

///////////////
// Signature //
///////////////

fs.copyFileSync(
  './artifacts/contracts/signature/ERC1271Base.sol/ERC1271Base.json',
  './abi/ERC1271Base.json',
);

fs.copyFileSync(
  './artifacts/contracts/signature/ERC1271Ownable.sol/ERC1271Ownable.json',
  './abi/ERC1271Ownable.json',
);

fs.copyFileSync(
  './artifacts/contracts/signature/ERC1271Stored.sol/ERC1271Stored.json',
  './abi/ERC1271Stored.json',
);

///////////
// Token //
///////////

fs.copyFileSync(
  './artifacts/contracts/token/ERC20/ERC20.sol/ERC20.json',
  './abi/ERC20.json',
);

fs.copyFileSync(
  './artifacts/contracts/token/ERC20/ERC20Base.sol/ERC20Base.json',
  './abi/ERC20Base.json',
);

fs.copyFileSync(
  './artifacts/contracts/token/ERC20/ERC20Extended.sol/ERC20Extended.json',
  './abi/ERC20Extended.json',
);

fs.copyFileSync(
  './artifacts/contracts/token/ERC20/ERC20ImplicitApproval.sol/ERC20ImplicitApproval.json',
  './abi/ERC20ImplicitApproval.json',
);

fs.copyFileSync(
  './artifacts/contracts/token/ERC20/ERC20Metadata.sol/ERC20Metadata.json',
  './abi/ERC20Metadata.json',
);

///////////
// Utils //
///////////

fs.copyFileSync(
  './artifacts/contracts/utils/ReentrancyGuard.sol/ReentrancyGuard.json',
  './abi/ReentrancyGuard.json',
);

rimraf.sync('./typechain');
