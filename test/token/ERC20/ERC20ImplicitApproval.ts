import { expect } from 'chai';
import { ethers } from 'hardhat';
import { describeBehaviorOfERC20ImplicitApproval } from '@solidstate/spec';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
  ERC20ImplicitApprovalMock,
  ERC20ImplicitApprovalMock__factory,
} from '../../../typechain';

describe('ERC20ImplicitApproval', function () {
  let holder: SignerWithAddress;
  let implicitlyApprovedSpender: SignerWithAddress;
  let instance: ERC20ImplicitApprovalMock;

  before(async function () {
    // TODO: avoid need for gap in array by passing separate (non-implicitly-approved) spender to ERC20Base behavior tests
    [holder, ,implicitlyApprovedSpender] = await ethers.getSigners();
  });

  beforeEach(async function () {
    const [deployer] = await ethers.getSigners();
    instance = await new ERC20ImplicitApprovalMock__factory(deployer).deploy([
      implicitlyApprovedSpender.address,
    ]);
  });

  describeBehaviorOfERC20ImplicitApproval({
    deploy: async () => instance as any,
    supply: ethers.constants.Zero,
    mint: (recipient, amount) =>
      instance['mint(address,uint256)'](recipient, amount),
    burn: (recipient, amount) =>
      instance['burn(address,uint256)'](recipient, amount),
    getHolder: async () => holder,
    getImplicitlyApprovedSpender: async () => implicitlyApprovedSpender,
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
            implicitlyApprovedSpender.address,
          ),
        ).to.be.true;
      });
    });
  });
});
