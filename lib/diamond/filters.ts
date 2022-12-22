import { AddressZero } from '@ethersproject/constants';

export interface FacetFilter {
  contract: string;
  selectors: string[];
}

// returns true if the selector is found in the only or except filters
export function selectorIsFiltered(
  only: FacetFilter[],
  except: FacetFilter[],
  contract: string,
  selector: string,
): boolean {
  if (only.length > 0) {
    // include selectors found in only, exclude all others
    return includes(only, contract, selector);
  }

  if (except.length > 0) {
    // exclude selectors found in except, include all others
    return !includes(except, contract, selector);
  }

  // if neither only or except are used, then include all selectors
  return true;
}

// returns true if the selector is found in the filters
export function includes(
  filters: FacetFilter[],
  contract: string,
  selector: string,
): boolean {
  return filters.some((filter) => [filter.contract, AddressZero].includes(contract) && filter.selectors.includes(selector));
}

// validates that only and except filters do not contain the same contract
export function validateFilters(only: FacetFilter[], except: FacetFilter[]) {
  if (only.length > 0 && except.length > 0) {
    for (const onlyFilter of only) {
      for (const exceptFilter of except) {
        if (onlyFilter.contract === exceptFilter.contract) {
          throw new Error(
            'only and except filters cannot contain the same contract',
          );
        }
      }
    }
  }
}
