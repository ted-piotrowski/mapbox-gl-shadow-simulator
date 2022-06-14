# mapbox-gl-shade-layer

## Download

[unpkg CDN](https://unpkg.com/mapbox-gl-shade-layer/dist/mapbox-gl-shade-layer.umd.min.js)

## Installation

In a browser:

`<script src="mapbox-gl-shade-layer.umd.min.js"></script>`

Using npm:

`npm i mapbox-gl-shade-layer --save`

## Usage

```javascript
const map = new mapboxgl.Map({
  // mapboxgl Map options
  // ... 
});

map.on('load', () => {
  const shadeMap = new ShadeMap({
    date: new Date(), // display shadows for current date
    apiKey: "XXX",    // obtain from https://shademap.app/about/
  }).addTo(map);

  // advance shade by 1 hour
  shadeMap.setDate(new Date(Date.now() + 1000 * 60 * 60)); 
});
```

Using Node.js:

```javascript
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import ShadeLayer from 'mapbox-gl-shade-layer';

const map = new mapboxgl.Map({
  // mapboxgl Map options
  // ... 
});

map.on('load', () => {
  const shadeMap = new ShadeMap({
    date: new Date(), // display shadows for current date
    apiKey: "XXX",    // obtain from https://shademap.app/about/
  }).addTo(map);

  // advance shade by 1 hour
  shadeMap.setDate(new Date(Date.now() + 1000 * 60 * 60)); 
});
```

### Constructor options

Property name | Type | Default value | Comment
--- | :---: | :---:
`date` | `Date` | `Date.now()` |
`color` | `String` | `#000` | 3 or 6 digit hexadecimal number
`opacity` | `Number` | `0.3`
`maxZoom` | `Number` | `15` | Max zoom for custom DEM tile source
`tileSize` | `Number` | `256` | Tile size for custom DEM tile source
`apiKey` | `String` | `''` | See [https://shademap.app/about/](https://shademap.app/about/)

### Available functions

`setDate(date: Date)` - update shade layer to reflect new date

`setColor(color: String)` - change shade color

`setOpacity(opacity: Number)` - change shade opacity

