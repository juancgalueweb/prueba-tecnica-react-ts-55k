export const fetchUsers = async (page: number) => {
  return await fetch(
    `https://randomuser.me/api?results=10&seed=juancho&page=${page}`
  )
    .then(async res => {
      if (!res.ok) throw new Error('Error en la petición')
      return await res.json()
    })
    .then(res => res.results)
}
