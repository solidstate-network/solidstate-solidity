import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { describeFilter } from '@solidstate/library';
import { IERC1155Enumerable } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { BigNumber, ContractTransaction } from 'ethers';
import { ethers } from 'hardhat';

interface ERC1155EnumerableBehaviorArgs {
  deploy: () => Promise<IERC1155Enumerable>;
  transfer: (
    from: SignerWithAddress,
    to: SignerWithAddress,
    id: BigNumber,
    amount: BigNumber,
  ) => Promise<ContractTransaction>;
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
  tokenId?: BigNumber;
}

export function describeBehaviorOfERC1155Enumerable(
  { deploy, transfer, mint, burn, tokenId }: ERC1155EnumerableBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::ERC1155Enumerable', function () {
    let instance: IERC1155Enumerable;

    beforeEach(async function () {
      instance = await deploy();
    });

    describe('#totalSupply(uint256)', function () {
      it('returns supply of given token', async function () {
        const [holder0, holder1] = await ethers.getSigners();
        const id = tokenId ?? ethers.constants.Zero;
        const amount = ethers.constants.Two;

        expect(await instance.callStatic['totalSupply(uint256)'](id)).to.equal(
          0,
        );

        await mint(holder0.address, id, amount);

        expect(await instance.callStatic['totalSupply(uint256)'](id)).to.equal(
          amount,
        );

        await transfer(holder0, holder1, id, amount);

        expect(await instance.callStatic['totalSupply(uint256)'](id)).to.equal(
          amount,
        );

        await burn(holder1.address, id, amount);

        expect(await instance.callStatic['totalSupply(uint256)'](id)).to.equal(
          0,
        );
      });
    });

    describe('#totalHolders(uint256)', function () {
      it('returns number of holders of given token', async function () {
        const [holder0, holder1] = await ethers.getSigners();
        const id = tokenId ?? ethers.constants.Zero;
        const amount = ethers.constants.Two;

        expect(await instance.callStatic['totalHolders(uint256)'](id)).to.equal(
          0,
        );

        await mint(holder0.address, id, amount);

        expect(await instance.callStatic['totalHolders(uint256)'](id)).to.equal(
          1,
        );

        await transfer(holder0, holder1, id, amount);

        expect(await instance.callStatic['totalHolders(uint256)'](id)).to.equal(
          1,
        );

        await burn(holder1.address, id, amount);

        expect(await instance.callStatic['totalHolders(uint256)'](id)).to.equal(
          0,
        );
      });
    });

    describe('#accountsByToken(uint256)', function () {
      it('returns list of addresses holding given token', async function () {
        const [holder0, holder1] = await ethers.getSigners();
        const id = tokenId ?? ethers.constants.Zero;
        const amount = ethers.constants.Two;

        expect(
          await instance.callStatic['accountsByToken(uint256)'](id),
        ).to.eql([]);

        await mint(holder0.address, id, amount);

        expect(
          await instance.callStatic['accountsByToken(uint256)'](id),
        ).to.eql([holder0.address]);

        await transfer(holder0, holder1, id, amount);

        expect(
          await instance.callStatic['accountsByToken(uint256)'](id),
        ).to.eql([holder1.address]);

        await burn(holder1.address, id, amount);

        expect(
          await instance.callStatic['accountsByToken(uint256)'](id),
        ).to.eql([]);
      });
    });

    describe('#tokensByAccount(address)', function () {
      it('returns list of tokens held by given address', async function () {
        const [holder0, holder1] = await ethers.getSigners();
        const id = tokenId ?? ethers.constants.Zero;
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

        await transfer(holder0, holder1, id, amount);

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
