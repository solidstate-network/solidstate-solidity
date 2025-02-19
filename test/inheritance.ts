import { expect } from 'chai';
import hre from 'hardhat';

const surya = require('surya');

const EXTERNAL_CONTRACT =
  /\b(([I][a-z])|([A-HJ-Z]))\w*(?<!Internal|Storage|Mock)$/;
const INTERNAL_CONTRACT = /\b(([I][a-z])|([A-HJ-Z]))\w*Internal$/;
const EXTERNAL_INTERFACE = /\bI[A-Z]\w*(?<!Internal)$/;
const INTERNAL_INTERFACE = /\bI[A-Z]\w*Internal$/;

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
      }
    });
  });

  describe('External Contracts', () => {
    let names: string[];

    before(async () => {
      // TODO: skip libraries
      names = allFullyQualifiedNames.filter((name) =>
        EXTERNAL_CONTRACT.test(name),
      );
    });

    it('inherit from corresponding internal contracts', async () => {
      for (const name of names) {
        const [, entity] = name.split(':');
        const internalContractName = `${entity}Internal`;

        expect(ancestors[name]).to.include(
          internalContractName,
          `Missing ancestor for ${entity}`,
        );
      }
    });

    it('inherit from corresponding external interfaces', async () => {
      for (const name of names) {
        const [, entity] = name.split(':');
        const externalInterfaceName = `I${entity}`;

        expect(ancestors[name]).to.include(
          externalInterfaceName,
          `Missing ancestor for ${entity}`,
        );
      }
    });
  });
});
