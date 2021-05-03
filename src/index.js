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
      setStateStorage(start)
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
      setStateStorage(start)
    }

    return [state, setStateStorage, reset]
  } catch (error) {
    console.log(error)
    alert(error)
  }
}

/// ///////////////////////
// +& useLocalReducer
/// //////////////////////

export const useLocalReducer = (key, initial, reducer) => {
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

    const midReducer = (currentState, theAction) => {
      const newState = reducer(currentState, theAction)
      window.localStorage.setItem(key, JSON.stringify(newState))
      return newState
    }

    const [state, dispatch] = React.useReducer(midReducer, start)

    return [state, dispatch]
  } catch (error) {
    console.log(error)
    alert(error)
  }
}

/// ///////////////////////
// +& useSessionReducer
/// //////////////////////

export const useSessionReducer = (key, initial, reducer) => {
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

    const midReducer = (currentState, theAction) => {
      const newState = reducer(currentState, theAction)
      window.sessionStorage.setItem(key, JSON.stringify(newState))
      return newState
    }

    const [state, dispatch] = React.useReducer(midReducer, start)

    return [state, dispatch]
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
  const IMG = React.memo((props) => {
    const handleError = (event) => {
      event.target.onerror = null
      event.target.src = imgDef
    }

    return (
      <img
        className={classN}
        src={props.src}
        onError={handleError}
        alt={props.alt}
        ref={props.innerRef}
      />
    )
  })

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

/// ///////////////////////
// +& useDataStore LS SS
/// //////////////////////

export const createDataStoreLS = (initialState, reducer) => {
  const DS = React.createContext({})

  const useDataStore = () => {
    return React.useContext(DS)
  }

  const DataStore = (props) => {
    const [dataStore, dispatch] = useLocalReducer(
      'datastore',
      initialState,
      reducer
    )

    return (
      <DS.Provider value={{ dataStore, dispatch }}>
        {props.children}
      </DS.Provider>
    )
  }

  return [DataStore, useDataStore]
}
/// /////////////////
/// /////////////////
export const createDataStoreSS = (initialState, reducer) => {
  const DS = React.createContext({})

  const useDataStore = () => {
    return React.useContext(DS)
  }

  const DataStore = (props) => {
    const [dataStore, dispatch] = useSessionReducer(
      'datastore',
      initialState,
      reducer
    )

    return (
      <DS.Provider value={{ dataStore, dispatch }}>
        {props.children}
      </DS.Provider>
    )
  }

  return [DataStore, useDataStore]
}

/// ///////////////////////
// +& useTaskRunner LS SS
/// //////////////////////

export const createTaskRunnerLS = (initialState, taskList) => {
  const TR = React.createContext({})

  const useTaskStore = () => {
    return React.useContext(TR)
  }

  const TaskStore = (props) => {
    const [taskStore, setState, resetTaskStore] = useLocalStorage(
      'taskstore',
      initialState
    )

    const runTask = (task, payload) => {
      taskList[task](taskStore, setState, payload)
    }

    return (
      <TR.Provider value={{ taskStore, runTask, resetTaskStore }}>
        {props.children}
      </TR.Provider>
    )
  }

  return [TaskStore, useTaskStore]
}

/// ////////////////////
/// ////////////////////

export const createTaskRunnerSS = (initialState, taskList) => {
  const TR = React.createContext({})

  const useTaskStore = () => {
    return React.useContext(TR)
  }

  const TaskStore = (props) => {
    const [taskStore, setState, resetTaskStore] = useSessionStorage(
      'taskstore',
      initialState
    )

    const runTask = (task, payload) => {
      taskList[task](taskStore, setState, payload)
    }

    return (
      <TR.Provider value={{ taskStore, runTask, resetTaskStore }}>
        {props.children}
      </TR.Provider>
    )
  }

  return [TaskStore, useTaskStore]
}

/// //////////////////
// useCrud
/// //////////////////

export const useCrud = (url, headers = {}) => {
  const [state, setState] = React.useState(null)

  const GET = async () => {
    const response = await fetch(url, { method: 'get', headers })
    const data = await response.json()
    setState(data)
  }

  const POST = async (body) => {
    await fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify(body)
    })
    GET()
  }

  const PUT = async (body, id) => {
    await fetch(url + '/' + id, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify(body)
    })
    GET()
  }

  const DESTROY = async (id) => {
    await fetch(url + '/' + id, {
      method: 'delete',
      headers
    })
    GET()
  }

  return [state, GET, POST, PUT, DESTROY]
}

/// //////////////////////////////
// Condition
/// //////////////////////////////

export const Condition = (props) => {
  const wrong = props.ifnot ?? null

  return props.if ? <>{props.children}</> : wrong
}

// /////////////////////////////////
// Loop
// /////////////////////////////////

export const Loop = ({ withthis, dothat }) => {
  return withthis.map(dothat)
}
