import { AccessControlMock, OwnableMock__factory } from '../../typechain';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { describeBehaviorOfOwnable } from '@solidstate/spec';
import { ethers } from 'hardhat';

const DEFAULT_ADMIN_ROLE =
  '0x0000000000000000000000000000000000000000000000000000000000000000';
const ROLE = web3.utils.soliditySha3('ROLE');
const OTHER_ROLE = web3.utils.soliditySha3('OTHER_ROLE');

describe('AccessControl', function () {
  let owner: SignerWithAddress;
  let nonOwner: SignerWithAddress;
  let instance: AccessControlMock;

  before(async function () {});

  beforeEach(async function () {});
});
