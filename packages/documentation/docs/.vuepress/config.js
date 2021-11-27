const { sidebarTree } = require("../code/config");
const apiDocs = sidebarTree("API docs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");

module.exports = {
  base: "/gmap-vue/",
  title: "Gmap-vue plugin",
  description: "Documentation for gmap-vue plugin",
  themeConfig: {
    sidebarDepth: 4,
    nav: [
      { text: "Plugin", link: "/" },
      { text: "Guide", link: "/guide/" },
      { text: "API", link: "/code/" },
      { text: "GitHub", link: "https://github.com/diegoazh/gmap-vue" },
    ],
    sidebar: {
      "/code/": apiDocs["/code/"],
      "/guide/": [
        {
          title: "Guide",
          collapsable: false,
          children: [
            {
              title: "Concepts",
              collapsable: false,
              path: "/guide/",
            },
            {
              title: "Components",
              collapsable: false,
              path: "/guide/map",
              children: [
                ["map", "GmapMap"],
                ["autocomplete", "GmapAutocomplete"],
                ["circle", "GmapCircle"],
                ["cluster", "GmapCluster"],
                ["drawing-manager", "GmapDrawingManager"],
                ["heatmap-layer", "GmapHeatmapLayer"],
                ["info-window", "GmapInfoWindow"],
                ["kml-layer", "GmapKmlLayer"],
                ["marker", "GmapMarker"],
                ["place-input", "GmapPlaceInput"],
                ["polygon", "GmapPolygon"],
                ["polyline", "GmapPolyline"],
                ["rectangle", "GmapRectangle"],
                ["street-view-panorama", "GmapStreetViewPanorama"],
                ["extra-examples", "Extra examples"],
                ["cdn", "Using a CDN"],
              ],
            },
          ],
        },
      ],
      "/": [["", "Getting started"]],
    },
  },
  configureWebpack: (config, isServer) => {
    configureWebpack: (config) => {
      return {
        plugins: [
          new HtmlWebpackPlugin(),
          new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin),
        ],
      };
    };
  },
};
