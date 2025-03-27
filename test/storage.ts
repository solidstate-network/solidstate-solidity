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
        `solidstate.layout.${name.replace('Storage', '')}`,
      );

      if (name === 'ERC1967Storage') {
        // the ERC-1967 storage library is non-standard and does not contain a default storage slot or layout
        // however, its seed should allow a theoretical ERC-7201 layout containing gaps to align its values with the slots specified by ERC-1967

        expect(slot).to.be.lt(
          BigInt(
            await instance[`${prefix}IMPLEMENTATION_STORAGE_SLOT`].staticCall(),
          ),
        );
        expect(slot).to.be.lt(
          BigInt(await instance[`${prefix}ADMIN_STORAGE_SLOT`].staticCall()),
        );
        expect(slot).to.be.lt(
          BigInt(await instance[`${prefix}BEACON_STORAGE_SLOT`].staticCall()),
        );

        continue;
      }

      expect(
        await instance[`${prefix}DEFAULT_STORAGE_SLOT`].staticCall(),
      ).to.eq(slot);
    }
  });
});
