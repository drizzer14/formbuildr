import { useCallback, useEffect, useMemo, useState } from 'react';

import { useProvider } from '../context/provider';

import { useWatch } from './use-watch';

/**
 * React hook that manages `Field` component's lifecycle.
 * It does all necessary actions to retrieve `Field`'s value from the store, set it back to the store
 * and cleans up unmounted/remounted fields.
 *
 * @param {string} path
 * `Field` component's path.
 * @param {string | undefined} defaultValue
 * Optional default value for this `Field`.
 * @returns {[(value: T | undefined), (setValue: (value: T) => void)]}
 * Getter and setter for `Field`'s value.
 */
export function useLifecycle<T = unknown>(
  path: string,
  defaultValue?: T
): [value: T | undefined, setValue: (value: T) => void] {
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
      setValue(defaultValue);
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
