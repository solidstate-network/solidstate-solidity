import { UpgradeableOwnableProxy } from '../../../typechain';

interface UpgradeableOwnableProxyArgs {
  deploy: () => Promise<UpgradeableOwnableProxy>;
  implementationFunction: string;
  implementationFunctionArgs: any[];
}
