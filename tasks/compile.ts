import { TASK_COMPILE } from 'hardhat/builtin-tasks/task-names';
import { task } from 'hardhat/config';

task(TASK_COMPILE).setAction(async (args, hre, runSuper) => {
  await hre.run('organize-test-files');
  await runSuper(args);
});
