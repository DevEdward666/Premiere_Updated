import React, { useCallback, useRef, useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import ImageModal from 'react-native-image-modal';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import styles from './carouselstyle';
const {width: screenWidth} = Dimensions.get('window');
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
export default function NewsCarousel() {
  const carouselRef = useRef();
  const [activeIndex, setActivateIndex] = useState(0);

  const ENTRIES1 = [
    {
      id:1,
      title: 'Perpetual Succour Hospital ',
      subtitle:
        'at 80 and beyond, trailblazing the winds of change, through rapid evolution of systematic knowledge, strategy and innovation, that will ensure top notch and non-pareil Spirituality of Compassion, Shepherding Leadership, Innovative Excellence and Superior Expertise.',
      illustration: require('../../assets/carousel/psh1.jpg'),
      imahe: '../../assets/carousel/psh1.jpg',
    },
    {
      id:2,
      title: 'Vision',
      subtitle:
        'Privileged to share in God’s saving and healing action, we envision Perpetual Succour Hospital as a Christ-centered, dynamic and socially responsible global health care ministry providing holistic quality health care services.',
      illustration: require('../../assets/carousel/psh2.jpg'),
      imahe: '../../assets/carousel/psh2.jpg',
    },
    {
      id:3,
      title: 'Life Purpose',
      subtitle:
        'To serve and care as authentic witnesses to the Divine Healer towards the ultimate union with God.',
      illustration: require('../../assets/carousel/psh3.jpg'),
      imahe: '../../assets/carousel/psh3.jpg',
    },
    {
      id:4,
      title: 'Superior Expertise',
      subtitle:
        '“Therefore, my dear brothers and sisters, stand firm. Let nothing move you. Always give yourselves fully to the work of the Lord, because you know that your labor in the Lord is not in vain.” 1 Corinthians 15:58',
      illustration: require('../../assets/carousel/psh4.jpg'),
      imahe: '../../assets/carousel/psh4.jpg',
    },
    {
      id:5,
      title: 'Spirituality of Compassion',
      subtitle:
        '“The Lord is gracious and compassionate, slow to anger and rich in love.” Psalm 145:8',
      illustration: require('../../assets/carousel/psh5.jpg'),
      imahe: '../../assets/carousel/psh5.jpg',
    },
    {
      id:6,
      title: 'Innovative Excellence',
      subtitle:
        '  “In the same way, let your light shine before others, that may see your good deeds and glorify your Father in heaven.” Matthew 5:16',
      illustration: require('../../assets/carousel/psh6.jpg'),
      imahe: '../../assets/carousel/psh6.jpg',
    },
    {
      id:7,
      title: 'Shepherding Leadership',
      subtitle:
        ' “I am the good shepherd; I know my sheep and my sheep know me” John 10:14',
      illustration: require('../../assets/carousel/psh7.jpg'),
      imahe: '../../assets/carousel/psh7.jpg',
    },
  ];
  const [entries, setEntries] = useState(ENTRIES1);
  //   const Pagination = () => (

  //   );
  const _onPressCarousel = (index) => {
    // here handle carousel press
    carouselRef.current.snapToItem(index);
  };
  const [visible, setIsVisible] = useState(false);
  const [images, setimages] = useState([]);
  const PickParalaxImage = useCallback((item) => {
    setIsVisible(true);
  },[]);
  const renderItem = ({item}, parallaxProps) => {
    return (
      <TouchableHighlight onPress={() => PickParalaxImage(item)}>
        <View style={styles.item}>
          <ImageModal
            resizeMode="contain"
            imageBackgroundColor="#000000"
            style={{
              alignItems: 'center',
              width: 350,
              height: 300,
              backgroundColor: 'white',
              borderRadius: 8,
            }}
            source={item.illustration}
            parallaxFactor={0.4}
            {...parallaxProps}
          />
          {/* <ParallaxImage
            source={item.illustration}
            containerStyle={styles.imageContainer}
            style={styles.image}
            parallaxFactor={0.4}
            {...parallaxProps}
          /> */}

          <View
            style={{
              bottom: 100,
              justifyContent: 'center',
              padding: 10,
              backgroundColor: 'rgba(94, 91, 91,0.6)',
            }}>
            <Text style={{color: 'white', fontSize: 12, letterSpacing: 0.5}}>
              {item.title}
            </Text>
            <Text style={{color: 'white', fontSize: 12, letterSpacing: 0.5}}>
              {item.subtitle}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        paddingTop: 10,
      }}>
      <View style={{flexDirection: 'column', justifyContent: 'center'}}>
        <View>
          <Text
            style={{
              width: '100%',
              color: 'black',
              marginStart: 10,
              textAlign: 'left',
              fontSize: 28,
              marginBottom: 30,
              fontFamily: 'SFUIDisplay-Bold',
            }}>
            Peace be with you!
          </Text>
          <Carousel
            loop={true}
            autoplay={true}
            autoplayDelay={3000}
            autoplayInterval={10000}
            layout={'default'}
            ref={carouselRef}
            sliderWidth={screenWidth}
            sliderHeight={screenWidth}
            itemWidth={screenWidth - 60}
            data={entries}
            renderItem={renderItem}
            hasParallaxImages={true}
            useScrollView
            onSnapToItem={(index) => setActivateIndex(index)}
            activeSlideAlignment="center"
          />
        </View>
        <View style={{flex: 1}}>
          <Pagination
            dotsLength={entries.length}
            activeDotIndex={activeIndex}
            containerStyle={{backgroundColor: 'transparent', height: 65}}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: 'black',
            }}
            inactiveDotStyle={
              {
                // Define styles for inactive dots here
              }
            }
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
