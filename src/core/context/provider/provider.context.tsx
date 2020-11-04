import React, { createContext, FC, useContext } from 'react';

import type { Store } from '../../store';

import type { ProviderProps } from './provider.props';

const ProviderContext = createContext<Store | undefined>(undefined);

const Provider: FC<ProviderProps> = ({ children, value }) => {
  return <ProviderContext.Provider value={value}>{children}</ProviderContext.Provider>;
};

export default Provider;

export function useProvider(): Store {
  const context = useContext(ProviderContext);

  if (context === undefined) {
    throw new ReferenceError('Use "Provider" context inside its provider.');
  }

  return context;
}
