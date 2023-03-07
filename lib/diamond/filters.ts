import { FacetCutAction } from './utils';
import { AddressZero } from '@ethersproject/constants';

export interface FacetFilter {
  type: string;
  action: FacetCutAction;
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
  return filters.some(
    (filter) =>
      [filter.contract, AddressZero].includes(contract) &&
      filter.selectors.includes(selector),
  );
}

// validates that different filter types do not contain the same contract
export function validateFilters(only: FacetFilter[], except: FacetFilter[]) {
  if (only.length > 0 && except.length > 0) {
    only.forEach((o) => {
      except.forEach((e) => {
        if (o.contract === e.contract) {
          throw new Error(
            'only and except filters cannot contain the same contract',
          );
        }
      });
    });
  }
}

export function destructureFilters(
  filters: FacetFilter[],
  action?: FacetCutAction,
) {
  const only = filters.filter((f) => f.type === 'only');
  const except = filters.filter((f) => f.type === 'except');

  if (action !== undefined) {
    only.filter((f) => f.action === action);
    except.filter((f) => f.action === action);
  }

  return { only, except };
}
