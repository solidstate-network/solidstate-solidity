import { seedToStorageSlot } from '@solidstate/library';
import { expect } from 'chai';
import hre from 'hardhat';

const STORAGE_LIBRARY = /\b(([I][a-z])|([A-HJ-Z]))\w*Storage$/;

describe('Storage Libraries', () => {
  it('define correct storage slot constant', async () => {
    const { prefix } = hre.config.exposed;

    const fullNames = await hre.artifacts.getAllFullyQualifiedNames();

    const allEntityNames = fullNames.map((name) => name.split(':')[1]);

    const storageLibraryNames = allEntityNames
      .filter((name) => !name.startsWith(prefix))
      .filter((name) => STORAGE_LIBRARY.test(name));

    for (const name of storageLibraryNames) {
      const instance = await hre.ethers.deployContract(`${prefix}${name}`);

      const slot = seedToStorageSlot(
        `solidstate.contracts.storage.${name.replace('Storage', '')}`,
      );

      expect(await instance[`${prefix}STORAGE_SLOT`].staticCall()).to.eq(slot);
    }
  });
});
