import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';

const ProductItem = props => {
  return (
    <View style={styles.product}>
      <View style={styles.touchable}>
        <TouchableNativeFeedback onPress={props.onView} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{uri: props.image}} />
            </View>
            <View style={styles.productDetails}>
              <Text style={styles.title}>{props.title} </Text>
              <Text style={styles.price}>
                ${Number(props.price).toFixed(2)}
              </Text>
            </View>

            <View style={styles.buttons}>{props.children}</View>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: 'black',
    shadowOpacity: 0.6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 300,
    margin: 20,
  
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
  productDetails: {
    alignItems: 'center',
    height: '18%',
    padding: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '22%',
    paddingHorizontal: 20,
    
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
});
export default ProductItem;
