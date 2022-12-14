import { OwnableBehaviorArgs } from '../../../access/ownable/Ownable.behavior';
import {
  deployMockContract,
  MockContract,
} from '@ethereum-waffle/mock-contract';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { describeFilter } from '@solidstate/library';
import {
  describeBehaviorOfDiamondBase,
  DiamondBaseBehaviorArgs,
} from '@solidstate/spec';
import { IDiamondFallback } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

export interface DiamondFallbackBehaviorArgs
  extends DiamondBaseBehaviorArgs,
    OwnableBehaviorArgs {
  fallbackAddress: string;
}

export function describeBehaviorOfDiamondFallback(
  deploy: () => Promise<IDiamondFallback>,
  args: DiamondFallbackBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::DiamondFallback', function () {
    let instance: IDiamondFallback;
    let owner: SignerWithAddress;
    let nonOwner: SignerWithAddress;

    beforeEach(async function () {
      instance = await deploy();
      owner = await args.getOwner();
      nonOwner = await args.getNonOwner();
    });

    describeBehaviorOfDiamondBase(async () => instance, args, skips);

    describe('#getFallbackAddress()', function () {
      it('returns the fallback address', async function () {
        expect(await instance.callStatic['getFallbackAddress()']()).to.equal(
          args.fallbackAddress,
        );
      });
    });

    describe('#setFallbackAddress(address)', function () {
      it('updates the fallback address', async function () {
        const fallback = await deployMockContract(owner, []);

        await instance
          .connect(owner)
          ['setFallbackAddress(address)'](fallback.address);

        expect(await instance.callStatic['getFallbackAddress()']()).to.equal(
          fallback.address,
        );

        // call reverts, but with mock-specific message
        await expect(
          owner.sendTransaction({
            to: instance.address,
            data: ethers.utils.randomBytes(4),
          }),
        ).to.be.revertedWith('Mock on the method is not initialized');
      });

      describe('reverts if', function () {
        it('sender is not owner', async function () {
          await expect(
            instance
              .connect(nonOwner)
              ['setFallbackAddress(address)'](ethers.constants.AddressZero),
          ).to.be.revertedWithCustomError(instance, 'Ownable__NotOwner');
        });
      });
    });
  });
}
