import * as React from 'react'
import '../styles.scss'
import Layout from '../components/layout'
import Seo from '../components/seo'

const NotFoundPage = () => {
  return (
    <Layout>
      <Seo title="404: Not Found" />
      <h1 className="title is-size-2">4 oh 4!s</h1>
      <p>uh-oh something has gone a little bit wrong!</p>
    </Layout>
  )
}

export default NotFoundPage
