import { TASK_BUILD, TASK_ORGANIZE_TEST_FILES } from './task_names.ts';
import { overrideTask } from 'hardhat/config';
import fs from 'node:fs';
import path from 'node:path';

export default overrideTask(TASK_BUILD)
  .setInlineAction(async (args, hre, runSuper) => {
    await fs.promises.rm(
      path.resolve(hre.config.paths.root, 'contracts', 'index.sol'),
      { force: true },
    );
    const result = await runSuper(args);
    await hre.tasks.getTask(TASK_ORGANIZE_TEST_FILES).run();
    return result;
  })
  .build();
