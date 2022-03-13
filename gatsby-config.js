module.exports = {
  siteMetadata: {
    siteTitle: `Another Talk Show`,
    description: `On Another Talk Show a fairly ordinary host (Stuart Mackenzie) interviews a range of interesting people who aren't famous. Although they lack fame or fortune that doesn't mean they aren't interesting, entertaining or just simply awesome.`,
    siteUrl: `https://anothertalk.show`,
    social: {
      twitter: `_ordianryhost`,
    },
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/posts`,
        name: `posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `post-images`,
        path: `${__dirname}/src/images/post-images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
        ],
      },
    },
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: `ADD YOUR TRACKING ID HERE`,
    //   },
    // },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
              }
            }
          }
        `,
        setup: options => ({
          ...options,
          link: 'https://anothertalk.show/',
          generator: 'Another Talk Show',
          copyright: 'Copyright 2019-2022 Stuart Mackenzie',
          language: 'en',
          custom_namespaces: {
            itunes: 'http://www.itunes.com/dtds/podcast-1.0.dtd',
          },
          custom_elements: [
            { 'itunes:author': 'Another Talk Show' },
            { 'itunes:explicit': 'false' },
            {
              'itunes:summary':
                "On Another Talk Show a fairly ordinary host (Stuart Mackenzie) interviews a range of interesting guests who aren't famous. Although they lack fame or fortune that doesn&apos;t mean they aren't interesting, entertaining or just simply awesome! Tune in and follow along.",
            },
            {
              'itunes:owner': [
                { 'itunes:name': 'Stuart Mackenzie' },
                { 'itunes:email': 'mail@hellostu.xyz' },
              ],
            },
            {
              'itunes:image': {
                _attr: {
                  href: 'https://anothertalk.show/ats_cover_art.png',
                },
              },
            },
            {
              'itunes:category': [
                {
                  _attr: {
                    text: 'Society &amp; Culture',
                  },
                },
              ],
            },
            {
              'itunes:category': [
                {
                  _attr: {
                    text: 'Arts',
                  },
                },
              ],
            },
            {
              'itunes:category': [
                {
                  _attr: {
                    text: 'News &amp; Politics',
                  },
                },
              ],
            },
          ],
        }),
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.nodes.map(node => {
                const episodeUrl = `${site.siteMetadata.siteUrl}/episode/${node.slug}`
                const episodeGuid = `ATS-${node.slug}`
                return Object.assign({}, node.frontmatter, {
                  title: node.frontmatter.title,
                  description: node.frontmatter.description,
                  date: node.frontmatter.date,
                  enclosure: {
                    url: node.frontmatter.episodeMp3,
                    size: node.frontmatter.episodeBytes,
                    type: 'audio/mpeg',
                  },
                  url: episodeUrl,
                  guid: episodeGuid,
                  custom_elements: [
                    { 'itunes:title': node.frontmatter.title },
                    { 'itunes:summary': node.frontmatter.description },
                    { 'itunes:episode': node.frontmatter.episodeNumber },
                    { 'itunes:duration': node.frontmatter.episodeSeconds },
                    { 'itunes:author': 'Another Talk Show' },
                  ],
                })
              })
            },
            query: `
            {
              allMdx(sort: { order: DESC, fields: frontmatter___date }) {
                nodes {
                  slug
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
                }
              }
            }
            `,
            output: '/podcast.xml',
            title: 'Another Talk Show',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/ats-logo.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
