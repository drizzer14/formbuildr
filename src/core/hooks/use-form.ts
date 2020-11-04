import { FormEventHandler, useCallback, useMemo } from 'react';

import useStore, { Store } from '../store';
import type { FormProps } from '../../form';

export function useForm<T extends Record<string, unknown>>(
  onSubmit: FormProps['onSubmit'],
  initialState?: T
): [store: Store, handleSubmit: FormEventHandler] {
  const store = useStore(initialState);
  const [state] = store;

  const handleSubmit = useCallback<FormEventHandler>((event) => onSubmit(state, event), [state, onSubmit]);

  return useMemo(() => [store, handleSubmit], [state, handleSubmit]);
}
