import { Plugin } from 'vite'
import fs from 'fs'
// manifest.json无法import，只能用fs读入
// const manifest = require('manifest')
// import * as manifest from './manifest'

// 获取calculateStatements.js的文件名，并写入manifest.json
export default function transformManifestPlugin (): Plugin {
  return {
    name: 'vite:transform-manifest-plugin',
    writeBundle (options, bundle) {
      const destName = 'dist'

      const writeManifest = (moduleJSName, manifest) => {
        console.log('moduleJSName', moduleJSName)
        console.log('web', manifest.web_accessible_resources)
        manifest.web_accessible_resources[1].resources[0] = moduleJSName
        const content = JSON.stringify(manifest, null, '  ')
        fs.writeFile(
          `${destName}/manifest.json`,
          content,
          'utf-8',
          (err) => console.log('error write::', err),
        )
      }

      fs.readFile('./manifest.json', { flag: 'r', encoding: 'utf-8' }, (err, dat) => {
        if (err) {
          console.error('error read::', err)
          return
        }
        const manifest = JSON.parse(dat)
        Object.keys(bundle).forEach((fileName) => {
          if (fileName.indexOf('calculateStatements') === -1) return
          writeManifest(fileName, manifest)
        })
      })
    },
  }
}
