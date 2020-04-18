import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"

class IndexPage extends React.Component {
  render() {

    return (
      <Layout >
        <SEO
          title="Home"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <Profile src="./profile.png" alt="Gatsby Scene" />
        <h1>
          <center>Hi, I'm Andrew</center>
        </h1>

        <p>Toronto native, Queen's grad. Carved an internet corner for posts and projects.</p>
        <Link to="/blog/">
          <center>Go to Blog</center>
        </Link>
      </Layout>
    )
  }
}

const Profile = styled.img`
  display: block;
  margin: 0 auto;
  width: 100px;
`

export default IndexPage
