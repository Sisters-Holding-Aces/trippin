module.exports = ({ config }) => {
  return {
    ...config,
    plugins: [
      [
        "@rnmapbox/maps",
        {
          RNMapboxMapsDownloadToken:
            process.env.MAPBOX_SECRET_NATIVE_SDK_KEY ||
            "sk.eyJ1IjoiYWs1Y2VsIiwiYSI6ImNscXhibGV6MDBhbmYycXB6NGFyb3poY2YifQ.yEX_avLONvUh4bT4Iam4zQ",
        },
      ],
      [
        "expo-location",
        {
          locationWhenInUsePermission: "Show current location on map.",
        },
      ],
    ],
  };
};
