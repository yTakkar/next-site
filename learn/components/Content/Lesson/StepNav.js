import React from 'react'
import Router from 'next/router'
import ErrorBox from '~/components/ErrorBox'
import PropTypes from 'prop-types'

import Button from '~/components/new/button'
import RightArrow from '~/components/icons/arrow-right'
import LeftArrow from '~/components/icons/arrow-left'
import LongRightArrow from '~/components/icons/arrow-right-long'

import GitHubButton from '~/components/new/github-button'

const Icon = ({left, right, children}) => <span>
  {children}
  <style jsx>{`
    span {
      ${ left ? 'margin-right: .5rem; margin-left: -.25rem;' : ''}
      ${ right ? 'margin-left: .5rem; margin-right: -.25rem;' : ''}
      display: inline-block;
      vertical-align: middle;
      // font-size: 0;
      line-height: 1;
    }
  `}</style>
</span>

class StepNav extends React.Component {
  getNextStep (direction) {
    const { steps, currentStepId } = this.props
    const currentIndex = steps.findIndex((s) => s.id === currentStepId)
    const nextStep = steps[currentIndex + direction]

    return nextStep
  }

  firePrev () {
    const { onPrev } = this.props
    const prevStep = this.getNextStep(-1)
    if (onPrev) onPrev(prevStep)
  }

  fireNext () {
    const { onNext } = this.props
    const nextStep = this.getNextStep(1)
    if (onNext) onNext(nextStep)
  }

  fireLogin () {
    const { onLogin } = this.props
    if (onLogin) onLogin()
  }

  hasNextStep () {
    const nextStep = this.getNextStep(1)
    return Boolean(nextStep)
  }

  nextLesssonUrls () {
    const { allCourses, courseId, lessonId } = this.props
    const allLessons = []

    allCourses.forEach((course) => {
      course.lessons.forEach((lesson) => allLessons.push({
        courseId: course.id, lessonId: lesson.id
      }))
    })

    const currentIndex = allLessons.findIndex((l) => l.courseId === courseId && l.lessonId === lessonId)
    const nextLesson = allLessons[currentIndex + 1]

    if (!nextLesson) return null

    return {
      as: `/learn/${nextLesson.courseId}/${nextLesson.lessonId}`,
      href: `/learn/content?course=${nextLesson.courseId}&lesson=${nextLesson.lessonId}`
    }
  }

  getNextLesson () {
    const urls = this.nextLesssonUrls()
    if (!urls) return null

    return (
      <Button invert onClick={() => Router.push(urls.href, urls.as)}>Next Lesson</Button>
    )
  }

  render () {
    const { steps, currentStepId, loading, error } = this.props
    if (error) {
      return (<ErrorBox error={error}/>)
    }

    if (loading) {
      return (<div>Loading...</div>)
    }

    if (!steps) {
      return (<Button invert onClick={() => this.fireLogin()}>Login & Start<Icon right><LongRightArrow color='white'/></Icon></Button>)
    }

    if (!currentStepId) {
      return (<Button invert onClick={() => this.fireNext()}>Start Now<Icon right><LongRightArrow color='white'/></Icon></Button>)
    }

    const nextStepButton = (<Button invert onClick={() => this.fireNext()}>Next<Icon right><RightArrow color="white"/></Icon></Button>)

    return (
      <div>
        <Button full onClick={() => this.firePrev()}><Icon left><LeftArrow color="#0076ff"/></Icon>Prev</Button>
        <span className='spacer' />
        { this.hasNextStep() ? nextStepButton : this.getNextLesson() }
        <style jsx>{`
          div {
            text-align: right;
          }
          .spacer {
            margin-left: 1rem;
          }
        `}</style>
      </div>
    )
  }
}

StepNav.propTypes = {
  error: PropTypes.object,
  steps: PropTypes.array,
  courseId: PropTypes.string,
  lessonId: PropTypes.string,
  allCourses: PropTypes.array,
  currentStepId: PropTypes.string
}

StepNav.courseFragment = (c) => c.createFragment(`
  fragment on Course {
    id
    lessons {
      id
    }
  }
`)

StepNav.fragment = (c) => c.createFragment(`
  fragment on Step {
    id,
    visited
  }
`)

export default StepNav
