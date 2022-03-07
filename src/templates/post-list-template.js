import React from 'react'
import { graphql, Link } from 'gatsby'
import Seo from '../components/seo'
import Layout from '../components/layout'
//import { MDXRenderer } from 'gatsby-plugin-mdx'
import '../styles.scss'

const PostList = ({ data, pageContext }) => {
  const posts = data.allMdx.nodes
  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? '' : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()

  return (
    <Layout>
      <Seo title="Posts" />
      <h1 className="title is-size-2">Posts</h1>
      {posts.map(post => {
        const title = post.frontmatter.title || post.slug
        return (
          <div className="block" key={post.id}>
            <h2 className="is-size-4">
              <Link to={`/posts/${post.slug}`}>{title}</Link>
            </h2>
            <small className="is-size-7">{post.frontmatter.date}</small>
            <p className="py-2">{post.excerpt}</p>
          </div>
        )
      })}

      {!isFirst && (
        <nav
          className="pagination py-4 is-pulled-left"
          role="navigation"
          aria-label="pagination"
        >
          <Link
            to={`/posts/${prevPage}`}
            className="pagination-previous"
            rel="prev"
          >
            Previous Page
          </Link>
        </nav>
      )}
      {!isLast && (
        <nav
          className="pagination py-4 is-pulled-right"
          role="navigation"
          aria-label="pagination"
        >
          <Link
            to={`/posts/${nextPage}`}
            className="pagination-next"
            rel="next"
          >
            Next Page
          </Link>
        </nav>
      )}
    </Layout>
  )
}

export default PostList

export const postListQuery = graphql`
  query postListQuery($skip: Int!, $limit: Int!) {
    allMdx(
      sort: { order: DESC, fields: frontmatter___date }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        slug
        id
        excerpt(pruneLength: 480)
        frontmatter {
          date(formatString: "DD MMM YYYY")
          title
          description
        }
      }
    }
  }
`
