# mapbox-gl-shadow-simulator

Shadow simulator for Mapbox GL JS and MapLibre GL JS. Visualize sunlight and shadow on a map for any date and time of year.

[![Mapbox GL Shadow Simulator demo](/demo.jpg)](https://ted-piotrowski.github.io/mapbox-gl-shadow-simulator/examples/map.html)

[Mapbox GL JS Demo](https://ted-piotrowski.github.io/mapbox-gl-shadow-simulator/examples/map.html) | [Maplibre GL Demo](https://ted-piotrowski.github.io/mapbox-gl-shadow-simulator/examples/maplibre.html)

## Download

[unpkg CDN](https://unpkg.com/mapbox-gl-shadow-simulator/dist/mapbox-gl-shadow-simulator.umd.min.js)

## Installation

In a browser:

`<script src="https://unpkg.com/mapbox-gl-shadow-simulator/dist/mapbox-gl-shadow-simulator.umd.min.js"></script>`

Using npm:

`npm i mapbox-gl-shadow-simulator --save`

## Usage

In a browser:

```html
<script src='https://api.mapbox.com/mapbox-gl-js/v2.8.2/mapbox-gl.js'></script>
<link href='https://api.mapbox.com/mapbox-gl-js/v2.8.2/mapbox-gl.css' rel='stylesheet' />
<script src="https://unpkg.com/mapbox-gl-shadow-simulator/dist/mapbox-gl-shadow-simulator.umd.min.js"></script>
<script>
  const map = new mapboxgl.Map({
    // mapboxgl Map options
    // ... 
  });

  map.on('load', () => {
    const shadeMap = new ShadeMap({
      date: new Date(),    // display shadows for current date
      color: '#01112f',    // shade color
      opacity: 0.7,        // opacity of shade color
      apiKey: "XXXXXX",    // obtain from https://shademap.app/about/
      terrainSource: {
        tileSize: 256,       // DEM tile size
        maxZoom: 15,         // Maximum zoom of DEM tile set
        getSourceUrl: ({ x, y, z }) => {
          // return DEM tile url for given x,y,z coordinates
          return `https://s3.amazonaws.com/elevation-tiles-prod/terrarium/${z}/${x}/${y}.png`
        },
        getElevation: ({ r, g, b, a }) => {
          // return elevation in meters for a given DEM tile pixel
          return (r * 256 + g + b / 256) - 32768
        }
      },
      debug: (msg) => { console.log(new Date().toISOString(), msg) },
    }).addTo(map);

    // advance shade by 1 hour
    shadeMap.setDate(new Date(Date.now() + 1000 * 60 * 60)); 

    // sometime later...
    // ...remove layer
    shadeMap.remove();
  });
</script>
```

Using Node.js:

```javascript
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import ShadeMap from 'mapbox-gl-shadow-simulator';

const map = new mapboxgl.Map({
  // mapboxgl Map options
  // ... 
});

