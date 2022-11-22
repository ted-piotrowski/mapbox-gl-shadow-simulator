import { MapboxGeoJSONFeature } from 'mapbox-gl';

interface TerrainSource {
    maxZoom: number;
    tileSize: number;
    getSourceUrl: (params: {
        x: number;
        y: number;
        z: number;
    }) => string;
    getElevation: (params: {
        r: number;
        g: number;
        b: number;
        a: number;
    }) => number;
}

interface ShadeMapOptions {
    date?: Date;
    color?: string;
    opacity?: number;
    terrainSource?: TerrainSource;
    getFeatures?: () => MapboxGeoJSONFeature[];
    apiKey: string;
    debug?: (msg: string) => void;
}

declare class export_default extends ShadeMap {
    constructor(options: ShadeMapOptions);
    setDate(date: Date): this;
    setColor(color: string): this;
    setOpacity(opacity: number): this;
    readPixel(x: number, y: number): Uint8Array;
}

export { export_default as default };
