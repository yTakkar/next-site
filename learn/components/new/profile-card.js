import { ellipsis } from 'polished'

import GitHubButton from './github-button'

const tweet = points => {
  let url = `https://twitter.com/intent/tweet?url=https%3A%2F%2Fnextjs.org%2Flearn&text=I%20just%20got%20${points}%20points✨%20on`
  window.open(url, '_blank')
}

export default ({ login, logout, user, isMobile }) => {
  if (!user) {
    if (isMobile) {
      return <div className='namecard'>
        <GitHubButton login={login} flat text='Login' />
        <style jsx>{`
          .namecard {
            display: flex;
            height: 2.5rem;
          }
        `}</style>
      </div>
    }
    return <div className='namecard'>
      <GitHubButton login={login} flat />
      <p className='f6 mute'>Start to learn the most advanced Web technologies, today.</p>
      <style jsx>{`
        p {
          margin: 0;
        }
        .namecard {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 264px;
          height: 128px;
          padding: 1rem;
          border-radius: 7px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
          overflow: hidden;
        }
      `}</style>
    </div>
  }

  if (isMobile) {
    return <div className='namecard f6'>
      {
        user.points
          ? <div><strong className='fw6'>{user.points}</strong> &#x2728;</div>
          : null
      }
      <div className='fw5 username' style={ellipsis()}>{user.name}</div>
      <button onClick={logout}>Logout</button>
      <style jsx>{`
        .namecard {
          position: relative;
          display: flex;
          align-items: center;
          height: 100%;
          margin-top: 1px;
        }
        .username {
          max-width: 7rem;
        }
        button {
          flex: 1;
          height: 2rem;
          line-height: 2rem;
          padding: 0 .5rem;
          margin: 0;
          font-size: inherit;
          outline: none;
          border: none;
          background: none;
          -webkit-appearance: none;
          color: #aeaeae;
          cursor: pointer;
          transition: color .2s ease;
        }
      `}</style>
    </div>
  }

  let avatarUrl = `https://github.com/${(user.username || 'ghost')}.png?size=128`

  return <div className='namecard'>
    <div className='profile'>
      <img className='avatar' alt='Avatar' src={avatarUrl} />
      <div className='info'>
        <p className='f-reset fw6 username' style={ellipsis()}>{user.name}</p>
        {
          user.points
            ? <div className='f5'><strong className='fw7'>{user.points}</strong> points &#x2728;</div>
            : <div className='f5'><strong className='fw7'>0</strong> point</div>
        }
      </div>
    </div>
    <div className='buttons'>
      <button className='f5' onClick={logout}>Logout</button>
      {
        user.points ? <button className='f5' onClick={() => tweet(user.points)}>Tweet</button> : null
      }
    </div>
    <style jsx>{`
      .profile {
        display: flex;
        align-items: center;
        padding: 1rem 1rem 0;
      }
      .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        white-space: nowrap;
        overflow: hidden;
      }
      .avatar {
        width: 64px;
        height: 64px;
        margin-right: 1rem;
        border-radius: 50%;
      }
      .logout {
        margin-left: .2rem;
      }
      .info p {
        margin: 0;
      }
      .buttons {
        display: flex;
        margin: 0 .5rem;
      }
      .buttons button {
        flex: 1;
        height: 2rem;
        padding: 0;
        margin: .5rem;
        outline: none;
        border: none;
        background: none;
        -webkit-appearance: none;
        color: #aeaeae;
        cursor: pointer;
        transition: color .2s ease;
      }
      .buttons button:hover {
        color: #111;
      }
      .namecard {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 264px;
        height: 128px;
        border-radius: 7px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
        overflow: hidden;
      }
    `}</style>
  </div>
}