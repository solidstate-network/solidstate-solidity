import { expect } from 'chai';
import fs from 'fs';
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
  const directAncestors: { [key: string]: string[] } = {};

  before(async () => {
    allFullyQualifiedNames = await hre.artifacts.getAllFullyQualifiedNames();

    for (const name of allFullyQualifiedNames) {
      const [path, entity] = name.split(':');
      // TODO: sources are read directly from disk and may not match compiled artifacts
      // track full inheritance trees via surya
      ancestors[name] = (await surya.dependencies([path], entity)).slice(1);
      // read direct inheritance trees from source
      const file = fs.readFileSync(path).toString();
      directAncestors[name] =
        file
          .match(/(contract|interface)\s+(\w+)\s+is((\s+\w+,?)+)\s+{/)?.[3]
          .trim()
          .split(/[\s,]+/) ?? [];
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

    it('do not directly inherit from unrelated internal interfaces', async () => {
      for (const name of names) {
        for (const ancestor of directAncestors[name]) {
          const [, entity] = name.split(':');
          const internalInterfaceName = `${entity}Internal`;

          if (ancestor === internalInterfaceName) continue;

          expect(INTERNAL_INTERFACE.test(ancestor)).to.eq(
            false,
            `Invalid direct ancestor for ${entity}: ${ancestor}`,
          );
        }
      }
    });

    it('directly inherit from corresponding internal interfaces', async () => {
      for (const name of names) {
        const [, entity] = name.split(':');
        const internalInterfaceName = `${entity}Internal`;

        expect(directAncestors[name]).to.include(
          internalInterfaceName,
          `Missing ancestor for ${entity}`,
        );
      }
    });

    it('inherit in correct order', async () => {
      for (const name of names) {
        const [, entity] = name.split(':');
        const internalInterfaceName = `${entity}Internal`;

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

    it('do not directly inherit from unrelated internal interfaces', async () => {
      for (const name of names) {
        for (const ancestor of directAncestors[name]) {
          const [, entity] = name.split(':');
          const internalInterfaceName = `I${entity}`;

          if (ancestor === internalInterfaceName) continue;

          expect(INTERNAL_INTERFACE.test(ancestor)).to.eq(
            false,
            `Invalid direct ancestor for ${entity}: ${ancestor}`,
          );
        }
      }
    });

    it('directly inherit from corresponding internal interfaces', async () => {
      for (const name of names) {
        const [, entity] = name.split(':');
        const internalInterfaceName = `I${entity}`;

        expect(directAncestors[name]).to.include(
          internalInterfaceName,
          `Missing ancestor for ${entity}`,
        );
      }
    });

    it('inherit in correct order', async () => {
      for (const name of names) {
        const [, entity] = name.split(':');
        const internalInterfaceName = `I${entity}`;

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

    it('do not directly inherit from internal interfaces', async () => {
      for (const name of names) {
        for (const ancestor of directAncestors[name]) {
          const [, entity] = name.split(':');

          expect(INTERNAL_INTERFACE.test(ancestor)).to.eq(
            false,
            `Invalid direct ancestor for ${entity}: ${ancestor}`,
          );
        }
      }
    });

    it('do not directly inherit from unrelated external interfaces', async () => {
      for (const name of names) {
        for (const ancestor of directAncestors[name]) {
          const [, entity] = name.split(':');
          const externalInterfaceName = `I${entity}`;

          if (ancestor === externalInterfaceName) continue;

          expect(EXTERNAL_INTERFACE.test(ancestor)).to.eq(
            false,
            `Invalid direct ancestor for ${entity}: ${ancestor}`,
          );
        }
      }
    });

    it('do not directly inherit from unrelated internal contracts', async () => {
      for (const name of names) {
        for (const ancestor of directAncestors[name]) {
          const [, entity] = name.split(':');
          const internalContractName = `${entity}Internal`;

          if (ancestor === internalContractName) continue;

          expect(INTERNAL_CONTRACT.test(ancestor)).to.eq(
            false,
            `Invalid direct ancestor for ${entity}: ${ancestor}`,
          );
        }
      }
    });

    it('directly inherit from corresponding internal contracts and external interfaces', async () => {
      for (const name of names) {
        const [, entity] = name.split(':');
        const internalContractName = `${entity}Internal`;
        const externalInterfaceName = `I${entity}`;

        expect(directAncestors[name]).to.include(
          internalContractName,
          `Missing ancestor for ${entity}`,
        );

        expect(directAncestors[name]).to.include(
          externalInterfaceName,
          `Missing ancestor for ${entity}`,
        );
      }
    });

    it('inherit in correct order', async () => {
      for (const name of names) {
        const [, entity] = name.split(':');
        const internalContractName = `${entity}Internal`;
        const externalInterfaceName = `I${entity}`;

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
