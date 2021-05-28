/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  IDiamondCuttable,
  IDiamondCuttableInterface,
} from "../IDiamondCuttable";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "target",
            type: "address",
          },
          {
            internalType: "enum IDiamondCuttable.FacetCutAction",
            name: "action",
            type: "uint8",
          },
          {
            internalType: "bytes4[]",
            name: "selectors",
            type: "bytes4[]",
          },
        ],
        indexed: false,
        internalType: "struct IDiamondCuttable.FacetCut[]",
        name: "facetCuts",
        type: "tuple[]",
      },
      {
        indexed: false,
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "DiamondCut",
    type: "event",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "target",
            type: "address",
          },
          {
            internalType: "enum IDiamondCuttable.FacetCutAction",
            name: "action",
            type: "uint8",
          },
          {
            internalType: "bytes4[]",
            name: "selectors",
            type: "bytes4[]",
          },
        ],
        internalType: "struct IDiamondCuttable.FacetCut[]",
        name: "facetCuts",
        type: "tuple[]",
      },
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "diamondCut",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IDiamondCuttable__factory {
  static readonly abi = _abi;
  static createInterface(): IDiamondCuttableInterface {
    return new utils.Interface(_abi) as IDiamondCuttableInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IDiamondCuttable {
    return new Contract(address, _abi, signerOrProvider) as IDiamondCuttable;
  }
}
