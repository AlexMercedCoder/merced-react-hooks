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

## Condition

This is a component to conditionally show parts of your JSX, like v-if or ngIf in Vue and Angular. It takes two props.

- if - The condition, an expression to be evaluated as true or false

- ifnot - by default null will be displayed if the condition is false, if you want to display something else pass the desired JSX to the optional ifnot prop.

```jsx
import { Condition } from 'merced-react-hooks'

const Component = (props) => {
  return (
    <div>
      <h1>Are you old enough to drink?</h1>
      <Condition if={props.age >= 21} ifnot={<h1>Not Old Enough</h1>}>
        <h1>You are Old Enough</h1>
      </Condition>
    </div>
  )
}
```

## Loop

Loop essentially is just map as a component. It takes two props.

- withthis - The array you want to loop over
- dothat - An iterator function, same as the one you'd pass to map. The signature being `(item, index) => { return JSXForEachIteminArray}`

```jsx
import { Loop } from 'merced-react-hooks'
import Dog from './components/Dog'

const Component = (props) => {
  return (
    <Loop
      withthis={props.dogs}
      dothat={(dog, index) => <Dog {...dog} key={index} />}
    />
  )
}
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
import { createTaskRunner } from 'merced-react-hooks'

//The Initial State
const initialState = {
  count: 0
}

//The Task List, list of functions to run
const taskList = {
  add: (state, setState, payload) => {
    setState({ ...state, count: state.count + payload })
  },
  sub: (state, setState, payload) => {
    setState({ ...state, count: state.count - payload })
  }
}

//Generate the TaskStore and useTaskStore hook
export const [TaskStore, useTaskStore] = createTaskRunner(
  initialState,
  taskList
)
```

### Wrap Your App Components with TaskStore

```tsx
import { TaskStore } from './TR.js'

ReactDOM.render(
  <TaskStore>
    <App />
  </TaskStore>
)
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

## useGlobalState

Pass it the initial state returns a provider component and hook to pull the GlobalState state in any component being provided by the provider component.

Create a GS.js, define your initial state, the useGlobalState hook will return an array with the state and setState function.

```js
// Define and initialState and Reducer
export const [GlobalState, useGlobalState] = createGlobalState(
  initialState,
  reducer
)
```

### Wrap Your App Components with GlobalState

```tsx
// App.jsx
import {GlobalState} from "./GS.js

ReactDOM.render(<GlobalState><App/></GlobalState>)
```

### Pull data using hook in any component

```tsx
// /components/component.jsx
import React from "react'
import {useGlobalState} from "../DS.js"

const Component = (props) => {
  const {state, setState} = useGlobalState()

  return <>
  <h1>{state.title}</h1>
  <button onClick={() => setState({...state, count: state.count + 1})}>Click Me</button>
  </>
}
```

## useGlobalMapKey

The goal here was to create something similar Recoil, you pass a map object to createGlobalMap

```js
// create the initial state
const initialState = new Map()
// add a key to original state
initialState.set('count', 0)
// Define and initialState and Reducer
export const [GlobalMap, useGlobalMapKey] = createGlobalMap(initialState)
```

### Wrap Your App Components with GlobalMap

```tsx
// App.jsx
import {GlobalMap} from "./GSM.js

ReactDOM.render(<GlobalState><App/></GlobalState>)
```

### Pull data using hook in any component

```tsx
import React from "react";
import { useGlobalMapKey } from "./GSM.js";

const Component = (props) => {
  const [getCount, setCount] = useGlobalMapKey("count");

  return (
    <>
      <h1>{state.title}</h1>
      <button onClick={() => setCount(getCount() + 1)}>
        Click Me
      </button>
    </>
  );
};

export default Component
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

If you want to include some validation login create a custom validation function then wrap that and the handle change inside of a new event handler like so:

```js

 const changeWrapper = (event) => {
   handleChange(event)
   validation()
 }

 return <form onSubmit = {(event) => {
  event.preventDefault()
  resetForm()
}}>
  <input type="text" name="name" onChange={changeWrapper}>
  <input type="number" name="age" onChange={changeWrapper}>
  <input type="text" name="email" onChange={changeWrapper}>
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

## useMap & useObject

This creates a new state that is a Map or Object, the setState function returns can be passed a key or a value and will update that key in the state. This helps avoid the boilerplate of creating a new Map or Object copy everytime you want to update state. They both work the same, it's just a matter of whether you want an Object or a Map.

```jsx
import {useObject} from `merced-react-hooks`

const Component = (props) => {
  const [objState, setObjKey] = useObject({name: "Alex", age: 35})

  const birthday () => setObjKey("age", objState.age + 1)

  return <button onClick={birthday}>Happy Birthday - {objState.age}</button>
}

```

```jsx
import {useMap} from `merced-react-hooks`

const Component = (props) => {
  const [mapState, setMapKey] = useMap({name: "Alex", age: 35})

  const birthday () => setMapKey("age", mapState.get("age") + 1)

  return <button onClick={birthday}>Happy Birthday - {mapState.get("age")}</button>
}

```

**When updating the state, shallow copies are made of the Map or Object. Keep in mind if the referential equality of the properties matters in your application**

## useArray

useArray makes it easier to have an array as your state. instead of a setState function it passes back a setter object with versions of the normal array methods that also update the state.

##### Setter Methods (work like original array methods, but update the state)

- setter.push
- setter.pop
- setter.splice
- setter.shift
- setter.unshift
- setter.set (this is just the setState function if you need it)

```jsx
import {useArray, Loop} from `merced-react-hooks`

const Component = (props) => {
  const [arrState, arrSetter] = useArray([1,2,3,4,5,6])

  return <div>
  <ul>
  <Loop withthis={arrState} dothat={(item) => <li>{item}</li>}/>
  </ul>
  <button onClick={() => arrSetter.push(arrState.length + 1)}>Next Number</button>
  <button onClick={arrSetter.pop}>Remove Number</button>
  </div>
}
```

## createTransform

createTransform allows you to create components for quick transformation (convert dates, casing etc.). The function takes a component that takes in props.children and returns the transformed value. The createTransform function returns a component that renders a span with the returned value. The component can take a `spanClass` component to give the span a class.

```js
import {createTransform} from "merced-react-hooks"

const UpperCase = createTransform((child) => child.upperCase())

function Component(props) => {
  return <h1><UpperCase spanClass="upper">hello world</UpperCase></h1>
}
```

## License

MIT © [AlexMercedCoder](https://github.com/AlexMercedCoder)
