import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import '../styles.scss'
import { FaPodcast, FaSpotify, FaTwitter, FaInstagram } from 'react-icons/fa'
import { SiGooglepodcasts } from 'react-icons/si'

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteTitle
        }
      }
    }
  `)

  const [isActive, setisActive] = React.useState(false)

  return (
    <div>
      <nav
        className="navbar is-transparent"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container is-max-widescreen pt-4">
          <div className="navbar-brand px-0">
            <Link
              className="navbar-item has-text-weight-semibold is-size-4"
              to="/"
            >
              {data.site.siteMetadata.siteTitle}
            </Link>
            <button
              onClick={() => {
                setisActive(!isActive)
              }}
              className={`navbar-burger ${isActive ? 'is-active' : ''}`}
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasic"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </button>
          </div>
          <div
            id="navbarBasic"
            className={`navbar-menu ${isActive ? 'is-active' : ''}`}
          >
            <div className="navbar-end">
              <Link to="/about" className="navbar-item">
                About
              </Link>
              <Link to="/episodes" className="navbar-item">
                Episodes
              </Link>
              <Link to="/contact" className="navbar-item">
                Contact
              </Link>
              {/*  <Link to="/rss.xml" className="navbar-item">
                <FontAwesomeIcon icon={faRss} />
              </Link> */}
            </div>
          </div>
        </div>
      </nav>

      <section class="section px-4">
        <div class="container is-max-widescreen">
          <div className="">{children}</div>
        </div>
      </section>

      <footer className="footer has-background-white pb-3">
        <p className="has-text-centered py-1 ficons">
          <Link to="https://twitter.com/ordinaryhost">
            <FaTwitter size="1.9rem" />
          </Link>
          <Link to="https://www.instagram.com/anothertalk.show/">
            <FaInstagram size="1.9rem" />
          </Link>
          <Link to="https://podcasts.apple.com/gb/podcast/another-talk-show/id1551385867">
            <FaPodcast size="1.9rem" />
          </Link>
          <Link to="https://podcasts.google.com/feed/aHR0cHM6Ly9hbm90aGVydGFsay5zaG93L3BvZGNhc3QtcnNzLWZlZWQueG1s">
            <SiGooglepodcasts size="1.9rem" />
          </Link>

          <Link to="https://open.spotify.com/show/2Wf8butZI229NlRVPQHU6z">
            <FaSpotify size="1.9rem" />
          </Link>
        </p>
        <p className="has-text-centered py-1">
          <Link to="/">Home</Link>
          {' // '}
          <Link to="/about">About</Link>
          {' // '}
          <Link to="/episodes">Episodes</Link>
          {' // '}
          <Link to="/contact">Contact</Link>
          {' // '}
          <a href="#top">Top</a>
        </p>
        <p className="has-text-centered py-0">
          Built by Stuart Mackenzie with{' '}
          <span role="img" aria-label="heart emoji">
            {' '}
            ♥️{' '}
          </span>
          using <a href="https://www.gatsbyjs.org">Gatsby</a>
        </p>
      </footer>
    </div>
  )
}
export default Layout
