import { UPDATE_MESSAGE } from './constants'

export const updateMessage = (payload) => {
  return { type: UPDATE_MESSAGE, payload }
}