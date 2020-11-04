import React, { FC } from 'react';

import { usePath } from '../core/hooks';
import Conductor from '../core/context/conductor';
import { formComponent } from '../shared/prop-types';

import type { FieldSetProps } from './field-set.props';

const FieldSet: FC<FieldSetProps> = ({ children, name, index }) => {
  const path = usePath({ name, index });

  return <Conductor path={path}>{children}</Conductor>;
};

FieldSet.propTypes = {
  ...formComponent,
};

export default FieldSet;
