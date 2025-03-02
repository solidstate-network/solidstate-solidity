import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeFilter } from '@solidstate/library';
import { expect } from 'chai';
import { ContractTransactionResponse } from 'ethers';
import { ethers } from 'hardhat';

export interface ERC1155EnumerableBehaviorArgs {
  transfer: (
    from: SignerWithAddress,
    to: SignerWithAddress,
    id: bigint,
    amount: bigint,
  ) => Promise<ContractTransactionResponse>;
  mint: (
    address: string,
    id: bigint,
    amount: bigint,
  ) => Promise<ContractTransactionResponse>;
  burn: (
    address: string,
    id: bigint,
    amount: bigint,
  ) => Promise<ContractTransactionResponse>;
  tokenId?: bigint;
}

export function describeBehaviorOfERC1155Enumerable(
  deploy: () => Promise<IERC1155Enumerable>,
  args: ERC1155EnumerableBehaviorArgs,
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
        const id = args.tokenId ?? 0n;
        const amount = 2n;

        expect(await instance.totalSupply.staticCall(id)).to.equal(0);

        await args.mint(holder0.address, id, amount);

        expect(await instance.totalSupply.staticCall(id)).to.equal(amount);

        await args.transfer(holder0, holder1, id, amount);

        expect(await instance.totalSupply.staticCall(id)).to.equal(amount);

        await args.burn(holder1.address, id, amount);

        expect(await instance.totalSupply.staticCall(id)).to.equal(0);
      });
    });

    describe('#totalHolders(uint256)', () => {
      it('returns number of holders of given token', async () => {
        const [holder0, holder1] = await ethers.getSigners();
        const id = args.tokenId ?? 0n;
        const amount = 2n;

        expect(await instance.totalHolders.staticCall(id)).to.equal(0);

        await args.mint(holder0.address, id, amount);

        expect(await instance.totalHolders.staticCall(id)).to.equal(1);

        await args.transfer(holder0, holder1, id, amount);

        expect(await instance.totalHolders.staticCall(id)).to.equal(1);

        await args.burn(holder1.address, id, amount);

        expect(await instance.totalHolders.staticCall(id)).to.equal(0);
      });
    });

    describe('#accountsByToken(uint256)', () => {
      it('returns list of addresses holding given token', async () => {
        const [holder0, holder1] = await ethers.getSigners();
        const id = args.tokenId ?? 0n;
        const amount = 2n;

        expect(await instance.accountsByToken.staticCall(id)).to.eql([]);

        await args.mint(holder0.address, id, amount);

        expect(await instance.accountsByToken.staticCall(id)).to.eql([
          holder0.address,
        ]);

        await args.transfer(holder0, holder1, id, amount);

        expect(await instance.accountsByToken.staticCall(id)).to.eql([
          holder1.address,
        ]);

        await args.burn(holder1.address, id, amount);

        expect(await instance.accountsByToken.staticCall(id)).to.eql([]);
      });
    });

    describe('#tokensByAccount(address)', () => {
      it('returns list of tokens held by given address', async () => {
        const [holder0, holder1] = await ethers.getSigners();
        const id = args.tokenId ?? 0n;
        const amount = 2n;

        expect(
          await instance.tokensByAccount.staticCall(holder0.address),
        ).to.eql([]);
        expect(
          await instance.tokensByAccount.staticCall(holder1.address),
        ).to.eql([]);

        await args.mint(holder0.address, id, amount);

        expect(
          await instance.tokensByAccount.staticCall(holder0.address),
        ).to.eql([id]);
        expect(
          await instance.tokensByAccount.staticCall(holder1.address),
        ).to.eql([]);

        await args.transfer(holder0, holder1, id, amount);

        expect(
          await instance.tokensByAccount.staticCall(holder0.address),
        ).to.eql([]);
        expect(
          await instance.tokensByAccount.staticCall(holder1.address),
        ).to.eql([id]);

        await args.burn(holder1.address, id, amount);

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
