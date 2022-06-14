# mapbox-gl-shade-layer

![Mapbox Shade Layer demo](/demo.gif)

[Live Demo](https://ted-piotrowski.github.io/mapbox-gl-shade-layer/examples/map.html)

## Download

[unpkg CDN](https://unpkg.com/mapbox-gl-shade-layer/dist/mapbox-gl-shade-layer.umd.min.js)

## Installation

In a browser:

`<script src="mapbox-gl-shade-layer.umd.min.js"></script>`

Using npm:

`npm i suncalc mapbox-gl-shade-layer --save`

## Usage

In a browser:

```html
<script src='https://api.mapbox.com/mapbox-gl-js/v2.8.2/mapbox-gl.js'></script>
<link href='https://api.mapbox.com/mapbox-gl-js/v2.8.2/mapbox-gl.css' rel='stylesheet' />
<script src="mapbox-gl-shade-layer.umd.min.js"></script>
<script>
  const map = new mapboxgl.Map({
    // mapboxgl Map options
    // ... 
  });

  map.on('load', () => {
    const shadeMap = new ShadeMap({
      date: new Date(),    // display shadows for current date
      apiKey: "XXXXXX",    // obtain from https://shademap.app/about/
    }).addTo(map);

    // advance shade by 1 hour
    shadeMap.setDate(new Date(Date.now() + 1000 * 60 * 60)); 
  });
</script>
```

Using Node.js:

```javascript
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import ShadeMap from 'mapbox-gl-shade-layer';

const map = new mapboxgl.Map({
  // mapboxgl Map options
  // ... 
});

map.on('load', () => {
  const shadeMap = new ShadeMap({
    date: new Date(),    // display shadows for current date
    apiKey: "XXXXXX",    // obtain from https://shademap.app/about/
  }).addTo(map);

  // advance shade by 1 hour
  shadeMap.setDate(new Date(Date.now() + 1000 * 60 * 60)); 
});
```

### Constructor options

Property name | Type | Default value | Comment
:--- | :--- | :--- | :---
`date` | `Date` | `new Date()` |
`color` | `String` | `#000` | 3 or 6 digit hexadecimal number
`opacity` | `Number` | `0.3`
`maxZoom` | `Number` | `15` | Max zoom for custom DEM tile source
`tileSize` | `Number` | `256` | Tile size for custom DEM tile source
`apiKey` | `String` | `''` | See [https://shademap.app/about/](https://shademap.app/about/)

### Available functions

`setDate(date: Date)` - update shade layer to reflect new date

`setColor(color: String)` - change shade color

`setOpacity(opacity: Number)` - change shade opacity

