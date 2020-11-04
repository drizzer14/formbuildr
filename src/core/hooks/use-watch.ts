import { useMemo } from 'react';

import { useProvider } from '../context/provider';

export function useWatch<T>(path: string): T | undefined {
  const [state] = useProvider();

  return useMemo(() => state.get<T>(path), [state, path]);
}
