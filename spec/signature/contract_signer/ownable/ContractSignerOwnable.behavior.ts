import type { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/types';
import { describeFilter } from '@solidstate/library';
import { describeBehaviorOfContractSigner } from '@solidstate/spec';
import { IContractSignerOwnable } from '@solidstate/typechain-types';
import { ethers } from 'ethers';
import type { NetworkConnection } from 'hardhat/types/network';

export interface ContractSignerOwnableBehaviorArgs {
  getOwner: () => Promise<HardhatEthersSigner>;
  getNonOwner: () => Promise<HardhatEthersSigner>;
}

export function describeBehaviorOfContractSignerOwnable(
  connection: NetworkConnection,
  deploy: () => Promise<IContractSignerOwnable>,
  args: ContractSignerOwnableBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::ContractSignerOwnable', () => {
    let owner: HardhatEthersSigner;
    let nonOwner: HardhatEthersSigner;

    beforeEach(async () => {
      owner = await args.getOwner();
      nonOwner = await args.getNonOwner();
    });

    // TODO: nonstandard usage
    describeBehaviorOfContractSigner(
      connection,
      deploy,
      {
        getValidParams: async () => {
          const hash = ethers.randomBytes(32);
          const signature = await owner.signMessage(ethers.getBytes(hash));
          return [hash, ethers.getBytes(signature)];
        },
        getInvalidParams: async () => {
          const hash = ethers.randomBytes(32);
          const signature = await nonOwner.signMessage(ethers.getBytes(hash));
          return [hash, ethers.getBytes(signature)];
        },
      },
      skips,
    );
  });
}
