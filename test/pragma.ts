import { expect } from 'chai';
import hre from 'hardhat';
import path from 'node:path';

describe('Pragma statements', () => {
  it('are consistent across all files', async () => {
    const sourcesPath = path.resolve(hre.config.paths.root, 'contracts');

    expect(hre.config.paths.sources.solidity).to.include(sourcesPath);

    const rootFilePaths = (await hre.solidity.getRootFilePaths()).filter(
      (rootFilePath) => rootFilePath.startsWith(sourcesPath + path.sep),
    );

    const result = await hre.solidity.getCompilationJobs(rootFilePaths, {
      force: true,
      quiet: true,
    });

    if (!result.success) {
      throw new Error(result.formattedReason);
    }

    const files = new Set(
      [...new Set(result.compilationJobsPerFile.values())].flatMap((job) => [
        ...job.dependencyGraph.getAllFiles(),
      ]),
    );

    const versions = new Set();

    for (const file of files) {
      if (file.content.versionPragmas.length === 0) {
        throw new Error(
          `Missing pragma statement for file: ${file.inputSourceName}`,
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
