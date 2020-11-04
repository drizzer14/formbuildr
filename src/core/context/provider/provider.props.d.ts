import type { Store } from '../../store';

export interface ProviderProps {
  /**
   * A tuple of store's state object and dispatcher object.
   */
  value: Store;
}
