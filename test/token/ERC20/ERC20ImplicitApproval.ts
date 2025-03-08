import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfERC20ImplicitApproval } from '@solidstate/spec';
import {
  __hh_exposed_ERC20ImplicitApproval,
  __hh_exposed_ERC20ImplicitApproval__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('ERC20ImplicitApproval', () => {
  let holder: SignerWithAddress;
  let implicitlyApprovedSpender: SignerWithAddress;
  let instance: __hh_exposed_ERC20ImplicitApproval;

  before(async () => {
    // TODO: avoid need for gap in array by passing separate (non-implicitly-approved) spender to ERC20Base behavior tests
    [holder, , implicitlyApprovedSpender] = await ethers.getSigners();
  });

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new __hh_exposed_ERC20ImplicitApproval__factory(
      deployer,
    ).deploy();

    await instance.__hh_exposed__setImplicitlyApproved(
      await implicitlyApprovedSpender.getAddress(),
      true,
    );
  });

  describeBehaviorOfERC20ImplicitApproval(async () => instance, {
    supply: 0n,
    mint: (recipient, amount) => instance.__hh_exposed__mint(recipient, amount),
    burn: (recipient, amount) => instance.__hh_exposed__burn(recipient, amount),
    getHolder: async () => holder,
    getImplicitlyApprovedSpender: async () => implicitlyApprovedSpender,
  });

  describe('__internal', () => {
    describe('#_isImplicitlyApproved(address)', () => {
      it('returns implicit approval status of address', async () => {
        expect(
          await instance.__hh_exposed__isImplicitlyApproved.staticCall(
            ethers.ZeroAddress,
          ),
        ).to.be.false;

        expect(
          await instance.__hh_exposed__isImplicitlyApproved.staticCall(
            implicitlyApprovedSpender.address,
          ),
        ).to.be.true;
      });
    });
  });
});
