import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata.author
  const social = data.site.siteMetadata.social

  return (
    <div class="box py-4">
      <article class="media">
        <div class="media-left">
          <figure class="image is-128x128">
            <StaticImage
              className="bio-avatar"
              layout="fixed"
              formats={['auto', 'webp', 'avif']}
              src="../images/profile-pic.png"
              width={128}
              height={128}
              quality={95}
              alt="Profile picture"
            />
          </figure>
        </div>
        <div class="media-content">
          <div class="content">
            <p>
              This post was written by <strong>{author.name}</strong>
            </p>
            <p>{author.summary}</p>
            <p>
              <a href={`https://twitter.com/${social?.twitter || ``}`}>
                Follow on Twitter
              </a>
            </p>
          </div>
        </div>
      </article>
    </div>
  )
}

export default Bio
