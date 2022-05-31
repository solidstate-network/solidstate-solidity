import { BaseContract } from 'ethers';

export interface ReentrancyGuardBehaviorArgs {
  deploy: () => Promise<BaseContract>;
}

export function describeBehaviorOfReentrancyGuard(
  { deploy }: ReentrancyGuardBehaviorArgs,
  skips?: string[],
) {}
