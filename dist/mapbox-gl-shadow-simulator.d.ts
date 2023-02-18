import { Map, MapboxGeoJSONFeature } from 'mapbox-gl';

declare type Listener = (...args: any[]) => void;
declare class EventEmitter {
    private readonly events;
    on(event: string, listener: Listener): () => void;
    removeListener(event: string, listener: Listener): void;
    removeAllListeners(): void;
    emit(event: string, ...args: any[]): void;
    once(event: string, listener: Listener): () => void;
}

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
    _overzoom: number;
}

export interface SunExposureOptions {
	startDate: Date;
	endDate: Date;
	iterations?: number;
}

export interface SunExposure extends SunExposureOptions {
	enabled: boolean;
}

interface ShadeMapOptions {
    date?: Date;
    color?: string;
    opacity?: number;
    sunExposure?: SunExposure;
    terrainSource?: TerrainSource;
    getFeatures?: () => Promise<MapboxGeoJSONFeature[]>;
    apiKey: string;
    debug?: (msg: string) => void;
}

declare class export_default extends EventEmitter {
    constructor(options: ShadeMapOptions);
    setDate(date: Date): this;
    setColor(color: string): this;
    setOpacity(opacity: number): this;
    setSunExposure(enabled: boolean, options: SunExposureOptions): Promise<this>;
    readPixel(x: number, y: number): Uint8Array;
    getHoursOfSun(x: number, y: number): number;
    addTo(map: Map): this;
    remove(): void;
    _generateShadeProfile(params: {
        pixels: number[];
        dates: Date[];
        sunColor: string;
        shadeColor: string;
    }): Uint8Array;
}

export { export_default as default, ShadeMapOptions };
