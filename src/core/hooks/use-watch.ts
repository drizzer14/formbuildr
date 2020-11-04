import { useMemo } from 'react';

import { useProvider } from '../context/provider';

/**
 * Returns a value from the form's store by the specified path.
 *
 * @param {string} path
 */
export function useWatch<T>(path: string): T | undefined {
  const [state] = useProvider();

  return useMemo(() => state.get<T>(path), [state, path]);
}
