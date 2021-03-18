import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  Button,
} from 'react-native';
import { useSelector } from 'react-redux';

const ProductDetailScreen = (props) => {
  const availableProducts = useSelector(
    (state) => state.products.availableProducts
  );
  const productId = props.navigation.getParam('productId');
  const selectedProduct = availableProducts.find((p) => p.id === productId);
  console.log(selectedProduct);
  return (
    <ScrollView>
      <Image source={{ uri: selectedProduct.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <Text>${selectedProduct.price}</Text>
        <Text>{selectedProduct.description}</Text>
      </View>
      <Button title='To Cart' />
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = (navData) => {
  const productTitle = navData.navigation.getParam('productTitle');
  return {
    headerTitle: productTitle,
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
});
export default ProductDetailScreen;
