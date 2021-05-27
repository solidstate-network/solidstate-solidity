import { expect } from 'chai';
import { ethers } from 'hardhat';
import { describeFilter } from '@solidstate/library/mocha_describe_filter';
import { describeBehaviorOfERC1155Base } from './ERC1155Base.behavior';
import { ERC1155Enumerable } from '@solidstate/typechain';
import { BigNumber, ContractTransaction } from 'ethers';

interface ERC1155EnumerableBehaviorArgs {
  deploy: () => Promise<ERC1155Enumerable>;
  mint: (
    address: string,
    id: BigNumber,
    amount: BigNumber,
  ) => Promise<ContractTransaction>;
  burn: (
    address: string,
    id: BigNumber,
    amount: BigNumber,
  ) => Promise<ContractTransaction>;
}

export function describeBehaviorOfERC1155Enumerable(
  { deploy, mint, burn }: ERC1155EnumerableBehaviorArgs,
  skips: string[],
) {
  const describe = describeFilter(skips);

  describe('::ERC1155Enumerable', function () {
    let instance: ERC1155Enumerable;

    beforeEach(async function () {
      instance = await deploy();
    });

    describeBehaviorOfERC1155Base(
      {
        deploy,
        mint,
        burn,
      },
      skips,
    );

    describe('#totalSupply', function () {
      it('returns supply of given token', async function () {
        const [holder0, holder1] = await ethers.getSigners();
        const id = ethers.constants.Zero;
        const amount = ethers.constants.Two;

        expect(await instance.callStatic['totalSupply(uint256)'](id)).to.equal(
          0,
        );

        await mint(holder0.address, id, amount);

        expect(await instance.callStatic['totalSupply(uint256)'](id)).to.equal(
          amount,
        );

        await instance
          .connect(holder0)
          ['safeTransferFrom(address,address,uint256,uint256,bytes)'](
            holder0.address,
            holder1.address,
            id,
            amount,
            ethers.utils.randomBytes(0),
          );

        expect(await instance.callStatic['totalSupply(uint256)'](id)).to.equal(
          amount,
        );

        await burn(holder1.address, id, amount);

        expect(await instance.callStatic['totalSupply(uint256)'](id)).to.equal(
          0,
        );
      });
    });

    describe('#totalHolders', function () {
      it('returns number of holders of given token', async function () {
        const [holder0, holder1] = await ethers.getSigners();
        const id = ethers.constants.Zero;
        const amount = ethers.constants.Two;

        expect(await instance.callStatic['totalHolders(uint256)'](id)).to.equal(
          0,
        );

        await mint(holder0.address, id, amount);

        expect(await instance.callStatic['totalHolders(uint256)'](id)).to.equal(
          1,
        );

        await instance
          .connect(holder0)
          ['safeTransferFrom(address,address,uint256,uint256,bytes)'](
            holder0.address,
            holder1.address,
            id,
            amount,
            ethers.utils.randomBytes(0),
          );

        expect(await instance.callStatic['totalHolders(uint256)'](id)).to.equal(
          1,
        );

        await burn(holder1.address, id, amount);

        expect(await instance.callStatic['totalHolders(uint256)'](id)).to.equal(
          0,
        );
      });
    });

    describe('#accountsByToken', function () {
      it('returns list of addresses holding given token', async function () {
        const [holder0, holder1] = await ethers.getSigners();
        const id = ethers.constants.Zero;
        const amount = ethers.constants.Two;

        expect(
          await instance.callStatic['accountsByToken(uint256)'](id),
        ).to.eql([]);

        await mint(holder0.address, id, amount);

        expect(
          await instance.callStatic['accountsByToken(uint256)'](id),
        ).to.eql([holder0.address]);

        await instance
          .connect(holder0)
          ['safeTransferFrom(address,address,uint256,uint256,bytes)'](
            holder0.address,
            holder1.address,
            id,
            amount,
            ethers.utils.randomBytes(0),
          );

        expect(
          await instance.callStatic['accountsByToken(uint256)'](id),
        ).to.eql([holder1.address]);

        await burn(holder1.address, id, amount);

        expect(
          await instance.callStatic['accountsByToken(uint256)'](id),
        ).to.eql([]);
      });
    });

    describe('#tokensByAccount', function () {
      it('returns list of tokens held by given address', async function () {
        const [holder0, holder1] = await ethers.getSigners();
        const id = ethers.constants.Zero;
        const amount = ethers.constants.Two;

        expect(
          await instance.callStatic['tokensByAccount(address)'](
            holder0.address,
          ),
        ).to.eql([]);
        expect(
          await instance.callStatic['tokensByAccount(address)'](
            holder1.address,
          ),
        ).to.eql([]);

        await mint(holder0.address, id, amount);

        expect(
          await instance.callStatic['tokensByAccount(address)'](
            holder0.address,
          ),
        ).to.eql([id]);
        expect(
          await instance.callStatic['tokensByAccount(address)'](
            holder1.address,
          ),
        ).to.eql([]);

        await instance
          .connect(holder0)
          ['safeTransferFrom(address,address,uint256,uint256,bytes)'](
            holder0.address,
            holder1.address,
            id,
            amount,
            ethers.utils.randomBytes(0),
          );

        expect(
          await instance.callStatic['tokensByAccount(address)'](
            holder0.address,
          ),
        ).to.eql([]);
        expect(
          await instance.callStatic['tokensByAccount(address)'](
            holder1.address,
          ),
        ).to.eql([id]);

        await burn(holder1.address, id, amount);

        expect(
          await instance.callStatic['tokensByAccount(address)'](
            holder0.address,
          ),
        ).to.eql([]);
        expect(
          await instance.callStatic['tokensByAccount(address)'](
            holder1.address,
          ),
        ).to.eql([]);
      });
    });
  });
}
