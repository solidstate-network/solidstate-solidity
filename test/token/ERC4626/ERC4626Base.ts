import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
  describeBehaviorOfCloneFactory,
  describeBehaviorOfERC4626Base,
} from '@solidstate/spec';
import {
  SolidStateERC20Mock,
  SolidStateERC20Mock__factory,
  ERC4626BaseMock,
  ERC4626BaseMock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';

describe('ERC4626Base', () => {
  let deployer: SignerWithAddress;
  let depositor: SignerWithAddress;
  let instance: ERC4626BaseMock;
  let assetInstance: SolidStateERC20Mock;

  before(async () => {
    [deployer, depositor] = await ethers.getSigners();
  });

  beforeEach(async () => {
    assetInstance = await new SolidStateERC20Mock__factory(deployer).deploy(
      '',
      '',
      0,
      ethers.constants.Zero,
    );

    instance = await new ERC4626BaseMock__factory(deployer).deploy(
      assetInstance.address,
    );
  });

  describeBehaviorOfERC4626Base(async () => instance, {
    getAsset: async () => assetInstance,
    supply: ethers.constants.Zero,
    mint: (recipient: string, amount: BigNumber) =>
      instance.__mint(recipient, amount),
    burn: (recipient: string, amount: BigNumber) =>
      instance.__burn(recipient, amount),
    mintAsset: (recipient: string, amount: BigNumber) =>
      assetInstance.__mint(recipient, amount),
  });

  describe('__internal', () => {
    describe('#_deposit(uint256,address)', () => {
      it('calls the _afterDeposit hook', async () => {
        const assetAmount = BigNumber.from('10');

        await instance.__mint(deployer.address, assetAmount);
        await assetInstance.__mint(depositor.address, assetAmount);
        await assetInstance
          .connect(depositor)
          .approve(instance.address, assetAmount);

        const shareAmount = await instance.callStatic.previewDeposit(
          assetAmount,
        );

        expect(
          await instance
            .connect(depositor)
            .deposit(assetAmount, depositor.address),
        )
          .to.emit(instance, 'AfterDepositCheck')
          .withArgs(depositor.address, assetAmount, shareAmount);
      });
    });
  });
});
