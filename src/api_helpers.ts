export const API_IP = '127.0.0.1:8000'
export const API_URL = `http://${API_IP}`
export const CURRENT_USER_NAME = 'Alice'

export interface ChatMessage {
  username: string
  message: string
  datetime: Date
}

export async function getAllPastMessagesFromApi() {
  const response = await fetch(`${API_URL}/messages-handler`, {
    mode: 'cors',
  })
  return response.json()
}

export async function postMessageToApi(message: ChatMessage) {
  return fetch(`${API_URL}/messages-handler`, {
    method: 'POST',
    body: JSON.stringify(message),
    mode: 'cors',
  })
}
