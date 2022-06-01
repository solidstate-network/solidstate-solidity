import { describeFilter } from '@solidstate/library';
import { IERC165 } from '@solidstate/typechain-types';
import { expect } from 'chai';

interface ERC165BehaviorArgs {
  deploy: () => Promise<IERC165>;
  interfaceIds: string[];
}

export function describeBehaviorOfERC165(
  { deploy, interfaceIds }: ERC165BehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::ERC165', function () {
    let instance: IERC165;

    beforeEach(async function () {
      instance = await deploy();
    });

    describe('#supportsInterface(bytes4)', function () {
      it('returns true for ERC165 interface', async function () {
        expect(
          await instance.callStatic['supportsInterface(bytes4)']('0x01ffc9a7'),
        ).to.be.true;
      });

      it('returns false for unknown interface', async function () {
        expect(
          await instance.callStatic['supportsInterface(bytes4)']('0x00000000'),
        ).to.be.false;
      });

      it('returns false for invalid interface', async function () {
        expect(
          await instance.callStatic['supportsInterface(bytes4)']('0xffffffff'),
        ).to.be.false;
      });

      for (let interfaceId of interfaceIds) {
        it(`returns true for interface ${interfaceId}`, async function () {
          expect(
            await instance.callStatic['supportsInterface(bytes4)'](interfaceId),
          ).to.be.true;
        });
      }
    });
  });
}
