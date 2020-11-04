import type { Reducer } from 'react';

import { ActionType, FormAction } from '../actions';

import type { FormState } from './form.state';

export const formReducer: Reducer<FormState, FormAction> = (state, action) => {
  switch (action.type) {
    case ActionType.Set: {
      const { path, value: nextValue } = action.payload;
      const prevValue = state.get(path);

      if (JSON.stringify(nextValue) !== JSON.stringify(prevValue)) {
        return state.set([path, nextValue]);
      }

      return state;
    }
    case ActionType.Delete: {
      const { path } = action.payload;

      if (state.has(path)) {
        return state.delete(path);
      }

      return state;
    }
    default: {
      return state;
    }
  }
};
