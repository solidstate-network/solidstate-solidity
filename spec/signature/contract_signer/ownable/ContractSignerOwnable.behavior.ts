import { describeBehaviorOfContractSigner } from './ContractSigner.behavior';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeFilter } from '@solidstate/library';
import { IContractSignerOwnable } from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

export interface ContractSignerOwnableBehaviorArgs {
  getOwner: () => Promise<SignerWithAddress>;
  getNonOwner: () => Promise<SignerWithAddress>;
}

export function describeBehaviorOfContractSignerOwnable(
  deploy: () => Promise<IContractSignerOwnable>,
  args: ContractSignerOwnableBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::ContractSignerOwnable', () => {
    let owner: SignerWithAddress;
    let nonOwner: SignerWithAddress;

    beforeEach(async () => {
      owner = await args.getOwner();
      nonOwner = await args.getNonOwner();
    });

    // TODO: nonstandard usage
    describeBehaviorOfContractSigner(
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
