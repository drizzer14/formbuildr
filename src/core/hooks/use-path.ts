import { useEffect, useMemo } from 'react';

import { useConductor } from '../context/conductor';
import type { FormComponent } from '../../shared/entity';

export function usePath({ name, index }: FormComponent): string {
  const path = useMemo(() => (index ?? name) as string | number, [index, name]);

  useEffect(() => {
    if (name === undefined && index === undefined) {
      throw new TypeError(`Form component by path "${path}" must have either a "name" or "index" prop.`);
    }
  }, [name, index, path]);

  return useConductor(path);
}
