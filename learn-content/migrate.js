const fs = require('fs')
const { join } = require('path')

function migrateFile(courseId, lessonId, filePath) {
  const lessonFolder = join(
    __dirname,
    `../learn/pages/learn/${courseId}/${lessonId}`
  )

  if (!fs.existsSync(lessonFolder)) {
    fs.mkdirSync(lessonFolder)
  }

  const data = require(filePath)

  let indexContent = `
import Layout from '~/components/Layout'

export const meta = {
  title: '${data.name}',
  courseId: '${courseId}',
  lessonId: '${lessonId}'
}

`

  indexContent += data.intro

  indexContent += `

export default ({ children }) => <Layout meta={meta}>{children}</Layout>

`

  fs.writeFileSync(join(lessonFolder, 'index.mdx'), indexContent, {
    encoding: 'utf8'
  })

  data.steps.forEach(step => {
    let content = `
import Layout from '~/components/Layout'
${step.answers ? `import AnswerBox from '~/components/AnswerBox'` : ''}

export const meta = {
  title: '${data.name}',
  courseId: '${courseId}',
  lessonId: '${lessonId}',
  stepId: '${step.id}',
  ${
    !step.answers
      ? ''
      : `question: {
    answers: ${JSON.stringify(step.answers)},
    correctAnswer: "${step.correctAnswer}"
  }`
  }
}

`

    content += step.text

    content += `

export default ({ children }) => <Layout meta={meta}>{children}</Layout>

`

    fs.writeFileSync(join(lessonFolder, `${step.id}.mdx`), content, {
      encoding: 'utf8'
    })
  })

  return {
    id: lessonId,
    name: data.name,
    steps: data.steps.map(step => ({ id: step.id, points: step.points }))
  }
}

function migrateCourse(courseId, folderPath) {
  const courseFolder = join(__dirname, `../learn/pages/learn/${courseId}`)

  if (!fs.existsSync(courseFolder)) {
    fs.mkdirSync(courseFolder)
  }

  const files = fs
    .readdirSync(join(__dirname, folderPath))
    .filter(file => file !== '.DS_Store')

  const lessons = files.map(file => {
    const filePath = join(__dirname, folderPath, file)

    // remove `2-` and `.js`
    const lessonId = file.slice(2, file.length - 3)

    return migrateFile(courseId, lessonId, filePath)
  })

  return lessons
}

const basicsLessons = migrateCourse('basics', './content/1-basics')
const excelLessons = migrateCourse('excel', './content/2-excel')

const courses = [
  {
    id: 'basics',
    name: 'Basics',
    lessons: basicsLessons
  },
  {
    id: 'excel',
    name: 'Excel',
    lessons: excelLessons
  }
]

let coursesContent = `const courses = ${JSON.stringify(courses, null, 2)}

export default courses`

fs.writeFileSync(join(__dirname, `../learn/lib/courses.js`), coursesContent, {
  encoding: 'utf8'
})
