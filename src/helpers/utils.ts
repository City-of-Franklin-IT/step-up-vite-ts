export const handleTime = (time: string): string => { // Format and return time
  return time.split("T")[1].replace("Z", '').split('.')[0].slice(0, 5)
}

export const authHeaders = (token: string | undefined) => {
  const headers = new Headers()

  if(token) {
    headers.append('Authorization', `Bearer ${ token }`)
  }

  return headers
}