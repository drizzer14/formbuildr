import type { FC } from 'react';
import { func, string } from 'prop-types';

import { useField } from '../core/hooks';
import { formComponent } from '../shared/prop-types';

import type { FieldProps } from './field.props';

/**
 * React component that connects end input to the form.
 * Input must be rendered inside a render-prop `children` function and use `value` and `setValue` params from it.
 *
 * @param children
 * @param {string | undefined} props.name
 * Name of the key that stores Field's value inside the parent object.
 * @param {number | undefined} props.index
 * Index of the parent's array that stores Field's value. Has precedence over the `name` parameter.
 * @param {string | undefined} props.defaultValue
 * Optional default value for this `Field`.
 */
const Field: FC<FieldProps> = ({ children, name, index, defaultValue }) => {
  const [value, setValue] = useField({ name, index }, defaultValue);

  return children(value, setValue);
};

Field.propTypes = {
  children: func.isRequired,
  defaultValue: string,
  ...formComponent,
};

export default Field;
