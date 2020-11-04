import { useEffect, useMemo } from 'react';

import { useConductor } from '../context/conductor';
import type { PathSegment } from '../../shared/entity';

/**
 * React hook that passes either the index or the name to the Conductor context.
 *
 * @param { string | undefined } pathSegment.name
 * Name of the key that stores component's value or children inside the parent object.
 * @param { number | undefined } pathSegment.index
 * Index of the parent's array that stores component's value or children. Has precedence over the `name` parameter.
 * @returns {string}
 * Final path.
 */
export function usePath(pathSegment: PathSegment): string {
  const { name, index } = pathSegment;

  const path = useMemo(() => (index ?? name) as string | number, [index, name]);

  useEffect(() => {
    if (name === undefined && index === undefined) {
      throw new TypeError(`Form component by path "${path}" must have either a "name" or "index" prop.`);
    }
  }, [name, index, path]);

  return useConductor(path);
}
