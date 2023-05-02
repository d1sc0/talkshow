import * as React from 'react'
import { Link, graphql } from 'gatsby'
//import { MDXRenderer } from 'gatsby-plugin-mdx'
import PostHeader from '../components/postheader'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { getSrc } from 'gatsby-plugin-image'
import '../styles.scss'

const PostTemplate = ({ data, children }) => {
  const post = data.mdx
  const socialImg = getSrc(post.frontmatter.socialImage)
  const episodeTitle = `Episode ${post.frontmatter.episodeNumber}: ${post.frontmatter.title}`
  const postMeta = {
    episodeSeconds: post.frontmatter.episodeSeconds,
    episodeBytes: post.frontmatter.episodeBytes,
    episodeTitle: episodeTitle,
    episodeSlug: post.fields.slug,
    episodeDate: post.frontmatter.date,
    episodeMp3: post.frontmatter.episodeMp3,
    metaStlye: 'mr-4',
  }
  const { previous, next } = data
  return (
    <Layout>
      <Seo
        title={episodeTitle}
        description={post.frontmatter.description || post.excerpt}
        imageUrl={socialImg}
      />
      <h1 className="title is-size-2">{episodeTitle}</h1>
      <PostHeader meta={postMeta} />
      <div className="content mt-4">
        {/* <MDXRenderer frontmatter={post.frontmatter}>{post.body}</MDXRenderer> */}
        {children}
      </div>

      <nav
        className="pagination py-4"
        role="navigation"
        aria-label="pagination"
      >
        <div className="container">
          <h4 className="is-size-6 has-text-weight-bold py-3">
            Explore more episodes...
          </h4>
          {previous && (
            <Link
              to={`/episodes${previous.fields.slug}`}
              className="pagination-previous"
              rel="prev"
            >
              ← EP{previous.frontmatter.episodeNumber}:
              {previous.frontmatter.title}
            </Link>
          )}
          {next && (
            <Link
              to={`/episodes${next.fields.slug}`}
              className="pagination-next"
              rel="next"
            >
              EP{next.frontmatter.episodeNumber}: {next.frontmatter.title} →
            </Link>
          )}
        </div>
      </nav>
    </Layout>
  )
}

export default PostTemplate

export const pageQuery = graphql`
  query postByID($id: String!, $previousPostId: String, $nextPostId: String) {
    site {
      siteMetadata {
        siteTitle
      }
    }
    mdx(id: { eq: $id }) {
      id
      excerpt
      body
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
        socialImage {
          childImageSharp {
            gatsbyImageData
          }
        }
        postImages {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
    previous: mdx(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
        episodeNumber
      }
    }
    next: mdx(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
        episodeNumber
      }
    }
  }
`
