import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { createApolloClient } from 'vue-cli-plugin-apollo/graphql-client'
Vue.use(VueApollo)
const AUTH_TOKEN = 'apollo-token'
const defaultOptions = {
  // // You can use `https` for secure connection (recommended in production)
  httpEndpoint: null,
  // You can use `wss` for secure connection (recommended in production)
  // Use `null` to disable subscriptions
  wsEndpoint: process.env.VUE_APP_GRAPHQL_WS || null, // 'ws://system-core.herokuapp.com/graphql',
  // LocalStorage token
  tokenName: AUTH_TOKEN,
  // Enable Automatic Query persisting with Apollo Engine
  persisting: false,
  // Use websockets for everything (no HTTP)
  // You need to pass a `wsEndpoint` for this to work
  websocketsOnly: false,
  // Is being rendered on the server?
  ssr: false
}
// Call this in the Vue app file
export function createProvider(httpEndpointOptions) {
  defaultOptions.httpEndpoint = httpEndpointOptions
  // console.log('defaultOpt', defaultOptions)
  // Create apollo client
  const { apolloClient } = createApolloClient({
    ...defaultOptions,
    ...httpEndpointOptions
  })
  // Set apollo cache policy
  apolloClient.defaultOptions.query = {
    fetchPolicy: 'network-only'
  }
  apolloClientInstance = apolloClient
  // apolloClientInstance = apolloClient
  // // // Create vue apollo provider
  return new VueApollo({
    defaultClient: httpEndpointOptions,
    // eslint-disable-next-line handle-callback-err
    errorHandler(error) {
      // eslint-disable-next-line no-console
      // console.log('%cError', 'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;', error.message)
    }
  })
}

// Call this outside components
export let apolloClientInstance
