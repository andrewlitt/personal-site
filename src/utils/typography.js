import Typography from "typography"
import BootstrapTheme from "typography-theme-bootstrap"

BootstrapTheme.overrideThemeStyles = () => {
  return {
    "a.gatsby-resp-image-link": {
      boxShadow: `none`,
    },
    "li,p": {
      fontFamily: 'Cabin',
    },
    "h1,h2,h3,h4,h5,h6": {
      fontFamily: 'FuturaLT'
    },
    "a": {
      textDecoration: 'none'
    }
  }
}

delete BootstrapTheme.googleFonts

const typography = new Typography(BootstrapTheme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
