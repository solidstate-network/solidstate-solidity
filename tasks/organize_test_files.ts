import fs from 'fs';
import { task } from 'hardhat/config';
import path from 'path';

const EXTERNAL_CONTRACT = /\b(([I][a-z])|([A-HJ-Z]))\w*$/;

task(
  'organize-test-files',
  'Arrange test and spec directory structure to match that of contracts',
).setAction(async (args, hre) => {
  const fullyQualifiedNames = (await hre.artifacts.getAllFullyQualifiedNames())
    .filter(
      (name) =>
        !path
          .resolve(name)
          .startsWith(path.resolve(hre.config.paths.sources, 'test')),
    )
    .filter(
      (name) =>
        !path
          .resolve(name)
          .startsWith(path.resolve(hre.config.paths.sources, 'storage')),
    )
    .filter(
      (name) =>
        !path.resolve(name).startsWith(path.resolve(hre.config.exposed.outDir)),
    );

  const testFiles = (
    await fs.promises.readdir(hre.config.paths.tests, {
      recursive: true,
    })
  )
    .filter((f) => path.extname(f) === '.ts')
    .map((f) => path.resolve(hre.config.paths.tests, f));

  const specFiles = (
    await fs.promises.readdir(path.resolve(hre.config.paths.root, 'spec'), {
      recursive: true,
    })
  )
    .filter((f) => path.extname(f) === '.ts')
    .map((f) => path.resolve(hre.config.paths.root, 'spec', f));

  interface EntityPathLookup {
    [name: string]: string;
  }

  const testFilesByEntityName: EntityPathLookup = testFiles.reduce(
    (acc, el) => {
      const entityName = el.match(/.*\/(\w*)\.ts/)?.[1];

      if (!entityName) {
        return acc;
      }

      if (acc[entityName]) {
        throw new Error(`duplicate file for entity ${entityName}`);
      }

      acc[entityName] = el;

      return acc;
    },
    {} as EntityPathLookup,
  );

  const specFilesByEntityName: EntityPathLookup = specFiles.reduce(
    (acc, el) => {
      const entityName = el.match(/.*\/(\w*)\.behavior.ts/)?.[1];

      if (!entityName) {
        return acc;
      }

      if (acc[entityName]) {
        throw new Error(`duplicate file for entity ${entityName}`);
      }

      acc[entityName] = el;

      return acc;
    },
    {} as EntityPathLookup,
  );

  for (const fullyQualifiedName of fullyQualifiedNames) {
    const [sourceFile, entityName] = fullyQualifiedName.split(':');

    if (!EXTERNAL_CONTRACT.test(entityName)) continue;

    const testFile = testFilesByEntityName[entityName];

    if (testFile) {
      const expectedTestFile = path
        .resolve(
          hre.config.paths.tests,
          path.relative(hre.config.paths.sources, sourceFile),
        )
        .replace('.sol', '.ts');

      if (testFile !== expectedTestFile) {
        if (fs.existsSync(expectedTestFile)) {
          throw new Error(`duplicate test file found for ${entityName}`);
        }

        await fs.promises.mkdir(path.dirname(expectedTestFile), {
          recursive: true,
        });

        await fs.promises.rename(testFile, expectedTestFile);
      }
    }

    const specFile = specFilesByEntityName[entityName];

    if (specFile) {
      const expectedSpecFile = path
        .resolve(
          hre.config.paths.root,
          'spec',
          path.relative(hre.config.paths.sources, sourceFile),
        )
        .replace('.sol', '.behavior.ts');

      if (specFile !== expectedSpecFile) {
        if (fs.existsSync(expectedSpecFile)) {
          throw new Error(`duplicate spec file found for ${entityName}`);
        }

        await fs.promises.mkdir(path.dirname(expectedSpecFile), {
          recursive: true,
        });

        await fs.promises.rename(specFile, expectedSpecFile);
      }
    }
  }
});
