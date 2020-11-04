import React, { createContext, FC, useContext } from 'react';

import type { Store } from '../../store';

import type { ProviderProps } from './provider.props';

const ProviderContext = createContext<Store | undefined>(undefined);

/**
 * React context that passes the form's store to its consumers.
 *
 * @param {[state: FormState, dispatcher: FormDispatcher]} value
 * A tuple of store's state object and dispatcher object.
 */
const Provider: FC<ProviderProps> = ({ children, value }) => {
  return <ProviderContext.Provider value={value}>{children}</ProviderContext.Provider>;
};

export default Provider;

/**
 * React hook that gives access to the Provider context.
 */
export function useProvider(): Store {
  const context = useContext(ProviderContext);

  if (context === undefined) {
    throw new ReferenceError('Use "Provider" context inside its provider.');
  }

  return context;
}
