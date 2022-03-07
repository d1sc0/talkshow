import * as React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { Link, graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import '../styles.scss'

const HomePage = ({ data }) => {
  const latestPost = data.allMdx.nodes[0]
  const episode =
    'Episode ' +
    latestPost.frontmatter.episodeNumber +
    ': ' +
    latestPost.frontmatter.title

  return (
    <Layout>
      <Seo title="Home" />
      <div className="columns pt-4">
        <div className="column is-three-fifths">
          <StaticImage
            alt="another talk show cartoon logo illustartion of host talking!"
            src="../images/page-images/another-talk-show-home.jpg"
            className="rounded-corners"
          />
        </div>
        <div className="column">
          <p className="is-size-1 is-size-3-touch has-text-weight-bold">
            A fairly <span className="highlight">ordinary host</span> interviews{' '}
            <span className="highlight">interesting people</span> who aren't
            famous.
          </p>
          <p className="is-size-6 pt-3">
            <Link to="/about" className="is-underlined">
              Find out more...
            </Link>
          </p>
        </div>
      </div>
      <div className="pt-5 px-3">
        <div className="columns py-4 rounded-corners has-background-grey has-text-white ">
          <div className="column is-two-fifths">
            <div className="px-3">
              LATEST EPISODE
              <h2 className="is-size-3 is-size-4-touch has-text-weight-semibold">
                {episode}
              </h2>
            </div>
          </div>
          <div className="column is-vcentered">
            <div className="px-3">
              <audio
                className="audioplayer"
                src={latestPost.frontmatter.episodeMp3}
                controls
              >
                Your browser does not support the audio player!{' '}
                <a href={latestPost.frontmatter.episodeMp3}>
                  You can download here instead
                </a>
                <track kind="captions" label={episode} />
              </audio>
              <p>{latestPost.frontmatter.episodeSummary}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage

export const pageQuery = graphql`
  query latestPost {
    allMdx(sort: { order: DESC, fields: frontmatter___date }, limit: 1) {
      nodes {
        id
        frontmatter {
          title
          date(formatString: "DD MMM YYYY")
          episodeSummary
          episodeMp3
          episodeBytes
          episodeSeconds
          episodeNumber
        }
      }
    }
  }
`
