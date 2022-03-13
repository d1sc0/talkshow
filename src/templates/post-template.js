import * as React from 'react'
import { Link, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import PostHeader from '../components/postheader'
import Layout from '../components/layout'
import Seo from '../components/seo'
import '../styles.scss'

const PostTemplate = ({ data }) => {
  const post = data.mdx
  const episodeTitle = `Episode ${post.frontmatter.episodeNumber}: ${post.frontmatter.title}`
  const postMeta = {
    episodeSeconds: post.frontmatter.episodeSeconds,
    episodeBytes: post.frontmatter.episodeBytes,
    episodeTitle: episodeTitle,
    episodeSlug: post.slug,
    episodeDate: post.frontmatter.date,
    episodeMp3: post.frontmatter.episodeMp3,
    metaStlye: 'mr-3',
  }
  const { previous, next } = data
  return (
    <Layout>
      <Seo
        title={episodeTitle}
        description={post.frontmatter.description || post.excerpt}
      />
      <h1 className="title is-size-2">{episodeTitle}</h1>
      <PostHeader meta={postMeta} />
      <div className="content mt-4">
        <MDXRenderer frontmatter={post.frontmatter}>{post.body}</MDXRenderer>
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
              to={`/episodes/${previous.slug}`}
              className="pagination-previous"
              rel="prev"
            >
              ← EP{previous.frontmatter.episodeNumber}:
              {previous.frontmatter.title}
            </Link>
          )}
          {next && (
            <Link
              to={`/episodes/${next.slug}`}
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
      slug
      excerpt
      body
      frontmatter {
        title
        date(formatString: "DD MMM YYYY")
        description
        episodeMp3
        episodeBytes
        episodeSeconds
        episodeNumber
        postImages {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
    previous: mdx(id: { eq: $previousPostId }) {
      slug
      frontmatter {
        title
        episodeNumber
      }
    }
    next: mdx(id: { eq: $nextPostId }) {
      slug
      frontmatter {
        title
        episodeNumber
      }
    }
  }
`
