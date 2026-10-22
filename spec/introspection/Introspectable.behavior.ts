import { describeFilter } from '@solidstate/library';
import type { Introspectable } from '@solidstate/typechain-types';
import { expect } from 'chai';
import type { NetworkConnection } from 'hardhat/types/network';

export interface IntrospectableBehaviorArgs {
  interfaceIds: string[];
}

export function describeBehaviorOfIntrospectable(
  connection: NetworkConnection,
  deploy: () => Promise<Introspectable>,
  args: IntrospectableBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::Introspectable', () => {
    let instance: Introspectable;

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

      for (let interfaceId of args.interfaceIds) {
        it(`returns true for interface ${interfaceId}`, async () => {
          expect(await instance.supportsInterface.staticCall(interfaceId)).to.be
            .true;
        });
      }
    });
  });
}
