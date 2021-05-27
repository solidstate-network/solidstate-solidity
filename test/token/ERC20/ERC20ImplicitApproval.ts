import { expect } from 'chai';
import { ethers } from 'hardhat';
import { describeBehaviorOfERC20ImplicitApproval } from '@solidstate/spec';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
  ERC20ImplicitApprovalMock,
  ERC20ImplicitApprovalMock__factory,
} from '@solidstate/typechain';

describe('ERC20ImplicitApproval', function () {
  let implicitlyApprovedSender: SignerWithAddress;
  let instance: ERC20ImplicitApprovalMock;

  before(async function () {
    [implicitlyApprovedSender] = await ethers.getSigners();
  });

  beforeEach(async function () {
    const [deployer] = await ethers.getSigners();
    instance = await new ERC20ImplicitApprovalMock__factory(deployer).deploy([
      implicitlyApprovedSender.address,
    ]);
  });

  describeBehaviorOfERC20ImplicitApproval({
    deploy: async () => instance,
    supply: ethers.constants.Zero,
    mint: (recipient, amount) =>
      instance['mint(address,uint256)'](recipient, amount),
    burn: (recipient, amount) =>
      instance['burn(address,uint256)'](recipient, amount),
    getImplicitlyApprovedSpender: async () => implicitlyApprovedSender,
  });

  describe('__internal', function () {
    describe('#_isImplicitlyApproved', function () {
      it('returns implicit approval status of address', async function () {
        expect(
          await instance.callStatic['isImplicitlyApproved(address)'](
            ethers.constants.AddressZero,
          ),
        ).to.be.false;

        expect(
          await instance.callStatic['isImplicitlyApproved(address)'](
            implicitlyApprovedSender.address,
          ),
        ).to.be.true;
      });
    });
  });
});
