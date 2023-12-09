import {
  TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS,
  TASK_COMPILE_SOLIDITY_GET_SOURCE_NAMES,
  TASK_COMPILE_SOLIDITY_GET_DEPENDENCY_GRAPH,
} from 'hardhat/builtin-tasks/task-names';

describe('Pragma statements', () => {
  it('are consistent across all files', async () => {
    const sourcePaths = await hre.run(TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS);
    const sourceNames = await hre.run(TASK_COMPILE_SOLIDITY_GET_SOURCE_NAMES, {
      sourcePaths,
    });
    const graph = await hre.run(TASK_COMPILE_SOLIDITY_GET_DEPENDENCY_GRAPH, {
      sourceNames,
    });
    const files = graph.getResolvedFiles();

    const failures = [];

    for (const file of files) {
      const versions = file.content.versionPragmas;
      if (versions.length != 1 || versions[0] != '^0.8.18') {
        failures.push(file.sourceName);
      }
    }

    if (failures.length > 0) {
      throw new Error(
        `inconsistent pragma statement found in files: ${failures.map(
          (el) => `\n${el}`,
        )}`,
      );
    }
  });
});
