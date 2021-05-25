import fs from 'fs';
import rimraf from 'rimraf';

rimraf.sync('./abiTypechain');

if (!fs.existsSync('./abiTypechain')) {
  fs.mkdirSync('./abiTypechain');
}

fs.copyFileSync(
  './artifacts/contracts/access/Ownable.sol/Ownable.json',
  './abi/Ownable.json',
);

fs.copyFileSync(
  './artifacts/contracts/access/SafeOwnable.sol/SafeOwnable.json',
  './abi/SafeOwnable.json',
);

rimraf.sync('./typechain');
