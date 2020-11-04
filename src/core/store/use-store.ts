import { useMemo, useReducer } from 'react';

import type { Store } from './entity';
import { FormDispatcher } from './actions';
import { formReducer, FormState } from './reducer';

export default function useStore<T extends Record<string, unknown>>(initialState?: T): Store {
  const [state, dispatch] = useReducer(formReducer, FormState.fromJSON(initialState));
  const dispatcher = useMemo(() => new FormDispatcher(dispatch), []);

  return useMemo(() => [state, dispatcher], [state]);
}
