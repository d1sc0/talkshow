import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { FaTwitter, FaFacebook, FaShare } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { EpisodeSizer, EpisodeDuration } from '../helpers/helper.js'

const PostHeader = ({ meta }) => {
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
  const episodeTitle = meta.episodeTitle
  const episodeSlug = meta.episodeSlug
  const episodeMp3 = meta.episodeMp3
  const episodeDate = meta.episodeDate
  const episodeSize = EpisodeSizer(meta.episodeBytes, 2)
  const episodeLength = EpisodeDuration(meta.episodeSeconds)
  const facebookShare = `http://www.facebook.com/sharer.php?u=${siteUrl}/episodes${episodeSlug}`
  const twitterShare = `https://twitter.com/intent/tweet?text=${meta.episodeTitle} - ${siteUrl}/episodes${episodeSlug}`
  const emailShare = `mailto:?subject=Check out this podcast episode site&body=${meta.episodeTitle} - ${siteUrl}episodes/${episodeSlug}`
  return (
    <>
      <audio className="audioplayer" src={episodeMp3} controls>
        Your browser does not support the audio player!{' '}
        <a href={episodeMp3}>You can download here instead</a>
        <track kind="captions" label={episodeTitle} />
      </audio>
      <p className="is-uppercase is-size-7">
        Posted: {episodeDate} &#x2f;&#x2f; Duration: {episodeLength}
        &#x2f;&#x2f; Size: {episodeSize}
      </p>
      <p className="py-2">
        <div className="">
          <span class="mr-4">
            <FaShare size="1.4rem" alt="sharing icons" />
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
    </>
  )
}

export default PostHeader
