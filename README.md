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
import {DataStore} from "./DS.js

ReactDOM.render(<DataStore><App/></DataStore>)
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

### createDataStoreLS and createDataStoreSS

same as createDataStore except is also saves to local or session storage

## TaskRunner

useDataStore makes it easy to use a redux like pattern with context and useReducer but it has limitations.

- dispatch calls the reducer which must return the new state
- can't do async actions in the reducer so makes it hard to encapsulate app logic

The TaskRunner patter instead of passing a reducer function we pass in an object of key/values where each value is a function with the following signature... (state, setState, payload) => {}. So if the function alters state is up to you and they can be async functions that house async logic.

Create a TR.js, define your initial state and TaskRunner Object and

```js
// Define and initialState and task list
export const [TaskStore, useTaskStore] = createTaskRunner(
  initialState,
  taskList
)
```

### Wrap Your App Components with DataStore

```tsx
// index.jsx
import {DataStore} from "./DS.js

ReactDOM.render(<TaskStore><App/></TaskStore>)
```

### createTaskRunnerLS and createTaskRunnerSS

Same as Taskrunner but will track to localStorage or sessionStorage

### Pull data using hook in any component

```tsx
// /components/component.jsx
import React from "react'
import {useTaskStore} from "../TR.js"

const Component = (props) => {
  const {taskStore, runTask} = useDataStore()

  return <><h1>{taskStore.title}</h1>
  <button onClick={() => runTask("add", 5)}>Click Me</button>
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

If you pass in a non-object as the initial, it will add the value to an object with the key being the key parameter. So if do useLocalStorage('token', null) then the state will be the following {token:null}

The function returns the state and a special setState function that updates the local or session storage with each change. Returns an array with state, setState, and a reset function to resetting the state and localStorage to initial.

```js
const [token, setToken, resetToken] = useLocalStorage('token', null)
```

### useLocalReducer and useSessionReducer

Same as use useLocalStorage and useSessionStorage but using a Reducer

```js
const [state, dispatch] = useLocalReducer('token', initialState, reducer)
```

## Lifecycle Hooks (useOnMount, useOnUpdate, useOnDismount)

These hooks are just a slight abstraction over the useEffect hook to make your code more semantic.

useOnMount(callback) => runs the callback when component mount and never again

useOnUpdate(callback, depArray) => runs the callback on component mount and again whenever any value in the depArray changes. (Recommend to keep the values in arrays primitives to avoid issues with referential equality)

useOnDismount(callback) => The callback will run when the component is dismounted.

## useDefaultImage

takes a default url and a css class and returns an Image component which will default to the url provided if an image is broken and be styled by the passed in class.

```js

const AvatarImg = useDefaultImage("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png", "avatar")

const Component () => users.map(user => <AvararImg src={user.avatar} alt={user.username}/>)

```

## useFetch

```js
const [apiData, refetchApiData] = useFetch(url, {
  method: 'get',
  headers: {
    Authorization
  }
})
```

## useCrud

This is a Hook for quickly generating functions for fetching from CRUD routes on an api that follows rest convention.

Pass in a URL and a headers object with any headers you want included, (Content-Type: application/json is included by default on post and put)

The function returns the state and crud functions in an array.

```js
import { useCrud } from 'merced-react-hooks'

const [blogs, GetBlogs, PostBlogs, PutBlogs, DestroyBlogs] = useCrud(
  'https://www.apiurl.com',
  {
    Authorization: `bearer ${token}`
  }
)
```

Keep in mind not to include a trailing slash in your API url. The four functions anticipate standard crud routes...

**GET()**
get "/"

**POST(body)**
post "/" => body sent as json data

**DESTROY(id)**
delete "/:id"

**POST(body, id)**
put "/:id"

## License

MIT © [AlexMercedCoder](https://github.com/AlexMercedCoder)
