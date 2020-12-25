const { expect } = require('chai');
const { deployMockContract } = require('@ethereum-waffle/mock-contract');

const { describeFilter } = require('../../lib/mocha_describe_filter.js');

let signAuthorization = async function (signer, { target, value, data, delegatecall, nonce, address }) {
  let types = ['address', 'uint256', 'bytes', 'bool', 'uint256', 'address'];
  let values = [target, value, data, delegatecall, nonce, address];

  let hash = ethers.utils.solidityKeccak256(
    types, values
  );

  let signature = await signer.signMessage(ethers.utils.arrayify(hash));
  return ethers.utils.arrayify(signature);
};

const describeBehaviorOfECDSAMultisigWallet = function ({ deploy }, skips = []) {
  const describe = describeFilter(skips);

  describe('::ECDSAMultisigWallet', function () {
    let instance;

    beforeEach(async function () {
      instance = await deploy();
    });

    describe('#isInvalidNonce', function () {
      it('returns false for unused nonce', async function () {
        expect(
          await instance.callStatic['isInvalidNonce(address,uint256)'](
            ethers.constants.AddressZero,
            ethers.constants.Zero
          )
        ).to.be.false;
      });

      it('returns true for used nonce', async function () {
        let [signer] = await ethers.getSigners();

        let target = ethers.constants.AddressZero;
        let value = ethers.constants.Zero;
        let data = ethers.utils.randomBytes(32);
        let nonce = ethers.constants.One;

        let signature = await signAuthorization(signer, {
          target,
          value,
          data,
          delegatecall: false,
          nonce,
          address: instance.address,
        });

        await instance['callWithSignatures(address,bytes,uint256[],bytes[])'](
          target,
          data,
          [nonce],
          [signature],
          { value }
        );

        expect(
          await instance.callStatic['isInvalidNonce(address,uint256)'](
            signer.address,
            nonce
          )
        ).to.be.true;
      });

      it('returns true for invalidated nonce', async function () {
        let [signer] = await ethers.getSigners();
        let nonce = ethers.constants.Zero;

        await instance.connect(signer)['invalidateNonce(uint256)'](nonce);

        expect(
          await instance.callStatic['isInvalidNonce(address,uint256)'](
            signer.address,
            nonce
          )
        ).to.be.true;
      });
    });

    describe('#invalidateNonce', function () {
      it('sets nonce as invalid', async function () {
        let [signer] = await ethers.getSigners();
        let nonce = ethers.constants.Zero;

        expect(
          await instance.callStatic['isInvalidNonce(address,uint256)'](
            signer.address,
            nonce
          )
        ).to.be.false;

        await instance.connect(signer)['invalidateNonce(uint256)'](nonce);

        expect(
          await instance.callStatic['isInvalidNonce(address,uint256)'](
            signer.address,
            nonce
          )
        ).to.be.true;
      });
    });

    describe('#callWithSignatures', function () {
      it('calls function on target address');

      it('transfers value to target address', async function () {
        let [signer] = await ethers.getSigners();

        let mock = await deployMockContract(
          signer,
          ['function fn () external payable returns (bool)']
        );

        await mock.mock.fn.returns(true);

        let target = mock.address;
        let value = ethers.constants.One;
        let { data } = await mock.populateTransaction.fn();
        let nonce = ethers.constants.Zero;

        let signature = await signAuthorization(signer, {
          target,
          value,
          data,
          delegatecall: false,
          nonce,
          address: instance.address,
        });

        await expect(
          async function () {
            return instance['callWithSignatures(address,bytes,uint256[],bytes[])'](
              target,
              data,
              [nonce],
              [signature],
              { value }
            );
          }
        ).to.changeEtherBalances(
          [mock, instance],
          [value, 0]
        );
      });

      it('forwards return data from called function', async function () {
        let [signer] = await ethers.getSigners();

        let mock = await deployMockContract(
          signer,
          ['function fn () external payable returns (bool)']
        );

        await mock.mock.fn.returns(true);

        let target = mock.address;
        let value = ethers.constants.Zero;
        let { data } = await mock.populateTransaction.fn();
        let nonce = ethers.constants.Zero;

        let signature = await signAuthorization(signer, {
          target,
          value,
          data,
          delegatecall: false,
          nonce,
          address: instance.address,
        });

        expect(
          ethers.utils.defaultAbiCoder.decode(
            mock.interface.functions['fn()'].outputs,
            await instance.callStatic['callWithSignatures(address,bytes,uint256[],bytes[])'](
              target,
              data,
              [nonce],
              [signature],
              { value }
            )
          )[0]
        ).to.be.true;
      });

      describe('reverts if', function () {
        it('target contract reverts', async function () {
          let [signer] = await ethers.getSigners();

          let mock = await deployMockContract(
            signer,
            ['function fn () external payable returns (bool)']
          );

          await mock.mock.fn.returns(true);

          let reason = 'revert: reason';
          await mock.mock.fn.revertsWithReason(reason);

          let target = mock.address;
          let value = ethers.constants.Zero;
          let { data } = await mock.populateTransaction.fn();
          let nonce = ethers.constants.Zero;

          let signature = await signAuthorization(signer, {
            target,
            value,
            data,
            delegatecall: false,
            nonce,
            address: instance.address,
          });

          await expect(
            instance.callStatic['callWithSignatures(address,bytes,uint256[],bytes[])'](
              target,
              data,
              [nonce],
              [signature],
              { value }
            )
          ).to.be.revertedWith(reason);
        });

        it('signature and nonce array lengths do not match', async function () {
          await expect(
            instance['callWithSignatures(address,bytes,uint256[],bytes[])'](
              ethers.constants.AddressZero,
              ethers.utils.randomBytes(0),
              [ethers.constants.Zero],
              []
            )
          ).to.be.revertedWith(
            'ECDSAMultisigWallet: signature and nonce array lengths do not match'
          );
        });

        it('quorum is not reached', async function () {
          await expect(
            instance['callWithSignatures(address,bytes,uint256[],bytes[])'](
              ethers.constants.AddressZero,
              ethers.utils.randomBytes(0),
              [],
              []
            )
          ).to.be.revertedWith(
            'ECDSAMultisigWallet: quorum not reached'
          );
        });

        it('recovered signer is not authorized', async function () {
          let [, signer] = await ethers.getSigners();

          let target = ethers.constants.AddressZero;
          let value = ethers.constants.Zero;
          let data = ethers.utils.randomBytes(32);
          let nonce = ethers.constants.Zero;

          let signature = await signAuthorization(signer, {
            target,
            value,
            data,
            delegatecall: false,
            nonce,
            address: instance.address,
          });

          await expect(
            instance['callWithSignatures(address,bytes,uint256[],bytes[])'](
              target,
              data,
              [nonce],
              [signature],
              { value }
            )
          ).to.be.revertedWith(
            'ECDSAMultisigWallet: recovered signer is not authorized'
          );
        });

        it('message value is incorrect', async function () {
          let [signer] = await ethers.getSigners();

          let target = ethers.constants.AddressZero;
          let value = ethers.constants.Zero;
          let data = ethers.utils.randomBytes(32);
          let nonce = ethers.constants.Zero;

          let signature = await signAuthorization(signer, {
            target,
            value,
            data,
            delegatecall: false,
            nonce,
            address: instance.address,
          });

          await expect(
            instance['callWithSignatures(address,bytes,uint256[],bytes[])'](
              target,
              data,
              [nonce],
              [signature],
              { value: value.add(ethers.constants.One) }
            )
          ).to.be.revertedWith(
            'ECDSAMultisigWallet: recovered signer is not authorized'
          );
        });

        it('nonce has been used', async function () {
          let [signer] = await ethers.getSigners();

          let target = ethers.constants.AddressZero;
          let value = ethers.constants.Zero;
          let data = ethers.utils.randomBytes(32);
          let nonce = ethers.constants.One;

          let signature = await signAuthorization(signer, {
            target,
            value,
            data,
            delegatecall: false,
            nonce,
            address: instance.address,
          });

          await instance['callWithSignatures(address,bytes,uint256[],bytes[])'](
            target,
            data,
            [nonce],
            [signature],
            { value }
          );

          await expect(
            instance['callWithSignatures(address,bytes,uint256[],bytes[])'](
              target,
              data,
              [nonce],
              [signature],
              { value }
            )
          ).to.be.revertedWith(
            'ECDSAMultisigWallet: invalid nonce'
          );
        });

        it('nonce has been invalidated', async function () {
          let [signer] = await ethers.getSigners();

          let target = ethers.constants.AddressZero;
          let value = ethers.constants.Zero;
          let data = ethers.utils.randomBytes(32);
          let nonce = ethers.constants.One;

          let signature = await signAuthorization(signer, {
            target,
            value,
            data,
            delegatecall: false,
            nonce,
            address: instance.address,
          });

          await instance.connect(signer)['invalidateNonce(uint256)'](nonce);

          await expect(
            instance['callWithSignatures(address,bytes,uint256[],bytes[])'](
              target,
              data,
              [nonce],
              [signature],
              { value }
            )
          ).to.be.revertedWith(
            'ECDSAMultisigWallet: invalid nonce'
          );
        });
      });
    });

    describe('#delegatecallWithSignatures', function () {
      it('delegatecalls function on target address');

      it('does not transfer value to target address', async function () {
        let [signer, receiver] = await ethers.getSigners();

        let target = receiver.address;
        let value = ethers.constants.One;
        let data = ethers.utils.randomBytes(0);
        let nonce = ethers.constants.Zero;

        let signature = await signAuthorization(signer, {
          target,
          value,
          data,
          delegatecall: true,
          nonce,
          address: instance.address,
        });

        await expect(
          async function () {
            return instance['delegatecallWithSignatures(address,bytes,uint256[],bytes[])'](
              target,
              data,
              [nonce],
              [signature],
              { value }
            );
          }
        ).to.changeEtherBalances(
          [receiver, instance],
          [0, value]
        );
      });

      it('forwards return data from called function');

      describe('reverts if', function () {
        it('target contract reverts', async function () {
          let [signer] = await ethers.getSigners();

          let mock = await deployMockContract(
            signer,
            ['function fn () external payable returns (bool)']
          );

          let target = mock.address;
          let value = ethers.constants.Zero;
          let { data } = await mock.populateTransaction.fn();
          let nonce = ethers.constants.Zero;

          let signature = await signAuthorization(signer, {
            target,
            value,
            data,
            delegatecall: true,
            nonce,
            address: instance.address,
          });

          // revert message depends on waffle mock implementation

          await expect(
            instance.callStatic['delegatecallWithSignatures(address,bytes,uint256[],bytes[])'](
              target,
              data,
              [nonce],
              [signature],
              { value }
            )
          ).to.be.revertedWith(
            'revert Mock on the method is not initialized'
          );
        });

        it('signature and nonce array lengths do not match', async function () {
          await expect(
            instance['delegatecallWithSignatures(address,bytes,uint256[],bytes[])'](
              ethers.constants.AddressZero,
              ethers.utils.randomBytes(0),
              [ethers.constants.Zero],
              []
            )
          ).to.be.revertedWith(
            'ECDSAMultisigWallet: signature and nonce array lengths do not match'
          );
        });

        it('quorum is not reached', async function () {
          await expect(
            instance['delegatecallWithSignatures(address,bytes,uint256[],bytes[])'](
              ethers.constants.AddressZero,
              ethers.utils.randomBytes(0),
              [],
              []
            )
          ).to.be.revertedWith(
            'ECDSAMultisigWallet: quorum not reached'
          );
        });

        it('recovered signer is not authorized', async function () {
          let [, signer] = await ethers.getSigners();

          let target = ethers.constants.AddressZero;
          let value = ethers.constants.Zero;
          let data = ethers.utils.randomBytes(32);
          let nonce = ethers.constants.Zero;

          let signature = await signAuthorization(signer, {
            target,
            value,
            data,
            delegatecall: true,
            nonce,
            address: instance.address,
          });

          await expect(
            instance['delegatecallWithSignatures(address,bytes,uint256[],bytes[])'](
              target,
              data,
              [nonce],
              [signature],
              { value }
            )
          ).to.be.revertedWith(
            'ECDSAMultisigWallet: recovered signer is not authorized'
          );
        });

        it('message value is incorrect', async function () {
          let [signer] = await ethers.getSigners();

          let target = ethers.constants.AddressZero;
          let value = ethers.constants.Zero;
          let data = ethers.utils.randomBytes(32);
          let nonce = ethers.constants.Zero;

          let signature = await signAuthorization(signer, {
            target,
            value,
            data,
            delegatecall: true,
            nonce,
            address: instance.address,
          });

          await expect(
            instance['delegatecallWithSignatures(address,bytes,uint256[],bytes[])'](
              target,
              data,
              [nonce],
              [signature],
              { value: value.add(ethers.constants.One) }
            )
          ).to.be.revertedWith(
            'ECDSAMultisigWallet: recovered signer is not authorized'
          );
        });

        it('nonce has been used', async function () {
          let [signer] = await ethers.getSigners();

          let target = ethers.constants.AddressZero;
          let value = ethers.constants.Zero;
          let data = ethers.utils.randomBytes(32);
          let nonce = ethers.constants.One;

          let signature = await signAuthorization(signer, {
            target,
            value,
            data,
            delegatecall: true,
            nonce,
            address: instance.address,
          });

          await instance['delegatecallWithSignatures(address,bytes,uint256[],bytes[])'](
            target,
            data,
            [nonce],
            [signature],
            { value }
          );

          await expect(
            instance['delegatecallWithSignatures(address,bytes,uint256[],bytes[])'](
              target,
              data,
              [nonce],
              [signature],
              { value }
            )
          ).to.be.revertedWith(
            'ECDSAMultisigWallet: invalid nonce'
          );
        });

        it('nonce has been invalidated', async function () {
          let [signer] = await ethers.getSigners();

          let target = ethers.constants.AddressZero;
          let value = ethers.constants.Zero;
          let data = ethers.utils.randomBytes(32);
          let nonce = ethers.constants.One;

          let signature = await signAuthorization(signer, {
            target,
            value,
            data,
            delegatecall: true,
            nonce,
            address: instance.address,
          });

          await instance.connect(signer)['invalidateNonce(uint256)'](nonce);

          await expect(
            instance['delegatecallWithSignatures(address,bytes,uint256[],bytes[])'](
              target,
              data,
              [nonce],
              [signature],
              { value }
            )
          ).to.be.revertedWith(
            'ECDSAMultisigWallet: invalid nonce'
          );
        });
      });
    });
  });
};

// eslint-disable-next-line mocha/no-exports
module.exports = describeBehaviorOfECDSAMultisigWallet;
