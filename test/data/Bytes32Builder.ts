import {
  Bytes32BuilderTest,
  Bytes32BuilderTest__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

const randomIndexNonInclusive = (start, end) => {
  return Math.ceil(Math.random() * (end - start - 1)) + start;
};

describe('Bytes32Builder', () => {
  let instance: Bytes32BuilderTest;

  before(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new Bytes32BuilderTest__factory(deployer).deploy();
  });

  describe('#parseBytes1(bytes32,bytes1)', () => {
    it('parses 1-byte segment from bytes at given offset and returns it as bytes1', async () => {
      const sizeBytes = 1;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseBytes1.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseInt8(bytes32,int8)', () => {
    it('parses 1-byte segment from bytes at given offset and returns it as int8', async () => {
      const sizeBytes = 1;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseInt8.staticCall(state, offset);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result).to.eq(output);
      }
    });
  });
  describe('#parseUint8(bytes32,uint8)', () => {
    it('parses 1-byte segment from bytes at given offset and returns it as uint8', async () => {
      const sizeBytes = 1;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseUint8.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseBool(bytes32,bool)', () => {
    it('parses 1-byte segment from bytes at given offset and returns it as bool', async () => {
      const sizeBytes = 1;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseBool.staticCall(state, offset);

        expect(result).to.eq(!!BigInt(expectedValue));
      }
    });
  });
  describe('#parseBytes2(bytes32,bytes2)', () => {
    it('parses 2-byte segment from bytes at given offset and returns it as bytes2', async () => {
      const sizeBytes = 2;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseBytes2.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseInt16(bytes32,int16)', () => {
    it('parses 2-byte segment from bytes at given offset and returns it as int16', async () => {
      const sizeBytes = 2;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseInt16.staticCall(state, offset);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result).to.eq(output);
      }
    });
  });
  describe('#parseUint16(bytes32,uint16)', () => {
    it('parses 2-byte segment from bytes at given offset and returns it as uint16', async () => {
      const sizeBytes = 2;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseUint16.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseBytes3(bytes32,bytes3)', () => {
    it('parses 3-byte segment from bytes at given offset and returns it as bytes3', async () => {
      const sizeBytes = 3;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseBytes3.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseInt24(bytes32,int24)', () => {
    it('parses 3-byte segment from bytes at given offset and returns it as int24', async () => {
      const sizeBytes = 3;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseInt24.staticCall(state, offset);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result).to.eq(output);
      }
    });
  });
  describe('#parseUint24(bytes32,uint24)', () => {
    it('parses 3-byte segment from bytes at given offset and returns it as uint24', async () => {
      const sizeBytes = 3;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseUint24.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseBytes4(bytes32,bytes4)', () => {
    it('parses 4-byte segment from bytes at given offset and returns it as bytes4', async () => {
      const sizeBytes = 4;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseBytes4.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseInt32(bytes32,int32)', () => {
    it('parses 4-byte segment from bytes at given offset and returns it as int32', async () => {
      const sizeBytes = 4;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseInt32.staticCall(state, offset);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result).to.eq(output);
      }
    });
  });
  describe('#parseUint32(bytes32,uint32)', () => {
    it('parses 4-byte segment from bytes at given offset and returns it as uint32', async () => {
      const sizeBytes = 4;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseUint32.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseBytes5(bytes32,bytes5)', () => {
    it('parses 5-byte segment from bytes at given offset and returns it as bytes5', async () => {
      const sizeBytes = 5;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseBytes5.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseInt40(bytes32,int40)', () => {
    it('parses 5-byte segment from bytes at given offset and returns it as int40', async () => {
      const sizeBytes = 5;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseInt40.staticCall(state, offset);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result).to.eq(output);
      }
    });
  });
  describe('#parseUint40(bytes32,uint40)', () => {
    it('parses 5-byte segment from bytes at given offset and returns it as uint40', async () => {
      const sizeBytes = 5;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseUint40.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseBytes6(bytes32,bytes6)', () => {
    it('parses 6-byte segment from bytes at given offset and returns it as bytes6', async () => {
      const sizeBytes = 6;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseBytes6.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseInt48(bytes32,int48)', () => {
    it('parses 6-byte segment from bytes at given offset and returns it as int48', async () => {
      const sizeBytes = 6;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseInt48.staticCall(state, offset);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result).to.eq(output);
      }
    });
  });
  describe('#parseUint48(bytes32,uint48)', () => {
    it('parses 6-byte segment from bytes at given offset and returns it as uint48', async () => {
      const sizeBytes = 6;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseUint48.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseBytes7(bytes32,bytes7)', () => {
    it('parses 7-byte segment from bytes at given offset and returns it as bytes7', async () => {
      const sizeBytes = 7;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseBytes7.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseInt56(bytes32,int56)', () => {
    it('parses 7-byte segment from bytes at given offset and returns it as int56', async () => {
      const sizeBytes = 7;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseInt56.staticCall(state, offset);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result).to.eq(output);
      }
    });
  });
  describe('#parseUint56(bytes32,uint56)', () => {
    it('parses 7-byte segment from bytes at given offset and returns it as uint56', async () => {
      const sizeBytes = 7;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseUint56.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseBytes8(bytes32,bytes8)', () => {
    it('parses 8-byte segment from bytes at given offset and returns it as bytes8', async () => {
      const sizeBytes = 8;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseBytes8.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseInt64(bytes32,int64)', () => {
    it('parses 8-byte segment from bytes at given offset and returns it as int64', async () => {
      const sizeBytes = 8;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseInt64.staticCall(state, offset);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result).to.eq(output);
      }
    });
  });
  describe('#parseUint64(bytes32,uint64)', () => {
    it('parses 8-byte segment from bytes at given offset and returns it as uint64', async () => {
      const sizeBytes = 8;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseUint64.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseBytes9(bytes32,bytes9)', () => {
    it('parses 9-byte segment from bytes at given offset and returns it as bytes9', async () => {
      const sizeBytes = 9;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseBytes9.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseInt72(bytes32,int72)', () => {
    it('parses 9-byte segment from bytes at given offset and returns it as int72', async () => {
      const sizeBytes = 9;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseInt72.staticCall(state, offset);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result).to.eq(output);
      }
    });
  });
  describe('#parseUint72(bytes32,uint72)', () => {
    it('parses 9-byte segment from bytes at given offset and returns it as uint72', async () => {
      const sizeBytes = 9;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseUint72.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseBytes10(bytes32,bytes10)', () => {
    it('parses 10-byte segment from bytes at given offset and returns it as bytes10', async () => {
      const sizeBytes = 10;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseBytes10.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseInt80(bytes32,int80)', () => {
    it('parses 10-byte segment from bytes at given offset and returns it as int80', async () => {
      const sizeBytes = 10;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseInt80.staticCall(state, offset);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result).to.eq(output);
      }
    });
  });
  describe('#parseUint80(bytes32,uint80)', () => {
    it('parses 10-byte segment from bytes at given offset and returns it as uint80', async () => {
      const sizeBytes = 10;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseUint80.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseBytes11(bytes32,bytes11)', () => {
    it('parses 11-byte segment from bytes at given offset and returns it as bytes11', async () => {
      const sizeBytes = 11;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseBytes11.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseInt88(bytes32,int88)', () => {
    it('parses 11-byte segment from bytes at given offset and returns it as int88', async () => {
      const sizeBytes = 11;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseInt88.staticCall(state, offset);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result).to.eq(output);
      }
    });
  });
  describe('#parseUint88(bytes32,uint88)', () => {
    it('parses 11-byte segment from bytes at given offset and returns it as uint88', async () => {
      const sizeBytes = 11;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseUint88.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseBytes12(bytes32,bytes12)', () => {
    it('parses 12-byte segment from bytes at given offset and returns it as bytes12', async () => {
      const sizeBytes = 12;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseBytes12.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseInt96(bytes32,int96)', () => {
    it('parses 12-byte segment from bytes at given offset and returns it as int96', async () => {
      const sizeBytes = 12;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseInt96.staticCall(state, offset);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result).to.eq(output);
      }
    });
  });
  describe('#parseUint96(bytes32,uint96)', () => {
    it('parses 12-byte segment from bytes at given offset and returns it as uint96', async () => {
      const sizeBytes = 12;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseUint96.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseBytes13(bytes32,bytes13)', () => {
    it('parses 13-byte segment from bytes at given offset and returns it as bytes13', async () => {
      const sizeBytes = 13;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseBytes13.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseInt104(bytes32,int104)', () => {
    it('parses 13-byte segment from bytes at given offset and returns it as int104', async () => {
      const sizeBytes = 13;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseInt104.staticCall(state, offset);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result).to.eq(output);
      }
    });
  });
  describe('#parseUint104(bytes32,uint104)', () => {
    it('parses 13-byte segment from bytes at given offset and returns it as uint104', async () => {
      const sizeBytes = 13;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseUint104.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseBytes14(bytes32,bytes14)', () => {
    it('parses 14-byte segment from bytes at given offset and returns it as bytes14', async () => {
      const sizeBytes = 14;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseBytes14.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseInt112(bytes32,int112)', () => {
    it('parses 14-byte segment from bytes at given offset and returns it as int112', async () => {
      const sizeBytes = 14;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseInt112.staticCall(state, offset);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result).to.eq(output);
      }
    });
  });
  describe('#parseUint112(bytes32,uint112)', () => {
    it('parses 14-byte segment from bytes at given offset and returns it as uint112', async () => {
      const sizeBytes = 14;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseUint112.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseBytes15(bytes32,bytes15)', () => {
    it('parses 15-byte segment from bytes at given offset and returns it as bytes15', async () => {
      const sizeBytes = 15;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseBytes15.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseInt120(bytes32,int120)', () => {
    it('parses 15-byte segment from bytes at given offset and returns it as int120', async () => {
      const sizeBytes = 15;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseInt120.staticCall(state, offset);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result).to.eq(output);
      }
    });
  });
  describe('#parseUint120(bytes32,uint120)', () => {
    it('parses 15-byte segment from bytes at given offset and returns it as uint120', async () => {
      const sizeBytes = 15;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseUint120.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseBytes16(bytes32,bytes16)', () => {
    it('parses 16-byte segment from bytes at given offset and returns it as bytes16', async () => {
      const sizeBytes = 16;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseBytes16.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseInt128(bytes32,int128)', () => {
    it('parses 16-byte segment from bytes at given offset and returns it as int128', async () => {
      const sizeBytes = 16;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseInt128.staticCall(state, offset);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result).to.eq(output);
      }
    });
  });
  describe('#parseUint128(bytes32,uint128)', () => {
    it('parses 16-byte segment from bytes at given offset and returns it as uint128', async () => {
      const sizeBytes = 16;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseUint128.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseBytes17(bytes32,bytes17)', () => {
    it('parses 17-byte segment from bytes at given offset and returns it as bytes17', async () => {
      const sizeBytes = 17;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseBytes17.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseInt136(bytes32,int136)', () => {
    it('parses 17-byte segment from bytes at given offset and returns it as int136', async () => {
      const sizeBytes = 17;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseInt136.staticCall(state, offset);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result).to.eq(output);
      }
    });
  });
  describe('#parseUint136(bytes32,uint136)', () => {
    it('parses 17-byte segment from bytes at given offset and returns it as uint136', async () => {
      const sizeBytes = 17;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseUint136.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseBytes18(bytes32,bytes18)', () => {
    it('parses 18-byte segment from bytes at given offset and returns it as bytes18', async () => {
      const sizeBytes = 18;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseBytes18.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseInt144(bytes32,int144)', () => {
    it('parses 18-byte segment from bytes at given offset and returns it as int144', async () => {
      const sizeBytes = 18;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseInt144.staticCall(state, offset);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result).to.eq(output);
      }
    });
  });
  describe('#parseUint144(bytes32,uint144)', () => {
    it('parses 18-byte segment from bytes at given offset and returns it as uint144', async () => {
      const sizeBytes = 18;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseUint144.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseBytes19(bytes32,bytes19)', () => {
    it('parses 19-byte segment from bytes at given offset and returns it as bytes19', async () => {
      const sizeBytes = 19;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseBytes19.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseInt152(bytes32,int152)', () => {
    it('parses 19-byte segment from bytes at given offset and returns it as int152', async () => {
      const sizeBytes = 19;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseInt152.staticCall(state, offset);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result).to.eq(output);
      }
    });
  });
  describe('#parseUint152(bytes32,uint152)', () => {
    it('parses 19-byte segment from bytes at given offset and returns it as uint152', async () => {
      const sizeBytes = 19;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseUint152.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseBytes20(bytes32,bytes20)', () => {
    it('parses 20-byte segment from bytes at given offset and returns it as bytes20', async () => {
      const sizeBytes = 20;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseBytes20.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseInt160(bytes32,int160)', () => {
    it('parses 20-byte segment from bytes at given offset and returns it as int160', async () => {
      const sizeBytes = 20;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseInt160.staticCall(state, offset);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result).to.eq(output);
      }
    });
  });
  describe('#parseUint160(bytes32,uint160)', () => {
    it('parses 20-byte segment from bytes at given offset and returns it as uint160', async () => {
      const sizeBytes = 20;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseUint160.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseAddress(bytes32,address)', () => {
    it('parses 20-byte segment from bytes at given offset and returns it as address', async () => {
      const sizeBytes = 20;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseAddress.staticCall(state, offset);

        expect(result).to.eq(ethers.getAddress(expectedValue));
      }
    });
  });
  describe('#parseBytes21(bytes32,bytes21)', () => {
    it('parses 21-byte segment from bytes at given offset and returns it as bytes21', async () => {
      const sizeBytes = 21;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseBytes21.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseInt168(bytes32,int168)', () => {
    it('parses 21-byte segment from bytes at given offset and returns it as int168', async () => {
      const sizeBytes = 21;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseInt168.staticCall(state, offset);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result).to.eq(output);
      }
    });
  });
  describe('#parseUint168(bytes32,uint168)', () => {
    it('parses 21-byte segment from bytes at given offset and returns it as uint168', async () => {
      const sizeBytes = 21;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseUint168.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseBytes22(bytes32,bytes22)', () => {
    it('parses 22-byte segment from bytes at given offset and returns it as bytes22', async () => {
      const sizeBytes = 22;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseBytes22.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseInt176(bytes32,int176)', () => {
    it('parses 22-byte segment from bytes at given offset and returns it as int176', async () => {
      const sizeBytes = 22;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseInt176.staticCall(state, offset);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result).to.eq(output);
      }
    });
  });
  describe('#parseUint176(bytes32,uint176)', () => {
    it('parses 22-byte segment from bytes at given offset and returns it as uint176', async () => {
      const sizeBytes = 22;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseUint176.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseBytes23(bytes32,bytes23)', () => {
    it('parses 23-byte segment from bytes at given offset and returns it as bytes23', async () => {
      const sizeBytes = 23;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseBytes23.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseInt184(bytes32,int184)', () => {
    it('parses 23-byte segment from bytes at given offset and returns it as int184', async () => {
      const sizeBytes = 23;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseInt184.staticCall(state, offset);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result).to.eq(output);
      }
    });
  });
  describe('#parseUint184(bytes32,uint184)', () => {
    it('parses 23-byte segment from bytes at given offset and returns it as uint184', async () => {
      const sizeBytes = 23;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseUint184.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseBytes24(bytes32,bytes24)', () => {
    it('parses 24-byte segment from bytes at given offset and returns it as bytes24', async () => {
      const sizeBytes = 24;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseBytes24.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseInt192(bytes32,int192)', () => {
    it('parses 24-byte segment from bytes at given offset and returns it as int192', async () => {
      const sizeBytes = 24;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseInt192.staticCall(state, offset);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result).to.eq(output);
      }
    });
  });
  describe('#parseUint192(bytes32,uint192)', () => {
    it('parses 24-byte segment from bytes at given offset and returns it as uint192', async () => {
      const sizeBytes = 24;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseUint192.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseBytes25(bytes32,bytes25)', () => {
    it('parses 25-byte segment from bytes at given offset and returns it as bytes25', async () => {
      const sizeBytes = 25;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseBytes25.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseInt200(bytes32,int200)', () => {
    it('parses 25-byte segment from bytes at given offset and returns it as int200', async () => {
      const sizeBytes = 25;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseInt200.staticCall(state, offset);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result).to.eq(output);
      }
    });
  });
  describe('#parseUint200(bytes32,uint200)', () => {
    it('parses 25-byte segment from bytes at given offset and returns it as uint200', async () => {
      const sizeBytes = 25;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseUint200.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseBytes26(bytes32,bytes26)', () => {
    it('parses 26-byte segment from bytes at given offset and returns it as bytes26', async () => {
      const sizeBytes = 26;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseBytes26.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseInt208(bytes32,int208)', () => {
    it('parses 26-byte segment from bytes at given offset and returns it as int208', async () => {
      const sizeBytes = 26;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseInt208.staticCall(state, offset);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result).to.eq(output);
      }
    });
  });
  describe('#parseUint208(bytes32,uint208)', () => {
    it('parses 26-byte segment from bytes at given offset and returns it as uint208', async () => {
      const sizeBytes = 26;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseUint208.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseBytes27(bytes32,bytes27)', () => {
    it('parses 27-byte segment from bytes at given offset and returns it as bytes27', async () => {
      const sizeBytes = 27;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseBytes27.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseInt216(bytes32,int216)', () => {
    it('parses 27-byte segment from bytes at given offset and returns it as int216', async () => {
      const sizeBytes = 27;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseInt216.staticCall(state, offset);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result).to.eq(output);
      }
    });
  });
  describe('#parseUint216(bytes32,uint216)', () => {
    it('parses 27-byte segment from bytes at given offset and returns it as uint216', async () => {
      const sizeBytes = 27;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseUint216.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseBytes28(bytes32,bytes28)', () => {
    it('parses 28-byte segment from bytes at given offset and returns it as bytes28', async () => {
      const sizeBytes = 28;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseBytes28.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseInt224(bytes32,int224)', () => {
    it('parses 28-byte segment from bytes at given offset and returns it as int224', async () => {
      const sizeBytes = 28;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseInt224.staticCall(state, offset);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result).to.eq(output);
      }
    });
  });
  describe('#parseUint224(bytes32,uint224)', () => {
    it('parses 28-byte segment from bytes at given offset and returns it as uint224', async () => {
      const sizeBytes = 28;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseUint224.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseBytes29(bytes32,bytes29)', () => {
    it('parses 29-byte segment from bytes at given offset and returns it as bytes29', async () => {
      const sizeBytes = 29;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseBytes29.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseInt232(bytes32,int232)', () => {
    it('parses 29-byte segment from bytes at given offset and returns it as int232', async () => {
      const sizeBytes = 29;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseInt232.staticCall(state, offset);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result).to.eq(output);
      }
    });
  });
  describe('#parseUint232(bytes32,uint232)', () => {
    it('parses 29-byte segment from bytes at given offset and returns it as uint232', async () => {
      const sizeBytes = 29;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseUint232.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseBytes30(bytes32,bytes30)', () => {
    it('parses 30-byte segment from bytes at given offset and returns it as bytes30', async () => {
      const sizeBytes = 30;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseBytes30.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseInt240(bytes32,int240)', () => {
    it('parses 30-byte segment from bytes at given offset and returns it as int240', async () => {
      const sizeBytes = 30;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseInt240.staticCall(state, offset);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result).to.eq(output);
      }
    });
  });
  describe('#parseUint240(bytes32,uint240)', () => {
    it('parses 30-byte segment from bytes at given offset and returns it as uint240', async () => {
      const sizeBytes = 30;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseUint240.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseBytes31(bytes32,bytes31)', () => {
    it('parses 31-byte segment from bytes at given offset and returns it as bytes31', async () => {
      const sizeBytes = 31;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseBytes31.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseInt248(bytes32,int248)', () => {
    it('parses 31-byte segment from bytes at given offset and returns it as int248', async () => {
      const sizeBytes = 31;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseInt248.staticCall(state, offset);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result).to.eq(output);
      }
    });
  });
  describe('#parseUint248(bytes32,uint248)', () => {
    it('parses 31-byte segment from bytes at given offset and returns it as uint248', async () => {
      const sizeBytes = 31;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseUint248.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseBytes32(bytes32,bytes32)', () => {
    it('parses 32-byte segment from bytes at given offset and returns it as bytes32', async () => {
      const sizeBytes = 32;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseBytes32.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });
  describe('#parseInt256(bytes32,int256)', () => {
    it('parses 32-byte segment from bytes at given offset and returns it as int256', async () => {
      const sizeBytes = 32;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseInt256.staticCall(state, offset);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result).to.eq(output);
      }
    });
  });
  describe('#parseUint256(bytes32,uint256)', () => {
    it('parses 32-byte segment from bytes at given offset and returns it as uint256', async () => {
      const sizeBytes = 32;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const expectedValue = ethers.hexlify(ethers.randomBytes(sizeBytes));
        const offset = i * 8;

        const state = {
          _data: ethers.zeroPadValue(
            ethers.concat([
              expectedValue,
              ethers.hexlify(ethers.randomBytes(i)),
            ]),
            32,
          ),
          _size: 256,
        };

        const result = await instance.parseUint256.staticCall(state, offset);

        expect(result).to.eq(expectedValue);
      }
    });
  });

  describe('#insertBytes1(bytes32,bytes1)', () => {
    it('inserts bytes1 at given offset', async () => {
      const sizeBytes = 1;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertBytes1.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertInt8(bytes32,int8)', () => {
    it('inserts int8 at given offset', async () => {
      const sizeBytes = 1;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertInt8.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertUint8(bytes32,uint8)', () => {
    it('inserts uint8 at given offset', async () => {
      const sizeBytes = 1;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertUint8.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertBool(bytes32,bool)', () => {
    it('inserts bool at given offset', async () => {
      const sizeBytes = 1;
      const data = '0x01';
      const input = true;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertBool.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertBytes2(bytes32,bytes2)', () => {
    it('inserts bytes2 at given offset', async () => {
      const sizeBytes = 2;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertBytes2.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertInt16(bytes32,int16)', () => {
    it('inserts int16 at given offset', async () => {
      const sizeBytes = 2;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertInt16.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertUint16(bytes32,uint16)', () => {
    it('inserts uint16 at given offset', async () => {
      const sizeBytes = 2;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertUint16.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertBytes3(bytes32,bytes3)', () => {
    it('inserts bytes3 at given offset', async () => {
      const sizeBytes = 3;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertBytes3.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertInt24(bytes32,int24)', () => {
    it('inserts int24 at given offset', async () => {
      const sizeBytes = 3;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertInt24.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertUint24(bytes32,uint24)', () => {
    it('inserts uint24 at given offset', async () => {
      const sizeBytes = 3;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertUint24.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertBytes4(bytes32,bytes4)', () => {
    it('inserts bytes4 at given offset', async () => {
      const sizeBytes = 4;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertBytes4.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertInt32(bytes32,int32)', () => {
    it('inserts int32 at given offset', async () => {
      const sizeBytes = 4;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertInt32.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertUint32(bytes32,uint32)', () => {
    it('inserts uint32 at given offset', async () => {
      const sizeBytes = 4;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertUint32.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertBytes5(bytes32,bytes5)', () => {
    it('inserts bytes5 at given offset', async () => {
      const sizeBytes = 5;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertBytes5.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertInt40(bytes32,int40)', () => {
    it('inserts int40 at given offset', async () => {
      const sizeBytes = 5;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertInt40.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertUint40(bytes32,uint40)', () => {
    it('inserts uint40 at given offset', async () => {
      const sizeBytes = 5;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertUint40.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertBytes6(bytes32,bytes6)', () => {
    it('inserts bytes6 at given offset', async () => {
      const sizeBytes = 6;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertBytes6.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertInt48(bytes32,int48)', () => {
    it('inserts int48 at given offset', async () => {
      const sizeBytes = 6;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertInt48.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertUint48(bytes32,uint48)', () => {
    it('inserts uint48 at given offset', async () => {
      const sizeBytes = 6;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertUint48.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertBytes7(bytes32,bytes7)', () => {
    it('inserts bytes7 at given offset', async () => {
      const sizeBytes = 7;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertBytes7.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertInt56(bytes32,int56)', () => {
    it('inserts int56 at given offset', async () => {
      const sizeBytes = 7;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertInt56.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertUint56(bytes32,uint56)', () => {
    it('inserts uint56 at given offset', async () => {
      const sizeBytes = 7;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertUint56.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertBytes8(bytes32,bytes8)', () => {
    it('inserts bytes8 at given offset', async () => {
      const sizeBytes = 8;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertBytes8.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertInt64(bytes32,int64)', () => {
    it('inserts int64 at given offset', async () => {
      const sizeBytes = 8;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertInt64.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertUint64(bytes32,uint64)', () => {
    it('inserts uint64 at given offset', async () => {
      const sizeBytes = 8;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertUint64.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertBytes9(bytes32,bytes9)', () => {
    it('inserts bytes9 at given offset', async () => {
      const sizeBytes = 9;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertBytes9.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertInt72(bytes32,int72)', () => {
    it('inserts int72 at given offset', async () => {
      const sizeBytes = 9;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertInt72.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertUint72(bytes32,uint72)', () => {
    it('inserts uint72 at given offset', async () => {
      const sizeBytes = 9;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertUint72.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertBytes10(bytes32,bytes10)', () => {
    it('inserts bytes10 at given offset', async () => {
      const sizeBytes = 10;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertBytes10.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertInt80(bytes32,int80)', () => {
    it('inserts int80 at given offset', async () => {
      const sizeBytes = 10;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertInt80.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertUint80(bytes32,uint80)', () => {
    it('inserts uint80 at given offset', async () => {
      const sizeBytes = 10;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertUint80.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertBytes11(bytes32,bytes11)', () => {
    it('inserts bytes11 at given offset', async () => {
      const sizeBytes = 11;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertBytes11.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertInt88(bytes32,int88)', () => {
    it('inserts int88 at given offset', async () => {
      const sizeBytes = 11;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertInt88.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertUint88(bytes32,uint88)', () => {
    it('inserts uint88 at given offset', async () => {
      const sizeBytes = 11;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertUint88.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertBytes12(bytes32,bytes12)', () => {
    it('inserts bytes12 at given offset', async () => {
      const sizeBytes = 12;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertBytes12.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertInt96(bytes32,int96)', () => {
    it('inserts int96 at given offset', async () => {
      const sizeBytes = 12;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertInt96.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertUint96(bytes32,uint96)', () => {
    it('inserts uint96 at given offset', async () => {
      const sizeBytes = 12;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertUint96.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertBytes13(bytes32,bytes13)', () => {
    it('inserts bytes13 at given offset', async () => {
      const sizeBytes = 13;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertBytes13.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertInt104(bytes32,int104)', () => {
    it('inserts int104 at given offset', async () => {
      const sizeBytes = 13;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertInt104.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertUint104(bytes32,uint104)', () => {
    it('inserts uint104 at given offset', async () => {
      const sizeBytes = 13;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertUint104.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertBytes14(bytes32,bytes14)', () => {
    it('inserts bytes14 at given offset', async () => {
      const sizeBytes = 14;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertBytes14.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertInt112(bytes32,int112)', () => {
    it('inserts int112 at given offset', async () => {
      const sizeBytes = 14;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertInt112.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertUint112(bytes32,uint112)', () => {
    it('inserts uint112 at given offset', async () => {
      const sizeBytes = 14;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertUint112.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertBytes15(bytes32,bytes15)', () => {
    it('inserts bytes15 at given offset', async () => {
      const sizeBytes = 15;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertBytes15.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertInt120(bytes32,int120)', () => {
    it('inserts int120 at given offset', async () => {
      const sizeBytes = 15;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertInt120.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertUint120(bytes32,uint120)', () => {
    it('inserts uint120 at given offset', async () => {
      const sizeBytes = 15;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertUint120.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertBytes16(bytes32,bytes16)', () => {
    it('inserts bytes16 at given offset', async () => {
      const sizeBytes = 16;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertBytes16.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertInt128(bytes32,int128)', () => {
    it('inserts int128 at given offset', async () => {
      const sizeBytes = 16;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertInt128.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertUint128(bytes32,uint128)', () => {
    it('inserts uint128 at given offset', async () => {
      const sizeBytes = 16;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertUint128.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertBytes17(bytes32,bytes17)', () => {
    it('inserts bytes17 at given offset', async () => {
      const sizeBytes = 17;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertBytes17.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertInt136(bytes32,int136)', () => {
    it('inserts int136 at given offset', async () => {
      const sizeBytes = 17;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertInt136.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertUint136(bytes32,uint136)', () => {
    it('inserts uint136 at given offset', async () => {
      const sizeBytes = 17;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertUint136.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertBytes18(bytes32,bytes18)', () => {
    it('inserts bytes18 at given offset', async () => {
      const sizeBytes = 18;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertBytes18.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertInt144(bytes32,int144)', () => {
    it('inserts int144 at given offset', async () => {
      const sizeBytes = 18;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertInt144.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertUint144(bytes32,uint144)', () => {
    it('inserts uint144 at given offset', async () => {
      const sizeBytes = 18;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertUint144.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertBytes19(bytes32,bytes19)', () => {
    it('inserts bytes19 at given offset', async () => {
      const sizeBytes = 19;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertBytes19.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertInt152(bytes32,int152)', () => {
    it('inserts int152 at given offset', async () => {
      const sizeBytes = 19;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertInt152.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertUint152(bytes32,uint152)', () => {
    it('inserts uint152 at given offset', async () => {
      const sizeBytes = 19;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertUint152.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertBytes20(bytes32,bytes20)', () => {
    it('inserts bytes20 at given offset', async () => {
      const sizeBytes = 20;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertBytes20.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertInt160(bytes32,int160)', () => {
    it('inserts int160 at given offset', async () => {
      const sizeBytes = 20;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertInt160.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertUint160(bytes32,uint160)', () => {
    it('inserts uint160 at given offset', async () => {
      const sizeBytes = 20;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertUint160.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertAddress(bytes32,address)', () => {
    it('inserts address at given offset', async () => {
      const sizeBytes = 20;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertAddress.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertBytes21(bytes32,bytes21)', () => {
    it('inserts bytes21 at given offset', async () => {
      const sizeBytes = 21;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertBytes21.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertInt168(bytes32,int168)', () => {
    it('inserts int168 at given offset', async () => {
      const sizeBytes = 21;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertInt168.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertUint168(bytes32,uint168)', () => {
    it('inserts uint168 at given offset', async () => {
      const sizeBytes = 21;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertUint168.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertBytes22(bytes32,bytes22)', () => {
    it('inserts bytes22 at given offset', async () => {
      const sizeBytes = 22;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertBytes22.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertInt176(bytes32,int176)', () => {
    it('inserts int176 at given offset', async () => {
      const sizeBytes = 22;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertInt176.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertUint176(bytes32,uint176)', () => {
    it('inserts uint176 at given offset', async () => {
      const sizeBytes = 22;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertUint176.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertBytes23(bytes32,bytes23)', () => {
    it('inserts bytes23 at given offset', async () => {
      const sizeBytes = 23;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertBytes23.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertInt184(bytes32,int184)', () => {
    it('inserts int184 at given offset', async () => {
      const sizeBytes = 23;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertInt184.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertUint184(bytes32,uint184)', () => {
    it('inserts uint184 at given offset', async () => {
      const sizeBytes = 23;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertUint184.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertBytes24(bytes32,bytes24)', () => {
    it('inserts bytes24 at given offset', async () => {
      const sizeBytes = 24;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertBytes24.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertInt192(bytes32,int192)', () => {
    it('inserts int192 at given offset', async () => {
      const sizeBytes = 24;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertInt192.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertUint192(bytes32,uint192)', () => {
    it('inserts uint192 at given offset', async () => {
      const sizeBytes = 24;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertUint192.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertBytes25(bytes32,bytes25)', () => {
    it('inserts bytes25 at given offset', async () => {
      const sizeBytes = 25;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertBytes25.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertInt200(bytes32,int200)', () => {
    it('inserts int200 at given offset', async () => {
      const sizeBytes = 25;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertInt200.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertUint200(bytes32,uint200)', () => {
    it('inserts uint200 at given offset', async () => {
      const sizeBytes = 25;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertUint200.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertBytes26(bytes32,bytes26)', () => {
    it('inserts bytes26 at given offset', async () => {
      const sizeBytes = 26;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertBytes26.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertInt208(bytes32,int208)', () => {
    it('inserts int208 at given offset', async () => {
      const sizeBytes = 26;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertInt208.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertUint208(bytes32,uint208)', () => {
    it('inserts uint208 at given offset', async () => {
      const sizeBytes = 26;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertUint208.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertBytes27(bytes32,bytes27)', () => {
    it('inserts bytes27 at given offset', async () => {
      const sizeBytes = 27;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertBytes27.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertInt216(bytes32,int216)', () => {
    it('inserts int216 at given offset', async () => {
      const sizeBytes = 27;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertInt216.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertUint216(bytes32,uint216)', () => {
    it('inserts uint216 at given offset', async () => {
      const sizeBytes = 27;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertUint216.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertBytes28(bytes32,bytes28)', () => {
    it('inserts bytes28 at given offset', async () => {
      const sizeBytes = 28;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertBytes28.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertInt224(bytes32,int224)', () => {
    it('inserts int224 at given offset', async () => {
      const sizeBytes = 28;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertInt224.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertUint224(bytes32,uint224)', () => {
    it('inserts uint224 at given offset', async () => {
      const sizeBytes = 28;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertUint224.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertBytes29(bytes32,bytes29)', () => {
    it('inserts bytes29 at given offset', async () => {
      const sizeBytes = 29;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertBytes29.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertInt232(bytes32,int232)', () => {
    it('inserts int232 at given offset', async () => {
      const sizeBytes = 29;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertInt232.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertUint232(bytes32,uint232)', () => {
    it('inserts uint232 at given offset', async () => {
      const sizeBytes = 29;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertUint232.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertBytes30(bytes32,bytes30)', () => {
    it('inserts bytes30 at given offset', async () => {
      const sizeBytes = 30;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertBytes30.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertInt240(bytes32,int240)', () => {
    it('inserts int240 at given offset', async () => {
      const sizeBytes = 30;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertInt240.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertUint240(bytes32,uint240)', () => {
    it('inserts uint240 at given offset', async () => {
      const sizeBytes = 30;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertUint240.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertBytes31(bytes32,bytes31)', () => {
    it('inserts bytes31 at given offset', async () => {
      const sizeBytes = 31;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertBytes31.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertInt248(bytes32,int248)', () => {
    it('inserts int248 at given offset', async () => {
      const sizeBytes = 31;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertInt248.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertUint248(bytes32,uint248)', () => {
    it('inserts uint248 at given offset', async () => {
      const sizeBytes = 31;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertUint248.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertBytes32(bytes32,bytes32)', () => {
    it('inserts bytes32 at given offset', async () => {
      const sizeBytes = 32;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertBytes32.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertInt256(bytes32,int256)', () => {
    it('inserts int256 at given offset', async () => {
      const sizeBytes = 32;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertInt256.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });
  describe('#insertUint256(bytes32,uint256)', () => {
    it('inserts uint256 at given offset', async () => {
      const sizeBytes = 32;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [0, 32, randomIndexNonInclusive(0, 32)]) {
        for (let j of [
          0,
          32 - sizeBytes,
          randomIndexNonInclusive(0, 32 - sizeBytes),
        ]) {
          const state = {
            _data: ethers.zeroPadValue(
              ethers.hexlify(ethers.randomBytes(i)),
              32,
            ),
            _size: i * 8,
          };

          const offset = j * 8;

          const expectedData = ethers.concat([
            ethers.dataSlice(state._data, 0, 32 - j - sizeBytes),
            data,
            ethers.dataSlice(state._data, 32 - j, 32),
          ]);
          const expectedLength = Math.max(state._size, offset + sizeBytes * 8);

          expect(
            await instance.insertUint256.staticCall(state, input, offset),
          ).to.deep.equal([expectedData, expectedLength]);
        }
      }
    });
  });

  describe('#pushBytes1(bytes32,bytes1)', () => {
    it('inserts bytes1 at end of bytes', async () => {
      const sizeBytes = 1;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushBytes1.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushInt8(bytes32,int8)', () => {
    it('inserts int8 at end of bytes', async () => {
      const sizeBytes = 1;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(await instance.pushInt8.staticCall(state, input)).to.deep.equal([
          expectedData,
          expectedLength,
        ]);
      }
    });
  });
  describe('#pushUint8(bytes32,uint8)', () => {
    it('inserts uint8 at end of bytes', async () => {
      const sizeBytes = 1;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(await instance.pushUint8.staticCall(state, input)).to.deep.equal(
          [expectedData, expectedLength],
        );
      }
    });
  });
  describe('#pushBool(bytes32,bool)', () => {
    it('inserts bool at end of bytes', async () => {
      const sizeBytes = 1;
      const data = '0x01';
      const input = true;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(await instance.pushBool.staticCall(state, input)).to.deep.equal([
          expectedData,
          expectedLength,
        ]);
      }
    });
  });
  describe('#pushBytes2(bytes32,bytes2)', () => {
    it('inserts bytes2 at end of bytes', async () => {
      const sizeBytes = 2;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushBytes2.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushInt16(bytes32,int16)', () => {
    it('inserts int16 at end of bytes', async () => {
      const sizeBytes = 2;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(await instance.pushInt16.staticCall(state, input)).to.deep.equal(
          [expectedData, expectedLength],
        );
      }
    });
  });
  describe('#pushUint16(bytes32,uint16)', () => {
    it('inserts uint16 at end of bytes', async () => {
      const sizeBytes = 2;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushUint16.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushBytes3(bytes32,bytes3)', () => {
    it('inserts bytes3 at end of bytes', async () => {
      const sizeBytes = 3;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushBytes3.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushInt24(bytes32,int24)', () => {
    it('inserts int24 at end of bytes', async () => {
      const sizeBytes = 3;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(await instance.pushInt24.staticCall(state, input)).to.deep.equal(
          [expectedData, expectedLength],
        );
      }
    });
  });
  describe('#pushUint24(bytes32,uint24)', () => {
    it('inserts uint24 at end of bytes', async () => {
      const sizeBytes = 3;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushUint24.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushBytes4(bytes32,bytes4)', () => {
    it('inserts bytes4 at end of bytes', async () => {
      const sizeBytes = 4;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushBytes4.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushInt32(bytes32,int32)', () => {
    it('inserts int32 at end of bytes', async () => {
      const sizeBytes = 4;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(await instance.pushInt32.staticCall(state, input)).to.deep.equal(
          [expectedData, expectedLength],
        );
      }
    });
  });
  describe('#pushUint32(bytes32,uint32)', () => {
    it('inserts uint32 at end of bytes', async () => {
      const sizeBytes = 4;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushUint32.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushBytes5(bytes32,bytes5)', () => {
    it('inserts bytes5 at end of bytes', async () => {
      const sizeBytes = 5;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushBytes5.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushInt40(bytes32,int40)', () => {
    it('inserts int40 at end of bytes', async () => {
      const sizeBytes = 5;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(await instance.pushInt40.staticCall(state, input)).to.deep.equal(
          [expectedData, expectedLength],
        );
      }
    });
  });
  describe('#pushUint40(bytes32,uint40)', () => {
    it('inserts uint40 at end of bytes', async () => {
      const sizeBytes = 5;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushUint40.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushBytes6(bytes32,bytes6)', () => {
    it('inserts bytes6 at end of bytes', async () => {
      const sizeBytes = 6;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushBytes6.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushInt48(bytes32,int48)', () => {
    it('inserts int48 at end of bytes', async () => {
      const sizeBytes = 6;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(await instance.pushInt48.staticCall(state, input)).to.deep.equal(
          [expectedData, expectedLength],
        );
      }
    });
  });
  describe('#pushUint48(bytes32,uint48)', () => {
    it('inserts uint48 at end of bytes', async () => {
      const sizeBytes = 6;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushUint48.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushBytes7(bytes32,bytes7)', () => {
    it('inserts bytes7 at end of bytes', async () => {
      const sizeBytes = 7;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushBytes7.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushInt56(bytes32,int56)', () => {
    it('inserts int56 at end of bytes', async () => {
      const sizeBytes = 7;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(await instance.pushInt56.staticCall(state, input)).to.deep.equal(
          [expectedData, expectedLength],
        );
      }
    });
  });
  describe('#pushUint56(bytes32,uint56)', () => {
    it('inserts uint56 at end of bytes', async () => {
      const sizeBytes = 7;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushUint56.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushBytes8(bytes32,bytes8)', () => {
    it('inserts bytes8 at end of bytes', async () => {
      const sizeBytes = 8;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushBytes8.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushInt64(bytes32,int64)', () => {
    it('inserts int64 at end of bytes', async () => {
      const sizeBytes = 8;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(await instance.pushInt64.staticCall(state, input)).to.deep.equal(
          [expectedData, expectedLength],
        );
      }
    });
  });
  describe('#pushUint64(bytes32,uint64)', () => {
    it('inserts uint64 at end of bytes', async () => {
      const sizeBytes = 8;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushUint64.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushBytes9(bytes32,bytes9)', () => {
    it('inserts bytes9 at end of bytes', async () => {
      const sizeBytes = 9;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushBytes9.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushInt72(bytes32,int72)', () => {
    it('inserts int72 at end of bytes', async () => {
      const sizeBytes = 9;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(await instance.pushInt72.staticCall(state, input)).to.deep.equal(
          [expectedData, expectedLength],
        );
      }
    });
  });
  describe('#pushUint72(bytes32,uint72)', () => {
    it('inserts uint72 at end of bytes', async () => {
      const sizeBytes = 9;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushUint72.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushBytes10(bytes32,bytes10)', () => {
    it('inserts bytes10 at end of bytes', async () => {
      const sizeBytes = 10;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushBytes10.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushInt80(bytes32,int80)', () => {
    it('inserts int80 at end of bytes', async () => {
      const sizeBytes = 10;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(await instance.pushInt80.staticCall(state, input)).to.deep.equal(
          [expectedData, expectedLength],
        );
      }
    });
  });
  describe('#pushUint80(bytes32,uint80)', () => {
    it('inserts uint80 at end of bytes', async () => {
      const sizeBytes = 10;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushUint80.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushBytes11(bytes32,bytes11)', () => {
    it('inserts bytes11 at end of bytes', async () => {
      const sizeBytes = 11;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushBytes11.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushInt88(bytes32,int88)', () => {
    it('inserts int88 at end of bytes', async () => {
      const sizeBytes = 11;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(await instance.pushInt88.staticCall(state, input)).to.deep.equal(
          [expectedData, expectedLength],
        );
      }
    });
  });
  describe('#pushUint88(bytes32,uint88)', () => {
    it('inserts uint88 at end of bytes', async () => {
      const sizeBytes = 11;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushUint88.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushBytes12(bytes32,bytes12)', () => {
    it('inserts bytes12 at end of bytes', async () => {
      const sizeBytes = 12;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushBytes12.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushInt96(bytes32,int96)', () => {
    it('inserts int96 at end of bytes', async () => {
      const sizeBytes = 12;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(await instance.pushInt96.staticCall(state, input)).to.deep.equal(
          [expectedData, expectedLength],
        );
      }
    });
  });
  describe('#pushUint96(bytes32,uint96)', () => {
    it('inserts uint96 at end of bytes', async () => {
      const sizeBytes = 12;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushUint96.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushBytes13(bytes32,bytes13)', () => {
    it('inserts bytes13 at end of bytes', async () => {
      const sizeBytes = 13;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushBytes13.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushInt104(bytes32,int104)', () => {
    it('inserts int104 at end of bytes', async () => {
      const sizeBytes = 13;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushInt104.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushUint104(bytes32,uint104)', () => {
    it('inserts uint104 at end of bytes', async () => {
      const sizeBytes = 13;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushUint104.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushBytes14(bytes32,bytes14)', () => {
    it('inserts bytes14 at end of bytes', async () => {
      const sizeBytes = 14;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushBytes14.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushInt112(bytes32,int112)', () => {
    it('inserts int112 at end of bytes', async () => {
      const sizeBytes = 14;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushInt112.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushUint112(bytes32,uint112)', () => {
    it('inserts uint112 at end of bytes', async () => {
      const sizeBytes = 14;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushUint112.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushBytes15(bytes32,bytes15)', () => {
    it('inserts bytes15 at end of bytes', async () => {
      const sizeBytes = 15;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushBytes15.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushInt120(bytes32,int120)', () => {
    it('inserts int120 at end of bytes', async () => {
      const sizeBytes = 15;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushInt120.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushUint120(bytes32,uint120)', () => {
    it('inserts uint120 at end of bytes', async () => {
      const sizeBytes = 15;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushUint120.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushBytes16(bytes32,bytes16)', () => {
    it('inserts bytes16 at end of bytes', async () => {
      const sizeBytes = 16;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushBytes16.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushInt128(bytes32,int128)', () => {
    it('inserts int128 at end of bytes', async () => {
      const sizeBytes = 16;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushInt128.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushUint128(bytes32,uint128)', () => {
    it('inserts uint128 at end of bytes', async () => {
      const sizeBytes = 16;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushUint128.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushBytes17(bytes32,bytes17)', () => {
    it('inserts bytes17 at end of bytes', async () => {
      const sizeBytes = 17;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushBytes17.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushInt136(bytes32,int136)', () => {
    it('inserts int136 at end of bytes', async () => {
      const sizeBytes = 17;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushInt136.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushUint136(bytes32,uint136)', () => {
    it('inserts uint136 at end of bytes', async () => {
      const sizeBytes = 17;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushUint136.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushBytes18(bytes32,bytes18)', () => {
    it('inserts bytes18 at end of bytes', async () => {
      const sizeBytes = 18;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushBytes18.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushInt144(bytes32,int144)', () => {
    it('inserts int144 at end of bytes', async () => {
      const sizeBytes = 18;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushInt144.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushUint144(bytes32,uint144)', () => {
    it('inserts uint144 at end of bytes', async () => {
      const sizeBytes = 18;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushUint144.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushBytes19(bytes32,bytes19)', () => {
    it('inserts bytes19 at end of bytes', async () => {
      const sizeBytes = 19;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushBytes19.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushInt152(bytes32,int152)', () => {
    it('inserts int152 at end of bytes', async () => {
      const sizeBytes = 19;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushInt152.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushUint152(bytes32,uint152)', () => {
    it('inserts uint152 at end of bytes', async () => {
      const sizeBytes = 19;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushUint152.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushBytes20(bytes32,bytes20)', () => {
    it('inserts bytes20 at end of bytes', async () => {
      const sizeBytes = 20;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushBytes20.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushInt160(bytes32,int160)', () => {
    it('inserts int160 at end of bytes', async () => {
      const sizeBytes = 20;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushInt160.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushUint160(bytes32,uint160)', () => {
    it('inserts uint160 at end of bytes', async () => {
      const sizeBytes = 20;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushUint160.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushAddress(bytes32,address)', () => {
    it('inserts address at end of bytes', async () => {
      const sizeBytes = 20;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushAddress.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushBytes21(bytes32,bytes21)', () => {
    it('inserts bytes21 at end of bytes', async () => {
      const sizeBytes = 21;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushBytes21.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushInt168(bytes32,int168)', () => {
    it('inserts int168 at end of bytes', async () => {
      const sizeBytes = 21;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushInt168.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushUint168(bytes32,uint168)', () => {
    it('inserts uint168 at end of bytes', async () => {
      const sizeBytes = 21;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushUint168.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushBytes22(bytes32,bytes22)', () => {
    it('inserts bytes22 at end of bytes', async () => {
      const sizeBytes = 22;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushBytes22.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushInt176(bytes32,int176)', () => {
    it('inserts int176 at end of bytes', async () => {
      const sizeBytes = 22;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushInt176.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushUint176(bytes32,uint176)', () => {
    it('inserts uint176 at end of bytes', async () => {
      const sizeBytes = 22;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushUint176.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushBytes23(bytes32,bytes23)', () => {
    it('inserts bytes23 at end of bytes', async () => {
      const sizeBytes = 23;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushBytes23.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushInt184(bytes32,int184)', () => {
    it('inserts int184 at end of bytes', async () => {
      const sizeBytes = 23;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushInt184.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushUint184(bytes32,uint184)', () => {
    it('inserts uint184 at end of bytes', async () => {
      const sizeBytes = 23;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushUint184.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushBytes24(bytes32,bytes24)', () => {
    it('inserts bytes24 at end of bytes', async () => {
      const sizeBytes = 24;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushBytes24.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushInt192(bytes32,int192)', () => {
    it('inserts int192 at end of bytes', async () => {
      const sizeBytes = 24;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushInt192.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushUint192(bytes32,uint192)', () => {
    it('inserts uint192 at end of bytes', async () => {
      const sizeBytes = 24;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushUint192.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushBytes25(bytes32,bytes25)', () => {
    it('inserts bytes25 at end of bytes', async () => {
      const sizeBytes = 25;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushBytes25.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushInt200(bytes32,int200)', () => {
    it('inserts int200 at end of bytes', async () => {
      const sizeBytes = 25;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushInt200.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushUint200(bytes32,uint200)', () => {
    it('inserts uint200 at end of bytes', async () => {
      const sizeBytes = 25;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushUint200.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushBytes26(bytes32,bytes26)', () => {
    it('inserts bytes26 at end of bytes', async () => {
      const sizeBytes = 26;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushBytes26.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushInt208(bytes32,int208)', () => {
    it('inserts int208 at end of bytes', async () => {
      const sizeBytes = 26;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushInt208.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushUint208(bytes32,uint208)', () => {
    it('inserts uint208 at end of bytes', async () => {
      const sizeBytes = 26;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushUint208.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushBytes27(bytes32,bytes27)', () => {
    it('inserts bytes27 at end of bytes', async () => {
      const sizeBytes = 27;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushBytes27.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushInt216(bytes32,int216)', () => {
    it('inserts int216 at end of bytes', async () => {
      const sizeBytes = 27;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushInt216.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushUint216(bytes32,uint216)', () => {
    it('inserts uint216 at end of bytes', async () => {
      const sizeBytes = 27;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushUint216.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushBytes28(bytes32,bytes28)', () => {
    it('inserts bytes28 at end of bytes', async () => {
      const sizeBytes = 28;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushBytes28.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushInt224(bytes32,int224)', () => {
    it('inserts int224 at end of bytes', async () => {
      const sizeBytes = 28;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushInt224.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushUint224(bytes32,uint224)', () => {
    it('inserts uint224 at end of bytes', async () => {
      const sizeBytes = 28;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushUint224.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushBytes29(bytes32,bytes29)', () => {
    it('inserts bytes29 at end of bytes', async () => {
      const sizeBytes = 29;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushBytes29.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushInt232(bytes32,int232)', () => {
    it('inserts int232 at end of bytes', async () => {
      const sizeBytes = 29;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushInt232.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushUint232(bytes32,uint232)', () => {
    it('inserts uint232 at end of bytes', async () => {
      const sizeBytes = 29;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushUint232.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushBytes30(bytes32,bytes30)', () => {
    it('inserts bytes30 at end of bytes', async () => {
      const sizeBytes = 30;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushBytes30.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushInt240(bytes32,int240)', () => {
    it('inserts int240 at end of bytes', async () => {
      const sizeBytes = 30;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushInt240.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushUint240(bytes32,uint240)', () => {
    it('inserts uint240 at end of bytes', async () => {
      const sizeBytes = 30;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushUint240.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushBytes31(bytes32,bytes31)', () => {
    it('inserts bytes31 at end of bytes', async () => {
      const sizeBytes = 31;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushBytes31.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushInt248(bytes32,int248)', () => {
    it('inserts int248 at end of bytes', async () => {
      const sizeBytes = 31;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushInt248.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushUint248(bytes32,uint248)', () => {
    it('inserts uint248 at end of bytes', async () => {
      const sizeBytes = 31;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushUint248.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushBytes32(bytes32,bytes32)', () => {
    it('inserts bytes32 at end of bytes', async () => {
      const sizeBytes = 32;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushBytes32.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushInt256(bytes32,int256)', () => {
    it('inserts int256 at end of bytes', async () => {
      const sizeBytes = 32;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushInt256.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#pushUint256(bytes32,uint256)', () => {
    it('inserts uint256 at end of bytes', async () => {
      const sizeBytes = 32;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            data,
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.pushUint256.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });

  describe('#popBytes1(bytes32,bytes1)', () => {
    it('removes 1-byte segment from end of bytes and returns it as bytes1', async () => {
      const sizeBytes = 1;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popBytes1.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popInt8(bytes32,int8)', () => {
    it('removes 1-byte segment from end of bytes and returns it as int8', async () => {
      const sizeBytes = 1;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popInt8.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#popUint8(bytes32,uint8)', () => {
    it('removes 1-byte segment from end of bytes and returns it as uint8', async () => {
      const sizeBytes = 1;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popUint8.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popBool(bytes32,bool)', () => {
    it('removes 1-byte segment from end of bytes and returns it as bool', async () => {
      const sizeBytes = 1;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popBool.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(!!BigInt(expectedValue));
      }
    });
  });
  describe('#popBytes2(bytes32,bytes2)', () => {
    it('removes 2-byte segment from end of bytes and returns it as bytes2', async () => {
      const sizeBytes = 2;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popBytes2.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popInt16(bytes32,int16)', () => {
    it('removes 2-byte segment from end of bytes and returns it as int16', async () => {
      const sizeBytes = 2;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popInt16.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#popUint16(bytes32,uint16)', () => {
    it('removes 2-byte segment from end of bytes and returns it as uint16', async () => {
      const sizeBytes = 2;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popUint16.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popBytes3(bytes32,bytes3)', () => {
    it('removes 3-byte segment from end of bytes and returns it as bytes3', async () => {
      const sizeBytes = 3;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popBytes3.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popInt24(bytes32,int24)', () => {
    it('removes 3-byte segment from end of bytes and returns it as int24', async () => {
      const sizeBytes = 3;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popInt24.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#popUint24(bytes32,uint24)', () => {
    it('removes 3-byte segment from end of bytes and returns it as uint24', async () => {
      const sizeBytes = 3;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popUint24.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popBytes4(bytes32,bytes4)', () => {
    it('removes 4-byte segment from end of bytes and returns it as bytes4', async () => {
      const sizeBytes = 4;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popBytes4.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popInt32(bytes32,int32)', () => {
    it('removes 4-byte segment from end of bytes and returns it as int32', async () => {
      const sizeBytes = 4;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popInt32.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#popUint32(bytes32,uint32)', () => {
    it('removes 4-byte segment from end of bytes and returns it as uint32', async () => {
      const sizeBytes = 4;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popUint32.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popBytes5(bytes32,bytes5)', () => {
    it('removes 5-byte segment from end of bytes and returns it as bytes5', async () => {
      const sizeBytes = 5;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popBytes5.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popInt40(bytes32,int40)', () => {
    it('removes 5-byte segment from end of bytes and returns it as int40', async () => {
      const sizeBytes = 5;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popInt40.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#popUint40(bytes32,uint40)', () => {
    it('removes 5-byte segment from end of bytes and returns it as uint40', async () => {
      const sizeBytes = 5;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popUint40.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popBytes6(bytes32,bytes6)', () => {
    it('removes 6-byte segment from end of bytes and returns it as bytes6', async () => {
      const sizeBytes = 6;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popBytes6.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popInt48(bytes32,int48)', () => {
    it('removes 6-byte segment from end of bytes and returns it as int48', async () => {
      const sizeBytes = 6;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popInt48.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#popUint48(bytes32,uint48)', () => {
    it('removes 6-byte segment from end of bytes and returns it as uint48', async () => {
      const sizeBytes = 6;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popUint48.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popBytes7(bytes32,bytes7)', () => {
    it('removes 7-byte segment from end of bytes and returns it as bytes7', async () => {
      const sizeBytes = 7;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popBytes7.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popInt56(bytes32,int56)', () => {
    it('removes 7-byte segment from end of bytes and returns it as int56', async () => {
      const sizeBytes = 7;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popInt56.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#popUint56(bytes32,uint56)', () => {
    it('removes 7-byte segment from end of bytes and returns it as uint56', async () => {
      const sizeBytes = 7;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popUint56.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popBytes8(bytes32,bytes8)', () => {
    it('removes 8-byte segment from end of bytes and returns it as bytes8', async () => {
      const sizeBytes = 8;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popBytes8.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popInt64(bytes32,int64)', () => {
    it('removes 8-byte segment from end of bytes and returns it as int64', async () => {
      const sizeBytes = 8;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popInt64.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#popUint64(bytes32,uint64)', () => {
    it('removes 8-byte segment from end of bytes and returns it as uint64', async () => {
      const sizeBytes = 8;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popUint64.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popBytes9(bytes32,bytes9)', () => {
    it('removes 9-byte segment from end of bytes and returns it as bytes9', async () => {
      const sizeBytes = 9;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popBytes9.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popInt72(bytes32,int72)', () => {
    it('removes 9-byte segment from end of bytes and returns it as int72', async () => {
      const sizeBytes = 9;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popInt72.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#popUint72(bytes32,uint72)', () => {
    it('removes 9-byte segment from end of bytes and returns it as uint72', async () => {
      const sizeBytes = 9;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popUint72.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popBytes10(bytes32,bytes10)', () => {
    it('removes 10-byte segment from end of bytes and returns it as bytes10', async () => {
      const sizeBytes = 10;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popBytes10.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popInt80(bytes32,int80)', () => {
    it('removes 10-byte segment from end of bytes and returns it as int80', async () => {
      const sizeBytes = 10;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popInt80.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#popUint80(bytes32,uint80)', () => {
    it('removes 10-byte segment from end of bytes and returns it as uint80', async () => {
      const sizeBytes = 10;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popUint80.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popBytes11(bytes32,bytes11)', () => {
    it('removes 11-byte segment from end of bytes and returns it as bytes11', async () => {
      const sizeBytes = 11;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popBytes11.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popInt88(bytes32,int88)', () => {
    it('removes 11-byte segment from end of bytes and returns it as int88', async () => {
      const sizeBytes = 11;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popInt88.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#popUint88(bytes32,uint88)', () => {
    it('removes 11-byte segment from end of bytes and returns it as uint88', async () => {
      const sizeBytes = 11;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popUint88.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popBytes12(bytes32,bytes12)', () => {
    it('removes 12-byte segment from end of bytes and returns it as bytes12', async () => {
      const sizeBytes = 12;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popBytes12.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popInt96(bytes32,int96)', () => {
    it('removes 12-byte segment from end of bytes and returns it as int96', async () => {
      const sizeBytes = 12;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popInt96.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#popUint96(bytes32,uint96)', () => {
    it('removes 12-byte segment from end of bytes and returns it as uint96', async () => {
      const sizeBytes = 12;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popUint96.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popBytes13(bytes32,bytes13)', () => {
    it('removes 13-byte segment from end of bytes and returns it as bytes13', async () => {
      const sizeBytes = 13;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popBytes13.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popInt104(bytes32,int104)', () => {
    it('removes 13-byte segment from end of bytes and returns it as int104', async () => {
      const sizeBytes = 13;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popInt104.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#popUint104(bytes32,uint104)', () => {
    it('removes 13-byte segment from end of bytes and returns it as uint104', async () => {
      const sizeBytes = 13;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popUint104.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popBytes14(bytes32,bytes14)', () => {
    it('removes 14-byte segment from end of bytes and returns it as bytes14', async () => {
      const sizeBytes = 14;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popBytes14.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popInt112(bytes32,int112)', () => {
    it('removes 14-byte segment from end of bytes and returns it as int112', async () => {
      const sizeBytes = 14;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popInt112.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#popUint112(bytes32,uint112)', () => {
    it('removes 14-byte segment from end of bytes and returns it as uint112', async () => {
      const sizeBytes = 14;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popUint112.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popBytes15(bytes32,bytes15)', () => {
    it('removes 15-byte segment from end of bytes and returns it as bytes15', async () => {
      const sizeBytes = 15;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popBytes15.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popInt120(bytes32,int120)', () => {
    it('removes 15-byte segment from end of bytes and returns it as int120', async () => {
      const sizeBytes = 15;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popInt120.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#popUint120(bytes32,uint120)', () => {
    it('removes 15-byte segment from end of bytes and returns it as uint120', async () => {
      const sizeBytes = 15;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popUint120.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popBytes16(bytes32,bytes16)', () => {
    it('removes 16-byte segment from end of bytes and returns it as bytes16', async () => {
      const sizeBytes = 16;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popBytes16.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popInt128(bytes32,int128)', () => {
    it('removes 16-byte segment from end of bytes and returns it as int128', async () => {
      const sizeBytes = 16;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popInt128.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#popUint128(bytes32,uint128)', () => {
    it('removes 16-byte segment from end of bytes and returns it as uint128', async () => {
      const sizeBytes = 16;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popUint128.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popBytes17(bytes32,bytes17)', () => {
    it('removes 17-byte segment from end of bytes and returns it as bytes17', async () => {
      const sizeBytes = 17;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popBytes17.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popInt136(bytes32,int136)', () => {
    it('removes 17-byte segment from end of bytes and returns it as int136', async () => {
      const sizeBytes = 17;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popInt136.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#popUint136(bytes32,uint136)', () => {
    it('removes 17-byte segment from end of bytes and returns it as uint136', async () => {
      const sizeBytes = 17;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popUint136.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popBytes18(bytes32,bytes18)', () => {
    it('removes 18-byte segment from end of bytes and returns it as bytes18', async () => {
      const sizeBytes = 18;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popBytes18.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popInt144(bytes32,int144)', () => {
    it('removes 18-byte segment from end of bytes and returns it as int144', async () => {
      const sizeBytes = 18;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popInt144.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#popUint144(bytes32,uint144)', () => {
    it('removes 18-byte segment from end of bytes and returns it as uint144', async () => {
      const sizeBytes = 18;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popUint144.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popBytes19(bytes32,bytes19)', () => {
    it('removes 19-byte segment from end of bytes and returns it as bytes19', async () => {
      const sizeBytes = 19;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popBytes19.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popInt152(bytes32,int152)', () => {
    it('removes 19-byte segment from end of bytes and returns it as int152', async () => {
      const sizeBytes = 19;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popInt152.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#popUint152(bytes32,uint152)', () => {
    it('removes 19-byte segment from end of bytes and returns it as uint152', async () => {
      const sizeBytes = 19;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popUint152.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popBytes20(bytes32,bytes20)', () => {
    it('removes 20-byte segment from end of bytes and returns it as bytes20', async () => {
      const sizeBytes = 20;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popBytes20.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popInt160(bytes32,int160)', () => {
    it('removes 20-byte segment from end of bytes and returns it as int160', async () => {
      const sizeBytes = 20;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popInt160.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#popUint160(bytes32,uint160)', () => {
    it('removes 20-byte segment from end of bytes and returns it as uint160', async () => {
      const sizeBytes = 20;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popUint160.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popAddress(bytes32,address)', () => {
    it('removes 20-byte segment from end of bytes and returns it as address', async () => {
      const sizeBytes = 20;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popAddress.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(ethers.getAddress(expectedValue));
      }
    });
  });
  describe('#popBytes21(bytes32,bytes21)', () => {
    it('removes 21-byte segment from end of bytes and returns it as bytes21', async () => {
      const sizeBytes = 21;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popBytes21.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popInt168(bytes32,int168)', () => {
    it('removes 21-byte segment from end of bytes and returns it as int168', async () => {
      const sizeBytes = 21;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popInt168.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#popUint168(bytes32,uint168)', () => {
    it('removes 21-byte segment from end of bytes and returns it as uint168', async () => {
      const sizeBytes = 21;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popUint168.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popBytes22(bytes32,bytes22)', () => {
    it('removes 22-byte segment from end of bytes and returns it as bytes22', async () => {
      const sizeBytes = 22;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popBytes22.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popInt176(bytes32,int176)', () => {
    it('removes 22-byte segment from end of bytes and returns it as int176', async () => {
      const sizeBytes = 22;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popInt176.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#popUint176(bytes32,uint176)', () => {
    it('removes 22-byte segment from end of bytes and returns it as uint176', async () => {
      const sizeBytes = 22;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popUint176.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popBytes23(bytes32,bytes23)', () => {
    it('removes 23-byte segment from end of bytes and returns it as bytes23', async () => {
      const sizeBytes = 23;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popBytes23.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popInt184(bytes32,int184)', () => {
    it('removes 23-byte segment from end of bytes and returns it as int184', async () => {
      const sizeBytes = 23;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popInt184.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#popUint184(bytes32,uint184)', () => {
    it('removes 23-byte segment from end of bytes and returns it as uint184', async () => {
      const sizeBytes = 23;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popUint184.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popBytes24(bytes32,bytes24)', () => {
    it('removes 24-byte segment from end of bytes and returns it as bytes24', async () => {
      const sizeBytes = 24;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popBytes24.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popInt192(bytes32,int192)', () => {
    it('removes 24-byte segment from end of bytes and returns it as int192', async () => {
      const sizeBytes = 24;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popInt192.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#popUint192(bytes32,uint192)', () => {
    it('removes 24-byte segment from end of bytes and returns it as uint192', async () => {
      const sizeBytes = 24;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popUint192.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popBytes25(bytes32,bytes25)', () => {
    it('removes 25-byte segment from end of bytes and returns it as bytes25', async () => {
      const sizeBytes = 25;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popBytes25.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popInt200(bytes32,int200)', () => {
    it('removes 25-byte segment from end of bytes and returns it as int200', async () => {
      const sizeBytes = 25;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popInt200.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#popUint200(bytes32,uint200)', () => {
    it('removes 25-byte segment from end of bytes and returns it as uint200', async () => {
      const sizeBytes = 25;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popUint200.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popBytes26(bytes32,bytes26)', () => {
    it('removes 26-byte segment from end of bytes and returns it as bytes26', async () => {
      const sizeBytes = 26;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popBytes26.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popInt208(bytes32,int208)', () => {
    it('removes 26-byte segment from end of bytes and returns it as int208', async () => {
      const sizeBytes = 26;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popInt208.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#popUint208(bytes32,uint208)', () => {
    it('removes 26-byte segment from end of bytes and returns it as uint208', async () => {
      const sizeBytes = 26;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popUint208.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popBytes27(bytes32,bytes27)', () => {
    it('removes 27-byte segment from end of bytes and returns it as bytes27', async () => {
      const sizeBytes = 27;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popBytes27.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popInt216(bytes32,int216)', () => {
    it('removes 27-byte segment from end of bytes and returns it as int216', async () => {
      const sizeBytes = 27;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popInt216.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#popUint216(bytes32,uint216)', () => {
    it('removes 27-byte segment from end of bytes and returns it as uint216', async () => {
      const sizeBytes = 27;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popUint216.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popBytes28(bytes32,bytes28)', () => {
    it('removes 28-byte segment from end of bytes and returns it as bytes28', async () => {
      const sizeBytes = 28;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popBytes28.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popInt224(bytes32,int224)', () => {
    it('removes 28-byte segment from end of bytes and returns it as int224', async () => {
      const sizeBytes = 28;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popInt224.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#popUint224(bytes32,uint224)', () => {
    it('removes 28-byte segment from end of bytes and returns it as uint224', async () => {
      const sizeBytes = 28;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popUint224.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popBytes29(bytes32,bytes29)', () => {
    it('removes 29-byte segment from end of bytes and returns it as bytes29', async () => {
      const sizeBytes = 29;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popBytes29.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popInt232(bytes32,int232)', () => {
    it('removes 29-byte segment from end of bytes and returns it as int232', async () => {
      const sizeBytes = 29;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popInt232.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#popUint232(bytes32,uint232)', () => {
    it('removes 29-byte segment from end of bytes and returns it as uint232', async () => {
      const sizeBytes = 29;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popUint232.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popBytes30(bytes32,bytes30)', () => {
    it('removes 30-byte segment from end of bytes and returns it as bytes30', async () => {
      const sizeBytes = 30;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popBytes30.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popInt240(bytes32,int240)', () => {
    it('removes 30-byte segment from end of bytes and returns it as int240', async () => {
      const sizeBytes = 30;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popInt240.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#popUint240(bytes32,uint240)', () => {
    it('removes 30-byte segment from end of bytes and returns it as uint240', async () => {
      const sizeBytes = 30;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popUint240.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popBytes31(bytes32,bytes31)', () => {
    it('removes 31-byte segment from end of bytes and returns it as bytes31', async () => {
      const sizeBytes = 31;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popBytes31.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popInt248(bytes32,int248)', () => {
    it('removes 31-byte segment from end of bytes and returns it as int248', async () => {
      const sizeBytes = 31;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popInt248.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#popUint248(bytes32,uint248)', () => {
    it('removes 31-byte segment from end of bytes and returns it as uint248', async () => {
      const sizeBytes = 31;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popUint248.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popBytes32(bytes32,bytes32)', () => {
    it('removes 32-byte segment from end of bytes and returns it as bytes32', async () => {
      const sizeBytes = 32;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popBytes32.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#popInt256(bytes32,int256)', () => {
    it('removes 32-byte segment from end of bytes and returns it as int256', async () => {
      const sizeBytes = 32;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popInt256.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#popUint256(bytes32,uint256)', () => {
    it('removes 32-byte segment from end of bytes and returns it as uint256', async () => {
      const sizeBytes = 32;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 32 - expectedLength / 8, 32),
          32,
        );
        const expectedValue = ethers.dataSlice(
          state._data,
          32 - expectedLength / 8 - sizeBytes,
          32 - expectedLength / 8,
        );

        const result = await instance.popUint256.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });

  describe('#shiftBytes1(bytes32,bytes1)', () => {
    it('removes 1-byte segment from beginning of bytes and returns it as bytes1', async () => {
      const sizeBytes = 1;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftBytes1.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftInt8(bytes32,int8)', () => {
    it('removes 1-byte segment from beginning of bytes and returns it as int8', async () => {
      const sizeBytes = 1;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftInt8.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#shiftUint8(bytes32,uint8)', () => {
    it('removes 1-byte segment from beginning of bytes and returns it as uint8', async () => {
      const sizeBytes = 1;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftUint8.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftBool(bytes32,bool)', () => {
    it('removes 1-byte segment from beginning of bytes and returns it as bool', async () => {
      const sizeBytes = 1;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftBool.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(!!BigInt(expectedValue));
      }
    });
  });
  describe('#shiftBytes2(bytes32,bytes2)', () => {
    it('removes 2-byte segment from beginning of bytes and returns it as bytes2', async () => {
      const sizeBytes = 2;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftBytes2.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftInt16(bytes32,int16)', () => {
    it('removes 2-byte segment from beginning of bytes and returns it as int16', async () => {
      const sizeBytes = 2;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftInt16.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#shiftUint16(bytes32,uint16)', () => {
    it('removes 2-byte segment from beginning of bytes and returns it as uint16', async () => {
      const sizeBytes = 2;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftUint16.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftBytes3(bytes32,bytes3)', () => {
    it('removes 3-byte segment from beginning of bytes and returns it as bytes3', async () => {
      const sizeBytes = 3;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftBytes3.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftInt24(bytes32,int24)', () => {
    it('removes 3-byte segment from beginning of bytes and returns it as int24', async () => {
      const sizeBytes = 3;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftInt24.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#shiftUint24(bytes32,uint24)', () => {
    it('removes 3-byte segment from beginning of bytes and returns it as uint24', async () => {
      const sizeBytes = 3;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftUint24.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftBytes4(bytes32,bytes4)', () => {
    it('removes 4-byte segment from beginning of bytes and returns it as bytes4', async () => {
      const sizeBytes = 4;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftBytes4.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftInt32(bytes32,int32)', () => {
    it('removes 4-byte segment from beginning of bytes and returns it as int32', async () => {
      const sizeBytes = 4;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftInt32.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#shiftUint32(bytes32,uint32)', () => {
    it('removes 4-byte segment from beginning of bytes and returns it as uint32', async () => {
      const sizeBytes = 4;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftUint32.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftBytes5(bytes32,bytes5)', () => {
    it('removes 5-byte segment from beginning of bytes and returns it as bytes5', async () => {
      const sizeBytes = 5;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftBytes5.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftInt40(bytes32,int40)', () => {
    it('removes 5-byte segment from beginning of bytes and returns it as int40', async () => {
      const sizeBytes = 5;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftInt40.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#shiftUint40(bytes32,uint40)', () => {
    it('removes 5-byte segment from beginning of bytes and returns it as uint40', async () => {
      const sizeBytes = 5;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftUint40.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftBytes6(bytes32,bytes6)', () => {
    it('removes 6-byte segment from beginning of bytes and returns it as bytes6', async () => {
      const sizeBytes = 6;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftBytes6.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftInt48(bytes32,int48)', () => {
    it('removes 6-byte segment from beginning of bytes and returns it as int48', async () => {
      const sizeBytes = 6;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftInt48.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#shiftUint48(bytes32,uint48)', () => {
    it('removes 6-byte segment from beginning of bytes and returns it as uint48', async () => {
      const sizeBytes = 6;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftUint48.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftBytes7(bytes32,bytes7)', () => {
    it('removes 7-byte segment from beginning of bytes and returns it as bytes7', async () => {
      const sizeBytes = 7;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftBytes7.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftInt56(bytes32,int56)', () => {
    it('removes 7-byte segment from beginning of bytes and returns it as int56', async () => {
      const sizeBytes = 7;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftInt56.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#shiftUint56(bytes32,uint56)', () => {
    it('removes 7-byte segment from beginning of bytes and returns it as uint56', async () => {
      const sizeBytes = 7;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftUint56.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftBytes8(bytes32,bytes8)', () => {
    it('removes 8-byte segment from beginning of bytes and returns it as bytes8', async () => {
      const sizeBytes = 8;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftBytes8.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftInt64(bytes32,int64)', () => {
    it('removes 8-byte segment from beginning of bytes and returns it as int64', async () => {
      const sizeBytes = 8;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftInt64.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#shiftUint64(bytes32,uint64)', () => {
    it('removes 8-byte segment from beginning of bytes and returns it as uint64', async () => {
      const sizeBytes = 8;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftUint64.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftBytes9(bytes32,bytes9)', () => {
    it('removes 9-byte segment from beginning of bytes and returns it as bytes9', async () => {
      const sizeBytes = 9;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftBytes9.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftInt72(bytes32,int72)', () => {
    it('removes 9-byte segment from beginning of bytes and returns it as int72', async () => {
      const sizeBytes = 9;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftInt72.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#shiftUint72(bytes32,uint72)', () => {
    it('removes 9-byte segment from beginning of bytes and returns it as uint72', async () => {
      const sizeBytes = 9;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftUint72.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftBytes10(bytes32,bytes10)', () => {
    it('removes 10-byte segment from beginning of bytes and returns it as bytes10', async () => {
      const sizeBytes = 10;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftBytes10.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftInt80(bytes32,int80)', () => {
    it('removes 10-byte segment from beginning of bytes and returns it as int80', async () => {
      const sizeBytes = 10;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftInt80.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#shiftUint80(bytes32,uint80)', () => {
    it('removes 10-byte segment from beginning of bytes and returns it as uint80', async () => {
      const sizeBytes = 10;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftUint80.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftBytes11(bytes32,bytes11)', () => {
    it('removes 11-byte segment from beginning of bytes and returns it as bytes11', async () => {
      const sizeBytes = 11;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftBytes11.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftInt88(bytes32,int88)', () => {
    it('removes 11-byte segment from beginning of bytes and returns it as int88', async () => {
      const sizeBytes = 11;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftInt88.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#shiftUint88(bytes32,uint88)', () => {
    it('removes 11-byte segment from beginning of bytes and returns it as uint88', async () => {
      const sizeBytes = 11;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftUint88.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftBytes12(bytes32,bytes12)', () => {
    it('removes 12-byte segment from beginning of bytes and returns it as bytes12', async () => {
      const sizeBytes = 12;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftBytes12.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftInt96(bytes32,int96)', () => {
    it('removes 12-byte segment from beginning of bytes and returns it as int96', async () => {
      const sizeBytes = 12;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftInt96.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#shiftUint96(bytes32,uint96)', () => {
    it('removes 12-byte segment from beginning of bytes and returns it as uint96', async () => {
      const sizeBytes = 12;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftUint96.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftBytes13(bytes32,bytes13)', () => {
    it('removes 13-byte segment from beginning of bytes and returns it as bytes13', async () => {
      const sizeBytes = 13;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftBytes13.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftInt104(bytes32,int104)', () => {
    it('removes 13-byte segment from beginning of bytes and returns it as int104', async () => {
      const sizeBytes = 13;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftInt104.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#shiftUint104(bytes32,uint104)', () => {
    it('removes 13-byte segment from beginning of bytes and returns it as uint104', async () => {
      const sizeBytes = 13;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftUint104.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftBytes14(bytes32,bytes14)', () => {
    it('removes 14-byte segment from beginning of bytes and returns it as bytes14', async () => {
      const sizeBytes = 14;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftBytes14.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftInt112(bytes32,int112)', () => {
    it('removes 14-byte segment from beginning of bytes and returns it as int112', async () => {
      const sizeBytes = 14;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftInt112.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#shiftUint112(bytes32,uint112)', () => {
    it('removes 14-byte segment from beginning of bytes and returns it as uint112', async () => {
      const sizeBytes = 14;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftUint112.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftBytes15(bytes32,bytes15)', () => {
    it('removes 15-byte segment from beginning of bytes and returns it as bytes15', async () => {
      const sizeBytes = 15;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftBytes15.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftInt120(bytes32,int120)', () => {
    it('removes 15-byte segment from beginning of bytes and returns it as int120', async () => {
      const sizeBytes = 15;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftInt120.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#shiftUint120(bytes32,uint120)', () => {
    it('removes 15-byte segment from beginning of bytes and returns it as uint120', async () => {
      const sizeBytes = 15;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftUint120.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftBytes16(bytes32,bytes16)', () => {
    it('removes 16-byte segment from beginning of bytes and returns it as bytes16', async () => {
      const sizeBytes = 16;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftBytes16.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftInt128(bytes32,int128)', () => {
    it('removes 16-byte segment from beginning of bytes and returns it as int128', async () => {
      const sizeBytes = 16;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftInt128.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#shiftUint128(bytes32,uint128)', () => {
    it('removes 16-byte segment from beginning of bytes and returns it as uint128', async () => {
      const sizeBytes = 16;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftUint128.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftBytes17(bytes32,bytes17)', () => {
    it('removes 17-byte segment from beginning of bytes and returns it as bytes17', async () => {
      const sizeBytes = 17;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftBytes17.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftInt136(bytes32,int136)', () => {
    it('removes 17-byte segment from beginning of bytes and returns it as int136', async () => {
      const sizeBytes = 17;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftInt136.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#shiftUint136(bytes32,uint136)', () => {
    it('removes 17-byte segment from beginning of bytes and returns it as uint136', async () => {
      const sizeBytes = 17;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftUint136.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftBytes18(bytes32,bytes18)', () => {
    it('removes 18-byte segment from beginning of bytes and returns it as bytes18', async () => {
      const sizeBytes = 18;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftBytes18.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftInt144(bytes32,int144)', () => {
    it('removes 18-byte segment from beginning of bytes and returns it as int144', async () => {
      const sizeBytes = 18;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftInt144.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#shiftUint144(bytes32,uint144)', () => {
    it('removes 18-byte segment from beginning of bytes and returns it as uint144', async () => {
      const sizeBytes = 18;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftUint144.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftBytes19(bytes32,bytes19)', () => {
    it('removes 19-byte segment from beginning of bytes and returns it as bytes19', async () => {
      const sizeBytes = 19;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftBytes19.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftInt152(bytes32,int152)', () => {
    it('removes 19-byte segment from beginning of bytes and returns it as int152', async () => {
      const sizeBytes = 19;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftInt152.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#shiftUint152(bytes32,uint152)', () => {
    it('removes 19-byte segment from beginning of bytes and returns it as uint152', async () => {
      const sizeBytes = 19;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftUint152.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftBytes20(bytes32,bytes20)', () => {
    it('removes 20-byte segment from beginning of bytes and returns it as bytes20', async () => {
      const sizeBytes = 20;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftBytes20.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftInt160(bytes32,int160)', () => {
    it('removes 20-byte segment from beginning of bytes and returns it as int160', async () => {
      const sizeBytes = 20;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftInt160.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#shiftUint160(bytes32,uint160)', () => {
    it('removes 20-byte segment from beginning of bytes and returns it as uint160', async () => {
      const sizeBytes = 20;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftUint160.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftAddress(bytes32,address)', () => {
    it('removes 20-byte segment from beginning of bytes and returns it as address', async () => {
      const sizeBytes = 20;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftAddress.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(ethers.getAddress(expectedValue));
      }
    });
  });
  describe('#shiftBytes21(bytes32,bytes21)', () => {
    it('removes 21-byte segment from beginning of bytes and returns it as bytes21', async () => {
      const sizeBytes = 21;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftBytes21.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftInt168(bytes32,int168)', () => {
    it('removes 21-byte segment from beginning of bytes and returns it as int168', async () => {
      const sizeBytes = 21;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftInt168.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#shiftUint168(bytes32,uint168)', () => {
    it('removes 21-byte segment from beginning of bytes and returns it as uint168', async () => {
      const sizeBytes = 21;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftUint168.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftBytes22(bytes32,bytes22)', () => {
    it('removes 22-byte segment from beginning of bytes and returns it as bytes22', async () => {
      const sizeBytes = 22;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftBytes22.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftInt176(bytes32,int176)', () => {
    it('removes 22-byte segment from beginning of bytes and returns it as int176', async () => {
      const sizeBytes = 22;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftInt176.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#shiftUint176(bytes32,uint176)', () => {
    it('removes 22-byte segment from beginning of bytes and returns it as uint176', async () => {
      const sizeBytes = 22;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftUint176.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftBytes23(bytes32,bytes23)', () => {
    it('removes 23-byte segment from beginning of bytes and returns it as bytes23', async () => {
      const sizeBytes = 23;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftBytes23.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftInt184(bytes32,int184)', () => {
    it('removes 23-byte segment from beginning of bytes and returns it as int184', async () => {
      const sizeBytes = 23;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftInt184.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#shiftUint184(bytes32,uint184)', () => {
    it('removes 23-byte segment from beginning of bytes and returns it as uint184', async () => {
      const sizeBytes = 23;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftUint184.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftBytes24(bytes32,bytes24)', () => {
    it('removes 24-byte segment from beginning of bytes and returns it as bytes24', async () => {
      const sizeBytes = 24;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftBytes24.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftInt192(bytes32,int192)', () => {
    it('removes 24-byte segment from beginning of bytes and returns it as int192', async () => {
      const sizeBytes = 24;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftInt192.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#shiftUint192(bytes32,uint192)', () => {
    it('removes 24-byte segment from beginning of bytes and returns it as uint192', async () => {
      const sizeBytes = 24;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftUint192.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftBytes25(bytes32,bytes25)', () => {
    it('removes 25-byte segment from beginning of bytes and returns it as bytes25', async () => {
      const sizeBytes = 25;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftBytes25.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftInt200(bytes32,int200)', () => {
    it('removes 25-byte segment from beginning of bytes and returns it as int200', async () => {
      const sizeBytes = 25;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftInt200.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#shiftUint200(bytes32,uint200)', () => {
    it('removes 25-byte segment from beginning of bytes and returns it as uint200', async () => {
      const sizeBytes = 25;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftUint200.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftBytes26(bytes32,bytes26)', () => {
    it('removes 26-byte segment from beginning of bytes and returns it as bytes26', async () => {
      const sizeBytes = 26;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftBytes26.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftInt208(bytes32,int208)', () => {
    it('removes 26-byte segment from beginning of bytes and returns it as int208', async () => {
      const sizeBytes = 26;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftInt208.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#shiftUint208(bytes32,uint208)', () => {
    it('removes 26-byte segment from beginning of bytes and returns it as uint208', async () => {
      const sizeBytes = 26;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftUint208.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftBytes27(bytes32,bytes27)', () => {
    it('removes 27-byte segment from beginning of bytes and returns it as bytes27', async () => {
      const sizeBytes = 27;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftBytes27.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftInt216(bytes32,int216)', () => {
    it('removes 27-byte segment from beginning of bytes and returns it as int216', async () => {
      const sizeBytes = 27;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftInt216.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#shiftUint216(bytes32,uint216)', () => {
    it('removes 27-byte segment from beginning of bytes and returns it as uint216', async () => {
      const sizeBytes = 27;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftUint216.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftBytes28(bytes32,bytes28)', () => {
    it('removes 28-byte segment from beginning of bytes and returns it as bytes28', async () => {
      const sizeBytes = 28;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftBytes28.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftInt224(bytes32,int224)', () => {
    it('removes 28-byte segment from beginning of bytes and returns it as int224', async () => {
      const sizeBytes = 28;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftInt224.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#shiftUint224(bytes32,uint224)', () => {
    it('removes 28-byte segment from beginning of bytes and returns it as uint224', async () => {
      const sizeBytes = 28;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftUint224.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftBytes29(bytes32,bytes29)', () => {
    it('removes 29-byte segment from beginning of bytes and returns it as bytes29', async () => {
      const sizeBytes = 29;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftBytes29.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftInt232(bytes32,int232)', () => {
    it('removes 29-byte segment from beginning of bytes and returns it as int232', async () => {
      const sizeBytes = 29;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftInt232.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#shiftUint232(bytes32,uint232)', () => {
    it('removes 29-byte segment from beginning of bytes and returns it as uint232', async () => {
      const sizeBytes = 29;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftUint232.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftBytes30(bytes32,bytes30)', () => {
    it('removes 30-byte segment from beginning of bytes and returns it as bytes30', async () => {
      const sizeBytes = 30;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftBytes30.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftInt240(bytes32,int240)', () => {
    it('removes 30-byte segment from beginning of bytes and returns it as int240', async () => {
      const sizeBytes = 30;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftInt240.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#shiftUint240(bytes32,uint240)', () => {
    it('removes 30-byte segment from beginning of bytes and returns it as uint240', async () => {
      const sizeBytes = 30;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftUint240.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftBytes31(bytes32,bytes31)', () => {
    it('removes 31-byte segment from beginning of bytes and returns it as bytes31', async () => {
      const sizeBytes = 31;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftBytes31.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftInt248(bytes32,int248)', () => {
    it('removes 31-byte segment from beginning of bytes and returns it as int248', async () => {
      const sizeBytes = 31;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftInt248.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#shiftUint248(bytes32,uint248)', () => {
    it('removes 31-byte segment from beginning of bytes and returns it as uint248', async () => {
      const sizeBytes = 31;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftUint248.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftBytes32(bytes32,bytes32)', () => {
    it('removes 32-byte segment from beginning of bytes and returns it as bytes32', async () => {
      const sizeBytes = 32;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftBytes32.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });
  describe('#shiftInt256(bytes32,int256)', () => {
    it('removes 32-byte segment from beginning of bytes and returns it as int256', async () => {
      const sizeBytes = 32;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftInt256.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        const negative =
          BigInt(expectedValue) >> BigInt(sizeBytes * 8 - 1) === 1n;
        let output;
        if (negative) {
          output = -(2n ** BigInt(sizeBytes * 8) - BigInt(expectedValue));
        } else {
          output = BigInt(expectedValue);
        }

        expect(result[1]).to.eq(output);
      }
    });
  });
  describe('#shiftUint256(bytes32,uint256)', () => {
    it('removes 32-byte segment from beginning of bytes and returns it as uint256', async () => {
      const sizeBytes = 32;

      for (let i of [sizeBytes, 32, randomIndexNonInclusive(sizeBytes, 32)]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedLength = state._size - sizeBytes * 8;
        const expectedData = ethers.zeroPadValue(
          ethers.dataSlice(state._data, 0, 32 - sizeBytes),
          32,
        );
        const expectedValue = ethers.dataSlice(state._data, 32 - sizeBytes, 32);

        const result = await instance.shiftUint256.staticCall(state);

        expect(result[0]).to.deep.equal([expectedData, expectedLength]);

        expect(result[1]).to.eq(expectedValue);
      }
    });
  });

  describe('#unshiftBytes1(bytes32,bytes1)', () => {
    it('inserts bytes1 at beginning of bytes', async () => {
      const sizeBytes = 1;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftBytes1.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftInt8(bytes32,int8)', () => {
    it('inserts int8 at beginning of bytes', async () => {
      const sizeBytes = 1;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftInt8.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftUint8(bytes32,uint8)', () => {
    it('inserts uint8 at beginning of bytes', async () => {
      const sizeBytes = 1;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftUint8.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftBool(bytes32,bool)', () => {
    it('inserts bool at beginning of bytes', async () => {
      const sizeBytes = 1;
      const data = '0x01';
      const input = true;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftBool.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftBytes2(bytes32,bytes2)', () => {
    it('inserts bytes2 at beginning of bytes', async () => {
      const sizeBytes = 2;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftBytes2.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftInt16(bytes32,int16)', () => {
    it('inserts int16 at beginning of bytes', async () => {
      const sizeBytes = 2;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftInt16.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftUint16(bytes32,uint16)', () => {
    it('inserts uint16 at beginning of bytes', async () => {
      const sizeBytes = 2;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftUint16.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftBytes3(bytes32,bytes3)', () => {
    it('inserts bytes3 at beginning of bytes', async () => {
      const sizeBytes = 3;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftBytes3.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftInt24(bytes32,int24)', () => {
    it('inserts int24 at beginning of bytes', async () => {
      const sizeBytes = 3;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftInt24.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftUint24(bytes32,uint24)', () => {
    it('inserts uint24 at beginning of bytes', async () => {
      const sizeBytes = 3;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftUint24.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftBytes4(bytes32,bytes4)', () => {
    it('inserts bytes4 at beginning of bytes', async () => {
      const sizeBytes = 4;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftBytes4.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftInt32(bytes32,int32)', () => {
    it('inserts int32 at beginning of bytes', async () => {
      const sizeBytes = 4;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftInt32.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftUint32(bytes32,uint32)', () => {
    it('inserts uint32 at beginning of bytes', async () => {
      const sizeBytes = 4;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftUint32.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftBytes5(bytes32,bytes5)', () => {
    it('inserts bytes5 at beginning of bytes', async () => {
      const sizeBytes = 5;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftBytes5.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftInt40(bytes32,int40)', () => {
    it('inserts int40 at beginning of bytes', async () => {
      const sizeBytes = 5;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftInt40.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftUint40(bytes32,uint40)', () => {
    it('inserts uint40 at beginning of bytes', async () => {
      const sizeBytes = 5;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftUint40.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftBytes6(bytes32,bytes6)', () => {
    it('inserts bytes6 at beginning of bytes', async () => {
      const sizeBytes = 6;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftBytes6.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftInt48(bytes32,int48)', () => {
    it('inserts int48 at beginning of bytes', async () => {
      const sizeBytes = 6;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftInt48.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftUint48(bytes32,uint48)', () => {
    it('inserts uint48 at beginning of bytes', async () => {
      const sizeBytes = 6;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftUint48.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftBytes7(bytes32,bytes7)', () => {
    it('inserts bytes7 at beginning of bytes', async () => {
      const sizeBytes = 7;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftBytes7.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftInt56(bytes32,int56)', () => {
    it('inserts int56 at beginning of bytes', async () => {
      const sizeBytes = 7;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftInt56.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftUint56(bytes32,uint56)', () => {
    it('inserts uint56 at beginning of bytes', async () => {
      const sizeBytes = 7;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftUint56.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftBytes8(bytes32,bytes8)', () => {
    it('inserts bytes8 at beginning of bytes', async () => {
      const sizeBytes = 8;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftBytes8.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftInt64(bytes32,int64)', () => {
    it('inserts int64 at beginning of bytes', async () => {
      const sizeBytes = 8;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftInt64.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftUint64(bytes32,uint64)', () => {
    it('inserts uint64 at beginning of bytes', async () => {
      const sizeBytes = 8;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftUint64.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftBytes9(bytes32,bytes9)', () => {
    it('inserts bytes9 at beginning of bytes', async () => {
      const sizeBytes = 9;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftBytes9.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftInt72(bytes32,int72)', () => {
    it('inserts int72 at beginning of bytes', async () => {
      const sizeBytes = 9;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftInt72.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftUint72(bytes32,uint72)', () => {
    it('inserts uint72 at beginning of bytes', async () => {
      const sizeBytes = 9;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftUint72.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftBytes10(bytes32,bytes10)', () => {
    it('inserts bytes10 at beginning of bytes', async () => {
      const sizeBytes = 10;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftBytes10.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftInt80(bytes32,int80)', () => {
    it('inserts int80 at beginning of bytes', async () => {
      const sizeBytes = 10;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftInt80.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftUint80(bytes32,uint80)', () => {
    it('inserts uint80 at beginning of bytes', async () => {
      const sizeBytes = 10;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftUint80.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftBytes11(bytes32,bytes11)', () => {
    it('inserts bytes11 at beginning of bytes', async () => {
      const sizeBytes = 11;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftBytes11.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftInt88(bytes32,int88)', () => {
    it('inserts int88 at beginning of bytes', async () => {
      const sizeBytes = 11;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftInt88.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftUint88(bytes32,uint88)', () => {
    it('inserts uint88 at beginning of bytes', async () => {
      const sizeBytes = 11;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftUint88.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftBytes12(bytes32,bytes12)', () => {
    it('inserts bytes12 at beginning of bytes', async () => {
      const sizeBytes = 12;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftBytes12.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftInt96(bytes32,int96)', () => {
    it('inserts int96 at beginning of bytes', async () => {
      const sizeBytes = 12;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftInt96.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftUint96(bytes32,uint96)', () => {
    it('inserts uint96 at beginning of bytes', async () => {
      const sizeBytes = 12;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftUint96.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftBytes13(bytes32,bytes13)', () => {
    it('inserts bytes13 at beginning of bytes', async () => {
      const sizeBytes = 13;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftBytes13.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftInt104(bytes32,int104)', () => {
    it('inserts int104 at beginning of bytes', async () => {
      const sizeBytes = 13;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftInt104.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftUint104(bytes32,uint104)', () => {
    it('inserts uint104 at beginning of bytes', async () => {
      const sizeBytes = 13;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftUint104.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftBytes14(bytes32,bytes14)', () => {
    it('inserts bytes14 at beginning of bytes', async () => {
      const sizeBytes = 14;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftBytes14.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftInt112(bytes32,int112)', () => {
    it('inserts int112 at beginning of bytes', async () => {
      const sizeBytes = 14;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftInt112.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftUint112(bytes32,uint112)', () => {
    it('inserts uint112 at beginning of bytes', async () => {
      const sizeBytes = 14;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftUint112.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftBytes15(bytes32,bytes15)', () => {
    it('inserts bytes15 at beginning of bytes', async () => {
      const sizeBytes = 15;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftBytes15.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftInt120(bytes32,int120)', () => {
    it('inserts int120 at beginning of bytes', async () => {
      const sizeBytes = 15;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftInt120.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftUint120(bytes32,uint120)', () => {
    it('inserts uint120 at beginning of bytes', async () => {
      const sizeBytes = 15;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftUint120.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftBytes16(bytes32,bytes16)', () => {
    it('inserts bytes16 at beginning of bytes', async () => {
      const sizeBytes = 16;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftBytes16.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftInt128(bytes32,int128)', () => {
    it('inserts int128 at beginning of bytes', async () => {
      const sizeBytes = 16;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftInt128.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftUint128(bytes32,uint128)', () => {
    it('inserts uint128 at beginning of bytes', async () => {
      const sizeBytes = 16;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftUint128.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftBytes17(bytes32,bytes17)', () => {
    it('inserts bytes17 at beginning of bytes', async () => {
      const sizeBytes = 17;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftBytes17.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftInt136(bytes32,int136)', () => {
    it('inserts int136 at beginning of bytes', async () => {
      const sizeBytes = 17;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftInt136.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftUint136(bytes32,uint136)', () => {
    it('inserts uint136 at beginning of bytes', async () => {
      const sizeBytes = 17;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftUint136.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftBytes18(bytes32,bytes18)', () => {
    it('inserts bytes18 at beginning of bytes', async () => {
      const sizeBytes = 18;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftBytes18.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftInt144(bytes32,int144)', () => {
    it('inserts int144 at beginning of bytes', async () => {
      const sizeBytes = 18;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftInt144.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftUint144(bytes32,uint144)', () => {
    it('inserts uint144 at beginning of bytes', async () => {
      const sizeBytes = 18;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftUint144.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftBytes19(bytes32,bytes19)', () => {
    it('inserts bytes19 at beginning of bytes', async () => {
      const sizeBytes = 19;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftBytes19.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftInt152(bytes32,int152)', () => {
    it('inserts int152 at beginning of bytes', async () => {
      const sizeBytes = 19;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftInt152.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftUint152(bytes32,uint152)', () => {
    it('inserts uint152 at beginning of bytes', async () => {
      const sizeBytes = 19;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftUint152.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftBytes20(bytes32,bytes20)', () => {
    it('inserts bytes20 at beginning of bytes', async () => {
      const sizeBytes = 20;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftBytes20.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftInt160(bytes32,int160)', () => {
    it('inserts int160 at beginning of bytes', async () => {
      const sizeBytes = 20;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftInt160.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftUint160(bytes32,uint160)', () => {
    it('inserts uint160 at beginning of bytes', async () => {
      const sizeBytes = 20;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftUint160.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftAddress(bytes32,address)', () => {
    it('inserts address at beginning of bytes', async () => {
      const sizeBytes = 20;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftAddress.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftBytes21(bytes32,bytes21)', () => {
    it('inserts bytes21 at beginning of bytes', async () => {
      const sizeBytes = 21;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftBytes21.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftInt168(bytes32,int168)', () => {
    it('inserts int168 at beginning of bytes', async () => {
      const sizeBytes = 21;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftInt168.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftUint168(bytes32,uint168)', () => {
    it('inserts uint168 at beginning of bytes', async () => {
      const sizeBytes = 21;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftUint168.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftBytes22(bytes32,bytes22)', () => {
    it('inserts bytes22 at beginning of bytes', async () => {
      const sizeBytes = 22;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftBytes22.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftInt176(bytes32,int176)', () => {
    it('inserts int176 at beginning of bytes', async () => {
      const sizeBytes = 22;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftInt176.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftUint176(bytes32,uint176)', () => {
    it('inserts uint176 at beginning of bytes', async () => {
      const sizeBytes = 22;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftUint176.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftBytes23(bytes32,bytes23)', () => {
    it('inserts bytes23 at beginning of bytes', async () => {
      const sizeBytes = 23;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftBytes23.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftInt184(bytes32,int184)', () => {
    it('inserts int184 at beginning of bytes', async () => {
      const sizeBytes = 23;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftInt184.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftUint184(bytes32,uint184)', () => {
    it('inserts uint184 at beginning of bytes', async () => {
      const sizeBytes = 23;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftUint184.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftBytes24(bytes32,bytes24)', () => {
    it('inserts bytes24 at beginning of bytes', async () => {
      const sizeBytes = 24;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftBytes24.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftInt192(bytes32,int192)', () => {
    it('inserts int192 at beginning of bytes', async () => {
      const sizeBytes = 24;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftInt192.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftUint192(bytes32,uint192)', () => {
    it('inserts uint192 at beginning of bytes', async () => {
      const sizeBytes = 24;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftUint192.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftBytes25(bytes32,bytes25)', () => {
    it('inserts bytes25 at beginning of bytes', async () => {
      const sizeBytes = 25;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftBytes25.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftInt200(bytes32,int200)', () => {
    it('inserts int200 at beginning of bytes', async () => {
      const sizeBytes = 25;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftInt200.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftUint200(bytes32,uint200)', () => {
    it('inserts uint200 at beginning of bytes', async () => {
      const sizeBytes = 25;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftUint200.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftBytes26(bytes32,bytes26)', () => {
    it('inserts bytes26 at beginning of bytes', async () => {
      const sizeBytes = 26;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftBytes26.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftInt208(bytes32,int208)', () => {
    it('inserts int208 at beginning of bytes', async () => {
      const sizeBytes = 26;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftInt208.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftUint208(bytes32,uint208)', () => {
    it('inserts uint208 at beginning of bytes', async () => {
      const sizeBytes = 26;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftUint208.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftBytes27(bytes32,bytes27)', () => {
    it('inserts bytes27 at beginning of bytes', async () => {
      const sizeBytes = 27;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftBytes27.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftInt216(bytes32,int216)', () => {
    it('inserts int216 at beginning of bytes', async () => {
      const sizeBytes = 27;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftInt216.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftUint216(bytes32,uint216)', () => {
    it('inserts uint216 at beginning of bytes', async () => {
      const sizeBytes = 27;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftUint216.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftBytes28(bytes32,bytes28)', () => {
    it('inserts bytes28 at beginning of bytes', async () => {
      const sizeBytes = 28;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftBytes28.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftInt224(bytes32,int224)', () => {
    it('inserts int224 at beginning of bytes', async () => {
      const sizeBytes = 28;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftInt224.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftUint224(bytes32,uint224)', () => {
    it('inserts uint224 at beginning of bytes', async () => {
      const sizeBytes = 28;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftUint224.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftBytes29(bytes32,bytes29)', () => {
    it('inserts bytes29 at beginning of bytes', async () => {
      const sizeBytes = 29;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftBytes29.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftInt232(bytes32,int232)', () => {
    it('inserts int232 at beginning of bytes', async () => {
      const sizeBytes = 29;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftInt232.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftUint232(bytes32,uint232)', () => {
    it('inserts uint232 at beginning of bytes', async () => {
      const sizeBytes = 29;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftUint232.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftBytes30(bytes32,bytes30)', () => {
    it('inserts bytes30 at beginning of bytes', async () => {
      const sizeBytes = 30;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftBytes30.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftInt240(bytes32,int240)', () => {
    it('inserts int240 at beginning of bytes', async () => {
      const sizeBytes = 30;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftInt240.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftUint240(bytes32,uint240)', () => {
    it('inserts uint240 at beginning of bytes', async () => {
      const sizeBytes = 30;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftUint240.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftBytes31(bytes32,bytes31)', () => {
    it('inserts bytes31 at beginning of bytes', async () => {
      const sizeBytes = 31;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftBytes31.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftInt248(bytes32,int248)', () => {
    it('inserts int248 at beginning of bytes', async () => {
      const sizeBytes = 31;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftInt248.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftUint248(bytes32,uint248)', () => {
    it('inserts uint248 at beginning of bytes', async () => {
      const sizeBytes = 31;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftUint248.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftBytes32(bytes32,bytes32)', () => {
    it('inserts bytes32 at beginning of bytes', async () => {
      const sizeBytes = 32;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftBytes32.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftInt256(bytes32,int256)', () => {
    it('inserts int256 at beginning of bytes', async () => {
      const sizeBytes = 32;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const negative = BigInt(data) >> BigInt(sizeBytes * 8 - 1) === 1n;
      let input;
      if (negative) {
        input = -(2n ** BigInt(sizeBytes * 8) - BigInt(data));
      } else {
        input = BigInt(data);
      }

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftInt256.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
  describe('#unshiftUint256(bytes32,uint256)', () => {
    it('inserts uint256 at beginning of bytes', async () => {
      const sizeBytes = 32;
      const data = ethers.hexlify(ethers.randomBytes(sizeBytes));
      const input = data;

      for (let i of [
        0,
        32 - sizeBytes,
        randomIndexNonInclusive(0, 32 - sizeBytes),
      ]) {
        const state = {
          _data: ethers.zeroPadValue(ethers.hexlify(ethers.randomBytes(i)), 32),
          _size: i * 8,
        };

        const expectedData = ethers.zeroPadValue(
          ethers.concat([
            ethers.dataSlice(state._data, 32 - state._size / 8, 32),
            data,
          ]),
          32,
        );
        const expectedLength = state._size + sizeBytes * 8;

        expect(
          await instance.unshiftUint256.staticCall(state, input),
        ).to.deep.equal([expectedData, expectedLength]);
      }
    });
  });
});
