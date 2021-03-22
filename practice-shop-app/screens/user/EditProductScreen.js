import React from 'react';
import { useState, useCallback, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { editProduct } from '../../store/actions/products';

const EditProductScreen = (props) => {
  const productId = props.navigation.getParam('productId');
  const availableProducts = useSelector(
    (state) => state.products.availableProducts
  );
  const selectedProduct = availableProducts.find((p) => p.id === productId);
  const [title, setTitle] = useState(
    selectedProduct ? selectedProduct.title : ''
  );
  const [price, setPrice] = useState(
    selectedProduct ? '$' + selectedProduct.price : '$'
  );
  const [description, setDescription] = useState(
    selectedProduct ? selectedProduct.description : ''
  );
  const [imageUrl, setImageUrl] = useState(
    selectedProduct ? selectedProduct.imageUrl : ''
  );

  const dispatch = useDispatch();

  const editProductHandler = useCallback(() => {
    const newProduct = {
      title,
      imageUrl,
      price,
      description,
      id: selectedProduct.id,
    };

    console.log('the new product', newProduct);

    dispatch(editProduct(newProduct));
  }, [dispatch, selectedProduct, title]);

  useEffect(() => {
    props.navigation.setParams({ editProductHandler: editProductHandler });
  }, [editProductHandler]);

  return (
    <View>
      <Text>Title</Text>
      <TextInput
        {...props}
        blurOnSubmit
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={(e) => setTitle(e)}
        value={title}
      />
      <Text>Price</Text>
      <TextInput
        {...props}
        blurOnSubmit
        autoCapitalize='none'
        keyboardType='number-pad'
        autoCorrect={false}
        onChangeText={(e) => setPrice(e)}
        value={price.toString()}
      />
      <Text>Description</Text>
      <TextInput
        {...props}
        blurOnSubmit
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={(e) => setDescription(e)}
        value={description}
      />
      <Text>Image Url</Text>
      <TextInput
        {...props}
        blurOnSubmit
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={(e) => setImageUrl(e)}
        value={imageUrl}
      />
    </View>
  );
};

EditProductScreen.navigationOptions = (navData) => {
  const editProduct = navData.navigation.getParam('editProductHandler');
  return {
    headerRight: () => (
      <TouchableNativeFeedback>
        <Ionicons
          name='ios-checkmark'
          size={35}
          onPress={() => {
            editProduct();
            navData.navigation.navigate({
              routeName: 'UserProducts',
            });
          }}
        />
      </TouchableNativeFeedback>
    ),
  };
};

const styles = StyleSheet.create({});
export default EditProductScreen;
