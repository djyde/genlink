[![AhO39A.md.png](https://s2.ax1x.com/2019/04/07/AhO39A.md.png)](https://imgchr.com/i/AhO39A)

Generate redirect link (in static way)

## Install

```
$ npm i genlink -g

# or using in project only

$ npm i genlink --save-dev
```

## Usage

```json
// links.json
[
  {
    "name": "my-blog",
    "url": "https://lutaonan.com"
  },
  {
    "name": "my-github",
    "url": "https://github.com/djyde"
  }
]
```

And run:

```
$ genlink links.json
```

genlink will read the json file and generate static page at current word directory:

```
- my-blog
  - index.html
- my-github
  - index.html
```

When you host in a static server (like `localhost:3000`), you can access these url like:

```
http://localhost:3000/my-blog // redirect to https://lutaonan.com
http://localhost:3000/my-github // redirect to https://github.com/djyde
```

### permalink

```
$ genlink links.json --permalink /click
```

generate:

```
- click
  - my-blog
    - index.html
  - my-github
    - index.html
```

access by:

```
http://localhost:3000/click/my-blog // redirect to https://lutaonan.com
http://localhost:3000/click/my-github // redirect to https://github.com/djyde
```

# License

MIT License