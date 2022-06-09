export declare const mapLayerProps: {
    /**
     * The initial Map center.
     * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions
     */
    center: {
        type: ObjectConstructor;
        required: boolean;
        twoWay: boolean;
        noBind: boolean;
    };
    /**
     * The initial Map zoom level. Valid values: Integers between zero, and up to the supported maximum zoom level.
     * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions
     */
    zoom: {
        type: NumberConstructor;
        required: boolean;
        default: undefined;
        twoWay: boolean;
        noBind: boolean;
    };
    /**
     * The heading for aerial imagery in degrees measured clockwise from cardinal direction North. Headings are snapped to the nearest available angle for which imagery is available.
     * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions
     */
    heading: {
        type: NumberConstructor;
        default: undefined;
        twoWay: boolean;
    };
    /**
     * The initial Map mapTypeId. Defaults to ROADMAP.
     * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions
     */
    mapTypeId: {
        type: StringConstructor;
        default: string;
        twoWay: boolean;
    };
    /**
     * For vector maps, sets the angle of incidence of the map. The allowed values are restricted depending on the zoom level of the map. For raster maps, controls the automatic switching behavior for the angle of incidence of the map. The only allowed values are 0 and 45. The value 0 causes the map to always use a 0° overhead view regardless of the zoom level and viewport. The value 45 causes the tilt angle to automatically switch to 45 whenever 45° imagery is available for the current zoom level and viewport, and switch back to 0 whenever 45° imagery is not available (this is the default behavior). 45° imagery is only available for satellite and hybrid map types, within some locations, and at some zoom levels. Note: getTilt returns the current tilt angle, not the value specified by this option. Because getTilt and this option refer to different things, do not bind() the tilt property; doing so may yield unpredictable effects.
     * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions
     */
    tilt: {
        type: NumberConstructor;
        default: undefined;
        twoWay: boolean;
    };
    /**
     * Extra options that you want pass to the component
     */
    options: {
        type: ObjectConstructor;
        default(): {};
    };
};
