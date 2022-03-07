import * as React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import '../styles.scss'

const HomePage = () => {
  return (
    <Layout>
      <Seo title="Home" />
      <div className="columns">
        <div className="column is-three-fifths">
          <StaticImage
            alt="Clifford, a reddish-brown pitbull, posing on a couch and looking stoically at the camera"
            src="https://pbs.twimg.com/media/E1oMV3QVgAIr1NT?format=jpg&name=large"
            className="rounded-image"
          />
        </div>
        <div className="column">
          <p className="is-size-2 has-text-weight-bold">
            A fairly <span className="highlight">ordinary host</span> interviews{' '}
            <span className="highlight">interesting people</span> who aren't
            famous.
          </p>
          <p className="is-size-5 pt-3">
            <Link to="/about" className="is-underlined">
              Find out more...
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
