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
  './abiTypechain/Ownable.json',
);

fs.copyFileSync(
  './artifacts/contracts/access/SafeOwnable.sol/SafeOwnable.json',
  './abiTypechain/SafeOwnable.json',
);

/////////////
// Factory //
/////////////

fs.copyFileSync(
  './artifacts/contracts/factory/CloneFactory.sol/CloneFactory.json',
  './abiTypechain/CloneFactory.json',
);

fs.copyFileSync(
  './artifacts/contracts/factory/Factory.sol/Factory.json',
  './abiTypechain/Factory.json',
);

fs.copyFileSync(
  './artifacts/contracts/factory/MetamorphicFactory.sol/MetamorphicFactory.json',
  './abiTypechain/MetamorphicFactory.json',
);

fs.copyFileSync(
  './artifacts/contracts/factory/MinimalProxyFactory.sol/MinimalProxyFactory.json',
  './abiTypechain/MinimalProxyFactory.json',
);

///////////////////
// Introspection //
///////////////////

fs.copyFileSync(
  './artifacts/contracts/introspection/ERC165.sol/ERC165.json',
  './abiTypechain/ERC165.json',
);

//////////////
// Multisig //
//////////////

fs.copyFileSync(
  './artifacts/contracts/multisig/ECDSAMultisigWallet.sol/ECDSAMultisigWallet.json',
  './abiTypechain/ECDSAMultisigWallet.json',
);

///////////////////
// Proxy //
///////////////////

fs.copyFileSync(
  './artifacts/contracts/proxy/diamond/Diamond.sol/Diamond.json',
  './abiTypechain/Diamond.json',
);

fs.copyFileSync(
  './artifacts/contracts/proxy/diamond/DiamondBase.sol/DiamondBase.json',
  './abiTypechain/DiamondBase.json',
);

fs.copyFileSync(
  './artifacts/contracts/proxy/diamond/DiamondCuttable.sol/DiamondCuttable.json',
  './abiTypechain/DiamondCuttable.json',
);

fs.copyFileSync(
  './artifacts/contracts/proxy/diamond/DiamondLoupe.sol/DiamondLoupe.json',
  './abiTypechain/DiamondLoupe.json',
);

fs.copyFileSync(
  './artifacts/contracts/proxy/managed/ManagedProxy.sol/ManagedProxy.json',
  './abiTypechain/ManagedProxy.json',
);

fs.copyFileSync(
  './artifacts/contracts/proxy/Proxy.sol/Proxy.json',
  './abiTypechain/Proxy.json',
);

///////////////
// Signature //
///////////////

fs.copyFileSync(
  './artifacts/contracts/signature/ERC1271Base.sol/ERC1271Base.json',
  './abiTypechain/ERC1271Base.json',
);

fs.copyFileSync(
  './artifacts/contracts/signature/ERC1271Ownable.sol/ERC1271Ownable.json',
  './abiTypechain/ERC1271Ownable.json',
);

fs.copyFileSync(
  './artifacts/contracts/signature/ERC1271Stored.sol/ERC1271Stored.json',
  './abiTypechain/ERC1271Stored.json',
);

///////////
// Token //
///////////

fs.copyFileSync(
  './artifacts/contracts/token/ERC20/ERC20.sol/ERC20.json',
  './abiTypechain/ERC20.json',
);

fs.copyFileSync(
  './artifacts/contracts/token/ERC20/ERC20Base.sol/ERC20Base.json',
  './abiTypechain/ERC20Base.json',
);

fs.copyFileSync(
  './artifacts/contracts/token/ERC20/ERC20Extended.sol/ERC20Extended.json',
  './abiTypechain/ERC20Extended.json',
);

fs.copyFileSync(
  './artifacts/contracts/token/ERC20/ERC20ImplicitApproval.sol/ERC20ImplicitApproval.json',
  './abiTypechain/ERC20ImplicitApproval.json',
);

fs.copyFileSync(
  './artifacts/contracts/token/ERC20/ERC20Metadata.sol/ERC20Metadata.json',
  './abiTypechain/ERC20Metadata.json',
);

fs.copyFileSync(
  './artifacts/contracts/token/ERC1155/ERC1155.sol/ERC1155.json',
  './abiTypechain/ERC1155.json',
);

fs.copyFileSync(
  './artifacts/contracts/token/ERC1155/ERC1155Base.sol/ERC1155Base.json',
  './abiTypechain/ERC1155Base.json',
);

fs.copyFileSync(
  './artifacts/contracts/token/ERC1155/ERC1155Enumerable.sol/ERC1155Enumerable.json',
  './abiTypechain/ERC1155Enumerable.json',
);

fs.copyFileSync(
  './artifacts/contracts/token/ERC1404/ERC1404.sol/ERC1404.json',
  './abiTypechain/ERC1404.json',
);

fs.copyFileSync(
  './artifacts/contracts/token/ERC1404/ERC1404Base.sol/ERC1404Base.json',
  './abiTypechain/ERC1404Base.json',
);

///////////
// Utils //
///////////

fs.copyFileSync(
  './artifacts/contracts/utils/ReentrancyGuard.sol/ReentrancyGuard.json',
  './abiTypechain/ReentrancyGuard.json',
);

rimraf.sync('./typechain');
