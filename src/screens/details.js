import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Details = props => {
  const {item} = props.route.params;
  return (
    <View style={styles.conatainer}>
      <View style={styles.card} onPress={() => (navigation.push('Details', { item }))}>
        <Image source={{ uri: item.url }} height={hp(40)} width={wp(95)} style={{ borderRadius: 5, alignSelf:'center', resizeMode:'cover', marginBottom:10 }} />
        <Text style={[styles.text, {fontSize: 17, fontWeight:'bold'}]}>Breed Name : {item.breeds?.[0]?.name}</Text>
        <Text style={styles.text}>Origin : {item.breeds?.[0]?.country_code || 'Unknown'}</Text>
        <Text style={styles.text}>Average life_span : {item.breeds?.[0].life_span || 'Unknown'}</Text>
        <Text style={styles.text}>Breed group : {item.breeds?.[0].breed_group || 'Unknown'}</Text>
        <Text style={styles.text}>Breed type : {item.breeds?.[0].temperament || 'Unknown'}</Text>
        <Text style={styles.text}>Breed for : {item.breeds?.[0].bred_for || 'Unknown'}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

  conatainer: {
    flex: 1,
    padding: 10,
    alignItems:'center'
  },
  card: {
    width: wp(95),
    backgroundColor: '#fff',
    elevation: 5,
    paddingHorizontal: 10,
    paddingBottom:10,
    borderRadius: 5,
    marginBottom: 10,
    marginHorizontal: 5,
  },
  text : {
    color: '#000', 
    fontSize: 16,
    marginTop:5
  }

})


export default Details