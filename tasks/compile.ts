import fs from 'fs';
import { TASK_COMPILE } from 'hardhat/builtin-tasks/task-names';
import { task } from 'hardhat/config';
import path from 'path';

task(TASK_COMPILE).setAction(async (args, hre, runSuper) => {
  await fs.promises.rm(path.resolve(hre.config.paths.sources, 'index.sol'), {
    force: true,
  });
  await runSuper(args);
  await hre.run('organize-test-files');
});
