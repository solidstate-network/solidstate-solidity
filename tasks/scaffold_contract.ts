import fs from 'fs';
import { task, types } from 'hardhat/config';
import path from 'path';

task('scaffold-contract', 'Batch replace text in local filenames and contents')
  .addPositionalParam(
    'name',
    'name of the external contract',
    undefined,
    types.string,
  )
  .addPositionalParam(
    'path',
    'directory within sources directrory to create files',
    undefined,
    types.string,
  )
  .addOptionalPositionalParam(
    'pragma',
    'solidity pragma version',
    undefined,
    types.string,
  )
  .setAction(async (args, hre) => {
    const fullpath = path.resolve(hre.config.paths.sources, args.path);

    await fs.promises.mkdir(fullpath, { recursive: true });

    const { name } = args;
    const pragma = args.pragma ?? '^0.8.20';

    const externalContract = `
        pragma solidity ${pragma};

        import { I${name} } from './I${name}.sol';
        import { _${name} } from './_${name}.sol';

        abstract contract ${name} is I${name}, _${name} {}
    `;

    const internalContract = `
        pragma solidity ${pragma};

        import { _I${name} } from './_I${name}.sol';

        abstract contract _${name} is _I${name} {}
    `;

    const externalInterface = `
        pragma solidity ${pragma};

        import { _I${name} } from './_I${name}.sol';

        interface I${name} is _I${name} {}
    `;

    const internalInterface = `
        pragma solidity ${pragma};

        interface _I${name} {}
    `;

    await fs.promises.writeFile(
      path.resolve(fullpath, `${name}.sol`),
      externalContract,
    );
    await fs.promises.writeFile(
      path.resolve(fullpath, `_${name}.sol`),
      internalContract,
    );
    await fs.promises.writeFile(
      path.resolve(fullpath, `I${name}.sol`),
      externalInterface,
    );
    await fs.promises.writeFile(
      path.resolve(fullpath, `_I${name}.sol`),
      internalInterface,
    );
  });
