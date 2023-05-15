import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchUsers } from '../services/users'
import { type User } from '../types.d'

export const useUsers = () => {
  const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery<{ users: User[]; nextCursor?: number }>(
      ['users'],
      fetchUsers,
      {
        getNextPageParam: lastPage => lastPage.nextCursor,
        refetchOnWindowFocus: false
      }
    )

  return {
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    users: data?.pages?.flatMap(page => page.users) ?? []
  }
}
