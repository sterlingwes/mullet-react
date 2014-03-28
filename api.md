# ReactRenderer

Renders react components server-side.

****

## ReactRenderer.constructor()

*	*name* `String` representing component in dom (id)
*	*filepath* `String` to "entry.jsx"
*	*data* `Object` to initialize component props

****

## ReactRenderer.component()

Fetches the React component exposed at designated path

*	*returns* `Object` a React component / class

****

ReactRenderer.render() - returns html of react component

*	*data* `Object` (optional) to augment data with onRender