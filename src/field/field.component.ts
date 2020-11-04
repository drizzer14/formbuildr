import type { FC } from 'react';
import { func } from 'prop-types';

import { useField } from '../core/hooks';
import { formComponent } from '../shared/prop-types';

import type { FieldProps } from './field.props';

const Field: FC<FieldProps> = ({ children, name, index }) => {
  const [value, setValue] = useField({ name, index });

  return children(value, setValue);
};

Field.propTypes = {
  children: func.isRequired,
  ...formComponent,
};

export default Field;
