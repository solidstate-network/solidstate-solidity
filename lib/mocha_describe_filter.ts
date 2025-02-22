import { Suite } from 'mocha';

export function describeFilter(skips?: string[]) {
  let set = new Set(skips);
  return (title: string, suite: (this: Suite) => void) => {
    set.has(title) || describe(title, suite);
  };
}
