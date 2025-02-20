import { expect } from 'chai';
import hre from 'hardhat';

const surya = require('surya');

const INTERNAL_INTERFACE = /\bI[A-Z]\w*Internal$/;
const EXTERNAL_INTERFACE = /\bI[A-Z]\w*(?<!Internal)$/;
const INTERNAL_CONTRACT = /\b(([I][a-z])|([A-HJ-Z]))\w*Internal$/;
const EXTERNAL_CONTRACT =
  /\b(([I][a-z])|([A-HJ-Z]))\w*(?<!Internal|Storage|Mock)$/;

describe('Inheritance Graph', () => {
  let allFullyQualifiedNames: string[];
  const ancestors: { [key: string]: string[] } = {};

  before(async () => {
    allFullyQualifiedNames = await hre.artifacts.getAllFullyQualifiedNames();

    for (const name of allFullyQualifiedNames) {
      const [path, entity] = name.split(':');
      ancestors[name] = (await surya.dependencies([path], entity)).slice(1);
    }
  });

  describe('Internal Interfaces', () => {
    let names: string[];

    before(async () => {
      names = allFullyQualifiedNames.filter((name) =>
        INTERNAL_INTERFACE.test(name),
      );
    });

    it('do not inherit from contracts or external interfaces', async () => {
      for (const name of names) {
        for (const ancestor of ancestors[name]) {
          expect(EXTERNAL_INTERFACE.test(ancestor)).to.be.false;
          expect(INTERNAL_CONTRACT.test(ancestor)).to.be.false;
          expect(EXTERNAL_CONTRACT.test(ancestor)).to.be.false;
        }
      }
    });

    it('have 0-length bytecode', async () => {
      for (const name of names) {
        const { bytecode } = await hre.artifacts.readArtifact(name);
        expect(bytecode).to.equal(
          '0x',
          `Internal interface has non-zero bytecode: ${name}`,
        );
      }
    });
  });

  describe('External Interfaces', () => {
    let names: string[];

    before(async () => {
      names = allFullyQualifiedNames.filter((name) =>
        EXTERNAL_INTERFACE.test(name),
      );
    });

    it('do not inherit from contracts', async () => {
      for (const name of names) {
        for (const ancestor of ancestors[name]) {
          expect(INTERNAL_CONTRACT.test(ancestor)).to.be.false;
          expect(EXTERNAL_CONTRACT.test(ancestor)).to.be.false;
        }
      }
    });

    it('inherit from corresponding internal interfaces', async () => {
      for (const name of names) {
        const [, entity] = name.split(':');
        const internalInterfaceName = `${entity}Internal`;

        expect(ancestors[name]).to.include(
          internalInterfaceName,
          `Missing ancestor for ${entity}`,
        );

        expect(ancestors[name].indexOf(internalInterfaceName)).to.eq(
          ancestors[name].length - 1,
          `First inherited ancestor for ${entity} should be ${internalInterfaceName}`,
        );
      }
    });

    it('have 0-length bytecode', async () => {
      for (const name of names) {
        const { bytecode } = await hre.artifacts.readArtifact(name);
        expect(bytecode).to.equal(
          '0x',
          `External interface has non-zero bytecode: ${name}`,
        );
      }
    });
  });

  describe('Internal Contracts', () => {
    let names: string[];

    before(async () => {
      names = allFullyQualifiedNames.filter((name) =>
        INTERNAL_CONTRACT.test(name),
      );
    });

    it('do not inherit from external contracts', async () => {
      for (const name of names) {
        for (const ancestor of ancestors[name]) {
          expect(EXTERNAL_CONTRACT.test(ancestor)).to.be.false;
        }
      }
    });

    it('inherit from corresponding internal interfaces', async () => {
      for (const name of names) {
        const [, entity] = name.split(':');
        const internalInterfaceName = `I${entity}`;

        expect(ancestors[name]).to.include(
          internalInterfaceName,
          `Missing ancestor for ${entity}`,
        );

        expect(ancestors[name].indexOf(internalInterfaceName)).to.eq(
          ancestors[name].length - 1,
          `First inherited ancestor for ${entity} should be ${internalInterfaceName}`,
        );
      }
    });

    it('have 0-length bytecode', async () => {
      for (const name of names) {
        const { bytecode } = await hre.artifacts.readArtifact(name);
        expect(bytecode).to.equal(
          '0x',
          `Internal contract has non-zero bytecode: ${name}`,
        );
      }
    });
  });

  describe('External Contracts', () => {
    let names: string[];

    before(async () => {
      names = allFullyQualifiedNames.filter((name) =>
        EXTERNAL_CONTRACT.test(name),
      );

      // TODO: skip libraries dynamically
      names = names.filter(
        (name) =>
          ![
            'ECDSA',
            'EIP712',
            'MerkleProof',
            'BinaryHeap',
            'DoublyLinkedList',
            'EnumerableMap',
            'EnumerableSet',
            'IncrementalMerkleTree',
            'CloneFactory',
            'Factory',
            'MinimalProxyFactory',
            'AddressUtils',
            'ArrayUtils',
            'Math',
            'SafeCast',
            'SafeERC20',
            'StorageUtils',
            'UintUtils',
          ].includes(name.split(':')[1]),
      );
    });

    it('inherit from corresponding internal contracts and external interfaces', async () => {
      for (const name of names) {
        const [, entity] = name.split(':');
        const internalContractName = `${entity}Internal`;
        const externalInterfaceName = `I${entity}`;

        expect(ancestors[name]).to.include(
          internalContractName,
          `Missing ancestor for ${entity}`,
        );

        expect(ancestors[name]).to.include(
          externalInterfaceName,
          `Missing ancestor for ${entity}`,
        );

        expect(ancestors[name].indexOf(internalContractName)).to.eq(
          ancestors[name].length - 2,
          `First inherited ancestor for ${entity} should be ${internalContractName}`,
        );
        expect(ancestors[name].indexOf(externalInterfaceName)).to.eq(
          ancestors[name].length - 1,
          `Second inherited ancestor for ${entity} should be ${externalInterfaceName}`,
        );
      }
    });
  });

  describe('Uncategorized Entities', async () => {
    it('do not exist', async () => {
      for (const name of allFullyQualifiedNames) {
        // TODO: account for libraries
        expect(
          INTERNAL_INTERFACE.test(name) ||
            EXTERNAL_INTERFACE.test(name) ||
            INTERNAL_CONTRACT.test(name) ||
            EXTERNAL_CONTRACT.test(name) ||
            name.endsWith('Storage') ||
            name.endsWith('Mock'),
        ).to.equal(true, `Uncategorized entity: ${name}`);
      }
    });
  });
});
