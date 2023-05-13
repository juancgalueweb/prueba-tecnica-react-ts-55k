import { type FC } from 'react'
import useColorScheme from '../hooks/useColorScheme'
import { type User } from '../types.d'

interface Props {
  deleteUser: (uuid: string) => void
  users: User[]
  colorRows: boolean
}

const UsersList: FC<Props> = ({ users, colorRows, deleteUser }) => {
  const { colorScheme } = useColorScheme()

  return (
    <table width='100%'>
      <thead>
        <tr>
          <th>Foto</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>País</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => {
          const lightColors = index % 2 === 0 ? '#f1f5f9' : '#f8fafc'
          const darkColors = index % 2 === 0 ? '#424242' : '#616161'
          const backgroundColor =
            colorScheme === 'light' ? lightColors : darkColors
          const colors = colorRows ? backgroundColor : 'transparent'
          return (
            <tr key={user.login.uuid} style={{ backgroundColor: colors }}>
              <td>
                <img
                  src={user.picture.thumbnail}
                  alt={`Foto de ${user.name.last}`}
                />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button
                  onClick={() => {
                    deleteUser(user.login.uuid)
                  }}
                >
                  Borrar
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default UsersList
