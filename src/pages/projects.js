import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

class IndexPage extends React.Component {
  render() {

    return (
      <Layout >
        <SEO
          title="Projects"
          keywords={[`projects`, `gatsby`, `javascript`, `react`]}
        />
        <h1>
          <center>Projects</center>
        </h1>

        <p>There's nothing here yet.</p>
        <Link to="/">
          <center>Go Home</center>
        </Link>
      </Layout>
    )
  }
}

export default IndexPage