map.on('load', () => {
  const shadeMap = new ShadeMap({
    date: new Date(),    // display shadows for current date
    color: '#01112f',    // shade color
    opacity: 0.7,        // opacity of shade color
    apiKey: "XXXXXX",    // obtain from https://shademap.app/about/
    terrainSource: {
      tileSize: 256,       // DEM tile size
      maxZoom: 15,         // Maximum zoom of DEM tile set
      getSourceUrl: ({ x, y, z }) => {
        // return DEM tile url for given x,y,z coordinates
        return `https://s3.amazonaws.com/elevation-tiles-prod/terrarium/${z}/${x}/${y}.png`
      },
      getElevation: ({ r, g, b, a }) => {
        // return elevation in meters for a given DEM tile pixel
        return (r * 256 + g + b / 256) - 32768
      }
    },
    debug: (msg) => { console.log(new Date().toISOString(), msg) },
  }).addTo(map);

  // advance shade by 1 hour
  shadeMap.setDate(new Date(Date.now() + 1000 * 60 * 60)); 

  // sometime later
  // ...remove layer
  shadeMap.remove();
});
```

### Constructor options

Property name | Type | Default value | Comment
:--- | :--- | :--- | :---
`apiKey` | `String` | `''` | See [https://shademap.app/about/](https://shademap.app/about/)
`date` | `Date` | `new Date()` | Sun's position in the sky is based on this date
`color` | `String` | `#000` | 3 or 6 digit hexadecimal number
`opacity` | `Number` | `0.3`
`sunExposure` | `Object` | See [sunExposure](#sunExposure) | Display sun exposure for provided date range 
`terrainSource` | `Object` | See [terrainSource](#terrainsource) | Specify DEM or DSM tiles containing terrain elevation data
`getFeatures` | `Function` | See [getFeatures](#getfeatures) | Returns GeoJSON of objects, such as buildings, to display on the map

#### terrainSource

An object describing a DEM tile set to use for terrain shadows

Property name | Type | Default value | Comment
:--- | :--- | :--- | :---
`maxZoom` | `Number` | `15` | Max zoom for custom DEM tile source
`tileSize` | `Number` | `256` | Tile size for custom DEM tile source
`sourceUrl` | `Function` | `Returns tile encoding 0m elevation for all locations` | Returns url of DEM tile for given `(x, y, z)` coordinate
`getElevation` | `Function` | `return (r * 256 + g + b / 256) - 32768` | Returns elevation in meters for each (r,g,b,a) pixel of DEM tile

#### sunExposure

An object describing sun exposure settings
Property name | Type | Default value | Comment
:--- | :--- | :--- | :---
`enabled` | `Boolean` | `false` | Should sun exposure be displayed
`startDate` | `Date` | `new Date()` | Start date of sun exposure time interval
`endDate` | `Date` | `new Date()` | End date of sun exposure time interval
`iterations` | `number` | `32` | Number of discrete chunks to calculate shadows for between startDate and endDate. A larger number will provide more detail but take longer to compute.


##### Open Data on AWS for terrainSource

A global dataset providing bare-earth terrain heights, tiled for easy usage and provided on S3 - [More info](https://registry.opendata.aws/terrain-tiles/)

```javascript
{
  tileSize: 256,
  maxZoom: 15,
  getSourceUrl: ({x, y, z}) => {
    return `https://s3.amazonaws.com/elevation-tiles-prod/terrarium/${z}/${x}/${y}.png`;
  },
  getElevation: ({r, g, b, a}) => {
    return (r * 256 + g + b / 256) - 32768;
  }
}
```

##### Mapbox Terrain DEM V1 for terrainSource

Mapbox Terrain-DEM v1 is a Mapbox-provided raster tileset is a global elevation layer. This tileset contains raw height values in meters in the Red, Green, and Blue channels of PNG tiles that can be decoded to raw heights in meters - [More info](https://docs.mapbox.com/data/tilesets/reference/mapbox-terrain-dem-v1/) 

```javascript
{
  tileSize: 514,
  maxZoom: 14,
  getSourceUrl: ({x, y, z}) => {
    const subdomain = ['a', 'b', 'c', 'd'][(x + y) % 4];
    return `https://${subdomain}.tiles.mapbox.com/raster/v1/mapbox.mapbox-terrain-dem-v1/${z}/${x}/${y}.webp?sku=101wuwGrczDtH&access_token=${MAPBOX_API_KEY}`;
  },
  getElevation: ({r, g, b, a}) => {
    return -10000 + ((r * 256 * 256 + g * 256 + b) * .1);
  }
}
```

##### Maptiler Terrain RGB v2

[More info](https://cloud.maptiler.com/tiles/terrain-rgb-v2/)

```javascript
{
  tileSize: 514,
  maxZoom: 12,
  getSourceUrl: ({x, y, z}) => {
    return `https://api.maptiler.com/tiles/terrain-rgb-v2/${z}/${x}/${y}.webp?key=${MAPTILER_KEY}`;
  },
  getElevation: ({r, g, b, a}) => {
    return -10000 + ((r * 256 * 256 + g * 256 + b) * .1);
  }
}
```

#### getFeatures

Returns a GeoJSON collection of features whose shadows will be displayed on the map. Currently only supports `Polygon` and `MultiPolygon`.

##### Extracting buildings from Mapbox vector tiles

```javascript
getFeatures: () => {
  // wait for map.loaded() to ensure all vector tile data downloaded
  const buildingData = map.querySourceFeatures('composite', { sourceLayer: 'building' }).filter((feature) => {
    return feature.properties && feature.properties.underground !== "true" && (feature.properties.height || feature.properties.render_height)
  });
  return buildingData;
},
```

### Available functions

`setDate(date: Date)` - update shade layer to reflect new `date`

`setColor(color: String)` - change shade color

`setOpacity(opacity: Number)` - change shade opacity

`setSunExposure(enabled: Boolean, options: SunExposureOptions)` - toggle between shadows and sun exposure mode

`getHoursOfSun(x: Number, y: Number)` - if sun exposure mode enabled, returns the hours of sunlight for a given pixel on the map

`remove()` - remove the layer from the map
