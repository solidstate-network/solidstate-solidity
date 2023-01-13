import { LogDescription } from '@ethersproject/abi';
import { ContractReceipt } from 'ethers';
import { Interface } from 'ethers/lib/utils';

export function getLogs(
  contractInterface: Interface,
  receipt: ContractReceipt,
  only: string[] = [],
) {
  const events: LogDescription[] = [];

  for (const log of receipt.logs) {
    try {
      const description = contractInterface.parseLog(log);

      if (only.length > 0 && !only.includes(description.name)) {
        continue;
      }

      events.push(contractInterface.parseLog(log));
    } catch (e) {
      console.log(e);
      throw Error('could not parse logs');
    }
  }

  return events;
}
