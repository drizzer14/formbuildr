import React, { forwardRef, ReactNode } from 'react';
import { func, node, oneOfType, shape, string } from 'prop-types';

import { useForm } from '../core/hooks';
import type { Store } from '../core/store';
import Provider from '../core/context/provider';
import Conductor from '../core/context/conductor';

import type { FormProps } from './form.props';

const Form = forwardRef<HTMLFormElement, FormProps>(function Form(
  { children, name, initialState, onSubmit, ...props },
  ref
) {
  const [store, handleSubmit] = useForm(onSubmit, initialState);

  return (
    <form ref={ref} name={name} onSubmit={handleSubmit} {...props}>
      <Provider value={store}>
        <Conductor path={name}>
          {typeof children === 'function'
            ? // eslint-disable-next-line @typescript-eslint/no-shadow
              (children as (...store: Store) => ReactNode)(...store)
            : children}
        </Conductor>
      </Provider>
    </form>
  );
});

Form.propTypes = {
  children: oneOfType([func, node]),
  name: string,
  initialState: shape({}),
  onSubmit: func.isRequired,
};

export default Form;
