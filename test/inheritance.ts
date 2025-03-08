import { expect } from 'chai';
import fs from 'fs';
import hre from 'hardhat';
import path from 'path';

const surya = require('surya');

const EXTERNAL_CONTRACT = /\b(([I][a-z])|([A-HJ-Z]))\w*(?<!Storage|Mock)$/;
const INTERNAL_CONTRACT = /\b_(([I][a-z])|([A-HJ-Z]))\w*$/;
const EXTERNAL_INTERFACE = /\bI[A-Z]\w*$/;
const INTERNAL_INTERFACE = /\b_I[A-Z]\w*$/;

const getExternalContractName = (entityName: string) =>
  entityName.replace(/^_/, '').replace(/I(?=[A-Z])/, '');
const getInternalContractName = (entityName: string) =>
  `_${getExternalContractName(entityName)}`;
const getExternalInterfaceName = (entityName: string) =>
  `I${getExternalContractName(entityName)}`;
const getInternalInterfaceName = (entityName: string) =>
  `_I${getExternalContractName(entityName)}`;

describe('Inheritance Graph', () => {
  let allEntityNames: string[];
  const ancestors: { [key: string]: string[] } = {};
  const directAncestors: { [key: string]: string[] } = {};

  before(async () => {
    const allFullyQualifiedNames = (
      await hre.artifacts.getAllFullyQualifiedNames()
    ).filter(
      (name) =>
        !path.resolve(name).startsWith(path.resolve(hre.config.exposed.outDir)),
    );

    allEntityNames = allFullyQualifiedNames.map((name) => name.split(':')[1]);

    for (const name of allFullyQualifiedNames) {
      const [path, entity] = name.split(':');
      // TODO: sources are read directly from disk and may not match compiled artifacts
      // TODO: regex fails if any inheritances are commented out
      // track full inheritance trees via surya
      ancestors[entity] = (await surya.dependencies([path], entity)).slice(1);
      // read direct inheritance trees from source
      const file = fs.readFileSync(path).toString();
      directAncestors[entity] =
        file
          .match(/(contract|interface)\s+(\w+)\s+is((\s+\w+,?)+)\s+{/)?.[3]
          .trim()
          .split(/[\s,]+/) ?? [];
    }
  });

  describe('Internal Interfaces', () => {
    let names: string[];

    before(async () => {
      names = allEntityNames.filter((name) => INTERNAL_INTERFACE.test(name));
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

    it('directly inherit from internal interfaces corresponding to direct inheritances of downstream children', async () => {
      // begin by looking up children

      const externalInterfaceNames = allEntityNames.filter((name) =>
        EXTERNAL_INTERFACE.test(name),
      );

      const internalContractNames = allEntityNames.filter((name) =>
        INTERNAL_CONTRACT.test(name),
      );

      // run assertions against internal interface ancestors

      for (const externalInterfaceName of externalInterfaceNames) {
        const name = getInternalInterfaceName(externalInterfaceName);

        const internalInterfaceNames = directAncestors[externalInterfaceName]
          .filter((name) => EXTERNAL_INTERFACE.test(name))
          .map(getInternalInterfaceName);

        for (const internalInterfaceName of internalInterfaceNames) {
          expect(directAncestors[name]).to.include(
            internalInterfaceName,
            `Missing ancestor for ${name}`,
          );
        }
      }

      for (const internalContractName of internalContractNames) {
        const name = getInternalInterfaceName(internalContractName);

        const internalInterfaceNames = directAncestors[internalContractName]
          .filter((name) => INTERNAL_CONTRACT.test(name))
          .map(getInternalInterfaceName);

        for (const internalInterfaceName of internalInterfaceNames) {
          expect(directAncestors[name]).to.include(
            internalInterfaceName,
            `Missing ancestor for ${name}`,
          );
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
      names = allEntityNames.filter((name) => EXTERNAL_INTERFACE.test(name));
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
          if (ancestor === getInternalInterfaceName(name)) continue;

          expect(INTERNAL_INTERFACE.test(ancestor)).to.eq(
            false,
            `Invalid direct ancestor for ${name}: ${ancestor}`,
          );
        }
      }
    });

    it('directly inherit from corresponding internal interfaces', async () => {
      for (const name of names) {
        const internalInterfaceName = getInternalInterfaceName(name);

        expect(directAncestors[name]).to.include(
          internalInterfaceName,
          `Missing ancestor for ${name}`,
        );
      }
    });

    it('directly inherit from external interfaces corresponding to direct inheritances of downstream children', async () => {
      // begin by looking up children

      const externalContractNames = allEntityNames.filter((name) =>
        EXTERNAL_CONTRACT.test(name),
      );

      // run assertions against internal interface ancestors

      for (const externalContractName of externalContractNames) {
        const name = getExternalInterfaceName(externalContractName);

        const externalInterfaces = directAncestors[externalContractName]
          .filter((name) => EXTERNAL_CONTRACT.test(name))
          .map(getExternalInterfaceName);

        for (const externalInterface of externalInterfaces) {
          expect(directAncestors[name]).to.include(
            externalInterface,
            `Missing ancestor for ${name}`,
          );
        }
      }
    });

    it('inherit in correct order', async () => {
      for (const name of names) {
        const internalInterfaceName = getInternalInterfaceName(name);

        expect(ancestors[name].indexOf(internalInterfaceName)).to.eq(
          ancestors[name].length - 1,
          `First inherited ancestor for ${name} should be ${internalInterfaceName}`,
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
      names = allEntityNames.filter((name) => INTERNAL_CONTRACT.test(name));
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
          if (ancestor === getInternalInterfaceName(name)) continue;

          expect(INTERNAL_INTERFACE.test(ancestor)).to.eq(
            false,
            `Invalid direct ancestor for ${name}: ${ancestor}`,
          );
        }
      }
    });

    it('directly inherit from corresponding internal interfaces', async () => {
      for (const name of names) {
        const internalInterfaceName = getInternalInterfaceName(name);

        expect(directAncestors[name]).to.include(
          internalInterfaceName,
          `Missing ancestor for ${name}`,
        );
      }
    });

    it('directly inherit from internal contracts corresponding to direct inheritances of downstream children', async () => {
      // begin by looking up children

      const externalContractNames = allEntityNames.filter((name) =>
        EXTERNAL_CONTRACT.test(name),
      );

      // run assertions against internal interface ancestors

      for (const externalContractName of externalContractNames) {
        const name = getInternalContractName(externalContractName);

        const internalContractNames = directAncestors[externalContractName]
          .filter((name) => EXTERNAL_CONTRACT.test(name))
          .map(getInternalContractName);

        for (const internalContractName of internalContractNames) {
          expect(directAncestors[name]).to.include(
            internalContractName,
            `Missing ancestor for ${name}`,
          );
        }
      }
    });

    it('inherit in correct order', async () => {
      for (const name of names) {
        const internalInterfaceName = getInternalInterfaceName(name);

        expect(ancestors[name].indexOf(internalInterfaceName)).to.eq(
          ancestors[name].length - 1,
          `First inherited ancestor for ${name} should be ${internalInterfaceName}`,
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
      names = allEntityNames.filter((name) => EXTERNAL_CONTRACT.test(name));

      // TODO: skip libraries dynamically
      names = names.filter(
        (name) =>
          ![
            'ECDSA',
            'EIP712',
            'MerkleProof',
            'BinaryHeap',
            'DoublyLinkedList',
            'PackedDoublyLinkedList',
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
          ].includes(name),
      );
    });

    it('do not directly inherit from internal interfaces', async () => {
      for (const name of names) {
        for (const ancestor of directAncestors[name]) {
          expect(INTERNAL_INTERFACE.test(ancestor)).to.eq(
            false,
            `Invalid direct ancestor for ${name}: ${ancestor}`,
          );
        }
      }
    });

    it('do not directly inherit from unrelated external interfaces', async () => {
      for (const name of names) {
        for (const ancestor of directAncestors[name]) {
          if (ancestor === getExternalInterfaceName(name)) continue;

          expect(EXTERNAL_INTERFACE.test(ancestor)).to.eq(
            false,
            `Invalid direct ancestor for ${name}: ${ancestor}`,
          );
        }
      }
    });

    it('do not directly inherit from unrelated internal contracts', async () => {
      for (const name of names) {
        for (const ancestor of directAncestors[name]) {
          const internalContractName = getInternalContractName(name);

          if (ancestor === internalContractName) continue;

          expect(INTERNAL_CONTRACT.test(ancestor)).to.eq(
            false,
            `Invalid direct ancestor for ${name}: ${ancestor}`,
          );
        }
      }
    });

    it('directly inherit from corresponding internal contracts and external interfaces', async () => {
      for (const name of names) {
        const internalContractName = getInternalContractName(name);
        const externalInterfaceName = getExternalInterfaceName(name);

        expect(directAncestors[name]).to.include(
          internalContractName,
          `Missing ancestor for ${name}`,
        );

        expect(directAncestors[name]).to.include(
          externalInterfaceName,
          `Missing ancestor for ${name}`,
        );
      }
    });

    it('inherit in correct order', async () => {
      for (const name of names) {
        const internalContractName = getInternalContractName(name);
        const externalInterfaceName = getExternalInterfaceName(name);

        expect(ancestors[name].indexOf(externalInterfaceName)).to.eq(
          ancestors[name].length - 1,
          `First inherited ancestor for ${name} should be ${externalInterfaceName}`,
        );
        expect(ancestors[name].indexOf(internalContractName)).to.eq(
          ancestors[name].length - 2,
          `Second inherited ancestor for ${name} should be ${internalContractName}`,
        );
      }
    });
  });

  describe('Uncategorized Entities', async () => {
    it('do not exist', async () => {
      for (const name of allEntityNames) {
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
