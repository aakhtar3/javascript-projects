import { shallow } from 'enzyme';

/**
 * Wraps shallow with redux store
 */
export const shallowWithStore = (component, reduxStore) => {
  const context = { reduxStore };
  return shallow(component, { context });
};

export default shallowWithStore;
