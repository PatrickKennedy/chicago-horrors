const path = require('path')
const { _load, Module } = require('module')

exports.before = config => {
  const root = path.resolve('.')
  if (!config.alias) return

  Module._load = (requestString, ...rest) => {
    const alias = findAlias(requestString, config.alias)
    const aliasPath = config.alias[alias]
    const normalizedRequest = requestString.replace(alias, aliasPath)
    if (alias) {
      return _load(path.join(root, normalizedRequest), ...rest)
    } else {
      return _load(requestString, ...rest)
    }
  }
}

function findAlias(requestString, aliases) {
  return Object.keys(aliases).find(alias => {
    const regex = new RegExp(`^${alias}/`)
    return requestString.match(regex)
  })
}
