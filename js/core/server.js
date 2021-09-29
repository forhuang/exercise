import 'whatwg-fetch'

export const getServerData = async (url, data = {}, signal = null) => {
  let newUrl = ''
  if (Object.keys(data).length > 0) {
    newUrl = `?${
      Object.entries(data).map(([k, v]) => (
        `${k}=${v}`
      )).join('&')
    }`
  }

  const res = await fetch(`${url}${newUrl}`, { signal })
  return res.json()
}

export const postServerData = async (url, data) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return res.json()
}
