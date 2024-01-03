module.exports = ({ config }) => {
  return {
    ...config,
    plugins: [
      [
        "@rnmapbox/maps",
        {
          RNMapboxMapsDownloadToken: process.env.MAPBOX_SECRET_NATIVE_SDK_KEY,
        },
      ],
    ],
  };
};
