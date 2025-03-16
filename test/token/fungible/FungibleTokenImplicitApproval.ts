import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfFungibleTokenImplicitApproval } from '@solidstate/spec';
import {
  $FungibleTokenImplicitApproval,
  $FungibleTokenImplicitApproval__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('FungibleTokenImplicitApproval', () => {
  let holder: SignerWithAddress;
  let implicitlyApprovedSpender: SignerWithAddress;
  let instance: $FungibleTokenImplicitApproval;

  before(async () => {
    // TODO: avoid need for gap in array by passing separate (non-implicitly-approved) spender to FungibleToken behavior tests
    [holder, , implicitlyApprovedSpender] = await ethers.getSigners();
  });

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new $FungibleTokenImplicitApproval__factory(
      deployer,
    ).deploy();

    await instance.$_setImplicitlyApproved(
      await implicitlyApprovedSpender.getAddress(),
      true,
    );
  });

  describeBehaviorOfFungibleTokenImplicitApproval(async () => instance, {
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
