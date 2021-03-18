import React from 'react';
import { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

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
  return {
    headerRight: () => (
      <TouchableNativeFeedback>
        <Ionicons
          name='ios-checkmark'
          size={35}
          onPress={() => {
            navData.navigation.navigate({
              routeName: 'UserProducts',
              params: {
                // mealId: itemData.item.id,
                // mealTitle: itemData.item.title,
                // isFav,
              },
            });
          }}
        />
      </TouchableNativeFeedback>
    ),
  };
};

const styles = StyleSheet.create({});
export default EditProductScreen;
