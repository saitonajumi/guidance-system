import { apolloClientInstance } from '@/vue-apollo'
import AllUsers from './AllUsers.graphql'
import DeleteUser from './DeleteUser.graphql'

export function allUsers(query, callback) {
  if (apolloClientInstance) {
    apolloClientInstance.query({
      query: AllUsers,
      variables: query
    }).then(function(response) {
      callback(response.data, true)
    }).catch(function(response) {
      callback(response, false)
    })
  }
}
export function deleteUser(query, callback) {
  if (apolloClientInstance) {
    apolloClientInstance.mutate({
      mutation: DeleteUser,
      variables: query
    }).then(function(response) {
      callback(response.data, true)
    }).catch(function(response) {
      callback(response, false)
    })
  }
}
