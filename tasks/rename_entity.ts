import deleteEmpty from 'delete-empty';
import fs from 'fs';
import gitDiff from 'git-diff';
import { task, types } from 'hardhat/config';
import path from 'path';

task('rename-entity', 'Batch replace text in local filenames and contents')
  .addPositionalParam('oldText', 'text to to replace', undefined, types.string)
  .addPositionalParam('newText', 'new text to insert', undefined, types.string)
  .addFlag(
    'global',
    'search for text occurrences in all files (rather than only those with matching names)',
  )
  .addFlag('noDiff', 'skip printing file diffs')
  .addFlag('write', 'write changes to disk')
  .setAction(async (args, hre) => {
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

    let count = 0;

    for (const oldName of files) {
      const newName = oldName.replaceAll(args.oldText, args.newText);

      const oldContents = fileContents[oldName];
      const newContents = oldContents.replaceAll(args.oldText, args.newText);

      if (oldName !== newName || oldContents !== newContents) {
        if (!args.skipDiff) {
          console.log(`diff --git a/${oldName} b/${newName}`);

          if (oldName !== newName) {
            console.log(`rename from ${oldName}`);
            console.log(`rename to ${newName}`);
          }

          const diff = gitDiff(oldContents, newContents, { color: true });

          if (diff) {
            console.log('---', oldName);
            console.log('+++', newName);
            console.log(diff);
          }
        }

        if (args.write) {
          await fs.promises.rm(oldName);
          await deleteEmpty(path.dirname(oldName));
          await fs.promises.mkdir(path.dirname(newName), { recursive: true });
          await fs.promises.writeFile(
            path.resolve(hre.config.paths.root, newName),
            newContents,
          );
        }

        count++;
      }
    }

    if (args.write) {
      console.log(`Updated ${count} files.`);
    }
  });
