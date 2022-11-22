import mapboxgl$1, { Map as Map$1 } from 'mapbox-gl';
import { LatLngBounds } from 'leaflet/src/geo/LatLngBounds';
import { Map } from 'leaflet';
import { Bounds } from 'leaflet/src/geometry/Bounds';

declare type Listener = (...args: any[]) => void;
declare class EventEmitter {
    private readonly events;
    on(event: string, listener: Listener): () => void;
    removeListener(event: string, listener: Listener): void;
    removeAllListeners(): void;
    emit(event: string, ...args: any[]): void;
    once(event: string, listener: Listener): () => void;
}

interface XYZRaster {
    xOffset: number;
    yOffset: number;
    x: number;
    y: number;
    z: number;
}

declare enum Quality {
    LOW = "low",
    MED = "medium",
    HIGH = "high"
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
}
interface ShadeMapOptions {
    date?: Date;
    color?: string;
    opacity?: number;
    quality?: Quality;
    showExposure?: boolean;
    terrainSource?: TerrainSource;
    getFeatures?: (map: mapboxgl$1.Map) => mapboxgl$1.MapboxGeoJSONFeature[];
    apiKey: string;
    debug?: (msg: string) => void;
}

interface HeightMap {
    width: number;
    height: number;
    tileLatLngBounds: LatLngBounds;
    imageData: Uint8ClampedArray;
    maxHeight: number;
    maxBuildingHeight: number;
    visibleDEMPixelBounds: Bounds;
    raster: XYZRaster[];
    demZoom: number;
    dirty: boolean;
    canvasWidth: number;
    canvasHeight: number;
}

interface UpdateLocationArgs {
    imageData: Uint8ClampedArray;
    width: number;
    height: number;
    maxHeight: number;
    heightMapZoom: number;
    mapZoom: number;
    topYCoord: number;
    ySize: number;
    colorVec: number[];
    step: number;
    west: number;
    dLng: number;
    dec: number;
    Hi: number;
    xStart: number;
    yStart: number;
    xEnd: number;
    yEnd: number;
}
interface UpdateViewportArgs {
    xStart: number;
    yStart: number;
    xEnd: number;
    yEnd: number;
}
interface UpdateDateArgs {
    dec: number;
    Hi: number;
}
interface UpdateDateRangeArgs {
    start: Date;
    end: Date;
    emit: (name: string, ...args: any[]) => void;
    getDeclination: Function;
}
interface UpdateColorArgs {
    colorVec: number[];
}
interface UpdateMaxHeightArgs {
    maxHeight: number;
}
interface CompiledKernel {
    updateLocation: (args: UpdateLocationArgs) => void;
    updateViewport: (args: UpdateViewportArgs) => void;
    updateDate: (args: UpdateDateArgs) => void;
    updateDateRange: (args: UpdateDateRangeArgs) => void;
    updateColor: (args: UpdateColorArgs) => void;
    updateMaxHeight: (args: UpdateMaxHeightArgs) => void;
}

interface Color {
    r: number;
    g: number;
    b: number;
}

declare class ShadeMap extends EventEmitter {
    _canvas: HTMLCanvasElement;
    _gl: WebGLRenderingContext;
    _map?: Map | Map$1;
    _compiledKernel?: CompiledKernel;
    _canvasElWidth: number;
    _canvasElHeight: number;
    _color: Color;
    options: {
        date: Date;
        color: string;
        opacity: number;
        quality: Quality;
        showExposure: boolean;
        apiKey: string;
        terrainSource: {
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
        };
        getFeatures: (map: mapboxgl$1.Map) => mapboxgl$1.MapboxGeoJSONFeature[];
        debug: (msg: string) => void;
    };
    constructor(...args: any[]);
    onRemove(): this;
    setDate(date: Date): this;
    setColor(color: string): this;
    setOpacity(opacity: number): this;
    setQuality(quality: Quality): this;
    setShowExposure(showExposure: boolean): this;
    _resize(width?: number, height?: number): void;
    _resizeCanvas(): void;
    _reset(): Promise<this>;
    _draw(heightMap: HeightMap, bounds: LatLngBounds): this;
    readPixel(x: number, y: number): Uint8Array;
    _repositionCanvas(bounds: LatLngBounds): void;
    _flush(): void;
    flushSync(): void;
    _parseColor(color: string): {
        r: number;
        g: number;
        b: number;
    };
}

declare class export_default extends ShadeMap {
    id: string;
    type: string;
    _map?: mapboxgl.Map;
    _refreshing: number;
    _raf: number;
    _resizeHandler: () => void;
    _moveEndHandler: () => void;
    constructor(options: ShadeMapOptions);
    render(gl: WebGLRenderingContext, matrix: number[]): void;
    addTo(map: Map$1): this;
    onAdd(map: Map$1): this;
    onRemove(): this;
    remove(): void;
    _flush(): void;
    _repositionCanvas(bounds: LatLngBounds): this;
}

export { export_default as default };
