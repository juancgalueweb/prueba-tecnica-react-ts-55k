import { type FC } from 'react'
import { type User } from '../types.d'

interface Props {
  users: User[]
}

const UsersList: FC<Props> = ({ users }) => {
  return (
    <table width='100%'>
      <thead>
        <th>Foto</th>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>País</th>
        <th>Acciones</th>
      </thead>
      <tbody>
        {users.map(user => {
          return (
            <tr key={user.id.value}>
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
                <button>Borrar</button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default UsersList
