import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { View, Text, Image, ImageBackground, Dimensions } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import styles from "./style";
import { useDispatch, useSelector } from "react-redux";
import * as VideoThumbnails from "expo-video-thumbnails";

import { Avatar, Card, Button, Title, Paragraph } from "react-native-paper";
import { ISO_8601 } from "moment";
const NewsCard = ({ title, img, description, userimg, UI }) => {
  const [imageURI, setImage] = useState(null);
  const maxHeight = Dimensions.get("window").height; // or something else
  const maxWidth = Dimensions.get("window").width;

  const LeftContent = (props) => (
    <Image
      style={styles.avatar}
      source={require("../../assets/icons/tugegarao.png")}
    />
  );

  useEffect(() => {
    let mounted = true;
    const gettumbnails = async () => {
      if (mounted) {
          if (img.slice(-3) === "mp4") {
            const { uri } = await VideoThumbnails.getThumbnailAsync(img, {
              time: 30000,
            });
            setImage(uri);
          } else {
            setImage(img);
          }
    
      }
    };
    mounted && gettumbnails();
    return () => {
      setImage("");
      mounted = false;
    };
  }, [img]);
  return (
    <View>

      <Card
        style={{
          alignSelf:"center",
          width: maxWidth,
          height: maxWidth,
          marginBottom:5
        }}
      >
        <Card.Title title={title} left={LeftContent} style={{marginStart:5}}/>
       
        <Card.Cover source={{ uri: imageURI, scale: 5, width: maxWidth }} style={{borderRadius:15,marginStart:15,marginEnd:15}}/>
        <Card.Content>
          <Paragraph style={{fontSize:12,fontWeight:"bold",padding:15}}>{description}</Paragraph>
        </Card.Content>
        {UI}
      </Card>
    </View>
  );
};

export default NewsCard;
