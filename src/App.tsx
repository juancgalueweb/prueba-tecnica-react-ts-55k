import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import './App.css'
import UsersList from './components/UsersList'
import { SortBy, type User } from './types.d'

const fetchUsers = async ({ pageParam = 1 }: { pageParam?: number }) => {
  return await fetch(
    `https://randomuser.me/api?results=10&seed=juancho&page=${pageParam}`
  )
    .then(async res => {
      if (!res.ok) throw new Error('Error en la petición')
      return await res.json()
    })
    .then(res => {
      const currentPage = Number(res.info.page)
      const nextCursor = currentPage > 9 ? undefined : currentPage + 1

      return {
        users: res.results,
        nextCursor
      }
    })
}

function App() {
  const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery<{ users: User[]; nextCursor?: number }>(
      ['users'],
      fetchUsers,
      {
        getNextPageParam: lastPage => lastPage.nextCursor
      }
    )

  const users: User[] = data?.pages?.flatMap(page => page.users) ?? []

  const [colorRows, setColorRows] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<null | string>(null)

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
    // const filteredUsers = users.filter(user => user.login.uuid !== uuid)
    // setUsers(filteredUsers)
  }

  const resetUsers = async () => {
    await refetch()
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

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
              void resetUsers()
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
        {users.length > 0 && (
          <UsersList
            users={sortedUsers}
            colorRows={colorRows}
            deleteUser={handleDelete}
            changeSorting={handleChangeSort}
          />
        )}
        {isLoading && <strong>Cargando...</strong>}
        {isError && <p>Ha habido un error</p>}
        {!isLoading && !isError && users.length === 0 && <p>No hay usuarios</p>}
        {!isLoading && !isError && hasNextPage === true && (
          <button
            onClick={() => {
              void fetchNextPage()
            }}
          >
            Cargar más resultados
          </button>
        )}
        {!isLoading && !isError && hasNextPage === false && (
          <p>No hay más resultados</p>
        )}
      </main>
    </div>
  )
}

export default App
