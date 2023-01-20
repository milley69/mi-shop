let apiPath = 'http://localhost:3001/'

export const getData = (path) => {
  return fetch(apiPath + path).then((Response) => {
    if (!Response.ok) {
      throw new Error(Response.statusText)
    }
    return Response.json()
  })
}
