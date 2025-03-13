import fs from 'fs';
import gitDiff from 'git-diff';
import { task, types } from 'hardhat/config';
import path from 'path';

task('rename-files', 'Batch replace text in local filenames')
  .addPositionalParam('oldText', 'text to to replace', undefined, types.string)
  .addPositionalParam('newText', 'new text to insert', undefined, types.string)
  .addFlag('write', 'write changes to disk')
  .addFlag('noDiff', 'skip printing file diffs')
  .setAction(async (args, hre) => {
    const directories = ['./contracts', './test', './spec'];

    const files = (
      await Promise.all(
        directories.map(async (dir) =>
          (await fs.promises.readdir(dir, { recursive: true })).map((file) =>
            path.resolve(dir, file),
          ),
        ),
      )
    )
      .flat()
      .filter((f) => fs.statSync(f).isFile())
      .filter((f) => path.basename(f).includes(args.oldText));

    if (files.length === 0) {
      console.log(`No files found matching text: ${args.oldText}`);
      return;
    }

    console.log(`Found ${files.length} files to rename:`);

    const fileContents: { [file: string]: string } = {};

    await Promise.all(
      files.map(
        async (f) =>
          (fileContents[f] = (await fs.promises.readFile(f)).toString()),
      ),
    );

    for (const oldName of files) {
      const newName = path.resolve(
        path.dirname(oldName),
        path.basename(oldName).replace(args.oldText, args.newText),
      );

      const oldContents = fileContents[oldName];

      const newContents = oldContents.replaceAll(args.oldText, args.newText);

      if (oldName !== newName || oldContents !== newContents) {
        if (!args.skipDiff) {
          console.log(
            `diff --git a/${path.relative('.', oldName)} b/${path.relative('.', newName)}`,
          );
          console.log('---', path.relative('.', oldName));
          console.log('+++', path.relative('.', newName));
          const diff = gitDiff(oldContents, newContents, { color: true });
          if (diff) {
            console.log(diff);
          } else {
            console.log(`rename from ${path.relative('.', oldName)}`);
            console.log(`rename to ${path.relative('.', newName)}`);
          }
        }

        if (args.write) {
          await fs.promises.rm(oldName);
          await fs.promises.writeFile(newName, newContents);
        }
      }
    }
  });
