import type { FormComponent } from '../../shared/entity';

import { usePath } from './use-path';
import { useLifecycle } from './use-lifecycle';

export function useField({ name, index }: FormComponent): ReturnType<typeof useLifecycle> {
  const path = usePath({ name, index });

  return useLifecycle(path);
}
