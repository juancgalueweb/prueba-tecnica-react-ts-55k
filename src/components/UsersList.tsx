import { type FC } from 'react'
import { type User } from '../types.d'

interface Props {
  users: User[]
  colorRows: boolean
}

const UsersList: FC<Props> = ({ users, colorRows }) => {
  return (
    <table width='100%' style={{ marginTop: '30px' }}>
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
          const backgroundColor = index % 2 === 0 ? '#f1f5f9' : '#f8fafc'
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
