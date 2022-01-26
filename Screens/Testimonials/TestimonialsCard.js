import React from 'react';
import {View, Dimensions, Image} from 'react-native';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import styles from './style';

const TestimonialsCard = ({author, description, image}) => {
  const maxHeight = Dimensions.get('window').height; // or something else
  const maxWidth = Dimensions.get('window').width;
  return (
    <View
      style={{
        width: '100%',
        aspectRatio: 1 / 1,
        height: maxWidth,
        marginBottom: 30,
      }}>
      <Card
        style={{
          flex: 1,
          borderRadius: 15,
          marginEnd: 5,
          padding: 10,
          backgroundColor: '#004a78',
        }}>
        <Image
          style={{width: 70, height: 70, alignSelf: 'center'}}
          source={{uri: image}}
        />
        <Card.Content>
          <Paragraph style={styles.EventListTitle}>{description}</Paragraph>
        </Card.Content>
        <Card.Content>
          <Paragraph style={styles.author}>{author}</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};
export default TestimonialsCard;
