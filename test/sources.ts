import { expect } from 'chai';
import { TASK_FLATTEN_GET_FLATTENED_SOURCE } from 'hardhat/builtin-tasks/task-names';
import { parseFullyQualifiedName } from 'hardhat/utils/contract-names';

describe('Sources', () => {
  it('do not contain cyclic dependencies', async () => {
    const allNames = await hre.artifacts.getAllFullyQualifiedNames();

    const files = Array.from(
      allNames.reduce((acc, el) => {
        const { sourceName } = parseFullyQualifiedName(el);
        acc.add(sourceName);
        return acc;
      }, new Set()),
    );

    const failures = [];

    for (const file of files) {
      try {
        await hre.run(TASK_FLATTEN_GET_FLATTENED_SOURCE, { files: [file] });
      } catch (error) {
        // errors other than HH603 are possible
        // (such as `FileNotFoundError: File hardhat/console.sol`)
        // but these are out of scope of this test and are ignored
        if (error.toString().includes('HardhatError: HH603')) {
          failures.push(file);
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
