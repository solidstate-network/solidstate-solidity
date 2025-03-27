import ejs from 'ejs';
import fs from 'fs';
import { task } from 'hardhat/config';
import path from 'path';

const libraryName = 'Bytes32Builder';
const structName = 'Builder';
const filepath = 'data';

const TEMPLATE_SOL = `
pragma solidity ^0.8.24;

import { Address } from '../utils/Address.sol';
import { Bool } from '../utils/Bool.sol';
import { Bytes32 } from '../utils/Bytes32.sol';
import { Int256 } from '../utils/Int256.sol';
import { Uint256 } from '../utils/Uint256.sol';

/**
 * @title Procedurally generated library for packing primitive types into bytes32
 **/
library <%- libraryName %> {
    struct <%- structName %> {
        bytes32 _data;
        uint256 _size;
    }

    <%_ for (const type of types) { _%>
    /**
     * @notice insert <%- type.name %> value to <%- type.size / 8 %>-byte position at end of bytes
     * @param self <%- libraryName %> <%- structName %> struct on which to operate
     * @param element <%- type.name %> to add
     */
    function push<%- type.nameUpcase %>(<%- structName %> memory self, <%- type.name %> element) internal pure {
        unchecked {
            self._data |= (<%- type.castTo %> & (~bytes32(0) >> <%- 256 - type.size %>)) << self._size;
            self._size += <%- type.size %>;
        }
    }

    /**
     * @notice remove last <%- type.size / 8 %>-byte segment from bytes and return as <%- type.name %>
     * @param self <%- libraryName %> <%- structName %> struct on which to operate
     * @return element <%- type.name %> derived from bytes
     */
    function pop<%- type.nameUpcase %>(<%- structName %> memory self) internal pure returns (<%- type.name %> element) {
        unchecked {
            self._size -= <%- type.size %>;
            element = <%- type.name %>(<%= type.castFrom %>(self._data & (bytes32(hex'<%- 'ff'.repeat(type.size / 8) %>') << self._size)));
            self._data &= ~(bytes32(0x<%- '00'.repeat((256 - type.size) / 8) + 'ff'.repeat(type.size / 8) %>) << self._size);
        }
    }

    /**
     * @notice remove first <%- type.size / 8 %>-byte segment from bytes and return as <%- type.name %>
     * @param self <%- libraryName %> <%- structName %> struct on which to operate
     * @return element <%- type.name %> derived from bytes
     */
    function shift<%- type.nameUpcase %>(<%- structName %> memory self) internal pure returns (<%- type.name %> element) {
        unchecked {
            element = <%- type.name %>(<%- type.castFrom %>(self._data & bytes32(0x<%- '00'.repeat((256 - type.size) / 8) + 'ff'.repeat(type.size / 8) %>)));
            self._data >>= <%- type.size %>;
            self._size -= <%- type.size %>;
        }
    }

    /**
     * @notice insert <%- type.name %> value to <%- type.size / 8 %>-byte position at beginning of bytes
     * @param self <%- libraryName %> <%- structName %> struct on which to operate
     * @param element <%- type.name %> to add
     */
    function unshift<%- type.nameUpcase %>(<%- structName %> memory self, <%- type.name %> element) internal pure {
        unchecked {
            self._data = (self._data << <%- type.size %>) | (<%- type.castTo %> & (~bytes32(0) >> <%- 256 - type.size %>));
            self._size += <%- type.size %>;
        }
    }
    <%_ } _%>
}
`;

const TEMPLATE_SOL_TEST = `
pragma solidity ^0.8.24;

import { <%- libraryName %> } from '../<%- filepath %>/<%- libraryName %>.sol';

/**
 * @title Procedurally generated <%- libraryName %> test contract
 * @dev custom solution is required because there is no other way to access memory struct post-operation
 **/
contract <%- libraryName %>Test {
    using <%- libraryName %> for <%- libraryName %>.<%- structName %>;

    <%_ for (const type of types) { _%>
    function push<%- type.nameUpcase %>(<%- libraryName %>.<%- structName %> memory self, <%- type.name %> element) external pure returns (<%- libraryName %>.<%- structName %> memory) {
        self.push<%- type.nameUpcase %>(element);
        return self;
    }

    function pop<%- type.nameUpcase %>(<%- libraryName %>.<%- structName %> memory self) external pure returns (<%- libraryName %>.<%- structName %> memory, <%- type.name %> element) {
        element = self.pop<%- type.nameUpcase %>();
        return (self, element);
    }

    function shift<%- type.nameUpcase %>(<%- libraryName %>.<%- structName %> memory self) external pure returns (<%- libraryName %>.<%- structName %> memory, <%- type.name %> element) {
        element = self.shift<%- type.nameUpcase %>();
        return (self, element);
    }

    function unshift<%- type.nameUpcase %>(<%- libraryName %>.<%- structName %> memory self, <%- type.name %> element) external pure returns (<%- libraryName %>.<%- structName %> memory) {
        self.unshift<%- type.nameUpcase %>(element);
        return self;
    }
    <%_ } _%>
}
`;

