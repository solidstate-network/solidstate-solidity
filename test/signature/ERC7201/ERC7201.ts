import { $ERC7201, $ERC7201__factory } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('ERC7201', () => {
  let instance: $ERC7201;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new $ERC7201__factory(deployer).deploy();
  });

  describe('__internal', () => {
    describe('#calculateStorageSlot(string)', () => {
      it('calculates storage slot using "erc7201" formula', async () => {
        expect(await instance.$calculateStorageSlot('example.main')).to.equal(
          '0x183a6125c38840424c4a85fa12bab2ab606c4b6d0e7cc73c0c06ba5300eab500',
        );
      });
    });
  });
});
