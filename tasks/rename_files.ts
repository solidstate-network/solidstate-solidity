import fs from 'fs';
import { task, types } from 'hardhat/config';
import path from 'path';

task('rename-files', 'Batch replace text in local filenames')
  .addPositionalParam('oldText', 'text to to replace', undefined, types.string)
  .addPositionalParam('newText', 'new text to insert', undefined, types.string)
  .addFlag('write', 'write changes to disk')
  .setAction(async (args, hre) => {
    const directories = ['./contracts', './test', './spec'];

    const files = (
      await Promise.all(
        directories.map(async (dir) => {
          const files = await fs.promises.readdir(dir, { recursive: true });
          return files.map((file) => path.resolve(dir, file));
        }),
      )
    )
      .flat()
      .filter((f) => path.basename(f).includes(args.oldText));

    if (files.length === 0) {
      console.log(`No files found matching text: ${args.oldText}`);
      return;
    }

    console.log(`Found ${files.length} files to rename:`);

    for (const oldName of files) {
      const newName = path.resolve(
        path.dirname(oldName),
        path.basename(oldName).replace(args.oldText, args.newText),
      );

      console.log(
        path.relative('.', oldName),
        '=>',
        path.relative('.', newName),
      );

      if (args.write) {
        await fs.promises.rename(oldName, newName);
      }
    }
  });
