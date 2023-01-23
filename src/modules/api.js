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
  return fetch(apiPath + path, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((Response) => {
    if (!Response.ok) {
      throw new Error(Response.statusText)
    }
    return Response.json()
  })
}

export const putData = (path, data) => {
  return fetch(apiPath + path, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((Response) => {
    if (!Response.ok) {
      throw new Error(Response.statusText)
    }
    return Response.json()
  })
}

export const patchData = (path, data) => {
  return fetch(apiPath + path, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((Response) => {
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
