define([
    "esri/Map",
    "esri/layers/GeoJSONLayer",
    "esri/views/MapView"
], function (Map, GeoJSONLayer, MapView) {
    // If GeoJSON files are not on the same domain as your website, a CORS enabled server
    // or a proxy is required.
    // const url = "data/earthquakes_all_month.geojson";
    const url = "data/bofm_data.geojson";

    // Paste the url into a browser's address bar to download and view the attributes
    // in the GeoJSON file. These attributes include:
    // * mag - magnitude
    // * type - earthquake or other event such as nuclear test
    // * place - location of the event
    // * time - the time of the event
    // Use the Arcade Date() function to format time field into a human-readable format

    const template = {
        title: "Book of Mormon Landmarks",
        content: "Scripture Name: {Scripture_Name}<br>Current Name: {Current_Name}",
    };

    const renderer = {
        type: "simple",
        field: "mag",
        symbol: {
            type: "simple-marker",
            color: "orange",
            outline: {
                color: "white"
            }
        },
        visualVariables: [{
            type: "size",
            field: "mag",
            stops: [{
                    value: 2.5,
                    size: "4px"
                },
                {
                    value: 8,
                    size: "40px"
                }
            ]
        }]
    };

    const geojsonLayer = new GeoJSONLayer({
        url: url,
        copyright: "USGS Earthquakes",
        popupTemplate: template,
        renderer: renderer //optional
    });

    const map = new Map({
        basemap: "gray",
        layers: [geojsonLayer]
    });

    const view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-168, 46],
        // zoom: 3,
        constraints: {
            minZoom: 18,
            maxZoom: 3,
        }

    });
});
