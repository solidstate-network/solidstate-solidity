import { TASK_SCAFFOLD_CONTRACT } from './task_names.ts';
import { task } from 'hardhat/config';
import fs from 'node:fs';
import path from 'node:path';

export default task(TASK_SCAFFOLD_CONTRACT)
  .setDescription(
    'Generate external and internal contract and interface files for a new entity, following the layers pattern',
  )
  .addPositionalArgument({
    name: 'name',
    description: 'name of the external contract',
  })
  .addPositionalArgument({
    name: 'path',
    description: 'directory within sources directrory to create files',
  })
  .addPositionalArgument({
    name: 'pragma',
    description: 'solidity pragma version',
    defaultValue: '^0.8.35',
  })
  .setInlineAction(async (args, hre) => {
    const fullpath = path.resolve(
      hre.config.paths.root,
      'contracts',
      args.path,
    );

    await fs.promises.mkdir(fullpath, { recursive: true });

    const { name, pragma } = args;

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
  })
  .build();
