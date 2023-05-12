import { useEffect, useState } from 'react'
import './App.css'
import UsersList from './components/UsersList'
import { type User } from './types.d'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [colorRows, setColorRows] = useState(false)
  const apiUrl = 'https://randomuser.me/api/?results=100'

  const toggleColors = () => {
    setColorRows(!colorRows)
  }

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
      <header>
        <button
          onClick={() => {
            toggleColors()
          }}
        >
          Cambiar color
        </button>
      </header>
      <main>
        <UsersList users={users} colorRows={colorRows} />
      </main>
    </div>
  )
}

export default App
