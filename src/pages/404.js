import * as React from 'react'
import '../styles.scss'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { StaticImage } from 'gatsby-plugin-image'

const NotFoundPage = () => {
  return (
    <Layout>
      <Seo title="404: Not Found" />
      <h1 className="title is-size-2">404: Uh-oh! Something went wrong</h1>
      <div class="content">
        <p>
          We're not quite sure what you were looking for but we can't find it.{' '}
          <strong>Sorry!</strong>
        </p>
        <p>Here is a picture of a sad kitty instead.</p>
      </div>
      <StaticImage
        alt="404 - We're sorry we can't find this! here's a picture of a sad cat"
        src="../images/page-images/sadcat.jpg"
        className="rounded-corners"
      />
    </Layout>
  )
}

export default NotFoundPage
