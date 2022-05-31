import { describeFilter } from '@solidstate/library';
import { IERC20Metadata } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { BigNumberish } from 'ethers';

export interface ERC20MetadataBehaviorArgs {
  deploy: () => Promise<IERC20Metadata>;
  name: string;
  symbol: string;
  decimals: BigNumberish;
}

export function describeBehaviorOfERC20Metadata(
  { deploy, name, symbol, decimals }: ERC20MetadataBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::ERC20Metadata', function () {
    let instance: IERC20Metadata;

    beforeEach(async function () {
      instance = await deploy();
    });

    describe('#name()', function () {
      it('returns token name', async function () {
        expect(await instance.callStatic['name()']()).to.equal(name);
      });
    });

    describe('#symbol()', function () {
      it('returns token symbol', async function () {
        expect(await instance.callStatic['symbol()']()).to.equal(symbol);
      });
    });

    describe('#decimals()', function () {
      it('returns token decimals', async function () {
        expect(await instance.callStatic['decimals()']()).to.equal(decimals);
      });
    });
  });
}
