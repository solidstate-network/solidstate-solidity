import { describeBehaviorOfERC1271Base } from '../base/ERC1271Base.behavior';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { describeFilter } from '@solidstate/library';
import { IERC1271Ownable } from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

export interface ERC1271OwnableBehaviorArgs {
  getOwner: () => Promise<SignerWithAddress>;
  getNonOwner: () => Promise<SignerWithAddress>;
}

export function describeBehaviorOfERC1271Ownable(
  deploy: () => Promise<IERC1271Ownable>,
  { getOwner, getNonOwner }: ERC1271OwnableBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::ERC1271Ownable', function () {
    let owner: SignerWithAddress;
    let nonOwner: SignerWithAddress;

    beforeEach(async function () {
      owner = await getOwner();
      nonOwner = await getNonOwner();
    });

    // TODO: nonstandard usage
    describeBehaviorOfERC1271Base(
      deploy,
      {
        getValidParams: async function () {
          const hash = ethers.randomBytes(32);
          const signature = await owner.signMessage(ethers.getBytes(hash));
          return [hash, ethers.getBytes(signature)];
        },
        getInvalidParams: async function () {
          const hash = ethers.randomBytes(32);
          const signature = await nonOwner.signMessage(ethers.getBytes(hash));
          return [hash, ethers.getBytes(signature)];
        },
      },
      skips,
    );
  });
}
