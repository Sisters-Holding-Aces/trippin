export const holidaysGeoJsonFromData = (holidays) => {
  return {
    type: "FeatureCollection",
    features: [
      ...holidays.map((holiday) => {
        return {
          type: "Feature",
          id: `holiday-${holiday.id}`,
          properties: {
            popupType: "holiday",
            id: holiday.id,
            description: holiday.info,
          },
          geometry: {
            type: "Point",
            coordinates: [holiday.locationData.longitude, holiday.locationData.latitude],
          },
        };
      }),
    ],
  };
};

export const memoriesGeoJsonFromData = (memories) => {
  return {
    type: "FeatureCollection",
    features: [
      ...memories.map((memory) => {
        return {
          type: "Feature",
          id: `memory-${memory.id}`,
          properties: {
            popupType: "memory",
            id: memory.id,
            title: memory.title,
            description: memory.info,
          },
          geometry: {
            type: "Point",
            coordinates: [memory.locationData.longitude, memory.locationData.latitude],
          },
        };
      }),
    ],
  };
};
