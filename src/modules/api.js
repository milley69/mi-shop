let apiPath = 'http://localhost:3001/'

export const getData = (path) => {
  return fetch(apiPath + path).then((Response) => {
    if (!Response.ok) {
      throw new Error(Response.statusText)
    }
    return Response.json()
  })
}

export const postData = (path, data) => {
  return fetch(apiPath + path, data).then((Response) => {
    if (!Response.ok) {
      throw new Error(Response.statusText)
    }
    return Response.json()
  })
}
export const deletData = (path) => {
  return fetch(apiPath + path, {
    method: 'DELETE',
  }).then((Response) => {
    if (!Response.ok) {
      throw new Error(Response.statusText)
    }
    return Response.json()
  })
}
