import type { PathSegment } from '../../shared/entity';

import { usePath } from './use-path';
import { useLifecycle } from './use-lifecycle';

/**
 * A template to create a fully functional `Field`-like component.
 *
 * @param { string | undefined } pathSegment.name
 * Name of the key that stores component's value or children inside the parent object.
 * @param { number | undefined } pathSegment.index
 * Index of the parent's array that stores component's value or children. Has precedence over the `name` parameter.
 * @param {string | undefined} defaultValue
 * Optional default value for this `Field`.
 */
export function useField<T = unknown>(pathSegment: PathSegment, defaultValue?: T): ReturnType<typeof useLifecycle> {
  const { name, index } = pathSegment;

  const path = usePath({ name, index });

  return useLifecycle(path, defaultValue) as ReturnType<typeof useLifecycle>;
}
