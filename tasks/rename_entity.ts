import { TASK_RENAME_ENTITY } from './task_names.ts';
import deleteEmpty from 'delete-empty';
import gitDiff from 'git-diff';
import { task } from 'hardhat/config';
import fs from 'node:fs';
import path from 'node:path';

export default task(TASK_RENAME_ENTITY)
  .setDescription('Batch replace text in local filenames and contents')
  .addPositionalArgument({
    name: 'oldText',
    description: 'text to to replace',
  })
  .addPositionalArgument({
    name: 'newText',
    description: 'new text to insert',
  })
  .addFlag({
    name: 'global',
    description:
      'search for text occurrences in all files (rather than only those with matching names)',
  })
  .addFlag({ name: 'noDiff', description: 'skip printing file diffs' })
  .addFlag({ name: 'write', description: 'write changes to disk' })
  .setInlineAction(async (args, hre) => {
    const directories = ['./contracts', './test', './spec'];

    const files = (
      await Promise.all(
        directories.map(async (dir) =>
          (await fs.promises.readdir(dir, { recursive: true })).map((file) =>
            path.relative(hre.config.paths.root, path.resolve(dir, file)),
          ),
        ),
      )
    )
      .flat()
      .filter((f) => fs.statSync(f).isFile())
      .filter((f) => args.global || path.basename(f).includes(args.oldText));

    if (files.length === 0) {
      console.log(`No files found matching text: ${args.oldText}`);
      return;
    }

    const fileContents: { [file: string]: string } = {};

    await Promise.all(
      files.map(
        async (f) =>
          (fileContents[f] = (await fs.promises.readFile(f)).toString()),
      ),
    );

    let nameChangedCount = 0;
    let contentsChangedCount = 0;

    for (const oldName of files) {
      const newName = oldName.replaceAll(args.oldText, args.newText);

      const oldContents = fileContents[oldName];
      const newContents = oldContents.replaceAll(args.oldText, args.newText);

      const nameChanged = newName !== oldName;
      const contentsChanged = newContents !== oldContents;

      if (nameChanged || contentsChanged) {
        if (!args.noDiff) {
          console.log(`diff --git a/${oldName} b/${newName}`);

          if (oldName !== newName) {
            nameChangedCount++;
            console.log(`rename from ${oldName}`);
            console.log(`rename to ${newName}`);
          }

          if (contentsChanged) {
            contentsChangedCount++;
            const diff = gitDiff(oldContents, newContents, { color: true });
            console.log('---', oldName);
            console.log('+++', newName);
            console.log(diff);
          }
        }

        if (args.write) {
          await fs.promises.rm(oldName);
          await fs.promises.mkdir(path.dirname(newName), { recursive: true });
          await fs.promises.writeFile(
            path.resolve(hre.config.paths.root, newName),
            newContents,
          );
        }

        nameChangedCount++;
      }
    }

    if (args.write) {
      for (const directory of directories) {
        await deleteEmpty(path.resolve(hre.config.paths.root, directory));
      }
    }

    console.log(`${nameChangedCount} files renamed`);
    console.log(`${contentsChangedCount} files modified`);
    if (!args.write) {
      console.log('No changes written to disk (use --write flag)');
    }
  })
  .build();
