# MIS React Utilities Library

**Install**

npm i --save git+http://192.168.50.25:3000/akatarachias/mis-react.git#0.1.6 (change version tag accordingly)



## Context Providers

In order to use the available context providers you must wrap your app inside them.

Typical use in App.js:

```jsx
import React from 'react'
import { AuthProvider, LayoutProvider } from 'mis-react'

function App() {
  return (
    <AuthProvider>
      <LayoutProvider>
        { ... }
      </LayoutProvider>
    </AuthProvider>
  )
}
```


### useAuth

```jsx
import React from 'react'
import { useAuth } from 'mis-react'


function MyComponent(props) {
    const auth = useAuth()
}
```


| prop | type | api |
| -------- | -------- | -------- |
| isAuthenticated | boolean | true if a user has signed in |
| signIn(token) | function | signs in a user using the provided token |
| signOut() | function | signs out the user clearing stored token and session |



### useLayout


```jsx
import React from 'react'
import { useLayout } from 'mis-react'


function MyComponent(props) {
    const layout = useLayout()
}
```


| prop | type | api |
| -------- | -------- | -------- |
| layout.view | string | 'mobile' if window width is smaller than the specified breakpoint (default is 800), else 'web |
| layout.auth | boolean | true if user is authenticated |



## Modules

### storage

```jsx
import { storage } from 'mis-react'

const token = storage.get('token')

function updateToken(newToken) {
    storage.set('token', newToken)
}
```



| method | args | description |
| -------- | -------- | -------- |
| get | key | gets a value from local storage |
| set | key, value | sets a value to local storage |
| remove | key | removes a key/value pair from local storage |



### api

First, make sure you have a .env file in the root folder of your app, with the base url of your api:

REACT_APP_API_URL=http://localhost:3000/api/v1


```jsx
import React, { useEffect, useState } from 'react'
import { api } from 'mis-react'


function MyComponent() {
    const [data, setData] = useState(null)
    
    useEffect(() => {
        async function fetchData() {
            const res = await api.get('/data')
            setData(res)
        }
        
        fetchData()
    }, [])
}
```


| method | args | description |
| -------- | -------- | -------- |
| get | url | HTTP GET |
| post | url, data | HTTP POST |
| put | url, data | HTTP PUT |
| patch | url, data | HTTP PATCH |
| delete | url | HTTP DELETE |

