function Element(tagName, props, children) {
  this.tagName = tagName
  this.props = props
  this.children = children
}

Element.prototype.render = function() {
  var el = document.createElement(this.tagName)
  var props = this.props

  for (var propName in props) {
    var propValue = props[propName]
    el.setAttribute(propName, propValue)
  }

  var children = this.children || []
  children.forEach(function(child) {
    var childEl = (child instanceof Element)
      ? child.render()
      : document.createTextNode(child)

    el.appendChild(childEl)
  })

  return el
}

function el(tagName, props, children) {
  return new Element(tagName, props, children)
}

var ul = el('ul', {id: 'list'}, [
  el('li', {class: 'item'}, ['Item 1']),
  el('li', {class: 'item'}, ['Item 2']),
  el('li', {class: 'item'}, ['Item 3']),
])

function test() {
  console.info('test')
  var ulRoot = ul.render()
  console.info({ulRoot})
  document.body.appendChild(ulRoot)
}
