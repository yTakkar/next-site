
const {
  PHASE_PRODUCTION_BUILD
} = require('next/constants')

module.exports = (phase) => {
  return {
    target: 'serverless',
    assetPrefix: phase === PHASE_PRODUCTION_BUILD ? '/learn' : ''
  }
}