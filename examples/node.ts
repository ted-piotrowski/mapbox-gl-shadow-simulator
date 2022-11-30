import Simulator from 'mapbox-gl-shadow-simulator';
import { Map } from 'mapbox-gl';

const mapLoaded = (map: Map) => {
    return new Promise<void>((res, rej) => {
        function cb() {
            if (!map.loaded()) {
                return;
            }
            map.off("render", cb);
            res();
        }
        map.on("render", cb);
        cb();
    });
};

/* Mapbox setup */
const accessToken = 'pk.eyJ1IjoidHBwaW90cm93c2tpIiwiYSI6ImNsNGVpdzMxYzAzenUzb28zYXZ4MXdlc2EifQ.M4IHx7SY0Wv5Zt6xzvKeBQ';
const map = new Map({
    container: 'mapid',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: { lng: -122.18578164139899, lat: 47.694878957368815 },
    zoom: 8, // starting zoom
    accessToken,
});
/* End Mapbox setup */

/* ShadeMap setup */
const loaderEl = document.getElementById('loader') as HTMLElement;
let now = new Date(1633358583454);
let shadeMap: Simulator;
map.on('load', () => {
    shadeMap = new Simulator({
        apiKey: "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRwcGlvdHJvd3NraUBzaGFkZW1hcC5hcHAiLCJjcmVhdGVkIjoxNjYyNDkzMDY2Nzk0LCJpYXQiOjE2NjI0OTMwNjZ9.ovCrLTYsdKFTF6TW3DuODxCaAtGQ3qhcmqj3DWcol5g",
        date: now,
        color: '#01112f',
        opacity: 0.7,
        terrainSource: {
            maxZoom: 15,
            tileSize: 256,
            getSourceUrl: ({ x, y, z }) => `https://s3.amazonaws.com/elevation-tiles-prod/terrarium/${z}/${x}/${y}.png`,
            getElevation: ({ r, g, b, a }) => (r * 256 + g + b / 256) - 32768,
        },
        getFeatures: async () => {
            await mapLoaded(map);
            const buildingData = map.querySourceFeatures('composite', { sourceLayer: 'building' }).filter((feature) => {
                return feature.properties && feature.properties.underground !== "true" && (feature.properties.height || feature.properties.render_height)
            });
            return buildingData;
        },
        debug: (msg) => { console.log(new Date().toISOString(), msg) }
    }).addTo(map);

    shadeMap.on('tileloaded', (loadedTiles, totalTiles) => {
        loaderEl.innerText = `Loading: ${(loadedTiles / totalTiles * 100).toFixed(0)}%`;
    });

    // sometime later
    shadeMap.remove();
});
/* End ShadeMap setup */

/* Controls setup */
let intervalTimer: number;

const increment = document.getElementById('increment') as HTMLButtonElement;
const decrement = document.getElementById('decrement') as HTMLButtonElement;
const play = document.getElementById('play') as HTMLButtonElement;
const stop = document.getElementById('stop') as HTMLButtonElement;
const exposure = document.getElementById('exposure') as HTMLInputElement;

increment.addEventListener('click', () => {

    now = new Date(now.getTime() + 3600000);
    shadeMap && shadeMap.setDate(now);
}, false);

decrement.addEventListener('click', () => {
    now = new Date(now.getTime() - 3600000);
    shadeMap && shadeMap.setDate(now);
}, false);

play.addEventListener('click', () => {
    intervalTimer = setInterval(() => {
        now = new Date(now.getTime() + 60000);
        shadeMap && shadeMap.setDate(now);
    }, 100);
});

stop.addEventListener('click', () => {
    clearInterval(intervalTimer);
});

exposure.addEventListener('click', (e) => {
    clearInterval(intervalTimer);
    const target = e.target as HTMLInputElement;
    if (!target.checked) {
        shadeMap && shadeMap.setShowExposure(false);
        increment.disabled = false;
        decrement.disabled = false;
        play.disabled = false;
        stop.disabled = false;
    } else {
        shadeMap && shadeMap.setShowExposure(true);
        increment.disabled = true
        decrement.disabled = true;
        play.disabled = true;
        stop.disabled = true;
    }
})
/* End controls setup */
