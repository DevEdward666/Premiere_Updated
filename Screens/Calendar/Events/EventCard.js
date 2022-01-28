import React from "react";
import { View, Dimensions } from "react-native";
import { Text } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import styles from "./style";
import { Caption } from "react-native-paper";
const EventCard = ({ title, description, image, day, month, year, time }) => {
  const LeftContent = (props) => (
    <>
      <Avatar.Text
        size={42}
        label={day}
        color="black"
        style={{ backgroundColor: "white" }}
      />
      {/* <Avatar.Text`
        size={32}
        label={month}
        color="black"
        style={{ backgroundColor: "white" }}
      /> */}
      <Caption style={{ fontSize: 16, fontFamily: "SFUIDisplay-Bold" }}>
        {month}
      </Caption>
    </>
  );
  const maxHeight = Dimensions.get("window").height; // or something else
  const maxWidth = Dimensions.get("window").width;

  return (
    <View style={{ width: maxWidth, aspectRatio: 1 / 1, height: maxWidth }}>
      <Card style={{ flex: 1, borderRadius: 15, marginEnd: 5, padding: 10 }}>
        <Card.Cover source={{ uri: image }} />
        <Card.Content>
          <Card.Title
            style={styles.EventListTitle}
            title={title + "\n" + description}
            subtitle={time}
            left={LeftContent}
          />
          {/* <Title style={styles.EventListTitle}>{title}</Title>
          <Paragraph style={styles.EventListTitle}>{description}</Paragraph> */}
        </Card.Content>
      </Card>
    </View>
  );
};
export default EventCard;
