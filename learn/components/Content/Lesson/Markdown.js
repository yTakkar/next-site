import React from 'react'
import ReactDom from 'react-dom'
import marked from 'marked'
import dynamic from 'next/dynamic'

const Highlight = dynamic(import('react-highlight'), {
  // Here we don't show any loading component.
  // But instead, we'll show the markdown content without syntax-highlight
  loading: ({ children }) => (
    <div
      dangerouslySetInnerHTML={{__html: children}}
    />
  )
})

marked.setOptions({
  gfm: true,
  tables: true,
  breaks: true
})

export default class Markdown extends React.Component {
  makeLinksOpenInANewTab() {
    const dom = ReactDom.findDOMNode(this)
    const links = dom.getElementsByTagName('a')
    Object.keys(links).forEach((id) => {
      const link = links[id]
      if (link.setAttribute) {
        link.setAttribute('target', '_blank')
      }
    })
  }

  componentDidMount () {
    this.makeLinksOpenInANewTab()
  }

  componentDidUpdate () {
    this.makeLinksOpenInANewTab()
  }

  renderMarkdown () {
    const { content } = this.props

    // Only use the syntax-highlight component only if there's a code block
    // That's because it's too heavy.
    if (/~~~/.test(content)) {
      return (
        <Highlight innerHTML={true}>
          {marked(content)}
        </Highlight>
      )
    }

    return (
      <div
        dangerouslySetInnerHTML={{__html: marked(content)}}
      />
    )
  }

  render () {
    return (
      <div className='markdown'>
        { this.renderMarkdown() }
        <style jsx global>{`
          .markdown h2 {
            margin-top: 2rem;
            font-size: 1.25rem;
          }

          .markdown blockquote {
            margin: 2rem 0;
            padding: 1rem 1.25rem;
            background: #f7f7f7;
          }

          .markdown blockquote p {
            margin: 0;
          }

          .markdown pre {
            padding: 1.25rem;
            margin: 40px 0;
            border: 1px solid #eaeaea;
            white-space: pre;
            overflow: auto;
            -webkit-overflow-scrolling: touch;
          }

          .markdown code {
            color: #313131;
            font-size: 14px;
            white-space: pre-wrap;
          }

          .markdown code::before {
            content: '\`';
          }
  
          .markdown code::after {
            content: '\`';
          }

          .markdown pre code {
            padding: 0;
            border-radius: 0;
          }
          .markdown pre code::before {
            content: '';
          }
          .markdown pre code::after {
            content: '';
          }

          .markdown img {
            max-width: 100%
          }

          .markdown hr {
            margin: 3rem 0;
            border: none;
            border-bottom: 1px solid #dadada;
          }
        `}</style>
      </div>
    )
  }
}
