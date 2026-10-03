import hre from 'hardhat';
import type { ResolvedFile } from 'hardhat/types/solidity';

describe('Sources', () => {
  it('contain only one contract per file', async () => {
    const fullNames = await hre.artifacts.getAllFullyQualifiedNames();

    const paths = new Set();

    for (const fullName of fullNames) {
      const [path] = fullName.split(':');

      if (paths.has(path)) {
        throw new Error(`multiple contracts found in file: ${path}`);
      }

      paths.add(path);
    }
  });

  it('do not contain cyclic dependencies', async () => {
    const rootFilePaths = await hre.solidity.getRootFilePaths();
    const result = await hre.solidity.getCompilationJobs(rootFilePaths, {
      force: true,
      quiet: true,
    });

    if (!result.success) {
      throw new Error(result.formattedReason);
    }

    const failures = new Set<string>();

    for (const job of new Set(result.compilationJobsPerFile.values())) {
      const graph = job.dependencyGraph;

      // depth-first search, tracking the current import chain to detect cycles

      // all files that have been checked, tracked persistently to avoid duplicate searches
      const visited = new Set<ResolvedFile>();
      // list of files in the current path, dynamically updated as the graph is traversed
      const importChain: ResolvedFile[] = [];

      const visit = (file: ResolvedFile) => {
        const cycleStart = importChain.indexOf(file);

        if (cycleStart !== -1) {
          for (const el of importChain.slice(cycleStart)) {
            failures.add(el.inputSourceName);
          }
          return;
        }

        if (visited.has(file)) return;
        visited.add(file);

        importChain.push(file);

        for (const { file: dependency } of graph.getDependencies(file)) {
          visit(dependency);
        }

        importChain.pop();
      };

      for (const file of graph.getAllFiles()) {
        visit(file);
      }
    }

    if (failures.size > 0) {
      throw new Error(
        `cyclic dependencies found in files: ${[...failures].map(
          (el) => `\n${el}`,
        )}`,
      );
    }
  });
});
