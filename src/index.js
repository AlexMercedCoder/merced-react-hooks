import React from 'react'

/// ///////////////////////
// +& useDataStore
/// //////////////////////

export const createDataStore = (initialState, reducer) => {
  const DS = React.createContext({})

  const useDataStore = () => {
    return React.useContext(DS)
  }

  const DataStore = (props) => {
    const [dataStore, dispatch] = React.useReducer(reducer, initialState)

    return (
      <DS.Provider value={{ dataStore, dispatch }}>
        {props.children}
      </DS.Provider>
    )
  }

  return [DataStore, useDataStore]
}

/// ///////////////////////
// +& useFormState
/// //////////////////////

export const useFormState = (initialState) => {
  const [formData, setFormData] = React.useState(initialState)

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const reset = () => setFormData(initialState)

  return [formData, handleChange, reset]
}

/// ///////////////////////
// +& useLocalStorage
/// //////////////////////

export const useLocalStorage = (key, initial) => {
  try {
    const exists = JSON.parse(window.localStorage.getItem(key))
    const initialState =
      typeof initial === 'object' ? initial : { [key]: initial }
    let start

    if (exists) {
      start = exists
    } else {
      start = initialState
      window.localStorage.setItem(key, JSON.stringify(start))
    }

    const [state, setState] = React.useState(start)

    const setStateStorage = (newState) => {
      window.localStorage.setItem(key, JSON.stringify(newState))
      setState(newState)
    }

    const reset = () => {
      window.localStorage.removeItem(key)
      setState(null)
    }
    return [state, setStateStorage, reset]
  } catch (error) {
    console.log(error)
    alert(error)
  }
}

/// ///////////////////////
// +& useSessionStorage
/// //////////////////////

export const useSessionStorage = (key, initial) => {
  try {
    const exists = JSON.parse(window.sessionStorage.getItem(key))
    const initialState =
      typeof initial === 'object' ? initial : { [key]: initial }
    let start

    if (exists) {
      start = exists
    } else {
      start = initialState
      window.sessionStorage.setItem(key, JSON.stringify(start))
    }

    const [state, setState] = React.useState(start)

    const setStateStorage = (newState) => {
      window.sessionStorage.setItem(key, JSON.stringify(newState))
      setState(newState)
    }

    const reset = () => {
      window.sessionStorage.removeItem(key)
      setState(null)
    }

    return [state, setStateStorage, reset]
  } catch (error) {
    console.log(error)
    alert(error)
  }
}

/// ///////////////////////
// +& LifeCycle Hooks
/// //////////////////////

export const useOnMount = (cb) => {
  React.useEffect(cb, [])
}

export const useOnUpdate = (cb, deps) => {
  React.useEffect(cb, deps)
}

export const useOnDismount = (cb) => {
  React.useEffect(() => cb, [])
}

/// ///////////////////////
// +& useTaskRunner
/// //////////////////////

export const createTaskRunner = (initialState, taskList) => {
  const TR = React.createContext({})

  const useTaskStore = () => {
    return React.useContext(TR)
  }

  const TaskStore = (props) => {
    const [taskStore, setState] = React.useState(initialState)

    const runTask = (task, payload) => {
      taskList[task](taskStore, setState, payload)
    }

    return (
      <TR.Provider value={{ taskStore, runTask }}>{props.children}</TR.Provider>
    )
  }

  return [TaskStore, useTaskStore]
}

/// ///////////////////////
// +& useDefaultImage
/// //////////////////////

export const useDefaultImage = (imgDef, classN) => {
  const IMG = (props) => {
    const handleError = (event) => {
      event.target.src = imgDef
      event.target.onError = null
    }

    return (
      <img
        className={classN}
        src={props.src}
        onError={handleError}
        alt={props.alt}
      />
    )
  }

  return IMG
}

/// ///////////////////////
// +& useFetch
/// //////////////////////

export const useFetch = (url, config) => {
  const [state, setState] = React.useState()

  const refetch = () => {
    fetch(url, config)
      .then((response) => response.json())
      .then((data) => setState(data))
  }

  refetch()

  return [state, refetch]
}
