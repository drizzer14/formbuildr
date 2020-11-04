import type { FormState } from '../reducer';
import type { FormDispatcher } from '../actions';

export type Store = [state: FormState, dispatcher: FormDispatcher];
