const { expect } = require('chai');

const describeBehaviorOfERC20Base = require('./ERC20Base.behavior.js');

let deploy = async function () {
  let factory = await ethers.getContractFactory('ERC20BaseMock');
  let instance = await factory.deploy();
  return await instance.deployed();
};

describe('ERC20Base', function () {
  let sender, receiver, holder, spender;
  let instance;

  beforeEach(async function () {
    [sender, receiver, holder, spender] = await ethers.getSigners();
    instance = await deploy();
  });

  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfERC20Base({ deploy: () => instance, supply: 0 });

  describe('__internal', function () {
    describe('#_mint', function () {
      it('increases balance of given account by given amount', async function () {
        let amount = ethers.constants.Two;

        await expect(
          () => instance['mint(address,uint256)'](receiver.address, amount)
        ).to.changeTokenBalance(
          instance, receiver, amount
        );
      });

      it('increases total supply by given amount', async function () {
        let amount = ethers.constants.Two;

        let initialSupply = await instance.callStatic.totalSupply();
        await instance['mint(address,uint256)'](receiver.address, amount);
        let finalSupply = await instance.callStatic.totalSupply();

        expect(finalSupply.sub(initialSupply)).to.equal(amount);
      });

      it('emits Transfer event', async function () {
        let amount = ethers.constants.Two;

        await expect(
          instance['mint(address,uint256)'](receiver.address, amount)
        ).to.emit(
          instance, 'Transfer'
        ).withArgs(
          ethers.constants.AddressZero, receiver.address, amount
        );
      });
    });

    describe('#_burn', function () {
      it('decreases balance of given account by given amount', async function () {
        let amount = ethers.constants.Two;
        await instance['mint(address,uint256)'](receiver.address, amount);

        await expect(
          () => instance['burn(address,uint256)'](receiver.address, amount)
        ).to.changeTokenBalance(
          instance, receiver, amount.mul(ethers.constants.NegativeOne)
        );
      });

      it('decreases total supply by given amount', async function () {
        let amount = ethers.constants.Two;
        await instance['mint(address,uint256)'](receiver.address, amount);

        let initialSupply = await instance.callStatic.totalSupply();
        await instance['burn(address,uint256)'](receiver.address, amount);
        let finalSupply = await instance.callStatic.totalSupply();

        expect(initialSupply.sub(finalSupply)).to.equal(amount);
      });

      it('emits Transfer event', async function () {
        let amount = ethers.constants.Two;
        await instance['mint(address,uint256)'](receiver.address, amount);

        await expect(
          instance['burn(address,uint256)'](receiver.address, amount)
        ).to.emit(
          instance, 'Transfer'
        ).withArgs(
          receiver.address, ethers.constants.AddressZero, amount
        );
      });
    });

    describe('#_transfer', function () {
      it('decreases balance of sender and increases balance of recipient by given amount', async function () {
        let amount = ethers.constants.Two;
        await instance['mint(address,uint256)'](sender.address, amount);

        await expect(
          () => instance['transfer(address,address,uint256)'](sender.address, receiver.address, amount)
        ).to.changeTokenBalances(
          instance, [sender, receiver], [amount.mul(ethers.constants.NegativeOne), amount]
        );
      });

      it('does not modify total supply', async function () {
        let amount = ethers.constants.Two;
        await instance['mint(address,uint256)'](sender.address, amount);

        let initialSupply = await instance.callStatic.totalSupply();
        await instance['transfer(address,address,uint256)'](sender.address, receiver.address, amount);
        let finalSupply = await instance.callStatic.totalSupply();

        expect(finalSupply).to.equal(initialSupply);
      });

      it('emits Transfer event', async function () {
        let amount = ethers.constants.Two;
        await instance['mint(address,uint256)'](sender.address, amount);

        await expect(
          instance['transfer(address,address,uint256)'](sender.address, receiver.address, amount)
        ).to.emit(
          instance, 'Transfer'
        ).withArgs(
          sender.address, receiver.address, amount
        );
      });
    });

    describe('#_approve', function () {
      it('sets approval of spender with respect to holder to given amount', async function () {
        let amount = ethers.constants.Two;

        await instance.connect(holder)['approve(address,address,uint256)'](holder.address, spender.address, amount);
        await expect(await instance.callStatic['allowance(address,address)'](holder.address, spender.address)).to.equal(amount);

        // approvals are not cumulative
        await instance.connect(holder)['approve(address,address,uint256)'](holder.address, spender.address, amount);
        await expect(await instance.callStatic['allowance(address,address)'](holder.address, spender.address)).to.equal(amount);
      });

      it('emits Approval event', async function () {
        let amount = ethers.constants.Two;

        await expect(
          instance['approve(address,address,uint256)'](holder.address, spender.address, amount)
        ).to.emit(
          instance, 'Approval'
        ).withArgs(
          holder.address, spender.address, amount
        );
      });
    });

    describe('#_beforeTokenTransfer', function () {
      it('is tested');
    });
  });
});
