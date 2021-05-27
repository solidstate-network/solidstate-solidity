import { BaseContract } from 'ethers';

interface ReentrancyGuardBehaviorArgs {
  deploy: () => Promise<BaseContract>;
}

export function describeBehaviorOfReentrancyGuard(
  { deploy }: ReentrancyGuardBehaviorArgs,
  skips?: string[],
) {}
