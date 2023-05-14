import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import UsersList from './components/UsersList'
import { SortBy, type User } from './types.d'

const apiUrl = 'https://randomuser.me/api/?results=10'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [colorRows, setColorRows] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<null | string>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const originalUsers = useRef<User[]>([])

  const toggleColors = () => {
    setColorRows(prevState => !prevState)
  }

  const toggleSortByCountry = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const filteredUsers = useMemo(() => {
    return filterCountry != null && filterCountry.length > 0
      ? users.filter(user => {
          return user.location.country
            .toLowerCase()
            .includes(filterCountry.toLowerCase())
        })
      : users
  }, [users, filterCountry])

  // Recodar que se debe pasar una copia de los usuarios filtrados
  // porque el médoto sort muta el array
  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers

    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.COUNTRY]: user => user.location.country,
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last
    }

    return [...filteredUsers].sort((a, b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  }, [filteredUsers, sorting])

  const handleDelete = (uuid: string) => {
    const filteredUsers = users.filter(user => user.login.uuid !== uuid)
    setUsers(filteredUsers)
  }

  const resetUsers = () => {
    setUsers(originalUsers.current)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  useEffect(() => {
    setLoading(true)
    setError(false)

    fetch(apiUrl)
      .then(async res => {
        if (!res.ok) {
          throw new Error('Error en la petición')
        }
        return await res.json()
      })
      .then(res => {
        // <- Se resuelve la promesa
        originalUsers.current = res.results
        setUsers(res.results)
      })
      .catch(error => {
        // <- Se manejan los errores
        setError(error)
      })
      .finally(() => {
        // <- Siempre se ejecuta
        setLoading(false)
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
            {sorting === SortBy.COUNTRY
              ? 'No ordenar por país'
              : 'Ordenar por país'}
          </button>
          <button
            onClick={() => {
              resetUsers()
            }}
          >
            Reestablecer ususarios
          </button>
          <input
            type='text'
            placeholder='Filtra por país'
            onChange={e => {
              setFilterCountry(e.target.value)
            }}
          />
        </div>
      </header>
      <main>
        {loading && <strong>Cargando...</strong>}
        {!loading && error && <p>Ha habido un error</p>}
        {!loading && !error && users.length === 0 && <p>No hay usuarios</p>}
        {!loading && !error && users.length > 0 && (
          <UsersList
            users={sortedUsers}
            colorRows={colorRows}
            deleteUser={handleDelete}
            changeSorting={handleChangeSort}
          />
        )}
      </main>
    </div>
  )
}

export default App
