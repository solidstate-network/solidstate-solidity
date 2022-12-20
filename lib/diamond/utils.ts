import { FacetFilter, selectorIsFiltered, validateFilters } from './filters';
import { AddressZero } from '@ethersproject/constants';
import { Contract } from '@ethersproject/contracts';
import {
  IDiamondReadable,
  IDiamondWritable,
} from '@solidstate/typechain-types';

export enum FacetCutAction {
  ADD,
  REPLACE,
  REMOVE,
}

export interface Facet {
  target: string;
  selectors: string[];
}

export interface FacetCut extends Facet {
  action: FacetCutAction;
}

// returns a list of signatures for a contract
export function getSignatures(contract: Contract): string[] {
  return Object.keys(contract.interface.functions);
}

// returns a list of selectors for a contract
export function getSelectors(contract: Contract): string[] {
  const signatures = getSignatures(contract);
  return signatures.reduce((acc: string[], val: string) => {
    acc.push(contract.interface.getSighash(val));
    return acc;
  }, []);
}

// returns a list of Facets for a contract
export function getFacets(contracts: Contract[]): Facet[] {
  return contracts.map((contract) => {
    return {
      target: contract.address,
      selectors: getSelectors(contract),
    };
  });
}

// returns true if the selector is found in the facets
export function selectorExistsInFacets(
  selector: string,
  facets: Facet[],
): boolean {
  for (const facet of facets) {
    if (facet.selectors.includes(selector)) return true;
  }
  return false;
}

// preview FacetCut which adds unregistered selectors
export async function addUnregisteredSelectors(
  diamond: IDiamondReadable,
  contracts: Contract[],
  only: FacetFilter[] = [],
  except: FacetFilter[] = [],
): Promise<FacetCut[]> {
  validateFilters(only, except);

  const diamondFacets: Facet[] = await diamond.facets();
  const facets = getFacets(contracts);

  let selectorsAdded = false;
  let facetCuts: FacetCut[] = [];

  // if facet selector is unregistered then it should be added to the diamond.
  for (const facet of facets) {
    for (const selector of facet.selectors) {
      const target = facet.target;

      if (
        target !== diamond.address &&
        selector.length > 0 &&
        !selectorExistsInFacets(selector, diamondFacets) &&
        selectorIsFiltered(only, except, target, selector)
      ) {
        facetCuts.push(
          printFacetCuts(facet.target, [selector], FacetCutAction.ADD),
        );

        selectorsAdded = true;
      }
    }
  }

  if (!selectorsAdded) {
    throw new Error('No selectors were added to FacetCut');
  }

  return groupFacetCuts(facetCuts);
}

// preview FacetCut which replaces registered selectors with unregistered selectors
export async function replaceRegisteredSelectors(
  diamond: IDiamondReadable,
  contracts: Contract[],
  only: FacetFilter[] = [],
  except: FacetFilter[] = [],
): Promise<FacetCut[]> {
  validateFilters(only, except);

  const diamondFacets: Facet[] = await diamond.facets();
  const facets = getFacets(contracts);

  let selectorsReplaced = false;
  let facetCuts: FacetCut[] = [];

  // if a facet selector is registered with a different target address, the target will
  // be replaced
  for (const facet of facets) {
    for (const selector of facet.selectors) {
      const target = facet.target;
      const oldTarget = await diamond.facetAddress(selector);

      if (
        target != oldTarget &&
        target != AddressZero &&
        target != diamond.address &&
        selector.length > 0 &&
        selectorExistsInFacets(selector, diamondFacets) &&
        selectorIsFiltered(only, except, target, selector)
      ) {
        facetCuts.push(
          printFacetCuts(target, [selector], FacetCutAction.REPLACE),
        );

        selectorsReplaced = true;
      }
    }
  }

  if (!selectorsReplaced) {
    throw new Error('No selectors were replaced in FacetCut');
  }

  return groupFacetCuts(facetCuts);
}

