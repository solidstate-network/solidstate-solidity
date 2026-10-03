import { TASK_ORGANIZE_TEST_FILES } from './task_names.ts';
import { task } from 'hardhat/config';
import fs from 'node:fs';
import path from 'node:path';

const EXTERNAL_CONTRACT = /\b(([I][a-z])|([A-HJ-Z]))\w*$/;

export default task(TASK_ORGANIZE_TEST_FILES)
  .setDescription(
    'Arrange test and spec directory structure to match that of contracts',
  )
  .setInlineAction(async (args, hre) => {
    const sourcesPath = path.resolve(hre.config.paths.root, 'contracts');
    const testsPath = path.resolve(hre.config.paths.root, 'test');

    const fullyQualifiedNames = [
      ...(await hre.artifacts.getAllFullyQualifiedNames()),
    ]
      .sort()
      .filter(
        (name) =>
          !path
            .resolve(hre.config.paths.root, name)
            .startsWith(path.resolve(sourcesPath, 'test')),
      )
      .filter(
        (name) =>
          !path
            .resolve(hre.config.paths.root, name)
            .startsWith(path.resolve(sourcesPath, 'storage')),
      )
      .filter(
        (name) =>
          !path
            .resolve(hre.config.paths.root, name)
            .startsWith(path.resolve(hre.config.exposed.outDir)),
      );

    const testFiles = (
      await fs.promises.readdir(testsPath, {
        recursive: true,
      })
    )
      .filter((f) => path.extname(f) === '.ts')
      .map((f) => path.resolve(testsPath, f));

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

    const contractsBarrel: string[] = [];
    const specBarrel: string[] = [];

    for (const fullyQualifiedName of fullyQualifiedNames) {
      const [sourceFile, entityName] = fullyQualifiedName.split(':');

      contractsBarrel.push(path.resolve(hre.config.paths.root, sourceFile));

      if (!EXTERNAL_CONTRACT.test(entityName)) continue;

      const testFile = testFilesByEntityName[entityName];

      if (testFile) {
        const expectedTestFile = path
          .resolve(
            testsPath,
            path.relative(
              sourcesPath,
              path.resolve(hre.config.paths.root, sourceFile),
            ),
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
            path.relative(
              sourcesPath,
              path.resolve(hre.config.paths.root, sourceFile),
            ),
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

        specBarrel.push(expectedSpecFile);
      }
    }

    const contractsBarrelPath = path.resolve(sourcesPath, 'index.sol');

    const contractsBarrelContents: string =
      [
        '// SPDX-License-Identifier: MIT',
        '',
        'pragma solidity ^0.8.35;',
        '',
        '// slippy-disable no-global-imports',
        '// slippy-disable sort-imports',
        ...contractsBarrel.map(
          (s) =>
            `import './${path.relative(path.dirname(contractsBarrelPath), s)}';`,
        ),
      ].join('\n') + '\n';

    await fs.promises.writeFile(contractsBarrelPath, contractsBarrelContents);

    const specBarrelPath = path.resolve(
      hre.config.paths.root,
      'spec',
      'index.ts',
    );

    const specBarrelContents: string =
      specBarrel
        .map(
          (s) =>
            `export * from './${path.relative(path.dirname(specBarrelPath), s).replace(path.extname(s), '')}';`,
        )
        .join('\n') + '\n';

    await fs.promises.writeFile(specBarrelPath, specBarrelContents);
  })
  .build();
