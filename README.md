# Chicago Horrors

Thanks for taking the time to review this project!

I realize the challenge intended to take 4-6 hours but it's probably clear I spent far longer on it, but I'm proud of the result. Given another day I would have fleshed out the tests. They're definitely a weakpoint in my skills, but it's mostly because lack of a testing culture in prior companies.

Spinning it up should be pretty simple. Vue CLI does an incredible job. The available commands are listed below.

I used [CodyHouse](https://codyhouse.co/) for a design system (not utilizing the components). The colors are from [Colormind.io](http://colormind.io/) though I've used them before on my [CodePen](https://codepen.io/PatrickKennedy), check it out!

## Todo

No project is complete with something left todo. These are a non-exhaustive list of things I would improve

- Focus search on load
- Track autocomplete selection scroll on arrow keys
- Animate autocomplete box
- link to a query for specific fields, notably the license to see other inspections for that buisness
- Make text selectable in SearchResult
- Tighten up the data display in the search results
- Tests, obviously, there's some fairly complex behavior in the search form that I'm sure has some failure states, but I'm a master of manual testing

## Project setup

```sh
yarn install
```

### Compiles and hot-reloads for development

```sh
yarn serve
```

### Compiles and minifies for production

```sh
yarn build
```

### Run your unit tests

```sh
yarn test:unit
```

### Run your end-to-end tests

```sh
yarn test:e2e
```

### Lints and fixes files

```sh
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
