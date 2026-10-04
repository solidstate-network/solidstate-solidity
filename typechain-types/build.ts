// emits a types-only build of the generated typechain bindings for publishing
// factories, exposed contracts, and test contracts are omitted
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const root = import.meta.dirname;
const srcDir = path.resolve(root, 'src');
const distDir = path.resolve(root, 'dist');

const isPublished = (file: string) => {
  const relative = path.relative(srcDir, file).split(path.sep).join('/');
  return (
    relative === 'common.ts' ||
    (relative.startsWith('contracts/') &&
      !relative.startsWith('contracts/test/') &&
      !relative.endsWith('/index.ts'))
  );
};

const files = fs
  .readdirSync(srcDir, { recursive: true, encoding: 'utf-8' })
  .map((file) => path.resolve(srcDir, file))
  .filter((file) => file.endsWith('.ts') && isPublished(file));

const program = ts.createProgram(files, {
  module: ts.ModuleKind.NodeNext,
  moduleResolution: ts.ModuleResolutionKind.NodeNext,
  target: ts.ScriptTarget.ES2022,
  declaration: true,
  emitDeclarationOnly: true,
  skipLibCheck: true,
  rootDir: srcDir,
  outDir: distDir,
});

const { diagnostics } = program.emit();

if (diagnostics.length > 0) {
  throw new Error(
    ts.formatDiagnosticsWithColorAndContext(diagnostics, {
      getCanonicalFileName: (file) => file,
      getCurrentDirectory: () => root,
      getNewLine: () => '\n',
    }),
  );
}

// the generated index pairs each contract type with a factory export
// keep only the type exports which point to published contracts

const index = fs
  .readFileSync(path.resolve(srcDir, 'index.ts'), 'utf-8')
  .split('\n')
  .filter((line) => {
    const match = line.match(/^export type \{ \w+ \} from '\.\/(.+)\.js';$/);
    return match && isPublished(path.resolve(srcDir, `${match[1]}.ts`));
  });

fs.writeFileSync(
  path.resolve(distDir, 'index.d.ts'),
  [...index, ''].join('\n'),
);

// lerna publishes the dist directory, so it requires its own manifest

const { scripts, devDependencies, exports, ...manifest } = JSON.parse(
  fs.readFileSync(path.resolve(root, 'package.json'), 'utf-8'),
);

delete manifest.publishConfig.directory;

fs.writeFileSync(
  path.resolve(distDir, 'package.json'),
  JSON.stringify(
    {
      ...manifest,
      types: './index.d.ts',
      exports: {
        '.': { types: './index.d.ts' },
        './common': { types: './common.d.ts' },
      },
    },
    null,
    2,
  ) + '\n',
);
