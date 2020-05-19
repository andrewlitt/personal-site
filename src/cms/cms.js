import CMS from "netlify-cms-app"
import typography from '../utils/typography'

CMS.registerPreviewStyle(typography.toString(), { raw: true })
console.log(typography.toString())