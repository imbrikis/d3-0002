import { nodes, links, MANY_BODY_STRENGTH } from './data.js'

import {
  forceSimulation,
  forceManyBody,
  forceLink,
  forceCenter,
  select,
  drag,
} from 'https://unpkg.com/d3?module'

const svg = select('#container')
const width = +svg.attr('width')
const height = +svg.attr('height')
const centerX = width / 2
const centerY = height / 2

const simulation = forceSimulation(nodes)
  .force('charge', forceManyBody().strength(MANY_BODY_STRENGTH))
  .force(
    'link',
    forceLink(links).distance((link) => link.distance)
  )
  .force('center', forceCenter(centerX, centerY))

const dragInteraction = drag().on('drag', (event, node) => {
  node.fx = event.x
  node.fy = event.y
  simulation.alpha(1)
  simulation.restart()
})

const lines = svg
  .selectAll('line')
  .data(links)
  .enter()
  .append('line')
  .attr('stroke', (link) => link.color || 'black')

const circles = svg
  .selectAll('circle')
  .data(nodes)
  .enter()
  .append('circle')
  .attr('fill', (node) => node.color || 'gray')
  .attr('r', (node) => node.size)
  .call(dragInteraction)

const text = svg
  .selectAll('text')
  .data(nodes)
  .enter()
  .append('text')
  .attr('text-anchor', 'middle')
  .attr('alignment-baseline', 'middle')
  .style('pointer-events', 'none')
  .text((node) => node.id)

simulation.on('tick', () => {
  circles.attr('cx', (node) => node.x).attr('cy', (node) => node.y)
  text.attr('x', (node) => node.x).attr('y', (node) => node.y)
  lines
    .attr('x1', (link) => link.source.x)
    .attr('y1', (link) => link.source.y)
    .attr('x2', (link) => link.target.x)
    .attr('y2', (link) => link.target.y)
})
