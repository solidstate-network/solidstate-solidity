/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ERC1404BaseMock,
  ERC1404BaseMockInterface,
} from "../ERC1404BaseMock";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint8[]",
        name: "errorCodes",
        type: "uint8[]",
      },
      {
        internalType: "string[]",
        name: "errorMessages",
        type: "string[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "detectTransferRestriction",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "restrictionCode",
        type: "uint8",
      },
    ],
    name: "messageForTransferRestriction",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620011d3380380620011d383398101604081905262000034916200033c565b6200006482826200004f6200006c60201b620003421760201c565b6200009060201b62000366179092919060201c565b5050620004e7565b7f3b29b75d14377b08b5cb9134ca742286d8df5e542ecee06be87bca582006c86190565b8051825114620000d55760405162461bcd60e51b8152600401620000cc90602080825260049082015263544f444f60e01b604082015260600190565b60405180910390fd5b8260005b835181101562000177578281815181106200010457634e487b7160e01b600052603260045260246000fd5b60200260200101518260008684815181106200013057634e487b7160e01b600052603260045260246000fd5b602002602001015160ff1660ff1681526020019081526020016000209080519060200190620001619291906200017e565b50806200016e81620004a9565b915050620000d9565b5050505050565b8280546200018c906200046c565b90600052602060002090601f016020900481019282620001b05760008555620001fb565b82601f10620001cb57805160ff1916838001178555620001fb565b82800160010185558215620001fb579182015b82811115620001fb578251825591602001919060010190620001de565b50620002099291506200020d565b5090565b5b808211156200020957600081556001016200020e565b6000601f838184011262000236578182fd5b825160206200024f620002498362000446565b62000413565b80838252828201915082870188848660051b8a010111156200026f578687fd5b865b858110156200032e5781516001600160401b03808211156200029157898afd5b818b0191508b603f830112620002a557898afd5b8682015181811115620002bc57620002bc620004d1565b620002cf818b01601f1916890162000413565b915080825260408d81838601011115620002e7578b8cfd5b8b5b8281101562000306578481018201518482018b01528901620002e9565b8281111562000317578c8a84860101525b505050855250928401929084019060010162000271565b509098975050505050505050565b600080604083850312156200034f578182fd5b82516001600160401b038082111562000366578384fd5b818501915085601f8301126200037a578384fd5b815160206200038d620002498362000446565b8083825282820191508286018a848660051b8901011115620003ad578889fd5b8896505b84871015620003e057805160ff81168114620003cb57898afd5b835260019690960195918301918301620003b1565b5091880151919650909350505080821115620003fa578283fd5b50620004098582860162000224565b9150509250929050565b604051601f8201601f191681016001600160401b03811182821017156200043e576200043e620004d1565b604052919050565b60006001600160401b03821115620004625762000462620004d1565b5060051b60200190565b600181811c908216806200048157607f821691505b60208210811415620004a357634e487b7160e01b600052602260045260246000fd5b50919050565b6000600019821415620004ca57634e487b7160e01b81526011600452602481fd5b5060010190565b634e487b7160e01b600052604160045260246000fd5b610cdc80620004f76000396000f3fe608060405234801561001057600080fd5b506004361061009e5760003560e01c80637f4ab1dd116100665780637f4ab1dd1461015a5780639dc29fac1461017a578063a9059cbb1461018d578063d4ce1415146101a0578063dd62ed3e146101c957600080fd5b8063095ea7b3146100a357806318160ddd146100cb57806323b872dd146100fc57806340c10f191461010f57806370a0823114610124575b600080fd5b6100b66100b1366004610b4e565b610221565b60405190151581526020015b60405180910390f35b7fc991b2e918acaba8e5721668ed0b1982684e5a8692a621bcd2d7ef326bb015b6545b6040519081526020016100c2565b6100b661010a366004610b13565b610237565b61012261011d366004610b4e565b610303565b005b6100ee610132366004610ac0565b6001600160a01b03166000908152600080516020610c87833981519152602052604090205490565b61016d610168366004610b77565b610311565b6040516100c29190610b98565b610122610188366004610b4e565b61032b565b6100b661019b366004610b4e565b610335565b6101b76101ae366004610b13565b60009392505050565b60405160ff90911681526020016100c2565b6100ee6101d7366004610ae1565b6001600160a01b0391821660009081527fc991b2e918acaba8e5721668ed0b1982684e5a8692a621bcd2d7ef326bb015b56020908152604080832093909416825291909152205490565b600061022e338484610441565b50600192915050565b6001600160a01b03831660009081527fc991b2e918acaba8e5721668ed0b1982684e5a8692a621bcd2d7ef326bb015b560209081526040808320338452909152812054828110156102e05760405162461bcd60e51b815260206004820152602860248201527f45524332303a207472616e7366657220616d6f756e74206578636565647320616044820152676c6c6f77616e636560c01b60648201526084015b60405180910390fd5b6102ed8533858403610441565b6102f8858585610585565b506001949350505050565b61030d8282610765565b5050565b60606103258261031f610342565b9061086e565b92915050565b61030d8282610915565b600061022e338484610585565b7f3b29b75d14377b08b5cb9134ca742286d8df5e542ecee06be87bca582006c86190565b80518251146103a05760405162461bcd60e51b81526004016102d790602080825260049082015263544f444f60e01b604082015260600190565b8260005b835181101561043a578281815181106103cd57634e487b7160e01b600052603260045260246000fd5b60200260200101518260008684815181106103f857634e487b7160e01b600052603260045260246000fd5b602002602001015160ff1660ff1681526020019081526020016000209080519060200190610427929190610a0b565b508061043281610c55565b9150506103a4565b5050505050565b6001600160a01b0383166104a35760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016102d7565b6001600160a01b0382166105045760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016102d7565b6001600160a01b0383811660008181527fc991b2e918acaba8e5721668ed0b1982684e5a8692a621bcd2d7ef326bb015b5602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b6001600160a01b0383166105e95760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b60648201526084016102d7565b6001600160a01b03821661064b5760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016102d7565b6001600160a01b0383166000908152600080516020610c878339815191526020819052604090912054828110156106d35760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b60648201526084016102d7565b6001600160a01b0380861660009081526020849052604080822086850390559186168152908120805485929061070a908490610beb565b92505081905550836001600160a01b0316856001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8560405161075691815260200190565b60405180910390a35050505050565b6001600160a01b0382166107bb5760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064016102d7565b7fc991b2e918acaba8e5721668ed0b1982684e5a8692a621bcd2d7ef326bb015b68054600080516020610c878339815191529183916000906107fe908490610beb565b90915550506001600160a01b0383166000908152602082905260408120805484929061082b908490610beb565b90915550506040518281526001600160a01b038416906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90602001610578565b60ff8116600090815260208390526040902080546060919061088f90610c1a565b80601f01602080910402602001604051908101604052809291908181526020018280546108bb90610c1a565b80156109085780601f106108dd57610100808354040283529160200191610908565b820191906000526020600020905b8154815290600101906020018083116108eb57829003601f168201915b5050505050905092915050565b6001600160a01b0382166109755760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b60648201526084016102d7565b6001600160a01b0382166000908152600080516020610c878339815191526020819052604082208054919284926109ad908490610c03565b92505081905550818160020160008282546109c89190610c03565b90915550506040518281526000906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90602001610578565b828054610a1790610c1a565b90600052602060002090601f016020900481019282610a395760008555610a7f565b82601f10610a5257805160ff1916838001178555610a7f565b82800160010185558215610a7f579182015b82811115610a7f578251825591602001919060010190610a64565b50610a8b929150610a8f565b5090565b5b80821115610a8b5760008155600101610a90565b80356001600160a01b0381168114610abb57600080fd5b919050565b600060208284031215610ad1578081fd5b610ada82610aa4565b9392505050565b60008060408385031215610af3578081fd5b610afc83610aa4565b9150610b0a60208401610aa4565b90509250929050565b600080600060608486031215610b27578081fd5b610b3084610aa4565b9250610b3e60208501610aa4565b9150604084013590509250925092565b60008060408385031215610b60578182fd5b610b6983610aa4565b946020939093013593505050565b600060208284031215610b88578081fd5b813560ff81168114610ada578182fd5b6000602080835283518082850152825b81811015610bc457858101830151858201604001528201610ba8565b81811115610bd55783604083870101525b50601f01601f1916929092016040019392505050565b60008219821115610bfe57610bfe610c70565b500190565b600082821015610c1557610c15610c70565b500390565b600181811c90821680610c2e57607f821691505b60208210811415610c4f57634e487b7160e01b600052602260045260246000fd5b50919050565b6000600019821415610c6957610c69610c70565b5060010190565b634e487b7160e01b600052601160045260246000fdfec991b2e918acaba8e5721668ed0b1982684e5a8692a621bcd2d7ef326bb015b4a2646970667358221220655eecbe394fa8630b449d6adac320e927abf0cad133a088ba1a880de064b07764736f6c63430008040033";

export class ERC1404BaseMock__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    errorCodes: BigNumberish[],
    errorMessages: string[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ERC1404BaseMock> {
    return super.deploy(
      errorCodes,
      errorMessages,
      overrides || {}
    ) as Promise<ERC1404BaseMock>;
  }
  getDeployTransaction(
    errorCodes: BigNumberish[],
    errorMessages: string[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      errorCodes,
      errorMessages,
      overrides || {}
    );
  }
  attach(address: string): ERC1404BaseMock {
    return super.attach(address) as ERC1404BaseMock;
  }
  connect(signer: Signer): ERC1404BaseMock__factory {
    return super.connect(signer) as ERC1404BaseMock__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC1404BaseMockInterface {
    return new utils.Interface(_abi) as ERC1404BaseMockInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC1404BaseMock {
    return new Contract(address, _abi, signerOrProvider) as ERC1404BaseMock;
  }
}
