import type { ReactNode, FormEvent, FormHTMLAttributes } from 'react';

import type { FormState, Store } from '../core/store';

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  name?: string;
  initialState?: Record<string, unknown>;
  children: ReactNode | ((...args: Store) => ReactNode);

  onSubmit(state: FormState, event: FormEvent): void;
}
