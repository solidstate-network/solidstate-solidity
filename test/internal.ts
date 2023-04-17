import { expect } from 'chai';

describe('Internal Contracts', () => {
  it('have 0-length bytecode', async () => {
    const allNames = await hre.artifacts.getAllFullyQualifiedNames();
    const internalNames = allNames.filter((name) => name.includes('Internal'));

    for (const name of internalNames) {
      const { bytecode } = await hre.artifacts.readArtifact(name);
      expect(bytecode).to.equal(
        '0x',
        `Internal contract has non-zero bytecode: ${name}`,
      );
    }
  });
});
