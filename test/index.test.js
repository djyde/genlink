const genlink = require('../lib').default
const path = require('path')
const FileTest = require('file-test')

const links = [
  { name: 'ipad-stand', url: 'https://s.click.taobao.com/t?e=m%3D2%26s%3DzMZiBrdrox8cQipKwQzePOeEDrYVVa64K7Vc7tFgwiHjf2vlNIV67h%2BBSz1gPNNWjGYPrSmetxFAX0UUc668w4h4CLmz7ZZfkO9%2Fu9Rzs9OtOrao8HiQtTm4dTnHfFFyU8ZKQE7t2GXD%2BWLkuUouBraneDNtLnkj1ILY1jDapqE%3D&pvid=12_60.186.191.103_3168_1554635764641' }
]

describe('genlink', () => {

  const tmpDir = path.resolve(__dirname , './tmp')

  test('should generate html at /tmp', async () => {

    await genlink({
      links,
      outDir: tmpDir,
    })

    const ft = new FileTest(tmpDir)

    expect(ft.includeFile('ipad-stand/index.html'))

    expect(ft.readFile('ipad-stand/index.html')).toEqual(`<html>
  <head>
    <script>window.location.replace('${links[0].url}')</script>
    </script>
  </head>
  <body></body>
</html>
`)
  })
})