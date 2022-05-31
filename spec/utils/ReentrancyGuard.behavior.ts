import { BaseContract } from 'ethers';

export interface ReentrancyGuardBehaviorArgs {}

export function describeBehaviorOfReentrancyGuard(
  deploy: () => Promise<BaseContract>,
  {}: ReentrancyGuardBehaviorArgs,
  skips?: string[],
) {}
