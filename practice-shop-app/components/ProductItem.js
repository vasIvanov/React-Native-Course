import React from 'react';
import { View, StyleSheet, ImageBackground, Button, Text } from 'react-native';

const ProductItem = (props) => {
  return (
    <View style={styles.item}>
      <ImageBackground
        source={{ uri: props.itemData.item.imageUrl }}
        style={styles.bgImage}
      >
        <View style={{ ...styles.productRow, ...styles.productDetail }}>
          {props.overview ? (
            <Button
              title='Detail'
              onPress={() => {
                props.navigation.navigate({
                  routeName: 'DetailScreen',
                  params: {
                    productId: props.itemData.item.id,
                    productTitle: props.itemData.item.title,
                  },
                });
              }}
            />
          ) : (
            <Button
              title='Edit'
              onPress={() => {
                props.navigation.navigate({
                  routeName: 'EditScreen',
                  params: {
                    productId: props.itemData.item.id,
                    productTitle: props.itemData.item.title,
                  },
                });
              }}
            />
          )}

          <Text style={styles.price}>${props.itemData.item.price}</Text>
          {props.overview ? <Button title='Cart' /> : <Button title='Delete' />}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    height: 200,
    width: '100%',
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    marginBottom: 25,
    overflow: 'hidden',
    borderColor: 'black',
    borderWidth: 1,
  },
  bgImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  price: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
  titleContainer: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  productRow: {
    flexDirection: 'row',
  },
  productDetail: {
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '15%',
    backgroundColor: 'white',
    color: 'white',
  },
});
export default ProductItem;
