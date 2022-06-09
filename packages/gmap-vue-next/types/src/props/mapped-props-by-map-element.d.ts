/**
 * This are GoogleMapsOptions that we want to have like
 * props in our Vue component.
 * This properties are in the way that GoogleMaps accept it
 * and with extraneous properties for the VueJs API.
 * In a previous version of this plugin, to avoid repetition,
 * we created a .js file component with a `mappedProps` key on it
 * and used a variety of helper functions to clean it and bind it
 * to Vue props and watch them, etc.
 * To day our primary main goal is get a more intuitive and descriptive
 * API and a better documentation of it, following this goals we move
 * this extraneous properties to an independent file in order to consume
 * it when is needed.
 * Please you need to remind that you need to create properties in the
 * correspondent Vue component with the same names and the same values
 * for those properties that are not extraneous to Vue.
 */
export declare const autocompleteMappedProps: {
    bounds: {
        type: ObjectConstructor;
    };
    componentRestrictions: {
        type: ObjectConstructor;
        noBind: boolean;
    };
    types: {
        type: ArrayConstructor;
        default(): never[];
    };
};
export declare const drawingManagerMappedProps: {
    circleOptions: {
        type: ObjectConstructor;
        twoWay: boolean;
        noBind: boolean;
    };
    markerOptions: {
        type: ObjectConstructor;
        twoWay: boolean;
        noBind: boolean;
    };
    polygonOptions: {
        type: ObjectConstructor;
        twoWay: boolean;
        noBind: boolean;
    };
    polylineOptions: {
        type: ObjectConstructor;
        twoWay: boolean;
        noBind: boolean;
    };
    rectangleOptions: {
        type: ObjectConstructor;
        twoWay: boolean;
        noBind: boolean;
    };
};
export declare const heatMapLayerMappedProps: {
    options: {
        type: ObjectConstructor;
        twoWay: boolean;
        default: () => void;
    };
    data: {
        type: ArrayConstructor;
        twoWay: boolean;
    };
};
export declare const infoWindowMappedProps: {
    content: {
        type: ObjectConstructor;
        twoWay: boolean;
    };
    options: {
        type: ObjectConstructor;
        required: boolean;
        default(): {};
    };
    position: {
        type: ObjectConstructor;
        twoWay: boolean;
    };
    zIndex: {
        type: NumberConstructor;
        twoWay: boolean;
    };
};
export declare const kmlLayerMappedProps: {
    clickable: {
        type: BooleanConstructor;
        twoWay: boolean;
        noBind: boolean;
    };
    map: {
        type: ObjectConstructor;
        twoWay: boolean;
    };
    preserveViewport: {
        type: BooleanConstructor;
        twoWay: boolean;
        noBind: boolean;
    };
    screenOverlays: {
        type: BooleanConstructor;
        twoWay: boolean;
        noBind: boolean;
    };
    suppressInfoWindows: {
        type: BooleanConstructor;
        twoWay: boolean;
        noBind: boolean;
    };
    url: {
        type: StringConstructor;
        twoWay: boolean;
    };
    zIndex: {
        type: NumberConstructor;
        twoWay: boolean;
    };
    options: {
        type: ObjectConstructor;
        default(): {};
    };
};
export declare const mapMappedProps: {
    center: {
        required: boolean;
        twoWay: boolean;
        type: ObjectConstructor;
        noBind: boolean;
    };
    zoom: {
        required: boolean;
        twoWay: boolean;
        type: NumberConstructor;
        noBind: boolean;
    };
    heading: {
        type: NumberConstructor;
        twoWay: boolean;
    };
    mapTypeId: {
        twoWay: boolean;
        type: StringConstructor;
    };
    tilt: {
        twoWay: boolean;
        type: NumberConstructor;
    };
    options: {
        type: ObjectConstructor;
        default(): {};
    };
};
export declare const markerMappedProps: {
    animation: {
        twoWay: boolean;
        type: NumberConstructor;
    };
    attribution: {
        type: ObjectConstructor;
    };
    clickable: {
        type: BooleanConstructor;
        twoWay: boolean;
        default: boolean;
    };
    cursor: {
        type: StringConstructor;
        twoWay: boolean;
    };
    draggable: {
        type: BooleanConstructor;
        twoWay: boolean;
        default: boolean;
    };
    icon: {
        twoWay: boolean;
    };
    label: {};
    opacity: {
        type: NumberConstructor;
        default: number;
    };
    options: {
        type: ObjectConstructor;
    };
    place: {
        type: ObjectConstructor;
    };
    position: {
        type: ObjectConstructor;
        twoWay: boolean;
    };
    shape: {
        type: ObjectConstructor;
        twoWay: boolean;
    };
    title: {
        type: StringConstructor;
        twoWay: boolean;
    };
    zIndex: {
        type: NumberConstructor;
        twoWay: boolean;
    };
    visible: {
        twoWay: boolean;
        default: boolean;
    };
};
export declare const streetViewPanoramaMappedProps: {
    zoom: {
        twoWay: boolean;
        type: NumberConstructor;
    };
    pov: {
        twoWay: boolean;
        type: ObjectConstructor;
        trackProperties: string[];
    };
    position: {
        twoWay: boolean;
        type: ObjectConstructor;
        noBind: boolean;
    };
    pano: {
        twoWay: boolean;
        type: StringConstructor;
    };
    motionTracking: {
        twoWay: boolean;
        type: BooleanConstructor;
    };
    visible: {
        twoWay: boolean;
        type: BooleanConstructor;
        default: boolean;
    };
    options: {
        twoWay: boolean;
        type: ObjectConstructor;
        default(): {};
    };
};
export declare const polygonMappedProps: {
    clickable: {
        type: BooleanConstructor;
        noBind: boolean;
    };
    draggable: {
        type: BooleanConstructor;
    };
    editable: {
        type: BooleanConstructor;
    };
    fillColor: {
        type: StringConstructor;
        noBind: boolean;
    };
    fillOpacity: {
        type: NumberConstructor;
        noBind: boolean;
    };
    strokeColor: {
        type: StringConstructor;
        noBind: boolean;
    };
    strokeOpacity: {
        type: NumberConstructor;
        noBind: boolean;
    };
    strokePosition: {
        type: NumberConstructor;
        noBind: boolean;
    };
    strokeWeight: {
        type: NumberConstructor;
        noBind: boolean;
    };
    visible: {
        type: BooleanConstructor;
    };
    options: {
        type: ObjectConstructor;
    };
    path: {
        type: ArrayConstructor;
        twoWay: boolean;
        noBind: boolean;
    };
    paths: {
        type: ArrayConstructor;
        twoWay: boolean;
        noBind: boolean;
    };
};
export declare const polylineMappedProps: {
    clickable: {
        type: BooleanConstructor;
        noBind: boolean;
    };
    draggable: {
        type: BooleanConstructor;
    };
    editable: {
        type: BooleanConstructor;
    };
    strokeColor: {
        type: StringConstructor;
        noBind: boolean;
    };
    strokeOpacity: {
        type: NumberConstructor;
        noBind: boolean;
    };
    strokeWeight: {
        type: NumberConstructor;
        noBind: boolean;
    };
    visible: {
        type: BooleanConstructor;
    };
    options: {
        twoWay: boolean;
        type: ObjectConstructor;
    };
    path: {
        type: ArrayConstructor;
        twoWay: boolean;
    };
};
export declare const rectangleMappedProps: {
    bounds: {
        type: ObjectConstructor;
        twoWay: boolean;
    };
    clickable: {
        type: BooleanConstructor;
        noBind: boolean;
    };
    draggable: {
        type: BooleanConstructor;
        default: boolean;
    };
    editable: {
        type: BooleanConstructor;
        default: boolean;
    };
    fillColor: {
        type: StringConstructor;
        noBind: boolean;
    };
    fillOpacity: {
        type: NumberConstructor;
        noBind: boolean;
    };
    strokeColor: {
        type: StringConstructor;
        noBind: boolean;
    };
    strokeOpacity: {
        type: NumberConstructor;
        noBind: boolean;
    };
    strokePosition: {
        type: NumberConstructor;
        noBind: boolean;
    };
    strokeWeight: {
        type: NumberConstructor;
        noBind: boolean;
    };
    visible: {
        type: BooleanConstructor;
    };
    options: {
        type: ObjectConstructor;
        twoWay: boolean;
    };
};
export declare const circleMappedProps: {
    center: {
        type: ObjectConstructor;
        twoWay: boolean;
        required: boolean;
    };
    radius: {
        type: NumberConstructor;
        twoWay: boolean;
    };
    clickable: {
        type: BooleanConstructor;
        noBind: boolean;
    };
    draggable: {
        type: BooleanConstructor;
        default: boolean;
    };
    editable: {
        type: BooleanConstructor;
        default: boolean;
    };
    fillColor: {
        type: StringConstructor;
        noBind: boolean;
    };
    fillOpacity: {
        type: NumberConstructor;
        noBind: boolean;
    };
    strokeColor: {
        type: StringConstructor;
        noBind: boolean;
    };
    strokeOpacity: {
        type: NumberConstructor;
        noBind: boolean;
    };
    strokePosition: {
        type: NumberConstructor;
        noBind: boolean;
    };
    strokeWeight: {
        type: NumberConstructor;
        noBind: boolean;
    };
    visible: {
        type: BooleanConstructor;
    };
    options: {
        type: ObjectConstructor;
        twoWay: boolean;
    };
};
export declare const placeInputMappedProps: {
    bounds: {
        type: ObjectConstructor;
    };
    defaultPlace: {
        type: StringConstructor;
        default: string;
    };
    componentRestrictions: {
        type: ObjectConstructor;
        default: null;
    };
    types: {
        type: ArrayConstructor;
        default(): never[];
    };
    placeholder: {
        required: boolean;
        type: StringConstructor;
    };
    className: {
        required: boolean;
        type: StringConstructor;
    };
    label: {
        required: boolean;
        type: StringConstructor;
        default: null;
    };
    selectFirstOnEnter: {
        require: boolean;
        type: BooleanConstructor;
        default: boolean;
    };
};
export declare const clusterIconMappedProps: {
    algorithm: {
        type: ObjectConstructor;
    };
    onClusterClick: {
        type: FunctionConstructor;
    };
    renderer: {
        type: ObjectConstructor;
    };
    options: {
        type: ObjectConstructor;
    };
};
declare const _default: {
    autocompleteMappedProps: {
        bounds: {
            type: ObjectConstructor;
        };
        componentRestrictions: {
            type: ObjectConstructor;
            noBind: boolean;
        };
        types: {
            type: ArrayConstructor;
            default(): never[];
        };
    };
    circleMappedProps: {
        center: {
            type: ObjectConstructor;
            twoWay: boolean;
            required: boolean;
        };
        radius: {
            type: NumberConstructor;
            twoWay: boolean;
        };
        clickable: {
            type: BooleanConstructor;
            noBind: boolean;
        };
        draggable: {
            type: BooleanConstructor;
            default: boolean;
        };
        editable: {
            type: BooleanConstructor;
            default: boolean;
        };
        fillColor: {
            type: StringConstructor;
            noBind: boolean;
        };
        fillOpacity: {
            type: NumberConstructor;
            noBind: boolean;
        };
        strokeColor: {
            type: StringConstructor;
            noBind: boolean;
        };
        strokeOpacity: {
            type: NumberConstructor;
            noBind: boolean;
        };
        strokePosition: {
            type: NumberConstructor;
            noBind: boolean;
        };
        strokeWeight: {
            type: NumberConstructor;
            noBind: boolean;
        };
        visible: {
            type: BooleanConstructor;
        };
        options: {
            type: ObjectConstructor;
            twoWay: boolean;
        };
    };
    drawingManagerMappedProps: {
        circleOptions: {
            type: ObjectConstructor;
            twoWay: boolean;
            noBind: boolean;
        };
        markerOptions: {
            type: ObjectConstructor;
            twoWay: boolean;
            noBind: boolean;
        };
        polygonOptions: {
            type: ObjectConstructor;
            twoWay: boolean;
            noBind: boolean;
        };
        polylineOptions: {
            type: ObjectConstructor;
            twoWay: boolean;
            noBind: boolean;
        };
        rectangleOptions: {
            type: ObjectConstructor;
            twoWay: boolean;
            noBind: boolean;
        };
    };
    heatMapLayerMappedProps: {
        options: {
            type: ObjectConstructor;
            twoWay: boolean;
            default: () => void;
        };
        data: {
            type: ArrayConstructor;
            twoWay: boolean;
        };
    };
    infoWindowMappedProps: {
        content: {
            type: ObjectConstructor;
            twoWay: boolean;
        };
        options: {
            type: ObjectConstructor;
            required: boolean;
            default(): {};
        };
        position: {
            type: ObjectConstructor;
            twoWay: boolean;
        };
        zIndex: {
            type: NumberConstructor;
            twoWay: boolean;
        };
    };
    kmlLayerMappedProps: {
        clickable: {
            type: BooleanConstructor;
            twoWay: boolean;
            noBind: boolean;
        };
        map: {
            type: ObjectConstructor;
            twoWay: boolean;
        };
        preserveViewport: {
            type: BooleanConstructor;
            twoWay: boolean;
            noBind: boolean;
        };
        screenOverlays: {
            type: BooleanConstructor;
            twoWay: boolean;
            noBind: boolean;
        };
        suppressInfoWindows: {
            type: BooleanConstructor;
            twoWay: boolean;
            noBind: boolean;
        };
        url: {
            type: StringConstructor;
            twoWay: boolean;
        };
        zIndex: {
            type: NumberConstructor;
            twoWay: boolean;
        };
        options: {
            type: ObjectConstructor;
            default(): {};
        };
    };
    mapMappedProps: {
        center: {
            required: boolean;
            twoWay: boolean;
            type: ObjectConstructor;
            noBind: boolean;
        };
        zoom: {
            required: boolean;
            twoWay: boolean;
            type: NumberConstructor;
            noBind: boolean;
        };
        heading: {
            type: NumberConstructor;
            twoWay: boolean;
        };
        mapTypeId: {
            twoWay: boolean;
            type: StringConstructor;
        };
        tilt: {
            twoWay: boolean;
            type: NumberConstructor;
        };
        options: {
            type: ObjectConstructor;
            default(): {};
        };
    };
    markerMappedProps: {
        animation: {
            twoWay: boolean;
            type: NumberConstructor;
        };
        attribution: {
            type: ObjectConstructor;
        };
        clickable: {
            type: BooleanConstructor;
            twoWay: boolean;
            default: boolean;
        };
        cursor: {
            type: StringConstructor;
            twoWay: boolean;
        };
        draggable: {
            type: BooleanConstructor;
            twoWay: boolean;
            default: boolean;
        };
        icon: {
            twoWay: boolean;
        };
        label: {};
        opacity: {
            type: NumberConstructor;
            default: number;
        };
        options: {
            type: ObjectConstructor;
        };
        place: {
            type: ObjectConstructor;
        };
        position: {
            type: ObjectConstructor;
            twoWay: boolean;
        };
        shape: {
            type: ObjectConstructor;
            twoWay: boolean;
        };
        title: {
            type: StringConstructor;
            twoWay: boolean;
        };
        zIndex: {
            type: NumberConstructor;
            twoWay: boolean;
        };
        visible: {
            twoWay: boolean;
            default: boolean;
        };
    };
    streetViewPanoramaMappedProps: {
        zoom: {
            twoWay: boolean;
            type: NumberConstructor;
        };
        pov: {
            twoWay: boolean;
            type: ObjectConstructor;
            trackProperties: string[];
        };
        position: {
            twoWay: boolean;
            type: ObjectConstructor;
            noBind: boolean;
        };
        pano: {
            twoWay: boolean;
            type: StringConstructor;
        };
        motionTracking: {
            twoWay: boolean;
            type: BooleanConstructor;
        };
        visible: {
            twoWay: boolean;
            type: BooleanConstructor;
            default: boolean;
        };
        options: {
            twoWay: boolean;
            type: ObjectConstructor;
            default(): {};
        };
    };
    polygonMappedProps: {
        clickable: {
            type: BooleanConstructor;
            noBind: boolean;
        };
        draggable: {
            type: BooleanConstructor;
        };
        editable: {
            type: BooleanConstructor;
        };
        fillColor: {
            type: StringConstructor;
            noBind: boolean;
        };
        fillOpacity: {
            type: NumberConstructor;
            noBind: boolean;
        };
        strokeColor: {
            type: StringConstructor;
            noBind: boolean;
        };
        strokeOpacity: {
            type: NumberConstructor;
            noBind: boolean;
        };
        strokePosition: {
            type: NumberConstructor;
            noBind: boolean;
        };
        strokeWeight: {
            type: NumberConstructor;
            noBind: boolean;
        };
        visible: {
            type: BooleanConstructor;
        };
        options: {
            type: ObjectConstructor;
        };
        path: {
            type: ArrayConstructor;
            twoWay: boolean;
            noBind: boolean;
        };
        paths: {
            type: ArrayConstructor;
            twoWay: boolean;
            noBind: boolean;
        };
    };
    polylineMappedProps: {
        clickable: {
            type: BooleanConstructor;
            noBind: boolean;
        };
        draggable: {
            type: BooleanConstructor;
        };
        editable: {
            type: BooleanConstructor;
        };
        strokeColor: {
            type: StringConstructor;
            noBind: boolean;
        };
        strokeOpacity: {
            type: NumberConstructor;
            noBind: boolean;
        };
        strokeWeight: {
            type: NumberConstructor;
            noBind: boolean;
        };
        visible: {
            type: BooleanConstructor;
        };
        options: {
            twoWay: boolean;
            type: ObjectConstructor;
        };
        path: {
            type: ArrayConstructor;
            twoWay: boolean;
        };
    };
    rectangleMappedProps: {
        bounds: {
            type: ObjectConstructor;
            twoWay: boolean;
        };
        clickable: {
            type: BooleanConstructor;
            noBind: boolean;
        };
        draggable: {
            type: BooleanConstructor;
            default: boolean;
        };
        editable: {
            type: BooleanConstructor;
            default: boolean;
        };
        fillColor: {
            type: StringConstructor;
            noBind: boolean;
        };
        fillOpacity: {
            type: NumberConstructor;
            noBind: boolean;
        };
        strokeColor: {
            type: StringConstructor;
            noBind: boolean;
        };
        strokeOpacity: {
            type: NumberConstructor;
            noBind: boolean;
        };
        strokePosition: {
            type: NumberConstructor;
            noBind: boolean;
        };
        strokeWeight: {
            type: NumberConstructor;
            noBind: boolean;
        };
        visible: {
            type: BooleanConstructor;
        };
        options: {
            type: ObjectConstructor;
            twoWay: boolean;
        };
    };
    placeInputMappedProps: {
        bounds: {
            type: ObjectConstructor;
        };
        defaultPlace: {
            type: StringConstructor;
            default: string;
        };
        componentRestrictions: {
            type: ObjectConstructor;
            default: null;
        };
        types: {
            type: ArrayConstructor;
            default(): never[];
        };
        placeholder: {
            required: boolean;
            type: StringConstructor;
        };
        className: {
            required: boolean;
            type: StringConstructor;
        };
        label: {
            required: boolean;
            type: StringConstructor;
            default: null;
        };
        selectFirstOnEnter: {
            require: boolean;
            type: BooleanConstructor;
            default: boolean;
        };
    };
    clusterIconMappedProps: {
        algorithm: {
            type: ObjectConstructor;
        };
        onClusterClick: {
            type: FunctionConstructor;
        };
        renderer: {
            type: ObjectConstructor;
        };
        options: {
            type: ObjectConstructor;
        };
    };
};
export default _default;
