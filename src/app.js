const style = require('./style.css');
import {
  json
} from 'd3-request';
import {
  select,
  selectAll
} from 'd3-selection';
import {
  geoPath,
  geoEquirectangular
} from 'd3-geo';

const width = 1000;
const height = 425;

const path = geoPath()
  .projection(geoEquirectangular());

const svg = select('#my-map')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

json('./globe.geo.json', (json) => {
  const countriesGroup = svg
    .append('g')
    .attr('id', 'map');

  countriesGroup
    .append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', width)
    .attr('height', height);

  const countries = countriesGroup
    .selectAll('path')
    .data(json.features)
    .enter()
    .append('path')
    .attr('d', path)
    .attr('id', (d) => `country ${d.properties.iso_a3}`)
    .attr('class', 'country');
});
