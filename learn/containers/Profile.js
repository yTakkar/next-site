import Profile from '~/components/Profile'
import WithEnv from '~/lib/with-env'
import WithActions from '~/lib/with-actions'
import WithData from '~/lib/with-data'
import * as userActions from '~/actions/user'

let ProfileComponent

ProfileComponent = WithData({
  id: 'Profile',
  propsToWatch: [],
  cacheOptions: { client: 1000 * 60 * 60 },
  fetch ({ lokkaClient }, props) {
    const query = `
      {
        user {
          ...${Profile.userFragment(lokkaClient)}
        }
      }
    `
    return lokkaClient.query(query)
  }
})(Profile)

ProfileComponent = WithActions((env, props) => ({
  onLogin: userActions.login,
  onLogout (loginToken) {
    userActions.logout(loginToken)
  }
}))(ProfileComponent)

export default WithEnv()(ProfileComponent)
