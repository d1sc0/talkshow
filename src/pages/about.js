import * as React from 'react'
// import { Link } from 'gatsby'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { StaticImage } from 'gatsby-plugin-image'
import '../styles.scss'

const AboutPage = () => {
  return (
    <Layout>
      <Seo description="Everything you need to know ever" title="About" />
      <h1 className="title is-size-2">About</h1>
      <p>About page</p>
      <StaticImage
        alt="Cute dog smiling with his tongue out whilst being petted"
        src="../images/page-images/cute-dog.jpg"
      />
    </Layout>
  )
}

export default AboutPage
