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
}

const tpl = url => `<html>
  <head>
    <script>window.location.replace('${url}')</script>
    </script>
  </head>
  <body></body>
</html>
`

export default async function main (options: Options) {
  const templates = options.links.map(link => ({
    name: link.name,
    htmlString: tpl(link.url)
  }))

  const permalink = options.permalink || '/'
  const outDirRoot = options.outDir || process.cwd()
  const outDir = path.join(outDirRoot, permalink)
  // create path
  await fs.ensureDir(outDir)
  console.log('created root')

  try {
    await Promise.all(templates.map(async template => {
      await fs.remove(path.resolve(outDir, './', template.name))
      await fs.ensureDir(path.resolve(outDir, './', template.name))
      await fs.writeFile(path.resolve(outDir, './', template.name, 'index.html'), template.htmlString)
    }))
  } catch (e) {
    console.log(e)
  }

  console.log('done')
}
