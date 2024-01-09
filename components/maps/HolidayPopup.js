import Mapbox from "@rnmapbox/maps";
import { Button, Card, IconButton, Text } from "react-native-paper";

Mapbox.setAccessToken(
  process.env.MAPBOX_PUBLIC_API_KEY ||
    "pk.eyJ1IjoiYWs1Y2VsIiwiYSI6ImNscHF6MzN2OTA1YTkybG84Mmg5N2YydmgifQ.RAh-0bozPVgFnKfqWvAk2g"
);

const HolidayPopup = ({ holiday, isSelected, setSelectedHoliday }) => {
  const hidePopup = () => {
    setSelectedHoliday(null);
  };

  const renderDescription = () => {
    if (holiday.info) {
      const excerpt = holiday.info.split(" ").slice(0, 20);
      return excerpt.join(" ") + (excerpt.length < 20 ? "" : "...");
    }

    return "no description 🏜️";
  };

  return (
    <Mapbox.MarkerView // popup
      key={`MarkerView-Popup-${holiday.locationData.longitude}-${holiday.locationData.latitude}`}
      coordinate={[holiday.locationData.longitude, holiday.locationData.latitude]}
      anchor={{ x: 0.5, y: 0 }}
      allowOverlap={true}
    >
      <Card style={{ display: isSelected ? "" : "none", margin: 0, maxWidth: "60%" }}>
        <Card.Content>
          <Text variant="titleLarge">{holiday.title}</Text>
          <Text variant="bodyMedium">{renderDescription()}</Text>
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