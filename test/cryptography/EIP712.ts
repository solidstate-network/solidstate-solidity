import { hashData, signData } from '@solidstate/library';
import { EIP712Mock, EIP712Mock__factory } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('EIP712', function () {
  let instance: EIP712Mock;

  beforeEach(async function () {
    const [deployer] = await ethers.getSigners();
    instance = await new EIP712Mock__factory(deployer).deploy();
  });

  describe('__internal', function () {
    describe('#calculateDomainSeparator(bytes32,bytes32)', function () {
      it('calculates EIP-712 domain separator', async function () {
        const typeHash = ethers.utils.solidityKeccak256(
          ['string'],
          [
            'EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)',
          ],
        );

        const nameHash = ethers.utils.solidityKeccak256(['string'], ['name']);
        const versionHash = ethers.utils.solidityKeccak256(['string'], ['1']);

        const chainId = await ethers.provider.send('eth_chainId');

        const domainSeparator = ethers.utils.solidityKeccak256(
          ['bytes32', 'bytes32', 'bytes32', 'uint256', 'address'],
          [
            typeHash,
            nameHash,
            versionHash,
            chainId,
            ethers.utils.hexZeroPad(instance.address, 32),
          ],
        );

        expect(
          await instance.callStatic.calculateDomainSeparator(
            nameHash,
            versionHash,
          ),
        ).to.equal(domainSeparator);
      });
    });
  });
});
