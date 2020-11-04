import type { ReactNode, FormEvent, FormHTMLAttributes } from 'react';

import type { FormState, Store } from '../core/store';

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode | ((...args: Store) => ReactNode);
  name?: string;
  initialState?: Record<string, unknown>;

  onSubmit(state: FormState, event: FormEvent): void;
}