// preview FacetCut which removes registered selectors
export async function removeRegisteredSelectors(
  diamond: IDiamondReadable,
  contracts: Contract[],
  only: FacetFilter[] = [],
  except: FacetFilter[] = [],
): Promise<FacetCut[]> {
  validateFilters(only, except);

  const diamondFacets: Facet[] = await diamond.facets();
  const facets = getFacets(contracts);

  let selectorsRemoved = false;
  let facetCuts: FacetCut[] = [];

  // if a registered selector is not found in the facets then it should be removed
  // from the diamond
  for (const diamondFacet of diamondFacets) {
    for (const selector of diamondFacet.selectors) {
      const target = diamondFacet.target;

      if (
        target != AddressZero &&
        target != diamond.address &&
        selector.length > 0 &&
        !selectorExistsInFacets(selector, facets) &&
        selectorIsFiltered(only, except, AddressZero, selector)
      ) {
        facetCuts.push(
          printFacetCuts(AddressZero, [selector], FacetCutAction.REMOVE),
        );

        selectorsRemoved = true;
      }
    }
  }

  if (!selectorsRemoved) {
    throw new Error('No selectors were removed from FacetCut');
  }

  return groupFacetCuts(facetCuts);
}

// preview a FacetCut which adds, replaces, or removes selectors, as needed
export async function previewFacetCut(
  diamond: IDiamondReadable,
  contracts: Contract[],
  only: FacetFilter[][] = [[], [], []],
  except: FacetFilter[][] = [[], [], []],
): Promise<FacetCut[]> {
  let addFacetCuts: FacetCut[] = [];
  let replaceFacetCuts: FacetCut[] = [];
  let removeFacetCuts: FacetCut[] = [];

  try {
    addFacetCuts = await addUnregisteredSelectors(
      diamond,
      contracts,
      only[0],
      except[0],
    );
  } catch (error) {
    console.log(`WARNING: ${(error as Error).message}`);
  }

  try {
    replaceFacetCuts = await replaceRegisteredSelectors(
      diamond,
      contracts,
      only[1],
      except[1],
    );
  } catch (error) {
    console.log(`WARNING: ${(error as Error).message}`);
  }

  try {
    removeFacetCuts = await removeRegisteredSelectors(
      diamond,
      contracts,
      only[2],
      except[2],
    );
  } catch (error) {
    console.log(`WARNING: ${(error as Error).message}`);
  }

  return groupFacetCuts([
    ...addFacetCuts,
    ...replaceFacetCuts,
    ...removeFacetCuts,
  ]);
}

// executes a DiamondCut using the provided FacetCut
export async function diamondCut(
  diamond: IDiamondWritable,
  facetCut: FacetCut[],
  target: string = AddressZero,
  data: string = '0x',
) {
  (await diamond.diamondCut(facetCut, target, data)).wait(1);
}

// groups facet cuts by target address and action type
export function groupFacetCuts(facetCuts: FacetCut[]): FacetCut[] {
  const cuts = facetCuts.reduce((acc: FacetCut[], facetCut: FacetCut) => {
    if (acc.length == 0) acc.push(facetCut);

    let exists = false;

    acc.forEach((_, i) => {
      if (
        acc[i].action == facetCut.action &&
        acc[i].target == facetCut.target
      ) {
        acc[i].selectors.push(...facetCut.selectors);
        // removes duplicates, if there are any
        acc[i].selectors = [...new Set(acc[i].selectors)];
        exists = true;
      }
    });

    // push facet cut if it does not already exist
    if (!exists) acc.push(facetCut);

    return acc;
  }, []);

  let cache: any = {};

  // checks if selector is used multiple times, emits warning
  cuts.forEach((cut) => {
    cut.selectors.forEach((selector: string) => {
      if (cache[selector]) {
        console.log(
          `WARNING: selector: ${selector}, target: ${cut.target} is defined in multiple cuts`,
        );
      } else {
        cache[selector] = true;
      }
    });
  });

  return cuts;
}

export function printFacetCuts(
  target: string,
  selectors: string[],
  action: number = 0,
): FacetCut {
  return {
    target: target,
    action: action,
    selectors: selectors,
  };
}
