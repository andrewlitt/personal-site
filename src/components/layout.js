import React from "react"
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { fab } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from "styled-components"

import { rhythm } from "../utils/typography"

library.add(fab);

class Layout extends React.Component {
  render() {
    const { children } = this.props

  
    return (
      <Wrapper>
        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm(24),
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
        >
          <main>{children}</main>
        </div>
        <Footer>
          <a href="mailto:andrew.litt@queensu.ca">email</a> •
          <a href="https://ca.linkedin.com/in/littandrew"> linkedin</a> •
          <a href="https://github.com/andrewlitt"> github</a>
        </Footer>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Footer = styled.footer`
  text-align: center;
  margin: 24px;
`

export default Layout
