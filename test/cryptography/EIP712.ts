import { $EIP712, $EIP712__factory } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('EIP712', () => {
  let instance: $EIP712;
  const nameHash = ethers.solidityPackedKeccak256(['string'], ['NAME']);
  const versionHash = ethers.solidityPackedKeccak256(['string'], ['VERSION']);
  let verifyingContract: string;
  let chainId: string;
  let salt = ethers.solidityPackedKeccak256(['string'], ['SALT']);

  before(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new $EIP712__factory(deployer).deploy();
    verifyingContract = await instance.getAddress();
    chainId = await ethers.provider.send('eth_chainId');
  });

  describe('#EIP_712_DOMAIN_HASH_00000()', () => {
    it('resolves to expected value', async () => {
      expect(await instance.$EIP_712_DOMAIN_HASH_00000.staticCall()).to.equal(
        '0x20bcc3f8105eea47d067386e42e60246e89393cd61c512edd1e87688890fb914',
      );
    });
  });

  describe('#EIP_712_DOMAIN_HASH_00001()', () => {
    it('resolves to expected value', async () => {
      expect(await instance.$EIP_712_DOMAIN_HASH_00001.staticCall()).to.equal(
        '0xb2178a58fb1eefb359ecfdd57bb19c0bdd0f4e6eed8547f46600e500ed111af3',
      );
    });
  });

  describe('#EIP_712_DOMAIN_HASH_00010()', () => {
    it('resolves to expected value', async () => {
      expect(await instance.$EIP_712_DOMAIN_HASH_00010.staticCall()).to.equal(
        '0xbc027d3dfda1ddd4b660dee53f985a2f3b5ea30d0c0708b67f569aa0e361f302',
      );
    });
  });

  describe('#EIP_712_DOMAIN_HASH_00011()', () => {
    it('resolves to expected value', async () => {
      expect(await instance.$EIP_712_DOMAIN_HASH_00011.staticCall()).to.equal(
        '0xb03948446334eb9b2196d5eb166f69b9d49403eb4a12f36de8d3f9f3cb8e15c3',
      );
    });
  });

  describe('#EIP_712_DOMAIN_HASH_00100()', () => {
    it('resolves to expected value', async () => {
      expect(await instance.$EIP_712_DOMAIN_HASH_00100.staticCall()).to.equal(
        '0xc49a8e302e3e5d6753b2bb3dbc3c28deba5e16e2572a92aef568063c963e3465',
      );
    });
  });

  describe('#EIP_712_DOMAIN_HASH_00101()', () => {
    it('resolves to expected value', async () => {
      expect(await instance.$EIP_712_DOMAIN_HASH_00101.staticCall()).to.equal(
        '0xcc85e4a69ca54da41cc4383bb845cbd1e15ef8a13557a6bed09b8bea2a0d92ff',
      );
    });
  });

  describe('#EIP_712_DOMAIN_HASH_00110()', () => {
    it('resolves to expected value', async () => {
      expect(await instance.$EIP_712_DOMAIN_HASH_00110.staticCall()).to.equal(
        '0x95166bc3984a70c39067c848833f87eaf6f7ff10e67fbe819f683dfcefb080e2',
      );
    });
  });

  describe('#EIP_712_DOMAIN_HASH_00111()', () => {
    it('resolves to expected value', async () => {
      expect(await instance.$EIP_712_DOMAIN_HASH_00111.staticCall()).to.equal(
        '0xc2f8787176b8ac6bf7215b4adcc1e069bf4ab82d9ab1df05a57a91d425935b6e',
      );
    });
  });

  describe('#EIP_712_DOMAIN_HASH_01000()', () => {
    it('resolves to expected value', async () => {
      expect(await instance.$EIP_712_DOMAIN_HASH_01000.staticCall()).to.equal(
        '0x035aff83d86937d35b32e04f0ddc6ff469290eef2f1b692d8a815c89404d4749',
      );
    });
  });

  describe('#EIP_712_DOMAIN_HASH_01001()', () => {
    it('resolves to expected value', async () => {
      expect(await instance.$EIP_712_DOMAIN_HASH_01001.staticCall()).to.equal(
        '0xee552a4f357a6d8ecee15fed74927d873616e6da31fd672327acf0916acc174a',
      );
    });
  });

  describe('#EIP_712_DOMAIN_HASH_01010()', () => {
    it('resolves to expected value', async () => {
      expect(await instance.$EIP_712_DOMAIN_HASH_01010.staticCall()).to.equal(
        '0xe7cfb1b0c6cc1826928f8134ec4aaff653c53c61279b10ee7b6a1c59f3c76dd2',
      );
    });
  });

  describe('#EIP_712_DOMAIN_HASH_01011()', () => {
    it('resolves to expected value', async () => {
      expect(await instance.$EIP_712_DOMAIN_HASH_01011.staticCall()).to.equal(
        '0x91ab3d17e3a50a9d89e63fd30b92be7f5336b03b287bb946787a83a9d62a2766',
      );
    });
  });

  describe('#EIP_712_DOMAIN_HASH_01100()', () => {
    it('resolves to expected value', async () => {
      expect(await instance.$EIP_712_DOMAIN_HASH_01100.staticCall()).to.equal(
        '0x47e79534a245952e8b16893a336b85a3d9ea9fa8c573f3d803afb92a79469218',
      );
    });
  });

  describe('#EIP_712_DOMAIN_HASH_01101()', () => {
    it('resolves to expected value', async () => {
      expect(await instance.$EIP_712_DOMAIN_HASH_01101.staticCall()).to.equal(
        '0x8cad95687ba82c2ce50e74f7b754645e5117c3a5bec8151c0726d5857980a866',
      );
    });
  });

  describe('#EIP_712_DOMAIN_HASH_01110()', () => {
    it('resolves to expected value', async () => {
      expect(await instance.$EIP_712_DOMAIN_HASH_01110.staticCall()).to.equal(
        '0x2aef22f9d7df5f9d21c56d14029233f3fdaa91917727e1eb68e504d27072d6cd',
      );
    });
  });

  describe('#EIP_712_DOMAIN_HASH_01111()', () => {
    it('resolves to expected value', async () => {
      expect(await instance.$EIP_712_DOMAIN_HASH_01111.staticCall()).to.equal(
        '0x8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f',
      );
    });
  });

  describe('#EIP_712_DOMAIN_HASH_10000()', () => {
    it('resolves to expected value', async () => {
      expect(await instance.$EIP_712_DOMAIN_HASH_10000.staticCall()).to.equal(
        '0xed46087c30783a9d27be533e9e6a1f834cec6daf2cfb016c9ab60d791039f983',
      );
    });
  });

  describe('#EIP_712_DOMAIN_HASH_10001()', () => {
    it('resolves to expected value', async () => {
      expect(await instance.$EIP_712_DOMAIN_HASH_10001.staticCall()).to.equal(
        '0xd1e3f5cf1a3ce7d7b6d652f790cb44165f3cdf0f3002d42f9f1d3e6a808e04b2',
      );
    });
  });

  describe('#EIP_712_DOMAIN_HASH_10010()', () => {
    it('resolves to expected value', async () => {
      expect(await instance.$EIP_712_DOMAIN_HASH_10010.staticCall()).to.equal(
        '0x9f81c44ff68aaf167190e696336e29da4c6f2ad153d3de14f4f266b70f7cb8d0',
      );
    });
  });

  describe('#EIP_712_DOMAIN_HASH_10011()', () => {
    it('resolves to expected value', async () => {
      expect(await instance.$EIP_712_DOMAIN_HASH_10011.staticCall()).to.equal(
        '0x599a80fcaa47b95e2323ab4d34d34e0cc9feda4b843edafcc30c7bdf60ea15bf',
      );
    });
  });

  describe('#EIP_712_DOMAIN_HASH_10100()', () => {
    it('resolves to expected value', async () => {
      expect(await instance.$EIP_712_DOMAIN_HASH_10100.staticCall()).to.equal(
        '0x564d3aac36678e91beb9d11156d0a35dcedd025eea11212d2b4c45436e4a71ba',
      );
    });
  });

  describe('#EIP_712_DOMAIN_HASH_10101()', () => {
    it('resolves to expected value', async () => {
      expect(await instance.$EIP_712_DOMAIN_HASH_10101.staticCall()).to.equal(
        '0x362651b35ace4088abd8ab4d0d426e15fe608272f8a9e51785f58e6621412710',
      );
    });
  });

  describe('#EIP_712_DOMAIN_HASH_10110()', () => {
    it('resolves to expected value', async () => {
      expect(await instance.$EIP_712_DOMAIN_HASH_10110.staticCall()).to.equal(
        '0xc514ad1a6ba6faad885aeab076fe6d1d4f0040791a4e8130fb9c163991fcf25d',
      );
    });
  });

  describe('#EIP_712_DOMAIN_HASH_10111()', () => {
    it('resolves to expected value', async () => {
      expect(await instance.$EIP_712_DOMAIN_HASH_10111.staticCall()).to.equal(
        '0xa604fff5a27d5951f334ccda7abff3286a8af29caeeb196a6f2b40a1dce7612b',
      );
    });
  });

  describe('#EIP_712_DOMAIN_HASH_11000()', () => {
    it('resolves to expected value', async () => {
      expect(await instance.$EIP_712_DOMAIN_HASH_11000.staticCall()).to.equal(
        '0x6268546d6d3d3a16ed8cfd22f4fe09a1d17f9af43838183ba533d41e284cf326',
      );
    });
  });

  describe('#EIP_712_DOMAIN_HASH_11001()', () => {
    it('resolves to expected value', async () => {
      expect(await instance.$EIP_712_DOMAIN_HASH_11001.staticCall()).to.equal(
        '0xe00d3e753977caaa77095a287e170b7e5fae131a2e1b3af70a3835665255081f',
      );
    });
  });

  describe('#EIP_712_DOMAIN_HASH_11010()', () => {
    it('resolves to expected value', async () => {
      expect(await instance.$EIP_712_DOMAIN_HASH_11010.staticCall()).to.equal(
        '0x082f63b4da7f252440ff2be2cdc878665c088a48be3d79095973b727c93fbaec',
      );
    });
  });

  describe('#EIP_712_DOMAIN_HASH_11011()', () => {
    it('resolves to expected value', async () => {
      expect(await instance.$EIP_712_DOMAIN_HASH_11011.staticCall()).to.equal(
        '0x36c25de3e541d5d970f66e4210d728721220fff5c077cc6cd008b3a0c62adab7',
      );
    });
  });

  describe('#EIP_712_DOMAIN_HASH_11100()', () => {
    it('resolves to expected value', async () => {
      expect(await instance.$EIP_712_DOMAIN_HASH_11100.staticCall()).to.equal(
        '0x71062c282d40422f744945d587dbf4ecfd4f9cfad1d35d62c944373009d96162',
      );
    });
  });

  describe('#EIP_712_DOMAIN_HASH_11101()', () => {
    it('resolves to expected value', async () => {
      expect(await instance.$EIP_712_DOMAIN_HASH_11101.staticCall()).to.equal(
        '0xba3bbab4b37e6e20d315843d8bced25060386a557eeb60eefdbb4096f6ad6923',
      );
    });
  });

  describe('#EIP_712_DOMAIN_HASH_11110()', () => {
    it('resolves to expected value', async () => {
      expect(await instance.$EIP_712_DOMAIN_HASH_11110.staticCall()).to.equal(
        '0xb90aaffa4b0fc25d6056f438f2c06198968eaf6723d182f5f928441117424b8e',
      );
    });
  });

  describe('#EIP_712_DOMAIN_HASH_11111()', () => {
    it('resolves to expected value', async () => {
      expect(await instance.$EIP_712_DOMAIN_HASH_11111.staticCall()).to.equal(
        '0xd87cd6ef79d4e2b95e15ce8abf732db51ec771f1ca2edccf22a46c729ac56472',
      );
    });
  });

  describe('#calculateDomainSeparator_00000()', () => {
    it('returns domain separator', async () => {
      const typeHash = await instance.$EIP_712_DOMAIN_HASH_00000.staticCall();

      const types: string[] = ['bytes32'];
      const values: string[] = [typeHash];

      const domainSeparator = ethers.keccak256(
        ethers.AbiCoder.defaultAbiCoder().encode(types, values),
      );

      expect(
        await instance.$calculateDomainSeparator_00000.staticCall(),
      ).to.equal(domainSeparator);
    });
  });

  describe('#calculateDomainSeparator_00001(bytes32)', () => {
    it('returns domain separator', async () => {
      const typeHash = await instance.$EIP_712_DOMAIN_HASH_00001.staticCall();

      const types: string[] = ['bytes32', 'bytes32'];
      const values: string[] = [typeHash, nameHash];

      const domainSeparator = ethers.keccak256(
        ethers.AbiCoder.defaultAbiCoder().encode(types, values),
      );

      expect(
        await instance.$calculateDomainSeparator_00001.staticCall(nameHash),
      ).to.equal(domainSeparator);
    });
  });

  describe('#calculateDomainSeparator_00010(bytes32)', () => {
    it('returns domain separator', async () => {
      const typeHash = await instance.$EIP_712_DOMAIN_HASH_00010.staticCall();

      const types: string[] = ['bytes32', 'bytes32'];
      const values: string[] = [typeHash, versionHash];

      const domainSeparator = ethers.keccak256(
        ethers.AbiCoder.defaultAbiCoder().encode(types, values),
      );

      expect(
        await instance.$calculateDomainSeparator_00010.staticCall(versionHash),
      ).to.equal(domainSeparator);
    });
  });

  describe('#calculateDomainSeparator_00011(bytes32,bytes32)', () => {
    it('returns domain separator', async () => {
      const typeHash = await instance.$EIP_712_DOMAIN_HASH_00011.staticCall();

      const types: string[] = ['bytes32', 'bytes32', 'bytes32'];
      const values: string[] = [typeHash, nameHash, versionHash];

      const domainSeparator = ethers.keccak256(
        ethers.AbiCoder.defaultAbiCoder().encode(types, values),
      );

      expect(
        await instance.$calculateDomainSeparator_00011.staticCall(
          nameHash,
          versionHash,
        ),
      ).to.equal(domainSeparator);
    });
  });

  describe('#calculateDomainSeparator_00100()', () => {
    it('returns domain separator', async () => {
      const typeHash = await instance.$EIP_712_DOMAIN_HASH_00100.staticCall();

      const types: string[] = ['bytes32', 'uint256'];
      const values: string[] = [typeHash, chainId];

      const domainSeparator = ethers.keccak256(
        ethers.AbiCoder.defaultAbiCoder().encode(types, values),
      );

      expect(
        await instance.$calculateDomainSeparator_00100.staticCall(),
      ).to.equal(domainSeparator);
    });
  });

  describe('#calculateDomainSeparator_00101(bytes32)', () => {
    it('returns domain separator', async () => {
      const typeHash = await instance.$EIP_712_DOMAIN_HASH_00101.staticCall();

      const types: string[] = ['bytes32', 'bytes32', 'uint256'];
      const values: string[] = [typeHash, nameHash, chainId];

      const domainSeparator = ethers.keccak256(
        ethers.AbiCoder.defaultAbiCoder().encode(types, values),
      );

      expect(
        await instance.$calculateDomainSeparator_00101.staticCall(nameHash),
      ).to.equal(domainSeparator);
    });
  });

  describe('#calculateDomainSeparator_00110(bytes32)', () => {
    it('returns domain separator', async () => {
      const typeHash = await instance.$EIP_712_DOMAIN_HASH_00110.staticCall();

      const types: string[] = ['bytes32', 'bytes32', 'uint256'];
      const values: string[] = [typeHash, versionHash, chainId];

      const domainSeparator = ethers.keccak256(
        ethers.AbiCoder.defaultAbiCoder().encode(types, values),
      );

      expect(
        await instance.$calculateDomainSeparator_00110.staticCall(versionHash),
      ).to.equal(domainSeparator);
    });
  });

  describe('#calculateDomainSeparator_00111(bytes32,bytes32)', () => {
    it('returns domain separator', async () => {
      const typeHash = await instance.$EIP_712_DOMAIN_HASH_00111.staticCall();

      const types: string[] = ['bytes32', 'bytes32', 'bytes32', 'uint256'];
      const values: string[] = [typeHash, nameHash, versionHash, chainId];

      const domainSeparator = ethers.keccak256(
        ethers.AbiCoder.defaultAbiCoder().encode(types, values),
      );

      expect(
        await instance.$calculateDomainSeparator_00111.staticCall(
          nameHash,
          versionHash,
        ),
      ).to.equal(domainSeparator);
    });
  });

  describe('#calculateDomainSeparator_01000()', () => {
    it('returns domain separator', async () => {
      const typeHash = await instance.$EIP_712_DOMAIN_HASH_01000.staticCall();

      const types: string[] = ['bytes32', 'address'];
      const values: string[] = [typeHash, verifyingContract];

      const domainSeparator = ethers.keccak256(
        ethers.AbiCoder.defaultAbiCoder().encode(types, values),
      );

      expect(
        await instance.$calculateDomainSeparator_01000.staticCall(),
      ).to.equal(domainSeparator);
    });
  });

  describe('#calculateDomainSeparator_01001(bytes32)', () => {
    it('returns domain separator', async () => {
      const typeHash = await instance.$EIP_712_DOMAIN_HASH_01001.staticCall();

      const types: string[] = ['bytes32', 'bytes32', 'address'];
      const values: string[] = [typeHash, nameHash, verifyingContract];

      const domainSeparator = ethers.keccak256(
        ethers.AbiCoder.defaultAbiCoder().encode(types, values),
      );

      expect(
        await instance.$calculateDomainSeparator_01001.staticCall(nameHash),
      ).to.equal(domainSeparator);
    });
  });

  describe('#calculateDomainSeparator_01010(bytes32)', () => {
    it('returns domain separator', async () => {
      const typeHash = await instance.$EIP_712_DOMAIN_HASH_01010.staticCall();

      const types: string[] = ['bytes32', 'bytes32', 'address'];
      const values: string[] = [typeHash, versionHash, verifyingContract];

      const domainSeparator = ethers.keccak256(
        ethers.AbiCoder.defaultAbiCoder().encode(types, values),
      );

      expect(
        await instance.$calculateDomainSeparator_01010.staticCall(versionHash),
      ).to.equal(domainSeparator);
    });
  });

  describe('#calculateDomainSeparator_01011(bytes32,bytes32)', () => {
    it('returns domain separator', async () => {
      const typeHash = await instance.$EIP_712_DOMAIN_HASH_01011.staticCall();

      const types: string[] = ['bytes32', 'bytes32', 'bytes32', 'address'];
      const values: string[] = [
        typeHash,
        nameHash,
        versionHash,
        verifyingContract,
      ];

      const domainSeparator = ethers.keccak256(
        ethers.AbiCoder.defaultAbiCoder().encode(types, values),
      );

      expect(
        await instance.$calculateDomainSeparator_01011.staticCall(
          nameHash,
          versionHash,
        ),
      ).to.equal(domainSeparator);
    });
  });

  describe('#calculateDomainSeparator_01100()', () => {
    it('returns domain separator', async () => {
      const typeHash = await instance.$EIP_712_DOMAIN_HASH_01100.staticCall();

      const types: string[] = ['bytes32', 'uint256', 'address'];
      const values: string[] = [typeHash, chainId, verifyingContract];

      const domainSeparator = ethers.keccak256(
        ethers.AbiCoder.defaultAbiCoder().encode(types, values),
      );

      expect(
        await instance.$calculateDomainSeparator_01100.staticCall(),
      ).to.equal(domainSeparator);
    });
  });

  describe('#calculateDomainSeparator_01101(bytes32)', () => {
    it('returns domain separator', async () => {
      const typeHash = await instance.$EIP_712_DOMAIN_HASH_01101.staticCall();

      const types: string[] = ['bytes32', 'bytes32', 'uint256', 'address'];
      const values: string[] = [typeHash, nameHash, chainId, verifyingContract];

      const domainSeparator = ethers.keccak256(
        ethers.AbiCoder.defaultAbiCoder().encode(types, values),
      );

      expect(
        await instance.$calculateDomainSeparator_01101.staticCall(nameHash),
      ).to.equal(domainSeparator);
    });
  });

  describe('#calculateDomainSeparator_01110(bytes32)', () => {
    it('returns domain separator', async () => {
      const typeHash = await instance.$EIP_712_DOMAIN_HASH_01110.staticCall();

      const types: string[] = ['bytes32', 'bytes32', 'uint256', 'address'];
      const values: string[] = [
        typeHash,
        versionHash,
        chainId,
        verifyingContract,
      ];

      const domainSeparator = ethers.keccak256(
        ethers.AbiCoder.defaultAbiCoder().encode(types, values),
      );

      expect(
        await instance.$calculateDomainSeparator_01110.staticCall(versionHash),
      ).to.equal(domainSeparator);
    });
  });

  describe('#calculateDomainSeparator_01111(bytes32,bytes32)', () => {
    it('returns domain separator', async () => {
      const typeHash = await instance.$EIP_712_DOMAIN_HASH_01111.staticCall();

      const types: string[] = [
        'bytes32',
        'bytes32',
        'bytes32',
        'uint256',
        'address',
      ];
      const values: string[] = [
        typeHash,
        nameHash,
        versionHash,
        chainId,
        verifyingContract,
      ];

      const domainSeparator = ethers.keccak256(
        ethers.AbiCoder.defaultAbiCoder().encode(types, values),
      );

      expect(
        await instance.$calculateDomainSeparator_01111.staticCall(
          nameHash,
          versionHash,
        ),
      ).to.equal(domainSeparator);
    });
  });

  describe('#calculateDomainSeparator_10000(bytes32)', () => {
    it('returns domain separator', async () => {
      const typeHash = await instance.$EIP_712_DOMAIN_HASH_10000.staticCall();

      const types: string[] = ['bytes32', 'bytes32'];
      const values: string[] = [typeHash, salt];

      const domainSeparator = ethers.keccak256(
        ethers.AbiCoder.defaultAbiCoder().encode(types, values),
      );

      expect(
        await instance.$calculateDomainSeparator_10000.staticCall(salt),
      ).to.equal(domainSeparator);
    });
  });

  describe('#calculateDomainSeparator_10001(bytes32,bytes32)', () => {
    it('returns domain separator', async () => {
      const typeHash = await instance.$EIP_712_DOMAIN_HASH_10001.staticCall();

      const types: string[] = ['bytes32', 'bytes32', 'bytes32'];
      const values: string[] = [typeHash, nameHash, salt];

      const domainSeparator = ethers.keccak256(
        ethers.AbiCoder.defaultAbiCoder().encode(types, values),
      );

      expect(
        await instance.$calculateDomainSeparator_10001.staticCall(
          nameHash,
          salt,
        ),
      ).to.equal(domainSeparator);
    });
  });

  describe('#calculateDomainSeparator_10010(bytes32,bytes32)', () => {
    it('returns domain separator', async () => {
      const typeHash = await instance.$EIP_712_DOMAIN_HASH_10010.staticCall();

      const types: string[] = ['bytes32', 'bytes32', 'bytes32'];
      const values: string[] = [typeHash, versionHash, salt];

      const domainSeparator = ethers.keccak256(
        ethers.AbiCoder.defaultAbiCoder().encode(types, values),
      );

      expect(
        await instance.$calculateDomainSeparator_10010.staticCall(
          versionHash,
          salt,
        ),
      ).to.equal(domainSeparator);
    });
  });

  describe('#calculateDomainSeparator_10011(bytes32,bytes32,bytes32)', () => {
    it('returns domain separator', async () => {
      const typeHash = await instance.$EIP_712_DOMAIN_HASH_10011.staticCall();

      const types: string[] = ['bytes32', 'bytes32', 'bytes32', 'bytes32'];
      const values: string[] = [typeHash, nameHash, versionHash, salt];

      const domainSeparator = ethers.keccak256(
        ethers.AbiCoder.defaultAbiCoder().encode(types, values),
      );

      expect(
        await instance.$calculateDomainSeparator_10011.staticCall(
          nameHash,
          versionHash,
          salt,
        ),
      ).to.equal(domainSeparator);
    });
  });

  describe('#calculateDomainSeparator_10100(bytes32)', () => {
    it('returns domain separator', async () => {
      const typeHash = await instance.$EIP_712_DOMAIN_HASH_10100.staticCall();

      const types: string[] = ['bytes32', 'uint256', 'bytes32'];
      const values: string[] = [typeHash, chainId, salt];

      const domainSeparator = ethers.keccak256(
        ethers.AbiCoder.defaultAbiCoder().encode(types, values),
      );

      expect(
        await instance.$calculateDomainSeparator_10100.staticCall(salt),
      ).to.equal(domainSeparator);
    });
  });

  describe('#calculateDomainSeparator_10101(bytes32,bytes32)', () => {
    it('returns domain separator', async () => {
      const typeHash = await instance.$EIP_712_DOMAIN_HASH_10101.staticCall();

      const types: string[] = ['bytes32', 'bytes32', 'uint256', 'bytes32'];
      const values: string[] = [typeHash, nameHash, chainId, salt];

      const domainSeparator = ethers.keccak256(
        ethers.AbiCoder.defaultAbiCoder().encode(types, values),
      );

      expect(
        await instance.$calculateDomainSeparator_10101.staticCall(
          nameHash,
          salt,
        ),
      ).to.equal(domainSeparator);
    });
  });

  describe('#calculateDomainSeparator_10110(bytes32,bytes32)', () => {
    it('returns domain separator', async () => {
      const typeHash = await instance.$EIP_712_DOMAIN_HASH_10110.staticCall();

      const types: string[] = ['bytes32', 'bytes32', 'uint256', 'bytes32'];
      const values: string[] = [typeHash, versionHash, chainId, salt];

      const domainSeparator = ethers.keccak256(
        ethers.AbiCoder.defaultAbiCoder().encode(types, values),
      );

      expect(
        await instance.$calculateDomainSeparator_10110.staticCall(
          versionHash,
          salt,
        ),
      ).to.equal(domainSeparator);
    });
  });

  describe('#calculateDomainSeparator_10111(bytes32,bytes32,bytes32)', () => {
    it('returns domain separator', async () => {
      const typeHash = await instance.$EIP_712_DOMAIN_HASH_10111.staticCall();

      const types: string[] = [
        'bytes32',
        'bytes32',
        'bytes32',
        'uint256',
        'bytes32',
      ];
      const values: string[] = [typeHash, nameHash, versionHash, chainId, salt];

      const domainSeparator = ethers.keccak256(
        ethers.AbiCoder.defaultAbiCoder().encode(types, values),
      );

      expect(
        await instance.$calculateDomainSeparator_10111.staticCall(
          nameHash,
          versionHash,
          salt,
        ),
      ).to.equal(domainSeparator);
    });
  });

  describe('#calculateDomainSeparator_11000(bytes32)', () => {
    it('returns domain separator', async () => {
      const typeHash = await instance.$EIP_712_DOMAIN_HASH_11000.staticCall();

      const types: string[] = ['bytes32', 'address', 'bytes32'];
      const values: string[] = [typeHash, verifyingContract, salt];

      const domainSeparator = ethers.keccak256(
        ethers.AbiCoder.defaultAbiCoder().encode(types, values),
      );

      expect(
        await instance.$calculateDomainSeparator_11000.staticCall(salt),
      ).to.equal(domainSeparator);
    });
  });

  describe('#calculateDomainSeparator_11001(bytes32,bytes32)', () => {
    it('returns domain separator', async () => {
      const typeHash = await instance.$EIP_712_DOMAIN_HASH_11001.staticCall();

      const types: string[] = ['bytes32', 'bytes32', 'address', 'bytes32'];
      const values: string[] = [typeHash, nameHash, verifyingContract, salt];

      const domainSeparator = ethers.keccak256(
        ethers.AbiCoder.defaultAbiCoder().encode(types, values),
      );

      expect(
        await instance.$calculateDomainSeparator_11001.staticCall(
          nameHash,
          salt,
        ),
      ).to.equal(domainSeparator);
    });
  });

  describe('#calculateDomainSeparator_11010(bytes32,bytes32)', () => {
    it('returns domain separator', async () => {
      const typeHash = await instance.$EIP_712_DOMAIN_HASH_11010.staticCall();

      const types: string[] = ['bytes32', 'bytes32', 'address', 'bytes32'];
      const values: string[] = [typeHash, versionHash, verifyingContract, salt];

      const domainSeparator = ethers.keccak256(
        ethers.AbiCoder.defaultAbiCoder().encode(types, values),
      );

      expect(
        await instance.$calculateDomainSeparator_11010.staticCall(
          versionHash,
          salt,
        ),
      ).to.equal(domainSeparator);
    });
  });

  describe('#calculateDomainSeparator_11011(bytes32,bytes32,bytes32)', () => {
    it('returns domain separator', async () => {
      const typeHash = await instance.$EIP_712_DOMAIN_HASH_11011.staticCall();

      const types: string[] = [
        'bytes32',
        'bytes32',
        'bytes32',
        'address',
        'bytes32',
      ];
      const values: string[] = [
        typeHash,
        nameHash,
        versionHash,
        verifyingContract,
        salt,
      ];

      const domainSeparator = ethers.keccak256(
        ethers.AbiCoder.defaultAbiCoder().encode(types, values),
      );

      expect(
        await instance.$calculateDomainSeparator_11011.staticCall(
          nameHash,
          versionHash,
          salt,
        ),
      ).to.equal(domainSeparator);
    });
  });

  describe('#calculateDomainSeparator_11100(bytes32)', () => {
    it('returns domain separator', async () => {
      const typeHash = await instance.$EIP_712_DOMAIN_HASH_11100.staticCall();

      const types: string[] = ['bytes32', 'uint256', 'address', 'bytes32'];
      const values: string[] = [typeHash, chainId, verifyingContract, salt];

      const domainSeparator = ethers.keccak256(
        ethers.AbiCoder.defaultAbiCoder().encode(types, values),
      );

      expect(
        await instance.$calculateDomainSeparator_11100.staticCall(salt),
      ).to.equal(domainSeparator);
    });
  });

  describe('#calculateDomainSeparator_11101(bytes32,bytes32)', () => {
    it('returns domain separator', async () => {
      const typeHash = await instance.$EIP_712_DOMAIN_HASH_11101.staticCall();

      const types: string[] = [
        'bytes32',
        'bytes32',
        'uint256',
        'address',
        'bytes32',
      ];
      const values: string[] = [
        typeHash,
        nameHash,
        chainId,
        verifyingContract,
        salt,
      ];

      const domainSeparator = ethers.keccak256(
        ethers.AbiCoder.defaultAbiCoder().encode(types, values),
      );

      expect(
        await instance.$calculateDomainSeparator_11101.staticCall(
          nameHash,
          salt,
        ),
      ).to.equal(domainSeparator);
    });
  });

  describe('#calculateDomainSeparator_11110(bytes32,bytes32)', () => {
    it('returns domain separator', async () => {
      const typeHash = await instance.$EIP_712_DOMAIN_HASH_11110.staticCall();

      const types: string[] = [
        'bytes32',
        'bytes32',
        'uint256',
        'address',
        'bytes32',
      ];
      const values: string[] = [
        typeHash,
        versionHash,
        chainId,
        verifyingContract,
        salt,
      ];

      const domainSeparator = ethers.keccak256(
        ethers.AbiCoder.defaultAbiCoder().encode(types, values),
      );

      expect(
        await instance.$calculateDomainSeparator_11110.staticCall(
          versionHash,
          salt,
        ),
      ).to.equal(domainSeparator);
    });
  });

  describe('#calculateDomainSeparator_11111(bytes32,bytes32,bytes32)', () => {
    it('returns domain separator', async () => {
      const typeHash = await instance.$EIP_712_DOMAIN_HASH_11111.staticCall();

      const types: string[] = [
        'bytes32',
        'bytes32',
        'bytes32',
        'uint256',
        'address',
        'bytes32',
      ];
      const values: string[] = [
        typeHash,
        nameHash,
        versionHash,
        chainId,
        verifyingContract,
        salt,
      ];

      const domainSeparator = ethers.keccak256(
        ethers.AbiCoder.defaultAbiCoder().encode(types, values),
      );

      expect(
        await instance.$calculateDomainSeparator_11111.staticCall(
          nameHash,
          versionHash,
          salt,
        ),
      ).to.equal(domainSeparator);
    });
  });
});
