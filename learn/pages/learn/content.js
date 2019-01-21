import Podda from 'podda'
import Navigation from '~/containers/Content/Navigation'
import Lesson from '~/containers/Content/Lesson'
import getLokkaClient from '~/lib/lokka'
import getInitialState from '~/lib/state'
import InitPage from '~/lib/init-page'
import Profile from '~/containers/Profile'

import Page from '~/components/new/page'
import Header from '~/components/new/header'
import Navbar from '~/components/new/navbar'
import Footer from '~/components/new/footer'
import Container from '~/components/new/container'

import { MediaQueryConsumer } from '~/components/new/media-query'

const Content = (props) => (
  <Page>
    <MediaQueryConsumer>{({isMobile}) => {
      return <>
        <Header height={64 + (isMobile ? 32 : 0)} shadow defaultActive>
          <Navbar/>
        </Header>
        <Container wide={isMobile}>
          <div className='content'>
            <div className='navigation'>
              <Navigation {...props} />
            </div>
            <div className='lesson'>
              <Lesson {...props} />
            </div>
          </div>
          <style jsx>{`
            .content {
              display: flex;
              margin-top: 1rem;
              margin-bottom: 5rem;
            }
      
            .navigation {
              padding: 1rem 3rem 0 0;
              max-width: 312px;
            }
      
            .lesson {
              flex: 1;
              width: 100%;
              min-width: 0;
              max-width: 600px;
            }

            // CSS only media query for mobile + SSR
            @media screen and (max-width: 640px) {
              .content {
                display: flex;
                flex-direction: column;
                padding: 0 1rem;
                margin-bottom: 5rem;
              }
              .navigation {
                margin: 0 -1rem;
              }
            }
          `}</style>
        </Container>
      </>
    }}</MediaQueryConsumer>
    <Footer/>
  </Page>
)

export default InitPage({
  rootContainers: [Profile, Navigation, Lesson],
  getProps: async (context) => {
    const { query } = context
    const initialState = getInitialState(context)

    return {
      courseId: query.course,
      lessonId: query.lesson,
      stepId: query.step,
      initialState
    }
  },
  getEnv: (props) => {
    const store = new Podda(props.initialState)
    const lokkaClient = getLokkaClient(props.initialState)

    return {
      store,
      lokkaClient
    }
  }
})(Content)
