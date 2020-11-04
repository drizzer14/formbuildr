import { useCallback, useEffect, useMemo, useState } from 'react';

import { useProvider } from '../context/provider';

import { useWatch } from './use-watch';

export function useLifecycle<T = unknown>(path: string): [value: T | undefined, setValue: (value: T) => void] {
  const [state, dispatcher] = useProvider();

  const value = useWatch<T>(path);

  const setValue = useCallback(
    (nextValue: T | undefined) => {
      dispatcher.set(path, nextValue);
    },
    [path]
  );

  useEffect(() => {
    if (value === undefined) {
      setValue(undefined);
    }

    return () => {
      dispatcher.delete(path);
    };
  }, []);

  const [, setPreservedPath] = useState(path);

  useEffect(() => {
    setPreservedPath((preservedPath) => {
      if (preservedPath !== path) {
        const preservedValue = state.get<T>(preservedPath);

        dispatcher.set(path, preservedValue);

        dispatcher.delete(preservedPath);
      }

      return path;
    });
  }, [path, setPreservedPath]);

  return useMemo(() => [value, setValue], [value, setValue]);
}
