import React, { FC } from 'react';

import { usePath } from '../core/hooks';
import Conductor from '../core/context/conductor';
import { formComponent } from '../shared/prop-types';

import type { FieldSetProps } from './field-set.props';

/**
 * A component that hosts other nested form components inside
 * providing them with its path.
 *
 * @param children
 * @param {string | undefined} props.name
 * Name of the key that stores Field's value inside the parent object.
 * @param {number | undefined} props.index
 * Index of the parent's array that stores Field's value. Has precedence over the `name` parameter.
 */
const FieldSet: FC<FieldSetProps> = ({ children, name, index }) => {
  const path = usePath({ name, index });

  return <Conductor path={path}>{children}</Conductor>;
};

FieldSet.propTypes = {
  ...formComponent,
};

export default FieldSet;
