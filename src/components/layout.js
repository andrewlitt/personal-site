import React from "react"
import styled from "styled-components"
import { ThemeToggler } from 'gatsby-plugin-dark-mode'

import { rhythm } from "../utils/typography"
 
class Layout extends React.Component {
  render() {
    const { children } = this.props

  
    return (
      <ThemeToggler>
        {({ theme, toggleTheme }) => (
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
              <div>
                <a target="_blank" rel="noopener noreferrer" href="mailto:andrew.litt@queensu.ca">email</a> •
                <a target="_blank" rel="noopener noreferrer" href="https://ca.linkedin.com/in/littandrew"> linkedin</a> •
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/andrewlitt"> github</a>
              </div>
              <label class="switch">
                <input 
                  type="checkbox"
                  onChange={e => toggleTheme(e.target.checked ? 'dark' : 'light')}
                  checked={theme === 'dark'}
                />
                <span class="slider round"></span>
              </label>
            </Footer>
        </Wrapper>
        )}
      </ThemeToggler>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 24px;
`

export default Layout
