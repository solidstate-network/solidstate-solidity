import { describeBehaviorOfProxy } from '../../spec/proxy/Proxy.behavior';
import {
  Ownable,
  Ownable__factory,
  ProxyMock,
  ProxyMock__factory,
} from '../../typechain';

describe('Proxy', function () {
  let implementation: Ownable;
  let instance: ProxyMock;

  before(async function () {
    implementation = await new Ownable__factory().deploy();
  });

  beforeEach(async function () {
    instance = await new ProxyMock__factory().deploy(implementation.address);
  });

  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfProxy(
    {
      deploy: async () => instance,
      implementationFunction: 'owner()',
      implementationFunctionArgs: [],
    },
    [],
  );
});
