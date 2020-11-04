import { FormEventHandler, useCallback, useMemo } from 'react';

import useStore, { Store } from '../store';
import type { FormProps } from '../../form';

/**
 * A template to create a fully functional `Form`-like component.
 *
 * @param {FormProps["onSubmit"]} onSubmit
 * The function that gets called upon form's submission.
 * @param {T} initialState
 * Optional initial state of the form.
 * @returns {[store: Store, handleSubmit: React.FormEventHandler]}
 * A tuple of `store` objects (`state` and `dispatcher`) and a submission handler to be placed on the `<form>` component.
 */
export function useForm<T extends Record<string, unknown>>(
  onSubmit: FormProps['onSubmit'],
  initialState?: T
): [store: Store, handleSubmit: FormEventHandler] {
  const store = useStore(initialState);
  const [state] = store;

  const handleSubmit = useCallback<FormEventHandler>((event) => onSubmit(state, event), [state, onSubmit]);

  return useMemo(() => [store, handleSubmit], [state, handleSubmit]);
}
