import {getToken} from './authenticate'
export default function getInitialState (context) {
  return { loginToken: getToken(context) }
}
