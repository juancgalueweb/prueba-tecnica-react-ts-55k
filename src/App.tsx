import { useEffect, useState } from 'react'
import './App.css'
import UsersList from './components/UsersList'
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
      <UsersList users={users} />
    </div>
  )
}

export default App
