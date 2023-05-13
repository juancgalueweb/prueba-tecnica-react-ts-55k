import { useEffect, useRef, useState } from 'react'
import './App.css'
import UsersList from './components/UsersList'
import { type User } from './types.d'

const apiUrl = 'https://randomuser.me/api/?results=100'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [colorRows, setColorRows] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
  const originalUsers = useRef<User[]>([])

  const toggleColors = () => {
    setColorRows(prevState => !prevState)
  }

  const toggleSortByCountry = () => {
    setSortByCountry(prevState => !prevState)
  }

  // Recodar que se debe pasar una copia de los usuarios porque el médoto
  // sort muta el array
  const sortedUsers = sortByCountry
    ? [...users].sort((a, b) => {
        return a.location.country.localeCompare(b.location.country)
      })
    : users

  const handleDelete = (uuid: string) => {
    const filteredUsers = users.filter(user => user.login.uuid !== uuid)
    setUsers(filteredUsers)
  }

  const resetUsers = () => {
    setUsers(originalUsers.current)
  }

  useEffect(() => {
    fetch(apiUrl)
      .then(async res => await res.json())
      .then(res => {
        originalUsers.current = res.results
        setUsers(res.results)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  return (
    <div className='App'>
      <h1>Prueba técnica de React + Typescript</h1>
      <header>
        <div>
          <button
            onClick={() => {
              toggleColors()
            }}
          >
            Cambiar color
          </button>
          <button
            onClick={() => {
              toggleSortByCountry()
            }}
          >
            {sortByCountry ? 'No ordenar por país' : 'Ordenar por país'}
          </button>
          <button
            onClick={() => {
              resetUsers()
            }}
          >
            Reestablecer ususarios
          </button>
        </div>
      </header>
      <main>
        <UsersList
          users={sortedUsers}
          colorRows={colorRows}
          deleteUser={handleDelete}
        />
      </main>
    </div>
  )
}

export default App
