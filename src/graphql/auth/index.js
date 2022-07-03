import { apolloClientInstance } from '@/vue-apollo'
import Login from '@/graphql/auth/Login.graphql'
import Logout from '@/graphql/auth/Logout.graphql'

export function login(loginForm, callback) {
  apolloClientInstance.mutate({
    mutation: Login,
    variables: loginForm
  }).then(function(response) {
    callback(response.data, true)
  }).catch(function(response) {
    callback(response, false)
  })
}

export function logout(callback) {
  apolloClientInstance.mutate({
    mutation: Logout
  }).then(function(response) {
    callback(response.data, true)
  }).catch(function(response) {
    callback(response, false)
  })
}
