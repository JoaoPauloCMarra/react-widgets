![react widgets](https://github.com/JoaoPauloCMarra/react-widgets/actions/workflows/main.yml/badge.svg)

# React Widgets

boilerplate for future embeddable widgets

### TODO

Add more features

### Using

`yarn install` to install dependencies

`yarn dev` - starts locla server (http://localhost:3000/?widget=widget1)

`yarn build` - builds the workspace code

`yarn test` - tests the workspace code

`yarn lint` - lints the workspace code



try different themes in the browser console:
```js
// demo_token_theme1 | demo_token_theme2 | demo_token_theme3
new window.ReactWidget({widget: 'demo-widget', language: 'en', token: 'demo_token_theme3'}).reload();
```