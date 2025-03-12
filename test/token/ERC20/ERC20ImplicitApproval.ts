import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfERC20ImplicitApproval } from '@solidstate/spec';
import {
  $ERC20ImplicitApproval,
  $ERC20ImplicitApproval__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('ERC20ImplicitApproval', () => {
  let holder: SignerWithAddress;
  let implicitlyApprovedSpender: SignerWithAddress;
  let instance: $ERC20ImplicitApproval;

  before(async () => {
    // TODO: avoid need for gap in array by passing separate (non-implicitly-approved) spender to ERC20Base behavior tests
    [holder, , implicitlyApprovedSpender] = await ethers.getSigners();
  });

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new $ERC20ImplicitApproval__factory(deployer).deploy();

    await instance.$_setImplicitlyApproved(
      await implicitlyApprovedSpender.getAddress(),
      true,
    );
  });

  describeBehaviorOfERC20ImplicitApproval(async () => instance, {
    supply: 0n,
    mint: (recipient, amount) => instance.$_mint(recipient, amount),
    burn: (recipient, amount) => instance.$_burn(recipient, amount),
    getHolder: async () => holder,
    getImplicitlyApprovedSpender: async () => implicitlyApprovedSpender,
  });

  describe('__internal', () => {
    describe('#_isImplicitlyApproved(address)', () => {
      it('returns implicit approval status of address', async () => {
        expect(
          await instance.$_isImplicitlyApproved.staticCall(ethers.ZeroAddress),
        ).to.be.false;

        expect(
          await instance.$_isImplicitlyApproved.staticCall(
            implicitlyApprovedSpender.address,
          ),
        ).to.be.true;
      });
    });
  });
});
