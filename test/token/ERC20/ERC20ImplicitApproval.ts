import { expect } from 'chai';
import { ethers } from 'hardhat';
import { describeBehaviorOfERC20ImplicitApproval } from '@solidstate/spec/token/ERC20/ERC20ImplicitApproval.behavior';
import {
  ERC20ImplicitApprovalMock,
  ERC20ImplicitApprovalMock__factory,
} from '../../../typechain';

const getImplicitlyApprovedSpender = async function () {
  const [signer] = await ethers.getSigners();
  return signer;
};

const deploy = async function () {
  const [deployer] = await ethers.getSigners();
  return new ERC20ImplicitApprovalMock__factory(deployer).deploy([
    (await getImplicitlyApprovedSpender()).address,
  ]);
};

describe('ERC20ImplicitApproval', function () {
  let instance: ERC20ImplicitApprovalMock;

  beforeEach(async function () {
    instance = await deploy();
  });

  describeBehaviorOfERC20ImplicitApproval(
    {
      deploy: async () => instance,
      supply: ethers.constants.Zero,
      mint: (recipient, amount) =>
        instance['mint(address,uint256)'](recipient, amount),
      burn: (recipient, amount) =>
        instance['burn(address,uint256)'](recipient, amount),
      getImplicitlyApprovedSpender,
    },
    [],
  );

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
            (
              await getImplicitlyApprovedSpender()
            ).address,
          ),
        ).to.be.true;
      });
    });
  });
});
