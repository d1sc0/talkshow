import * as React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import MetaShare from '../components/metashare'
import { Link, graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import '../styles.scss'
import { FaPodcast, FaSpotify } from 'react-icons/fa'
import { SiGooglepodcasts } from 'react-icons/si'

const HomePage = ({ data }) => {
  const latestPost = data.allMdx.nodes[0]
  const episodeTitle = `Episode ${latestPost.frontmatter.episodeNumber}: ${latestPost.frontmatter.title}`
  const postMeta = {
    episodeSeconds: latestPost.frontmatter.episodeSeconds,
    episodeBytes: latestPost.frontmatter.episodeBytes,
    episodeTitle: episodeTitle,
    episodeSlug: latestPost.fields.slug,
    episodeDate: latestPost.frontmatter.date,
    metaStlye: 'has-text-white mr-4',
  }
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
            <p className="is-size-5 pt-3">
              <Link to="/about" className="has-text-weight-semibold">
                Find out more...
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="section px-3">
        <div className="columns rounded-corners has-background-grey-dark has-text-white p-3">
          <div className="column is-two-fifths">
            LATEST EPISODE
            <h2 className="is-size-3 is-size-4-touch has-text-weight-semibold py-2">
              <Link
                to={`/episodes${latestPost.fields.slug}`}
                className="has-text-white"
              >
                {episodeTitle}
              </Link>
            </h2>
            <MetaShare meta={postMeta} />
          </div>
          <div className="column">
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
            <div>{latestPost.frontmatter.description}</div>
            <div className="py-2 has-text-right">
              <Link
                to="/episodes"
                className="is-size-5 has-text-white has-text-weight-semibold"
              >
                [...More Episodes]
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="section p-0 has-text-centered">
        <p className="is-size-5 pb-3">Subscribe with your favourite player</p>
      </div>
      <div className="columns mb-0">
        <div className="column">
          <a href="https://podcasts.apple.com/gb/podcast/another-talk-show/id1551385867">
            <button className="button is-black is-medium is-fullwidth has-text-weight-semibold">
              <span className="icon">
                <FaPodcast />
              </span>
              <span>Apple Podcasts</span>
            </button>
          </a>
        </div>
        <div className="column">
          <a href="https://podcasts.google.com/feed/aHR0cHM6Ly9hbm90aGVydGFsay5zaG93L3BvZGNhc3QueG1s">
            <button className="button is-black is-medium is-fullwidth has-text-weight-semibold">
              <span className="icon">
                <SiGooglepodcasts />
              </span>
              <span>Google Podcasts</span>
            </button>
          </a>
        </div>
        <div className="column">
          <a href="https://open.spotify.com/show/4KBoGQIiwmO4ZEE6rdNSGh">
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
        <p className="is-size-5">
          <Link to="/podcast.xml" className="has-text-weight-semibold">
            RSS Feed
          </Link>
        </p>
      </div>
    </Layout>
  )
}

export default HomePage

export const pageQuery = graphql`
  query latestPost {
    allMdx(sort: { frontmatter: { date: DESC } }, limit: 1) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "DD MMM YYYY")
          description
          episodeMp3
          episodeBytes
          episodeSeconds
          episodeNumber
        }
      }
    }
  }
`
