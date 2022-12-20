import { AddressZero } from '@ethersproject/constants';

export interface FacetFilter {
  contract: string;
  selectors: string[];
}

// returns true if the selector is found in the only or exclude filters
export function selectorIsFiltered(
  only: FacetFilter[],
  exclude: FacetFilter[],
  contract: string,
  selector: string,
): boolean {
  if (only.length > 0) {
    // include selectors found in only, exclude all others
    return includes(only, contract, selector);
  }

  if (exclude.length > 0) {
    // exclude selectors found in exclude, include all others
    return !includes(exclude, contract, selector);
  }

  // if neither only or exclude are used, then include all selectors
  return true;
}

// returns true if the selector is found in the filters
export function includes(
  filters: FacetFilter[],
  contract: string,
  selector: string,
): boolean {
  for (const filter of filters) {
    if (filter.contract === contract || AddressZero === contract) {
      return filter.selectors.includes(selector);
    }
  }

  return false;
}

// validates that only and exclude filters do not contain the same contract
export function validateFilters(only: FacetFilter[], exclude: FacetFilter[]) {
  if (only.length > 0 && exclude.length > 0) {
    for (const onlyFilter of only) {
      for (const excludeFilter of exclude) {
        if (onlyFilter.contract === excludeFilter.contract) {
          throw new Error(
            'only and exclude filters cannot contain the same contract',
          );
        }
      }
    }
  }
}
