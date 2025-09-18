import type { ExecStagedUserConfig } from 'exec-staged/types';

const config: ExecStagedUserConfig = [
  // 'knip',
  // 'knip --strict',
  {
    task: 'slippy $FILES',
    glob: 'contracts/**/*.sol',
  },
  {
    task: 'prettier --write $FILES',
    glob: '*.{js,ts,sol,json,md}',
  },
];

export default config;
