import React from 'react'
import { graphql, Link } from 'gatsby'
import Seo from '../components/seo'
import Layout from '../components/layout'
import MetaShare from '../components/metashare'
import '../styles.scss'

const PostList = ({ data, pageContext }) => {
  const posts = data.allMdx.nodes
  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? '' : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()
  let pageTitle = 'Episodes'
  if (isFirst) {
    pageTitle = 'Latest Episodes'
  }
  return (
    <Layout>
      <Seo title={pageTitle} />
      <h1 className="title is-size-2">{pageTitle}</h1>
      {posts.map(post => {
        const episodeTitle = `Episode ${post.frontmatter.episodeNumber}: ${post.frontmatter.title}`
        const postMeta = {
          episodeSeconds: post.frontmatter.episodeSeconds,
          episodeBytes: post.frontmatter.episodeBytes,
          episodeTitle: episodeTitle,
          episodeSlug: post.fields.slug,
          episodeDate: post.frontmatter.date,
          metaStlye: 'mr-4',
        }
        return (
          <>
            <div className="article px-3 py-5">
              <div className="columns rounded-corners episode-card">
                <div className="column is-two-fifths">
                  <div className="px-3">
                    <h2 className="is-size-3 is-size-4-touch has-text-weight-semibold">
                      <Link
                        to={`/episodes${post.fields.slug}`}
                        className="episode-link"
                      >
                        {episodeTitle}
                      </Link>
                    </h2>
                    <MetaShare meta={postMeta} />
                  </div>
                </div>
                <div className="column is-vcentered">
                  <div className="px-3">
                    <audio
                      className="audioplayer has-text-warning-light"
                      src={post.frontmatter.episodeMp3}
                      controls
                    >
                      Your browser does not support the audio player!{' '}
                      <a href={post.frontmatter.episodeMp3}>
                        You can download here instead
                      </a>
                      <track kind="captions" label={episodeTitle} />
                    </audio>
                    <p>
                      <strong>Show Notes: </strong>
                      {post.excerpt}{' '}
                      <strong>
                        <Link to={`/episodes${post.fields.slug}`}>
                          [Read more...]
                        </Link>
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      })}

      {!isFirst && (
        <nav
          className="pagination py-4 is-pulled-left"
          role="navigation"
          aria-label="pagination"
        >
          <Link
            to={`/episodes/${prevPage}`}
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
            to={`/episodes/${nextPage}`}
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
    allMdx(sort: { frontmatter: { date: DESC } }, limit: $limit, skip: $skip) {
      nodes {
        id
        excerpt(pruneLength: 480)
        frontmatter {
          date(formatString: "DD MMM YYYY")
          title
          description
          episodeMp3
          episodeBytes
          episodeSeconds
          episodeNumber
        }
        fields {
          slug
        }
      }
    }
  }
`
