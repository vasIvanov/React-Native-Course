import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  ScrollView,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../../constants/Colors';
import { addToCart } from '../../store/actions/cart';

const ProductDetailScreen = (props) => {
  const dispatch = useDispatch();
  const productId = props.route.params.productId;
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((p) => p.id === productId)
  );

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title='Add to Cart'
          onPress={() => {
            dispatch(addToCart(selectedProduct));
          }}
        />
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: navData.route.params.productTitle,
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center',
  },
});
export default ProductDetailScreen;
