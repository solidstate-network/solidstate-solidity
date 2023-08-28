import { hashData, signData } from '@solidstate/library';
import { EIP712Mock, EIP712Mock__factory } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('EIP712', () => {
  let instance: EIP712Mock;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new EIP712Mock__factory(deployer).deploy();
  });

  describe('__internal', () => {
    describe('#calculateDomainSeparator(bytes32,bytes32)', () => {
      it('calculates EIP-712 domain separator', async () => {
        const typeHash = ethers.solidityPackedKeccak256(
          ['string'],
          [
            'EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)',
          ],
        );

        const nameHash = ethers.solidityPackedKeccak256(['string'], ['name']);
        const versionHash = ethers.solidityPackedKeccak256(['string'], ['1']);

        const chainId = await ethers.provider.send('eth_chainId');

        // use keccak256 + defaultAbiCoder rather than solidityPackedKeccak256 because the latter forces packed encoding

        const domainSeparator = ethers.keccak256(
          ethers.AbiCoder.defaultAbiCoder().encode(
            ['bytes32', 'bytes32', 'bytes32', 'uint256', 'address'],
            [
              typeHash,
              nameHash,
              versionHash,
              chainId,
              await instance.getAddress(),
            ],
          ),
        );

        expect(
          await instance.calculateDomainSeparator.staticCall(
            nameHash,
            versionHash,
          ),
        ).to.equal(domainSeparator);
      });
    });
  });
});
