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

    <%_ for (let i = 1; i <= 32; i++ ) { _%>
    bytes32 private constant MASK_<%- i.toString().padStart(2, '0') %> = 0x<%- '00'.repeat(32 - i) + 'ff'.repeat(i) %>;
    <%_ } _%>

    <%_ for (const type of types) { _%>
    /**
     * @notice parse <%- type.name %> from bytes at given offset
     * @param offset slot offset in bits
     * @return element <%- type.name %> derived from bytes
     */
    function parse<%- type.nameUpcase %>(<%- structName %> memory self, uint256 offset) internal pure returns (<%- type.name %> element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_<%- (type.sizeBytes).toString().padStart(2, '0') %>;
        element = <%- type.castFrom %>;
    }

    /**
     * @notice insert <%- type.name %> value to <%- type.sizeBytes %>-byte position at end of bytes
     * @param self <%- libraryName %> <%- structName %> struct on which to operate
     * @param element <%- type.name %> to add
     */
    function push<%- type.nameUpcase %>(<%- structName %> memory self, <%- type.name %> element) internal pure {
        unchecked {
            self._data |= <%- type.castTo %> << self._size;
            self._size += <%- type.sizeBits %>;
        }
    }

    /**
     * @notice remove last <%- type.sizeBytes %>-byte segment from bytes and return as <%- type.name %>
     * @param self <%- libraryName %> <%- structName %> struct on which to operate
     * @return element <%- type.name %> derived from bytes
     */
    function pop<%- type.nameUpcase %>(<%- structName %> memory self) internal pure returns (<%- type.name %> element) {
        unchecked {
            self._size -= <%- type.sizeBits %>;
            bytes32 elementBytes = (self._data >> self._size) & MASK_<%- (type.sizeBytes).toString().padStart(2, '0') %>;
            element = <%- type.castFrom %>;
            self._data &= ~(MASK_<%- (type.sizeBytes).toString().padStart(2, '0') %> << self._size);
        }
    }

    /**
     * @notice remove first <%- type.sizeBytes %>-byte segment from bytes and return as <%- type.name %>
     * @param self <%- libraryName %> <%- structName %> struct on which to operate
     * @return element <%- type.name %> derived from bytes
     */
    function shift<%- type.nameUpcase %>(<%- structName %> memory self) internal pure returns (<%- type.name %> element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_<%- (type.sizeBytes).toString().padStart(2, '0') %>;
            element = <%- type.castFrom %>;
            self._data >>= <%- type.sizeBits %>;
            self._size -= <%- type.sizeBits %>;
        }
    }

    /**
     * @notice insert <%- type.name %> value to <%- type.sizeBytes %>-byte position at beginning of bytes
     * @param self <%- libraryName %> <%- structName %> struct on which to operate
     * @param element <%- type.name %> to add
     */
    function unshift<%- type.nameUpcase %>(<%- structName %> memory self, <%- type.name %> element) internal pure {
        unchecked {
            self._data = (self._data << <%- type.sizeBits %>) | <%- type.castTo %>;
            self._size += <%- type.sizeBits %>;
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
    function parse<%- type.nameUpcase %>(<%- libraryName %>.<%- structName %> memory self, uint256 offset) external pure returns(<%- type.name %> element) {
        return self.parse<%- type.nameUpcase %>(offset);
    }

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

const randomIndexNonInclusive = (start, end) => {
  return Math.ceil(Math.random() * (end - start - 1)) + start;
};

describe('<%- libraryName %>', () => {
  let instance: <%- libraryName %>Test;

  before(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new <%- libraryName %>Test__factory(deployer).deploy();
  });

  <%_ for (const type of types) { _%>
  describe('#parse<%- type.nameUpcase %>(bytes32,<%- type.name %>)', () => {
    it('parses <%- type.sizeBytes %>-byte segment from bytes at given offset and returns it as <%- type.name %>', async () => {
      const sizeBytes = <%- type.sizeBytes %>;

      for (let i of [0, 32 - sizeBytes, randomIndexNonInclusive(0, 32 - sizeBytes)]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(ethers.concat([expectedValue, ethers.hexlify(ethers.randomBytes(i))]), 32),
          _size: 256,
        }

        const result = await instance.parse<%- type.nameUpcase %>.staticCall(state, offset);

        <%_ if (type.name === 'address') { _%>
        expect(result).to.eq(ethers.getAddress(expectedValue))
        <%_ } else if (type.name === 'bool') { _%>
        expect(result).to.eq(!!BigInt(expectedValue));
        <%_ } else if (type.name.startsWith('int')) { _%>
        const negative = BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue))
        } else {
          output = BigInt(expectedValue);
        }

        expect(result).to.eq(output)
        <%_ } else { _%>
        expect(result).to.eq(expectedValue);
        <%_ } _%>
      }
    });
  });
  <%_ } _%>

  <%_ for (const type of types) { _%>
  describe('#push<%- type.nameUpcase %>(bytes32,<%- type.name %>)', () => {
    it('inserts <%- type.name %> at end of bytes', async () => {
      const sizeBytes = <%- type.sizeBytes %>;
      <%_ if (type.name === 'bool') { _%>
      const data = '0x01';
      const input = true;
      <%_ } else if (type.name.startsWith('int')) { _%>
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data))
      } else {
        input = BigInt(data);
      }
      <%_ } else { _%>
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;
      <%_ } _%>

      for (let i of [0, 32 - sizeBytes, randomIndexNonInclusive(0, 32 - sizeBytes)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        }

        const expectedData = ethers.zeroPadValue(ethers.concat([data, ethers.dataSlice(state._data, 32 - state._size / 8, 32)]), 32);
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.push<%- type.nameUpcase %>.staticCall(state, input)
        ).to.deep.equal(
          [expectedData, expectedLength]
        );
      }
    });
  });
  <%_ } _%>

  <%_ for (const type of types) { _%>
  describe('#pop<%- type.nameUpcase %>(bytes32,<%- type.name %>)', () => {
    it('removes <%- type.sizeBytes %>-byte segment from end of bytes and returns it as <%- type.name %>', async () => {
      const sizeBytes = <%- type.sizeBytes %>;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        }

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(ethers.dataSlice(state._data, 32 - expectedLength / 8, 32), 32)
        const expectedValue = ethers.dataSlice(state._data, 32 - expectedLength / 8 - sizeBytes, 32 - expectedLength / 8);

        const result = await instance.pop<%- type.nameUpcase %>.staticCall(state);

        expect(
          result[0]
        ).to.deep.equal(
          [expectedData, expectedLength]
        );

        <%_ if (type.name === 'address') { _%>
        expect(result[1]).to.eq(ethers.getAddress(expectedValue))
        <%_ } else if (type.name === 'bool') { _%>
        expect(result[1]).to.eq(!!BigInt(expectedValue));
        <%_ } else if (type.name.startsWith('int')) { _%>
        const negative = BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue))
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output)
        <%_ } else { _%>
        expect(result[1]).to.eq(expectedValue);
        <%_ } _%>
      }
    });
  });
  <%_ } _%>

  <%_ for (const type of types) { _%>
  describe('#shift<%- type.nameUpcase %>(bytes32,<%- type.name %>)', () => {
    it('removes <%- type.sizeBytes %>-byte segment from beginning of bytes and returns it as <%- type.name %>', async () => {
      const sizeBytes = <%- type.sizeBytes %>;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        }

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(ethers.dataSlice(state._data, 0, 32 - sizeBytes), 32)
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shift<%- type.nameUpcase %>.staticCall(state);

        expect(
          result[0]
        ).to.deep.equal(
          [expectedData, expectedLength]
        );

        <%_ if (type.name === 'address') { _%>
        expect(result[1]).to.eq(ethers.getAddress(expectedValue))
        <%_ } else if (type.name === 'bool') { _%>
        expect(result[1]).to.eq(!!BigInt(expectedValue));
        <%_ } else if (type.name.startsWith('int')) { _%>
        const negative = BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue))
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output)
        <%_ } else { _%>
        expect(result[1]).to.eq(expectedValue);
        <%_ } _%>
      }
    });
  });
  <%_ } _%>

  <%_ for (const type of types) { _%>
  describe('#unshift<%- type.nameUpcase %>(bytes32,<%- type.name %>)', () => {
    it('inserts <%- type.name %> at beginning of bytes', async () => {
      const sizeBytes = <%- type.sizeBytes %>;
      <%_ if (type.name === 'bool') { _%>
      const data = '0x01';
      const input = true;
      <%_ } else if (type.name.startsWith('int')) { _%>
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data))
      } else {
        input = BigInt(data);
      }
      <%_ } else { _%>
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;
      <%_ } _%>

      for (let i of [0, 32 - sizeBytes, randomIndexNonInclusive(0, 32 - sizeBytes)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        }

        const expectedData = ethers.zeroPadValue(ethers.concat([ethers.dataSlice(state._data, 32 - state._size / 8, 32), data]), 32);
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshift<%- type.nameUpcase %>.staticCall(state, input)
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
      sizeBits: number;
      sizeBytes: number;
      castTo: string;
      castFrom: string;
    }

    const types: Type[] = typesBySize.reduce((acc, typesOfSize, i) => {
      return typesOfSize.reduce((acc, type) => {
        const name = type;
        const sizeBytes = i + 1;
        const sizeBits = sizeBytes * 8;
        let castTo;
        let castFrom;

        if (name.startsWith('bytes')) {
          castTo = `bytes32(element) >> ${256 - sizeBits}`;
          castFrom = `${name}(elementBytes << ${256 - sizeBits})`;
        } else if (name.startsWith('int')) {
          castTo = `(Int256.toBytes32(element) & (~bytes32(0) >> ${256 - sizeBits}))`;
          castFrom = `${name}(Bytes32.toInt256(elementBytes))`;
        } else if (name.startsWith('uint')) {
          castTo = 'Uint256.toBytes32(element)';
          castFrom = `${name}(Bytes32.toUint256(elementBytes))`;
        } else if (name === 'address') {
          castTo = 'Address.toBytes32(element)';
          castFrom = 'Bytes32.toAddress(elementBytes)';
        } else if (name === 'bool') {
          castTo = 'Bool.toBytes32(element)';
          castFrom = 'Bytes32.toBool(elementBytes)';
        } else {
          throw 'invalid type';
        }

        acc.push({
          name,
          nameUpcase: name.charAt(0).toUpperCase() + name.slice(1),
          sizeBits,
          sizeBytes,
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
