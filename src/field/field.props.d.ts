import type { ReactElement } from 'react';

import type { PathSegment } from '../shared/entity';

export type Setter<T = unknown> = (value: T) => void;

export interface FieldProps extends PathSegment {
  defaultValue?: unknown;

  children(value: unknown, setValue: Setter): ReactElement | null;
}