const TEMPLATE_TS = `
import { <%- libraryName %>Test, <%- libraryName %>Test__factory } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('<%- libraryName %>', () => {
  let instance: <%- libraryName %>Test;

  before(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new <%- libraryName %>Test__factory(deployer).deploy();
  });

  <%_ for (const type of types) { _%>
  describe('#push<%- type.nameUpcase %>(bytes32,<%- type.name %>)', () => {
    it('inserts <%- type.name %> at end of bytes', async () => {
      const size = <%- type.size / 8 %>;
      <%_ if (type.name === 'bool') { _%>
      const data = '0x01';
      const input = true;
      <%_ } else if (type.name.startsWith('int')) { _%>
      const data = ethers.hexlify(ethers.randomBytes(size));
      const negative = BigInt(data) >> BigInt(size * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(size * 8) - BigInt(data))
      } else {
        input = BigInt(data);
      }
      <%_ } else { _%>
      const data = ethers.hexlify(ethers.randomBytes(size));
      const input = data;
      <%_ } _%>

      for (let i = 0; i <= 32 - size; i++) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        }

        const expectedData = ethers.zeroPadValue(ethers.concat([data, ethers.dataSlice(state._data, 32 - state._size / 8, 32)]), 32);
        const expectedLength = state._size + size * 8;

        const output = await instance.push<%- type.nameUpcase %>(state, input);

        expect(
          output
        ).to.deep.equal(
          [expectedData, expectedLength]
        );
      }
    });
  });
  <%_ } _%>

  <%_ for (const type of types) { _%>
  describe('#pop<%- type.nameUpcase %>(bytes32,<%- type.name %>)', () => {
    it.skip('removes <%- type.name %> from end of bytes', async () => {
      expect(await instance.pop<%- type.nameUpcase %>)
    });
  });
  <%_ } _%>

  <%_ for (const type of types) { _%>
  describe('#shift<%- type.nameUpcase %>(bytes32,<%- type.name %>)', () => {
    it.skip('removes <%- type.name %> from beginning of bytes', async () => {
      expect(!await instance.shift<%- type.nameUpcase %>)
    });
  });
  <%_ } _%>

  <%_ for (const type of types) { _%>
  describe('#unshift<%- type.nameUpcase %>(bytes32,<%- type.name %>)', () => {
    it('inserts <%- type.name %> at beginning of bytes', async () => {
      const size = <%- type.size / 8 %>;
      <%_ if (type.name === 'bool') { _%>
      const data = '0x01';
      const input = true;
      <%_ } else if (type.name.startsWith('int')) { _%>
      const data = ethers.hexlify(ethers.randomBytes(size));
      const negative = BigInt(data) >> BigInt(size * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(size * 8) - BigInt(data))
      } else {
        input = BigInt(data);
      }
      <%_ } else { _%>
      const data = ethers.hexlify(ethers.randomBytes(size));
      const input = data;
      <%_ } _%>

      for (let i = 0; i <= 32 - size; i++) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        }

        const expectedData = ethers.zeroPadValue(ethers.concat([ethers.dataSlice(state._data, 32 - state._size / 8, 32), data]), 32);
        const expectedLength = state._size + size * 8;

        const output = await instance.unshift<%- type.nameUpcase %>(state, input);

        expect(
          output
        ).to.deep.equal(
          [expectedData, expectedLength]
        );
      }
    });
  });
  <%_ } _%>
});
`;

task('generate-bytes32-builder', `Generate ${libraryName}`).setAction(
  async (args, hre) => {
    const typesBySize = Array(32)
      .fill(0)
      .map((el, i) => [
        `bytes${i + 1}`,
        `int${(i + 1) * 8}`,
        `uint${(i + 1) * 8}`,
      ]);

    typesBySize[0].push('bool');
    typesBySize[19].push('address');

    interface Type {
      name: string;
      nameUpcase: string;
      size: number;
      castTo: string;
      castFrom: string;
    }

    const types: Type[] = typesBySize.reduce((acc, typesOfSize, i) => {
      return typesOfSize.reduce((acc, type) => {
        const name = type;
        const size = (i + 1) * 8;
        let castTo;
        let castFrom;

        if (name.startsWith('bytes')) {
          castTo = `bytes32(element) >> ${256 - size}`;
          castFrom = '';
        } else if (name.startsWith('int')) {
          castTo = 'Int256.toBytes32(element)';
          castFrom = 'Bytes32.toInt256';
        } else if (name.startsWith('uint')) {
          castTo = 'Uint256.toBytes32(element)';
          castFrom = 'Bytes32.toUint256';
        } else if (name === 'address') {
          castTo = 'Address.toBytes32(element)';
          castFrom = 'Bytes32.toAddress';
        } else if (name === 'bool') {
          castTo = 'Bool.toBytes32(element)';
          castFrom = 'Bytes32.toBool';
        } else {
          throw 'invalid type';
        }

        acc.push({
          name,
          nameUpcase: name.charAt(0).toUpperCase() + name.slice(1),
          size,
          castTo,
          castFrom,
        });
        return acc;
      }, acc);
    }, [] as Type[]);

    const templateData = {
      libraryName,
      structName,
      filepath,
      types,
    };

    const generate = async (outputPath: string, content: string) => {
      await fs.promises.mkdir(path.dirname(outputPath), { recursive: true });
      await fs.promises.writeFile(outputPath, content);
    };

    await generate(
      path.resolve(hre.config.paths.sources, filepath, `${libraryName}.sol`),
      ejs.render(TEMPLATE_SOL, templateData),
    );

    await generate(
      path.resolve(hre.config.paths.sources, 'test', `${libraryName}Test.sol`),
      ejs.render(TEMPLATE_SOL_TEST, templateData),
    );

    await generate(
      path.resolve(hre.config.paths.tests, filepath, `${libraryName}.ts`),
      ejs.render(TEMPLATE_TS, templateData),
    );
  },
);
