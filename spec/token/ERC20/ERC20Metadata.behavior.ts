import { expect } from 'chai';
import { describeFilter } from '@solidstate/library';
import { ERC20Metadata } from '@solidstate/typechain';
import { BigNumberish } from 'ethers';

interface ERC20MetadataBehaviorArgs {
  deploy: () => Promise<ERC20Metadata>;
  name: string;
  symbol: string;
  decimals: BigNumberish;
}

export function describeBehaviorOfERC20Metadata(
  { deploy, name, symbol, decimals }: ERC20MetadataBehaviorArgs,
  skips: string[],
) {
  const describe = describeFilter(skips);

  describe('::ERC20Metadata', function () {
    let instance: ERC20Metadata;

    beforeEach(async function () {
      instance = await deploy();
    });

    describe('#name', function () {
      it('returns token name', async function () {
        expect(await instance.callStatic['name()']()).to.equal(name);
      });
    });

    describe('#symbol', function () {
      it('returns token symbol', async function () {
        expect(await instance.callStatic['symbol()']()).to.equal(symbol);
      });
    });

    describe('#decimals', function () {
      it('returns token decimals', async function () {
        expect(await instance.callStatic['decimals()']()).to.equal(decimals);
      });
    });
  });
}
