import Mapbox from "@rnmapbox/maps";
import { useState } from "react";
import { Button, Card, IconButton, Text } from "react-native-paper";
import { View } from "react-native";

Mapbox.setAccessToken(
  process.env.MAPBOX_PUBLIC_API_KEY ||
    "pk.eyJ1IjoiYWs1Y2VsIiwiYSI6ImNscHF6MzN2OTA1YTkybG84Mmg5N2YydmgifQ.RAh-0bozPVgFnKfqWvAk2g"
);

const HolidayPopup = ({ holiday, isSelected, setSelectedHoliday }) => {
  const hidePopup = () => {
    setSelectedHoliday(null);
  };

  return (
    <Mapbox.MarkerView // popup
      key={`MarkerView-Popup-${holiday.locationData.join("-")}`}
      coordinate={holiday.locationData}
      anchor={{ x: 0, y: 0 }}
      allowOverlap={true}
    >
      <Card style={{ display: isSelected ? "" : "none", margin: 0 }}>
        <Card.Content>
          <Text variant="titleLarge">{holiday.title}</Text>
          <Text variant="bodyMedium">{holiday.info}</Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="text">See more</Button>
          <IconButton icon="close-circle-outline" size={20} onPress={hidePopup} style={{ margin: 0 }} />
        </Card.Actions>
      </Card>
    </Mapbox.MarkerView>
  );
};

export default HolidayPopup;
