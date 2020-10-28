# merced-react-hooks

> React Hooks Created by Alex Merced

[![NPM](https://img.shields.io/npm/v/merced-react-hooks.svg)](https://www.npmjs.com/package/merced-react-hooks) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save merced-react-hooks
```

## Usage

```jsx
import React, { Component } from 'react'

import {
  createDataStore,
  useFormState,
  useLocalStorage,
  useSessionStorage
} from 'merced-react-hooks'
```

## useDataStore

Pass it the initial state and reducer and it returns a provider component and hook to pull the DataStore state in any component being provided by the provider component.

Create a DS.js, define your initial state and reducer function and

```js
// Define and initialState and Reducer
export const [DataStore, useDataStore] = createDataStore(initialState, reducer)
```

### Wrap Your App Components with DataStore

```tsx
// App.jsx
import React, { Component } from 'react'
import {DataStore} from "./DS.js

const App = (props) => {
  return <DataStore><OtherComponent/></DataStore>
}
```

### Pull data using hook in any component

```tsx
// /components/component.jsx
import React from "react'
import {useDataStore} from "../DS.js"

const Component = (props) => {
  const {dataStore, dispatch} = useDataStore()

  return <><h1>{dataStore.title}</h1>
  <button onClick={() => dispatch({type:"something", payload: 5})}>Click Me</button>
}
```

## useFormState

Pass it the initial form state and it will return an array with the formState, handleChange function and resetForm function.

```js
const [formData, handleChange, resetForm] = useForm({
  name: '',
  age: 0,
  email: ''
})

return <form onSubmit = {(event) => {
  event.preventDefault()
  resetForm()
}}>
  <input type="text" name="name" onChange={handleChange}>
  <input type="number" name="age" onChange={handleChange}>
  <input type="text" name="email" onChange={handleChange}>
  <input type="submit" value="submit">
</form>
```

## useLocalStorage & useSessionStorage

Pass it a key and initialState. It will check session or local storage to see if the key already exists, if it does will create a state with the value of the existing info stored, if it does not exist it will create new state with the initial value.

The function returns the state and a special setState function that updates the local or session storage with each change. Returns an array with state, setState, and a reset function to resetting the state and localStorage to initial.

```js
const [token, setToken, resetToken] = useLocalStorage('token', null)
```

## License

MIT © [AlexMercedCoder](https://github.com/AlexMercedCoder)
