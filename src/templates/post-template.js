import * as React from 'react'
import { Link, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Bio from '../components/bio'
import Layout from '../components/layout'
import Seo from '../components/seo'
import '../styles.scss'

const PostTemplate = ({ data }) => {
  const post = data.mdx
  const { previous, next } = data

  return (
    <Layout>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <h1 className="title is-size-2">{post.frontmatter.title}</h1>
      <div className="block">
        <div className="is-size-7 pb-4">Posted: {post.frontmatter.date}</div>
        <div className="content">
          <MDXRenderer>{post.body}</MDXRenderer>
        </div>
      </div>
      <Bio />

      <nav
        className="pagination py-4"
        role="navigation"
        aria-label="pagination"
      >
        <div className="container">
          <h4 className="is-size-6 has-text-weight-bold py-3">
            Explore more posts...
          </h4>
          {previous && (
            <Link
              to={`/posts/${previous.slug}`}
              className="pagination-previous"
              rel="prev"
            >
              ← {previous.frontmatter.title}
            </Link>
          )}
          {next && (
            <Link
              to={`/posts/${next.slug}`}
              className="pagination-next"
              rel="next"
            >
              {next.frontmatter.title} →
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
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: mdx(id: { eq: $previousPostId }) {
      slug
      frontmatter {
        title
      }
    }
    next: mdx(id: { eq: $nextPostId }) {
      slug
      frontmatter {
        title
      }
    }
  }
`
