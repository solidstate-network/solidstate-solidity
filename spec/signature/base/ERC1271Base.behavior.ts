import { describeFilter } from '@solidstate/library';
import { IERC1271Base } from '@solidstate/typechain-types';
import { expect } from 'chai';

export interface ERC1271BaseBehaviorArgs {
  deploy: () => Promise<IERC1271Base>;
  getValidParams: () => Promise<[Uint8Array, Uint8Array]>;
  getInvalidParams: () => Promise<[Uint8Array, Uint8Array]>;
}

export function describeBehaviorOfERC1271Base(
  { deploy, getValidParams, getInvalidParams }: ERC1271BaseBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::ERC1271Base', function () {
    let instance: IERC1271Base;

    beforeEach(async function () {
      instance = await deploy();
    });

    describe('#isValidSignature(bytes32,bytes)', function () {
      it('returns 0x1626ba7e for valid signature', async function () {
        expect(
          await instance.callStatic['isValidSignature(bytes32,bytes)'](
            ...(await getValidParams()),
          ),
        ).to.equal('0x1626ba7e');
      });

      it('returns 0x00000000 for invalid signature', async function () {
        expect(
          await instance.callStatic['isValidSignature(bytes32,bytes)'](
            ...(await getInvalidParams()),
          ),
        ).to.equal('0x00000000');
      });
    });
  });
}
