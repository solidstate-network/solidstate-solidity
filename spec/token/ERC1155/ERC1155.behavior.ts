import { describeFilter } from '@solidstate/library';
import { ERC1155 } from '../../typechain';
import { describeBehaviorOfERC1155Base } from './ERC1155Base.behavior';
import { BigNumber, ContractTransaction } from 'ethers';

interface ERC1155BehaviorArgs {
  deploy: () => Promise<ERC1155>;
  mint: (
    address: string,
    id: BigNumber,
    amount: BigNumber,
  ) => Promise<ContractTransaction>;
  burn: (
    address: string,
    id: BigNumber,
    amount: BigNumber,
  ) => Promise<ContractTransaction>;
}

export function describeBehaviorOfERC1155(
  { deploy, mint, burn }: ERC1155BehaviorArgs,
  skips: string[],
) {
  const describe = describeFilter(skips);

  describe('::ERC1155', function () {
    describeBehaviorOfERC1155Base({ deploy, mint, burn }, skips);
  });
}
