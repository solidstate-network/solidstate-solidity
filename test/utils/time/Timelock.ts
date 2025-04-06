import { PANIC_CODES } from '@nomicfoundation/hardhat-chai-matchers/panic';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { time } from '@nomicfoundation/hardhat-network-helpers';
import { $Timelock, $Timelock__factory } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

const createTimelock = (startTimestamp: bigint, endTimestamp: bigint) => {
  return ethers.concat([
    ethers.zeroPadValue(ethers.toBeHex(endTimestamp), 6),
    ethers.zeroPadValue(ethers.toBeHex(startTimestamp), 6),
  ]);
};

describe('Timelock', async () => {
  let deployer: SignerWithAddress;
  let instance: $Timelock;

  beforeEach(async () => {
    [deployer] = await ethers.getSigners();
    instance = await new $Timelock__factory(deployer).deploy();
  });

  describe('#getStartTimestamp(timelock)', () => {
    it('returns start timestamp', async () => {
      const startTimestamp = 3n;
      const endTimestamp = 7n;

      const timelock = createTimelock(startTimestamp, endTimestamp);

      expect(await instance.$getStartTimestamp.staticCall(timelock)).to.eq(
        startTimestamp,
      );
    });
  });

  describe('#getEndTimestamp(timelock)', () => {
    it('returns end timestamp', async () => {
      const startTimestamp = 3n;
      const endTimestamp = 7n;

      const timelock = createTimelock(startTimestamp, endTimestamp);

      expect(await instance.$getEndTimestamp.staticCall(timelock)).to.eq(
        endTimestamp,
      );
    });
  });

  describe('#isLocked(timelock)', () => {
    it('returns lock status of timelock', async () => {
      const timestamp = BigInt(await time.latest());

      expect(
        await instance.$isLocked.staticCall(
          createTimelock(timestamp, timestamp + 1n),
        ),
      ).to.be.true;

      expect(
        await instance.$isLocked.staticCall(
          createTimelock(timestamp, timestamp),
        ),
      ).to.be.false;

      expect(
        await instance.$isLocked.staticCall(
          createTimelock(timestamp - 1n, timestamp),
        ),
      ).to.be.false;

      expect(
        await instance.$isLocked.staticCall(
          createTimelock(timestamp + 1n, timestamp + 2n),
        ),
      ).to.be.false;
    });
  });

  describe('#requireLocked(timelock)', () => {
    it('does not revert if timelock is locked', async () => {
      const timestamp = BigInt(await time.latest());

      const timelock = createTimelock(timestamp, timestamp + 1n);

      await expect(instance.$requireLocked.staticCall(timelock)).not.to.be
        .reverted;
    });

    describe('reverts if', () => {
      it('timelock is unlocked', async () => {
        const timestamp = BigInt(await time.latest());

        const timelock = createTimelock(timestamp + 1n, timestamp + 2n);

        await expect(
          instance.$requireLocked.staticCall(timelock),
        ).to.be.revertedWithCustomError(instance, 'Timelock__Unlocked');
      });
    });
  });

  describe('#requireUnlocked(timelock)', () => {
    it('does not revert if timelock is not locked', async () => {
      const timestamp = BigInt(await time.latest());

      const timelock = createTimelock(timestamp + 1n, timestamp + 2n);

      await expect(instance.$requireUnlocked.staticCall(timelock)).not.to.be
        .reverted;
    });

    describe('reverts if', () => {
      it('timelock is locked', async () => {
        const timestamp = BigInt(await time.latest());

        const timelock = createTimelock(timestamp, timestamp + 1n);

        await expect(
          instance.$requireUnlocked.staticCall(timelock),
        ).to.be.revertedWithCustomError(instance, 'Timelock__Locked');
      });
    });
  });

  describe('#create(duration)', () => {
    it('returns timelock of given duration starting at current time', async () => {
      const timestamp = BigInt(await time.latest());
      const lockDuration = 3n;

      const startTimestamp = timestamp;
      const endTimestamp = startTimestamp + lockDuration;

      expect(await instance['$create'].staticCall(lockDuration)).to.eq(
        createTimelock(startTimestamp, endTimestamp),
      );
    });
  });

  describe('#create(duration,duration)', () => {
    it('returns timelock with start delay and of given duration', async () => {
      const timestamp = BigInt(await time.latest());
      const startDelay = 3n;
      const lockDuration = 7n;

      const startTimestamp = timestamp + startDelay;
      const endTimestamp = startTimestamp + lockDuration;

      expect(
        await instance['$create_duration_duration'].staticCall(
          startDelay,
          lockDuration,
        ),
      ).to.eq(createTimelock(startTimestamp, endTimestamp));
    });
  });

  describe('#create(duration,timestamp)', () => {
    it('returns timelock starting at given timestanp and of given duration', async () => {
      const lockDuration = 7n;

      const startTimestamp = 1n;
      const endTimestamp = startTimestamp + lockDuration;

      expect(
        await instance['$create_timestamp_duration'].staticCall(
          startTimestamp,
          lockDuration,
        ),
      ).to.eq(createTimelock(startTimestamp, endTimestamp));
    });
  });

  describe('#create(timestamp,timestamp)', () => {
    it('returns timelock with given start and end timestamps', async () => {
      const startTimestamp = 3n;
      const endTimestamp = 7n;

      expect(
        await instance['$create_timestamp_timestamp'].staticCall(
          startTimestamp,
          endTimestamp,
        ),
      ).to.eq(createTimelock(startTimestamp, endTimestamp));
    });

    describe('reverts if', () => {
      it('start timestamp is greater than end timestamp', async () => {
        const startTimestamp = 1n;
        const endTimestamp = 0n;

        await expect(
          instance['$create_timestamp_timestamp'].staticCall(
            startTimestamp,
            endTimestamp,
          ),
        ).to.be.revertedWithPanic(PANIC_CODES.ASSERTION_ERROR);
      });
    });
  });
});
