import { number, string } from 'prop-types';
import type { WeakValidationMap } from 'react';

import type { PathSegment } from '../entity';

export const formComponent: WeakValidationMap<PathSegment> = {
  name: string,
  index: number,
};
