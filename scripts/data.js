import { colors } from './colors.js'

export const nodes = []
export const links = []

const MAIN_NODE_SIZE = 40
const CHILD_NODE_SIZE = 15
const LEAF_NODE_SIZE = 5
const DEFAULT_DISTANCE = 60
const MAIN_NODE_DISTANCE = 200
const LEAF_NODE_DISTANCE = 40
export const MANY_BODY_STRENGTH = -20

let i = 0
const addMainNode = (node) => {
  node.size = MAIN_NODE_SIZE
  node.color = colors[i++][1]
  nodes.push(node)
}

const addChildNode = (
  parentNode,
  childNode,
  size = CHILD_NODE_SIZE,
  distance = DEFAULT_DISTANCE
) => {
  childNode.size = size
  childNode.color = parentNode.color
  nodes.push(childNode)
  links.push({
    source: parentNode,
    target: childNode,
    distance: distance,
    color: parentNode.color,
  })
}

const assembleChildNode = (parentNode, id, subChildCount = 10) => {
  let childNode = { id }
  addChildNode(parentNode, childNode, 20)

  for (let i = 0; i < subChildCount; i++) {
    addChildNode(childNode, { id: '' }, LEAF_NODE_SIZE, LEAF_NODE_DISTANCE)
  }
}

const linkMainNodes = (source, target) => {
  links.push({
    source,
    target,
    distance: MAIN_NODE_DISTANCE,
    color: source.color,
  })
}

const korn = { id: 'Korn' }
addMainNode(korn)
assembleChildNode(korn, 'Self Titled', 11)
assembleChildNode(korn, 'Life Is Peachy', 14)
assembleChildNode(korn, 'Follow The Leader', 14)
assembleChildNode(korn, 'Issues', 16)

const trst = { id: 'TR/ST' }
addMainNode(trst)
assembleChildNode(trst, 'trst', 11)
assembleChildNode(trst, 'Joyland', 11)
assembleChildNode(trst, 'Destroyer Pt 1', 8)
assembleChildNode(trst, 'Destroyer Pt 2', 8)

const ohgr = { id: 'Ohgr' }
addMainNode(ohgr)
assembleChildNode(ohgr, 'Welt', 11)
assembleChildNode(ohgr, 'SunnyPsyop', 13)
assembleChildNode(ohgr, 'Devils In My Details', 11)
assembleChildNode(ohgr, 'Undeveloped', 13)

const apc = { id: 'A Perfect Circle' }
addMainNode(apc)
assembleChildNode(apc, 'Mer De Noms', 12)
assembleChildNode(apc, 'Thirteenth Step', 12)
assembleChildNode(apc, 'Emotive', 12)

linkMainNodes(korn, trst)
linkMainNodes(korn, ohgr)
linkMainNodes(korn, apc)
linkMainNodes(trst, ohgr)
linkMainNodes(trst, apc)
linkMainNodes(ohgr, apc)
