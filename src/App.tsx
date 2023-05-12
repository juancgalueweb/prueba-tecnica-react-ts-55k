import { useEffect, useState } from 'react'
import './App.css'
import { type User } from './types.d'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const apiUrl = 'https://randomuser.me/api/?results=100'

  useEffect(() => {
    fetch(apiUrl)
      .then(async res => await res.json())
      .then(res => {
        setUsers(res.results)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  return (
    <div className='App'>
      <h1>Prueba técnica</h1>
      {JSON.stringify(users)}
    </div>
  )
}

export default App
