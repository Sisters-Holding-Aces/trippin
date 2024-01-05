import Mapbox from "@rnmapbox/maps";
import { useState } from "react";
import { Button, Card, IconButton, Text } from "react-native-paper";
import { View } from "react-native";

Mapbox.setAccessToken(
  process.env.MAPBOX_PUBLIC_API_KEY ||
    "pk.eyJ1IjoiYWs1Y2VsIiwiYSI6ImNscHF6MzN2OTA1YTkybG84Mmg5N2YydmgifQ.RAh-0bozPVgFnKfqWvAk2g"
);

const MarkerWithPopup = ({ holiday }) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup((curr) => !curr);
  };

  return (
    <>
      {/* marker icon */}
      <Mapbox.MarkerView
        key={`MarkerView-Icon-${holiday.locationData.join("-")}`}
        coordinate={holiday.locationData}
        anchor={{ x: 0.5, y: 0.5 }}
        allowOverlap={true}
      >
        <IconButton icon="heart-circle" size={40} onPress={togglePopup} style={{ margin: 0 }} />
      </Mapbox.MarkerView>

      {/* popup */}
      <Mapbox.MarkerView
        key={`MarkerView-Popup-${holiday.locationData.join("-")}`}
        coordinate={holiday.locationData}
        anchor={{ x: 0, y: 0 }}
        allowOverlap={true}
      >
        <Card style={{ display: showPopup ? "" : "none", margin: 0 }}>
          <Card.Content>
            <Text variant="titleLarge">{holiday.title}</Text>
            <Text variant="bodyMedium">{holiday.info}</Text>
          </Card.Content>
          <Card.Actions>
            <Button mode="text">See more</Button>
            <IconButton icon="close-circle-outline" size={20} onPress={togglePopup} style={{ margin: 0 }} />
          </Card.Actions>
        </Card>
      </Mapbox.MarkerView>
    </>
  );
};

export default MarkerWithPopup;
