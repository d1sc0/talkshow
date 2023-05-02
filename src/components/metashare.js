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
  const facebookShare = `http://www.facebook.com/sharer.php?u=${siteUrl}/episodes${meta.episodeSlug}`
  const twitterShare = `https://twitter.com/intent/tweet?text=${meta.episodeTitle} - ${siteUrl}/episodes${meta.episodeSlug}`
  const emailShare = `mailto:?subject=Check out this podcast episode site&body=${meta.episodeTitle} - ${siteUrl}/episodes${meta.episodeSlug}`
  return (
    <>
      <p className="">
        <div className="is-aligned-left">
          <span className="mr-4" title="sharing icon">
            <FaShare size="1.4rem" />
          </span>
          <a className={style} href={twitterShare} title="share on twitter">
            <FaTwitter size="1.4rem" />
          </a>
          <a className={style} href={facebookShare} title="share on facebook">
            <FaFacebook size="1.4rem" />
          </a>
          <a className={style} href={emailShare} title="share via email">
            <MdEmail size="1.4rem" />
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
