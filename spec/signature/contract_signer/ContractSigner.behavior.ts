import { describeFilter } from '@solidstate/library';
import { IContractSigner } from '@solidstate/typechain-types';
import { expect } from 'chai';

export interface ContractSignerBehaviorArgs {
  getValidParams: () => Promise<[Uint8Array, Uint8Array]>;
  getInvalidParams: () => Promise<[Uint8Array, Uint8Array]>;
}

export function describeBehaviorOfContractSigner(
  deploy: () => Promise<IContractSigner>,
  args: ContractSignerBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::ContractSigner', () => {
    let instance: IContractSigner;

    beforeEach(async () => {
      instance = await deploy();
    });

    describe('#isValidSignature(bytes32,bytes)', () => {
      it('returns 0x1626ba7e for valid signature', async () => {
        expect(
          await instance.isValidSignature.staticCall(
            ...(await args.getValidParams()),
          ),
        ).to.equal('0x1626ba7e');
      });

      it('returns 0x00000000 for invalid signature', async () => {
        expect(
          await instance.isValidSignature.staticCall(
            ...(await args.getInvalidParams()),
          ),
        ).to.equal('0x00000000');
      });
    });
  });
}
