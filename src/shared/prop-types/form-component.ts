import { number, string } from 'prop-types';
import type { WeakValidationMap } from 'react';

import type { FormComponent } from '../entity';

export const formComponent: WeakValidationMap<FormComponent> = {
  name: string,
  index: number,
};
