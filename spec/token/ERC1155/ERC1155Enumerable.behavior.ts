import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeFilter } from '@solidstate/library';
import { IERC1155Enumerable } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ContractTransaction } from 'ethers';
import { ethers } from 'hardhat';

export interface ERC1155EnumerableBehaviorArgs {
  transfer: (
    from: SignerWithAddress,
    to: SignerWithAddress,
    id: bigint,
    amount: bigint,
  ) => Promise<ContractTransaction>;
  mint: (
    address: string,
    id: bigint,
    amount: bigint,
  ) => Promise<ContractTransaction>;
  burn: (
    address: string,
    id: bigint,
    amount: bigint,
  ) => Promise<ContractTransaction>;
  tokenId?: bigint;
}

export function describeBehaviorOfERC1155Enumerable(
  deploy: () => Promise<IERC1155Enumerable>,
  { transfer, mint, burn, tokenId }: ERC1155EnumerableBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::ERC1155Enumerable', () => {
    let instance: IERC1155Enumerable;

    beforeEach(async () => {
      instance = await deploy();
    });

    describe('#totalSupply(uint256)', () => {
      it('returns supply of given token', async () => {
        const [holder0, holder1] = await ethers.getSigners();
        const id = tokenId ?? 0n;
        const amount = 2n;

        expect(await instance.totalSupply.staticCall(id)).to.equal(0);

        await mint(holder0.address, id, amount);

        expect(await instance.totalSupply.staticCall(id)).to.equal(amount);

        await transfer(holder0, holder1, id, amount);

        expect(await instance.totalSupply.staticCall(id)).to.equal(amount);

        await burn(holder1.address, id, amount);

        expect(await instance.totalSupply.staticCall(id)).to.equal(0);
      });
    });

    describe('#totalHolders(uint256)', () => {
      it('returns number of holders of given token', async () => {
        const [holder0, holder1] = await ethers.getSigners();
        const id = tokenId ?? 0n;
        const amount = 2n;

        expect(await instance.totalHolders.staticCall(id)).to.equal(0);

        await mint(holder0.address, id, amount);

        expect(await instance.totalHolders.staticCall(id)).to.equal(1);

        await transfer(holder0, holder1, id, amount);

        expect(await instance.totalHolders.staticCall(id)).to.equal(1);

        await burn(holder1.address, id, amount);

        expect(await instance.totalHolders.staticCall(id)).to.equal(0);
      });
    });

    describe('#accountsByToken(uint256)', () => {
      it('returns list of addresses holding given token', async () => {
        const [holder0, holder1] = await ethers.getSigners();
        const id = tokenId ?? 0n;
        const amount = 2n;

        expect(await instance.accountsByToken.staticCall(id)).to.eql([]);

        await mint(holder0.address, id, amount);

        expect(await instance.accountsByToken.staticCall(id)).to.eql([
          holder0.address,
        ]);

        await transfer(holder0, holder1, id, amount);

        expect(await instance.accountsByToken.staticCall(id)).to.eql([
          holder1.address,
        ]);

        await burn(holder1.address, id, amount);

        expect(await instance.accountsByToken.staticCall(id)).to.eql([]);
      });
    });

    describe('#tokensByAccount(address)', () => {
      it('returns list of tokens held by given address', async () => {
        const [holder0, holder1] = await ethers.getSigners();
        const id = tokenId ?? 0n;
        const amount = 2n;

        expect(
          await instance.tokensByAccount.staticCall(holder0.address),
        ).to.eql([]);
        expect(
          await instance.tokensByAccount.staticCall(holder1.address),
        ).to.eql([]);

        await mint(holder0.address, id, amount);

        expect(
          await instance.tokensByAccount.staticCall(holder0.address),
        ).to.eql([id]);
        expect(
          await instance.tokensByAccount.staticCall(holder1.address),
        ).to.eql([]);

        await transfer(holder0, holder1, id, amount);

        expect(
          await instance.tokensByAccount.staticCall(holder0.address),
        ).to.eql([]);
        expect(
          await instance.tokensByAccount.staticCall(holder1.address),
        ).to.eql([id]);

        await burn(holder1.address, id, amount);

        expect(
          await instance.tokensByAccount.staticCall(holder0.address),
        ).to.eql([]);
        expect(
          await instance.tokensByAccount.staticCall(holder1.address),
        ).to.eql([]);
      });
    });
  });
}
