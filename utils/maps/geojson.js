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
            coordinates: holiday.locationData,
          },
        };
      }),
    ],
  };
};

export const memoriesGeoJsonFromData = (holidays) => {
  const memoryFeatures = [];

  holidays.forEach((holiday) => {
    holiday.memories.forEach((memory) => {
      const memoryGeoJson = {
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
          coordinates: memory.locationData,
        },
      };

      memoryFeatures.push(memoryGeoJson);
    });
  });

  const memoriesGeoJson = {
    type: "FeatureCollection",
    features: memoryFeatures,
  };

  return memoriesGeoJson;
};
