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
  const facebookShare = `http://www.facebook.com/sharer.php?u=${siteUrl}/episodes/${meta.episodeSlug}/`
  const twitterShare = `https://twitter.com/intent/tweet?text=${meta.episodeTitle} - ${siteUrl}/episodes/${meta.episodeSlug}/`
  const emailShare = `mailto:?subject=Check out this podcast episode site&body=${meta.episodeTitle} - ${siteUrl}/episodes/${meta.episodeSlug}/`
  return (
    <>
      <p className="">
        <div className="is-aligned-left">
          <span className="mr-3">
            <FaShare size="1.4rem" alt="sharing icon" />
          </span>
          <a className={style} href={twitterShare}>
            <FaTwitter size="1.4rem" alt="twitter share" />
          </a>
          <a className={style} href={facebookShare}>
            <FaFacebook size="1.4rem" alt="facebook share" />
          </a>
          <a className={style} href={emailShare}>
            <MdEmail size="1.4rem" alt="email share" />
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
