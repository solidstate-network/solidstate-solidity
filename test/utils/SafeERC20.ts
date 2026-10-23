import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { deployMockContract } from '@solidstate/library';
import { $SafeERC20, $SafeERC20__factory } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('SafeERC20', () => {
  let instance: $SafeERC20;
  let deployer: SignerWithAddress;
  let receiver: SignerWithAddress;
  let spender: SignerWithAddress;

  beforeEach(async () => {
    [deployer, receiver, spender] = await ethers.getSigners();
    instance = await new $SafeERC20__factory(deployer).deploy();
  });

  describe('#safeTransfer', () => {
    it('transfers tokens', async () => {
      const mock = await deployMockContract(deployer, [
        'function transfer(address,uint256) external returns (bool)',
      ]);

      await mock.mock.transfer.withArgs(receiver.address, 1n).returns(true);

      await expect(instance.$safeTransfer(mock.address, receiver.address, 1n))
        .not.to.be.reverted;
    });

    describe('reverts if', () => {
      it('transfer returns false', async () => {
        const mock = await deployMockContract(deployer, [
          'function transfer(address,uint256) external returns (bool)',
        ]);

        await mock.mock.transfer.withArgs(receiver.address, 1n).returns(false);

        await expect(
          instance.$safeTransfer(mock.address, receiver.address, 1n),
        ).to.be.revertedWithCustomError(instance, 'SafeERC20__OperationFailed');
      });

      it('transfer reverts', async () => {
        const mock = await deployMockContract(deployer, [
          'function transfer(address,uint256) external returns (bool)',
        ]);

        await mock.mock.transfer
          .withArgs(receiver.address, 1n)
          .revertsWithReason('TRANSFER_FAILED');

        await expect(
          instance.$safeTransfer(mock.address, receiver.address, 1n),
        ).to.be.revertedWith('TRANSFER_FAILED');
      });
    });
  });

  describe('#safeTransferFrom', () => {
    it('transfers tokens', async () => {
      const mock = await deployMockContract(deployer, [
        'function transferFrom(address,address,uint256) external returns (bool)',
      ]);

      await mock.mock.transferFrom
        .withArgs(deployer.address, receiver.address, 1n)
        .returns(true);

      await expect(
        instance.$safeTransferFrom(
          mock.address,
          deployer.address,
          receiver.address,
          1n,
        ),
      ).not.to.be.reverted;
    });

    describe('reverts if', () => {
      it('transferFrom returns false', async () => {
        const mock = await deployMockContract(deployer, [
          'function transferFrom(address,address,uint256) external returns (bool)',
        ]);

        await mock.mock.transferFrom
          .withArgs(deployer.address, receiver.address, 1n)
          .returns(false);

        await expect(
          instance.$safeTransferFrom(
            mock.address,
            deployer.address,
            receiver.address,
            1n,
          ),
        ).to.be.revertedWithCustomError(instance, 'SafeERC20__OperationFailed');
      });

      it('transferFrom reverts', async () => {
        const mock = await deployMockContract(deployer, [
          'function transferFrom(address,address,uint256) external returns (bool)',
        ]);

        await mock.mock.transferFrom
          .withArgs(deployer.address, receiver.address, 1n)
          .revertsWithReason('TRANSFER_FROM_FAILED');

        await expect(
          instance.$safeTransferFrom(
            mock.address,
            deployer.address,
            receiver.address,
            1n,
          ),
        ).to.be.revertedWith('TRANSFER_FROM_FAILED');
      });
    });
  });

  describe('#safeApprove', () => {
    it('approves spender', async () => {
      const mock = await deployMockContract(deployer, [
        'function approve(address,uint256) external returns (bool)',
      ]);

      await mock.mock.approve.withArgs(spender.address, 1n).returns(true);

      await expect(instance.$safeApprove(mock.address, spender.address, 1n)).not
        .to.be.reverted;
    });

    describe('reverts if', () => {
      it('approve returns false', async () => {
        const mock = await deployMockContract(deployer, [
          'function approve(address,uint256) external returns (bool)',
        ]);

        await mock.mock.approve.withArgs(spender.address, 1n).returns(false);

        await expect(
          instance.$safeApprove(mock.address, spender.address, 1n),
        ).to.be.revertedWithCustomError(instance, 'SafeERC20__OperationFailed');
      });
    });
  });

  describe('#safeIncreaseAllowance', () => {
    it('todo');
  });

  describe('#safeDecreaseAllowance', () => {
    it('todo');
  });

  describe('#safePermit', () => {
    it('executes permit', async () => {
      const mock = await deployMockContract(deployer, [
        'function permit(address,address,uint256,uint256,uint8,bytes32,bytes32) external',
      ]);

      await mock.mock.permit.returns();

      await expect(
        instance.$safePermit(
          mock.address,
          deployer.address,
          spender.address,
          1n,
          ethers.MaxUint256,
          27,
          ethers.ZeroHash,
          ethers.ZeroHash,
        ),
      ).not.to.be.reverted;
    });

    it('tolerates front-run', async () => {
      const mock = await deployMockContract(deployer, [
        'function permit(address,address,uint256,uint256,uint8,bytes32,bytes32) external',
        'function allowance(address,address) external view returns (uint256)',
      ]);

      await mock.mock.permit.reverts();
      await mock.mock.allowance
        .withArgs(deployer.address, spender.address)
        .returns(1n);

      await expect(
        instance.$safePermit(
          mock.address,
          deployer.address,
          spender.address,
          1n,
          ethers.MaxUint256,
          27,
          ethers.ZeroHash,
          ethers.ZeroHash,
        ),
      ).not.to.be.reverted;
    });

    describe('reverts if', () => {
      it('permit fails and allowance is insufficient', async () => {
        const mock = await deployMockContract(deployer, [
          'function permit(address,address,uint256,uint256,uint8,bytes32,bytes32) external',
          'function allowance(address,address) external view returns (uint256)',
        ]);

        await mock.mock.permit.reverts();
        await mock.mock.allowance
          .withArgs(deployer.address, spender.address)
          .returns(0n);

        await expect(
          instance.$safePermit(
            mock.address,
            deployer.address,
            spender.address,
            1n,
            ethers.MaxUint256,
            27,
            ethers.ZeroHash,
            ethers.ZeroHash,
          ),
        ).to.be.revertedWithCustomError(instance, 'SafeERC20__PermitFailed');
      });

      it('permit fails and allowance is excessive', async () => {
        const mock = await deployMockContract(deployer, [
          'function permit(address,address,uint256,uint256,uint8,bytes32,bytes32) external',
          'function allowance(address,address) external view returns (uint256)',
        ]);

        await mock.mock.permit.reverts();
        await mock.mock.allowance
          .withArgs(deployer.address, spender.address)
          .returns(2n);

        await expect(
          instance.$safePermit(
            mock.address,
            deployer.address,
            spender.address,
            1n,
            ethers.MaxUint256,
            27,
            ethers.ZeroHash,
            ethers.ZeroHash,
          ),
        ).to.be.revertedWithCustomError(instance, 'SafeERC20__PermitFailed');
      });
    });
  });
});
