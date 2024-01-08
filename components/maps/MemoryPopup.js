import Mapbox from "@rnmapbox/maps";
import { Button, Card, IconButton, Text } from "react-native-paper";

Mapbox.setAccessToken(
  process.env.MAPBOX_PUBLIC_API_KEY ||
    "pk.eyJ1IjoiYWs1Y2VsIiwiYSI6ImNscHF6MzN2OTA1YTkybG84Mmg5N2YydmgifQ.RAh-0bozPVgFnKfqWvAk2g"
);

const MemoryPopup = ({ memory, isSelected, setSelectedMemory }) => {
  const hidePopup = () => {
    setSelectedMemory(null);
  };

  return (
    <Mapbox.MarkerView // popup
      key={`MarkerView-Popup-${memory.locationData.join("-")}`}
      coordinate={memory.locationData}
      anchor={{ x: 0.5, y: 0 }}
      allowOverlap={true}
    >
      <Card style={{ display: isSelected ? "" : "none", margin: 0 }}>
        <Card.Content>
          <Text variant="titleLarge">{memory.title}</Text>
          <Text variant="bodyMedium">{memory.info}</Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="text">See more</Button>
          <IconButton icon="close-circle-outline" size={20} onPress={hidePopup} style={{ margin: 0 }} />
        </Card.Actions>
      </Card>
    </Mapbox.MarkerView>
  );
};

export default MemoryPopup;
