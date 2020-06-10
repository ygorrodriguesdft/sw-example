var h3 = document.createElement('h3')
var ul = document.createElement('ul')
var node = document.createElement('li')
var text = document.createTextNode('Lorem')

ul.appendChild(node)
node.appendChild(text)

document.getElementById('main').appendChild(h3)
document.getElementById('main').appendChild(ul)