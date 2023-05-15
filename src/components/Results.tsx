import { useUsers } from '../hooks/useUsers'

const Results = () => {
  const { users } = useUsers()

  return (
    <h2 style={{ marginBottom: '40px' }}>
      Cantidad de usuarios: {users.length}
    </h2>
  )
}

export default Results
