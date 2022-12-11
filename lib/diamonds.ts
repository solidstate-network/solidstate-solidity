import {
  IDiamondReadable,
  IDiamondWritable,
} from '@solidstate/typechain-types';
import { Contract, constants } from 'ethers';

export interface Facet {
  target: string;
  selectors: string[];
}

enum FacetCutAction {
  Add,
  Replace,
  Remove,
}

export interface FacetCut extends Facet {
  action: FacetCutAction;
}

export function getSignatures(contract: Contract): string[] {
  return Object.keys(contract.interface.functions);
}

export function getSelectors(contract: Contract): string[] {
  const signatures = getSignatures(contract);
  return signatures.reduce((acc: string[], val: string) => {
    acc.push(contract.interface.getSighash(val));
    return acc;
  }, []);
}

export function getFacets(contracts: Contract[]): Facet[] {
  return contracts.map((contract) => {
    return {
      target: contract.address,
      selectors: getSelectors(contract),
    };
  });
}

export function selectorExistsInFacets(
  selector: string,
  facets: Facet[],
): boolean {
  for (const facet of facets) {
    if (facet.selectors.includes(selector)) return true;
  }

  return false;
}

// adds unregistered selectors
export async function addUnregisteredSelectors(
  diamond: IDiamondReadable,
  contracts: Contract[],
  exclude: string[] = [],
): Promise<FacetCut[]> {
  const diamondFacets: Facet[] = await diamond.facets();
  const facets = getFacets(contracts);
  let facetCuts: FacetCut[] = [];

  // if facet selector is unregistered then it should be added to the diamond.
  for (const facet of facets) {
    for (const selector of facet.selectors) {
      const target = facet.target;

      if (
        target !== diamond.address &&
        selector.length > 0 &&
        !selectorExistsInFacets(selector, diamondFacets) &&
        !exclude.includes(selector)
      ) {
        facetCuts.push(
          printFacetCuts(facet.target, [selector], FacetCutAction.Add),
        );
      }
    }
  }

  return groupFacetCuts(facetCuts);
}

// replace registered selectors
export async function replaceRegisteredSelectors(
  diamond: IDiamondReadable,
  contracts: Contract[],
  exclude: string[] = [],
): Promise<FacetCut[]> {
  const diamondFacets: Facet[] = await diamond.facets();
  const facets = getFacets(contracts);
  let facetCuts: FacetCut[] = [];

  // if a facet selector is registered with a different target address, the target will be replaced
  for (const facet of facets) {
    for (const selector of facet.selectors) {
      const target = facet.target;
      const oldTarget = await diamond.facetAddress(selector);

      if (
        target != oldTarget &&
        target != constants.AddressZero &&
        target != diamond.address &&
        selector.length > 0 &&
        selectorExistsInFacets(selector, diamondFacets) &&
        !exclude.includes(selector)
      ) {
        facetCuts.push(
          printFacetCuts(target, [selector], FacetCutAction.Replace),
        );
      }
    }
  }

  return groupFacetCuts(facetCuts);
}

// removes registered selectors
export async function removeRegisteredSelectors(
  diamond: IDiamondReadable,
  contracts: Contract[],
  exclude: string[] = [],
): Promise<FacetCut[]> {
  const diamondFacets: Facet[] = await diamond.facets();
  const facets = getFacets(contracts);
  let facetCuts: FacetCut[] = [];

  // if a registered selector is not found in the facets then it should be removed from the diamond
  for (const diamondFacet of diamondFacets) {
    for (const selector of diamondFacet.selectors) {
      const target = diamondFacet.target;

      if (
        target != constants.AddressZero &&
        target != diamond.address &&
        selector.length > 0 &&
        !selectorExistsInFacets(selector, facets) &&
        !exclude.includes(selector)
      ) {
        facetCuts.push(
          printFacetCuts(
            constants.AddressZero,
            [selector],
            FacetCutAction.Remove,
          ),
        );
      }
    }
  }

  return groupFacetCuts(facetCuts);
}

export async function diamondCut(
  diamond: IDiamondWritable,
  facetCut: FacetCut[],
  target: string = constants.AddressZero,
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
