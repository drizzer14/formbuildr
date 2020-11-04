# 📋 formbuildr

React library for building forms from the JSX markup.

- [Installation](#installation)
- [Usage](#usage)
  - [Form](#form)
    - [Optional name](#optional-name)
    - [Submission](#submission)
    - [Initial state](#initial-state)
  - [FieldSet](#fieldset)
    - [As object](#as-object)
    - [As array](#as-array)
  - [Field](#field)
    - [Default value](#default-value)

## Installation

```shell
λ npm i formbuildr

# or

λ yarn add formbuildr
```

> `prop-types` and `lodash.set` would be installed alongside this library.

## Usage

This library's main purpose is to build an object mirroring the form state from the JSX markup.
Every form component present in your JSX tree will be connected to the store and will contribute to the
final object's shape.

For example, this JSX markup:

```typescript jsx
import Form from 'formbuildr/form';
import FieldSet from 'formbuildr/field-set';
import Field from 'formbuildr/field';

// ...

<Form>
  <FieldSet name="user">
    <Field name="firstName">
      {(value, setValue) => {
        return (
          <input
            type="text"
            name="first-name"
            value={value}
            onChange={({ target: { value: inputValue } }) => setValue(inputValue)}
          />
        );
      }}
    </Field>

    <Field name="lastName">
      {(value, setValue) => {
        return (
          <input
            type="text"
            name="last-name"
            value={value}
            onChange={({ target: { value: inputValue } }) => setValue(inputValue)}
          />
        );
      }}
    </Field>
  </FieldSet>

  <Field name="hasSubscribed">
    {(value, setValue) => {
      return (
        <input
          type="checkbox"
          name="has-subscribed"
          defaultChecked={value}
          onChange={({ target: { checked } }) => setValue(checked)}
        />
      );
    }}
  </Field>
</Form>;
```

Translates to this resulting object:

```typescript
{
  user: {
    firstName: '',
    lastName: ''
  },
  hasSubscribed: true
}
```

As easy as that!

Any kind of input component is applicable here, just make sure to pass it a value and place the `setValue`
function on any of its change handlers.

---

### Form

`Form` component is the entrypoint to this library. It should receive the `onSubmit` prop
which fires on every form submission (thus, mimicking the native `<form>` element behaviour).

#### Optional name

If you specify the name, you will get your resulting form object wrapped inside the key that corresponds to it.
Following our previous example, this markup:

```typescript jsx
import Form from 'formbuildr/form';

// ...

<Form onSubmit={handleSubmit} name="login">
  {/* everything here is the same */}
</Form>;
```

Becomes this object:

```typescript
{
  login: {
    // same resulting object as before
  }
}
```

#### Submission

When you submit a form, either through the `<button type="submit" />` or any other valid method,
the `onSubmit` handler is fired, giving you access to the form's current state and a native `event` object.

```typescript jsx
import Form from 'formbuildr/form';

const handleSubmit = (state, event) => {
  event.preventDefault();

  console.log(state.toJSON());
};

// ...

<Form onSubmit={handleSubmit}>
  <button type="submit">Submit</button>
</Form>;
```

#### Initial state

`Form` component also accepts the `initialState` object which populates its state with some initial data.
This way, every input that corresponds to the path inside this object should already receive its value
from the initial state.

```typescript jsx
import Form from 'formbuildr/form';
import Field from 'formbuildr/field';

// ...

<Form
  onSubmit={handleSubmit}
  initialState={{
    firstName: 'Monty',
  }}
>
  <Field name="firstName">
    {(value, setValue) => {
      // value here is defined as 'Monty' right away
    }}
  </Field>
</Form>;
```

---

### FieldSet

`FieldSet` is a component that acts as a host for underlying form components. It can either serve
as a wrapper object or accomodate an array.

#### As object

```typescript jsx
import FieldSet from 'formbuildr/field-set';
import Field from 'formbuildr/field';

// ...

<FieldSet name="user">
  <Field name="firstName">
    {
      // ...
    }
  </Field>

  <Field name="lastName">
    {
      // ...
    }
  </Field>
</FieldSet>;
```

Becomes:

```typescript
{
  user: {
    firstName: '',
    lastName: ''
  }
}
```

#### As array

```typescript jsx
import FieldSet from 'formbuildr/field-set';
import Field from 'formbuildr/field';

// ...

<FieldSet name="languages">
  {languages.map((language, index) => {
    return (
      <Field key={language} index={index}>
        {
          // ...
        }
      </Field>
    );
  })}
</FieldSet>;
```

Becomes:

```typescript
{
  languages: [
    /* ... */
  ];
}
```

> `FieldSet` itself accepts either a `name` or `index` prop.

---

### Field

`Field` is the last component in the chain serving as the connection to the form's state.
Each field must have a `name` or `index` prop indicating its affiliation to the specific parent
and render its children via the [render props technique](https://reactjs.org/docs/render-props.html).

```typescript jsx
import Field from 'formbuildr/field';

<Field name="age">
  {(value, setValue) => {
    return <input type="number" value={value} onChange={({ target: { valueAsNumber } }) => setValue(valueAsNumber)} />;
  }}
</Field>;
```

#### Default value

Earlier we've learned how to set an initial state for the whole form.
This is also achievable for a single field:

```typescript jsx
import Field from 'formbuildr/field';

<Field name="age" defaultValue={54}>
  {(value, setValue) => {
    // value here is 54
    return <input type="number" value={value} onChange={({ target: { valueAsNumber } }) => setValue(valueAsNumber)} />;
  }}
</Field>;
```
