import { expect } from 'chai';
import { TASK_FLATTEN_GET_FLATTENED_SOURCE } from 'hardhat/builtin-tasks/task-names';
import { parseFullyQualifiedName } from 'hardhat/utils/contract-names';

describe('Sources', () => {
  it('do not contain cyclic dependencies', async () => {
    const allNames = await hre.artifacts.getAllFullyQualifiedNames();

    const files = Array.from(
      allNames.reduce((acc, el) => {
        const { sourceName } = parseFullyQualifiedName(el);
        // TODO: only add if file is in HRE sources directory
        acc.add(sourceName);
        return acc;
      }, new Set()),
    );

    const failures = [];

    for (const file of files) {
      try {
        await hre.run(TASK_FLATTEN_GET_FLATTENED_SOURCE, { files: [file] });
      } catch (error) {
        if (error.toString().includes('HardhatError: HH603')) {
          failures.push(file);
        } else {
          throw error;
        }
      }
    }

    if (failures.length > 0) {
      throw new Error(
        `cyclic dependencies found in files: ${failures.map(
          (el) => `\n${el}`,
        )}`,
      );
    }
  });
});
