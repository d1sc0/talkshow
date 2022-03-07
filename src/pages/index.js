import * as React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { StaticImage } from 'gatsby-plugin-image'
import '../styles.scss'

const HomePage = () => {
  return (
    <Layout>
      <Seo title="Home" />
      <h1 className="title is-size-2">Home</h1>
      <p>This is the home page</p>
      <StaticImage
        alt="Clifford, a reddish-brown pitbull, posing on a couch and looking stoically at the camera"
        src="https://pbs.twimg.com/media/E1oMV3QVgAIr1NT?format=jpg&name=large"
      />
    </Layout>
  )
}

export default HomePage
