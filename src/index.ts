const path = require('path')
const fs = require('fs-extra')

type Link = {
  name: string,
  url: string
}

type Options = {
  links: Link[],
  permalink?: string,
  outDir?: string,
  legacy?: boolean
}

const legacyTpl = url => `<html>
  <head>
    <script>window.location.replace('${url}')</script>
    </script>
  </head>
  <body></body>
</html>
`

const tpl = url => `<meta http-equiv="refresh" content="0; url='${url}'">`

export default async function main (options: Options) {

  const permalink = options.permalink || '/'
  const outDirRoot = options.outDir || process.cwd()
  const outDir = path.join(outDirRoot, permalink)
  const isLegacy = options.legacy === true

  console.log(isLegacy)

  const templates = options.links.map(link => ({
    name: link.name,
    htmlString: isLegacy ? legacyTpl(link.url) : tpl(link.url)
  }))

  await fs.ensureDir(outDir)

  try {
    await Promise.all(templates.map(async template => {
      await fs.remove(path.resolve(outDir, './', template.name))
      await fs.ensureDir(path.resolve(outDir, './', template.name))
      await fs.writeFile(path.resolve(outDir, './', template.name, 'index.html'), template.htmlString)
    }))
  } catch (e) {
    console.log(e)
  }
}
