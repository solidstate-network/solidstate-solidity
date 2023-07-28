import { describeFilter } from '@solidstate/library';
import { ERC165Base } from '@solidstate/typechain-types';
import { expect } from 'chai';

export interface ERC165BaseBehaviorArgs {
  interfaceIds: string[];
}

export function describeBehaviorOfERC165Base(
  deploy: () => Promise<ERC165Base>,
  { interfaceIds }: ERC165BaseBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::ERC165Base', () => {
    let instance: ERC165Base;

    beforeEach(async () => {
      instance = await deploy();
    });

    describe('#supportsInterface(bytes4)', () => {
      it('returns true for ERC165 interface', async () => {
        expect(await instance.supportsInterface.staticCall('0x01ffc9a7')).to.be
          .true;
      });

      it('returns false for unknown interface', async () => {
        expect(await instance.supportsInterface.staticCall('0x00000000')).to.be
          .false;
      });

      it('returns false for invalid interface', async () => {
        expect(await instance.supportsInterface.staticCall('0xffffffff')).to.be
          .false;
      });

      for (let interfaceId of interfaceIds) {
        it(`returns true for interface ${interfaceId}`, async () => {
          expect(await instance.supportsInterface.staticCall(interfaceId)).to.be
            .true;
        });
      }
    });
  });
}
