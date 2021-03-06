import React, { useLayoutEffect } from 'react'
import { graphql } from 'gatsby'

import SEO from '../../components/SEO'
import Layout from '../../layouts/index'

const Team = (props) => {
  const teams = props.data.allMarkdownRemark.edges

  useLayoutEffect(() => {
    const teamContent = document.querySelectorAll('.team-content')
    teamContent.forEach((element) => {
      if (element.clientHeight > 400) {
        element.classList.add('overflow-hidden')
      }
    })
  })

  return (
    <Layout bodyClass='page-teams'>
      <SEO title='Team' />
      <div className='intro'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <h1>Meet The Team</h1>
              <p>
                Our team of qualified accountants and financial consultants can
                help your business at any stage of it’s growth.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='container pb-6'>
        <div className='row'>
          {!process.env.GATSBY_HIDE_TEAMS &&
            teams.map((edge) => (
              <div
                key={edge.node.frontmatter.path}
                className='col-12 col-md-6 mb-1'
              >
                <div className='team card-two'>
                  <div className='card-header'>
                    <div className='card-header-left'>
                      {edge.node.frontmatter.image && (
                        <div className='card-image'>
                          <img
                            alt={edge.node.frontmatter.title}
                            className='img-fluid mb-2'
                            src={edge.node.frontmatter.image}
                          />
                        </div>
                      )}
                    </div>
                    <div className='card-right'>
                      <h2 className='card-title'>
                        {edge.node.frontmatter.title}
                      </h2>
                      <ul className='card-meta'>
                        <li>
                          <strong>{edge.node.frontmatter.jobtitle}</strong>
                        </li>
                        <li>
                          <a
                            target='_blank'
                            href={edge.node.frontmatter.linkedinurl}
                            rel='noreferrer'
                          >
                            Linkedin
                          </a>
                        </li>
                        <li>
                          <a href={`mailto:${edge.node.frontmatter.email}`}>
                            {edge.node.frontmatter.email}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div
                    id={edge.node.frontmatter.name.replace(/\W/g, '_')}
                    className='team-content'
                    dangerouslySetInnerHTML={{ __html: edge.node.html }}
                  />
                  <div className='see-more pt-3'>
                    <button
                      type='button'
                      className='btn btn-link'
                      onClick={() => {
                        document
                          .querySelector(
                            '#' + edge.node.frontmatter.name.replace(/\W/g, '_')
                          )
                          .classList.remove('overflow-hidden')
                      }}
                    >
                      See more...
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query TeamQuery {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/team/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          html
          frontmatter {
            name
            path
            image
            jobtitle
            linkedinurl
            email
          }
        }
      }
    }
  }
`

export default Team
