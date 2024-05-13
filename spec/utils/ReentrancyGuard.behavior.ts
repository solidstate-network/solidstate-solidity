import { BaseContract } from 'ethers';

export interface ReentrancyGuardBehaviorArgs {}

export function describeBehaviorOfReentrancyGuard(
  deploy: () => Promise<BaseContract>,
  args: ReentrancyGuardBehaviorArgs,
  skips?: string[],
) {}
