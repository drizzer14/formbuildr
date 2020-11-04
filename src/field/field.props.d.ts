import type { ReactElement } from 'react';

import type { FormComponent } from '../shared/entity';

export type Setter<T = unknown> = (value: T) => void;

export interface FieldProps extends FormComponent {
  children(value: unknown, setValue: Setter): ReactElement | null;
}
