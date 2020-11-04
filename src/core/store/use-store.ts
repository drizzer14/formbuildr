import { useMemo, useReducer } from 'react';

import type { Store } from './entity';
import { FormDispatcher } from './actions';
import { formReducer, FormState } from './reducer';

/**
 * React hook that creates a form's store.
 *
 * @param {T} initialState
 * Optional initial state of the form.
 * @returns {Store}
 * A tuple of store's state object and dispatcher object.
 */
export default function useStore<T extends Record<string, unknown>>(initialState?: T): Store {
  const [state, dispatch] = useReducer(formReducer, FormState.fromJSON(initialState));
  const dispatcher = useMemo(() => new FormDispatcher(dispatch), []);

  return useMemo(() => [state, dispatcher], [state]);
}
