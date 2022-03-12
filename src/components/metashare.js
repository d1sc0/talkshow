import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { FaTwitter, FaFacebook, FaShare } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { EpisodeSizer, EpisodeDuration } from '../helpers/helper.js'

const MetaShare = ({ meta }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
          }
        }
      }
    `
  )
  const siteUrl = site.siteMetadata.siteUrl
  const style = meta.metaStlye
  const episodeDate = meta.episodeDate
  const episodeSize = EpisodeSizer(meta.episodeBytes, 2)
  const episodeLength = EpisodeDuration(meta.episodeSeconds)
  const facebookShare = `http://www.facebook.com/sharer.php?u=${siteUrl}/episodes/${meta.episodeSlug}`
  const twitterShare = `https://twitter.com/intent/tweet?text=${meta.episodeTitle} - ${siteUrl}/episodes/${meta.episodeSlug}`
  const emailShare = `mailto:?subject=Check out this podcast episode site&body=${meta.episodeTitle} - ${siteUrl}/episodes/${meta.episodeSlug}`
  return (
    <>
      <p className="level is-mobile">
        <div className="level-left">
          <span class="level-item">
            <span class="icon is-small">
              <FaShare />
            </span>
          </span>
          <a className={`level-item ${style}`} href={twitterShare}>
            <span class="icon is-small">
              <FaTwitter />
            </span>
          </a>
          <a className={`level-item ${style}`} href={facebookShare}>
            <span className="icon is-small">
              <FaFacebook />
            </span>
          </a>
          <a className={`level-item ${style}`} href={emailShare}>
            <span className="icon is-small">
              <MdEmail />
            </span>
          </a>
        </div>
      </p>
      <p className="is-uppercase is-size-7">
        Posted: {episodeDate} <br />
        Duration: {episodeLength} &#x2f;&#x2f; Size: {episodeSize}
      </p>
    </>
  )
}

export default MetaShare