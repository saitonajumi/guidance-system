/** @namespace data.extensions.validation */
/** @namespace data.debugMessage */
export function apolloErrors(response, callback) {
  const error = { response }.response.graphQLErrors

  if (Array.isArray(error)) {
    error.forEach(function(data) {
      const debugMessage = data.debugMessage
      const validation = data.extensions.validation
      const message = data.message

      if (debugMessage !== undefined && debugMessage === 'Unauthenticated.') {
        callback(debugMessage)
      } else if (validation !== undefined) {
        const message = validation

        if (typeof message === 'object') {
          let displayMessage = '<div>'

          Object.keys(message).forEach(function(key) {
            if (Array.isArray(message[key])) {
              message[key].forEach(function(value) {
                displayMessage += message[key] + '<br>'
              })
            } else {
              displayMessage += message[key] + '<br>'
            }
          })
          displayMessage += '</div>'
          callback(displayMessage)
        }
      } else {
        callback(message)
      }
    })
  }
}
