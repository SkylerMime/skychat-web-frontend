const API_URL = 'http://127.0.0.1:8000'
export const CURRENT_USER_NAME = 'Alice'

// TODO: Include timestamp for message ordering

export interface ChatMessage {
  username: string
  message: string
  id: string
}

// TODO: Implement CORS rather than ignoring

export async function getMessagesFromApi() {
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
