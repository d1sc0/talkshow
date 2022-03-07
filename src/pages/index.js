import * as React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { Link, graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import '../styles.scss'
import { FaPodcast, FaSpotify } from 'react-icons/fa'
import { SiGooglepodcasts } from 'react-icons/si'

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
      <div className="section px-0 py-0">
        <div className="columns">
          <div className="column is-three-fifths">
            <StaticImage
              alt="another talk show cartoon logo illustartion of host talking!"
              src="../images/page-images/another-talk-show-home.jpg"
              className="rounded-corners"
            />
          </div>
          <div className="column">
            <p className="is-size-1 is-size-3-touch has-text-weight-bold">
              A fairly <span className="highlight">ordinary host</span>{' '}
              interviews <span className="highlight">interesting people</span>{' '}
              who aren't famous.
            </p>
            <p className="is-size-6 pt-3">
              <Link to="/about" className="is-underlined">
                Find out more...
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="section px-3">
        <div className="columns rounded-corners has-background-grey has-text-white ">
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

      <div className="section p-0 has-text-centered">
        <p className="is-size-5 pb-3">Subscribe with your favourite player</p>
      </div>
      <div className="columns mb-0">
        <div className="column">
          <Link to="">
            <button className="button is-black is-medium is-fullwidth has-text-weight-semibold">
              <span class="icon">
                <FaPodcast />
              </span>
              <span>Apple Podcasts</span>
            </button>
          </Link>
        </div>
        <div className="column">
          <Link to="">
            <button className="button is-black is-medium is-fullwidth has-text-weight-semibold">
              <span class="icon">
                <SiGooglepodcasts />
              </span>
              <span>Google Podcasts</span>
            </button>
          </Link>
        </div>
        <div className="column">
          <Link to="">
            <button className="button is-black is-medium is-fullwidth has-text-weight-semibold">
              <span class="icon">
                <FaSpotify />
              </span>
              <span>Spotify Podcasts</span>
            </button>
          </Link>
        </div>
      </div>
      <div className="section p-0 has-text-centered">
        <p className="is-underlined">
          <Link>RSS Feed</Link>
        </p>
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
