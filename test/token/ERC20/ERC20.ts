import { expect } from 'chai';
import { describeBehaviorOfERC20 } from '@solidstate/spec';
import { ethers } from 'hardhat';
import { ERC20Mock, ERC20Mock__factory } from '../../../typechain';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

const name = 'ERC20Metadata.name';
const symbol = 'ERC20Metadata.symbol';
const decimals = 18;
const supply = ethers.utils.parseEther('1');

describe('ERC20', function () {
  let instance: ERC20Mock;
  let deployer: SignerWithAddress;
  let user: SignerWithAddress;

  beforeEach(async function () {
    [deployer, user] = await ethers.getSigners();
    instance = await new ERC20Mock__factory(deployer).deploy(
      name,
      symbol,
      decimals,
      supply,
    );
  });

  describeBehaviorOfERC20({
    deploy: async () => instance,
    mint: async (recipient, amount) =>
      instance['mint(address,uint256)'](recipient, amount),
    burn: async (recipient, amount) =>
      instance['burn(address,uint256)'](recipient, amount),
    name,
    symbol,
    decimals,
    supply,
  });

  describe('__internal', () => {
    describe('#_burn', () => {
      it('burn tokens', async () => {
        await instance.mint(user.address, 100);
        expect(await instance.balanceOf(user.address)).to.eq(100);
        await instance.burn(user.address, 90);
        expect(await instance.balanceOf(user.address)).to.eq(10);
        await instance.burn(user.address, 10);
        expect(await instance.balanceOf(user.address)).to.eq(0);
      });

      it('reverts if burn amount exceeds balance', async () => {
        await instance.mint(user.address, 100);
        await expect(instance.burn(user.address, 101)).to.be.revertedWith(
          'ERC20: burn amount exceeds balance',
        );
      });
    });
  });
});
