import * as React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { Link, graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import '../styles.scss'
import { FaPodcast, FaSpotify } from 'react-icons/fa'
import { SiGooglepodcasts } from 'react-icons/si'
import { EpisodeSizer, EpisodeDuration } from '../helpers/helper.js'

const HomePage = ({ data }) => {
  const latestPost = data.allMdx.nodes[0]
  const episodeTitle =
    'Episode ' +
    latestPost.frontmatter.episodeNumber +
    ': ' +
    latestPost.frontmatter.title
  const episodeSize = EpisodeSizer(latestPost.frontmatter.episodeBytes, 2)
  const episodeLength = EpisodeDuration(latestPost.frontmatter.episodeSeconds)
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
        <div className="columns rounded-corners has-background-grey has-text-white p-3">
          <div className="column is-two-fifths">
            LATEST EPISODE
            <h2 className="is-size-3 is-size-4-touch has-text-weight-semibold py-2">
              <Link
                to={`/episodes/${latestPost.slug}`}
                className="has-text-white"
              >
                {episodeTitle}
              </Link>
            </h2>
            <p className="is-uppercase is-size-7">
              Posted: {latestPost.frontmatter.date} <br />
              Duration: {episodeLength} // Size: {episodeSize}
            </p>
          </div>
          <div className="column is-vcentered">
            <audio
              className="audioplayer"
              src={latestPost.frontmatter.episodeMp3}
              controls
            >
              Your browser does not support the audio player!{' '}
              <a href={latestPost.frontmatter.episodeMp3}>
                You can download here instead
              </a>
              <track kind="captions" label={episodeTitle} />
            </audio>
            <p>
              {latestPost.frontmatter.episodeSummary}{' '}
              <Link
                to={`/episodes/${latestPost.slug}`}
                className="has-text-white has-text-weight-semibold"
              >
                [...read show notes]
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="section p-0 has-text-centered">
        <p className="is-size-5 pb-3">Subscribe with your favourite player</p>
      </div>
      <div className="columns mb-0">
        <div className="column">
          <a href="">
            <button className="button is-black is-medium is-fullwidth has-text-weight-semibold">
              <span className="icon">
                <FaPodcast />
              </span>
              <span>Apple Podcasts</span>
            </button>
          </a>
        </div>
        <div className="column">
          <a href="">
            <button className="button is-black is-medium is-fullwidth has-text-weight-semibold">
              <span className="icon">
                <SiGooglepodcasts />
              </span>
              <span>Google Podcasts</span>
            </button>
          </a>
        </div>
        <div className="column">
          <a href="">
            <button className="button is-black is-medium is-fullwidth has-text-weight-semibold">
              <span className="icon">
                <FaSpotify />
              </span>
              <span>Spotify Podcasts</span>
            </button>
          </a>
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
        slug
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
