import { expect } from 'chai';
import hre from 'hardhat';
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

    const versions = new Set();

    for (const file of files) {
      if (file.content.versionPragmas.length === 0) {
        throw new Error(
          `Missing pragma statement for file: ${file.sourceName}`,
        );
      }

      for (const version of file.content.versionPragmas) {
        versions.add(version);
      }
    }

    expect(versions.size).to.equal(
      1,
      `Multiple version pragmas in use: ${Array.from(versions).join(', ')}`,
    );
  });
});
