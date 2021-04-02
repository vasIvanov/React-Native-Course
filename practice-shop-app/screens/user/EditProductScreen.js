import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useState, useReducer } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import Colors from '../../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../components/UI/Input';
import { createProduct, updateProduct } from '../../store/actions/products';

const FORM_UPDATE = 'UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };

    const updatedValidites = {
      ...state.inputValidites,
      [action.input]: action.isValid,
    };

    let updatedFormIsValid = true;
    for (const key in updatedValidites) {
      updatedFormIsValid = updatedFormIsValid && updatedValidites[key];
    }

    return {
      formIsValid: updatedFormIsValid,
      inputValues: updatedValues,
      inputValidites: updatedValidites,
    };
  }
  return state;
};

const EditProductScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const prodId = props.navigation.getParam('productId');
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  );

  // const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
  // const [titleIsValid, setTitleIsValid] = useState(false);
  // const [imageUrl, setImageUrl] = useState(
  //   editedProduct ? editedProduct.imageUrl : ''
  // );
  // const [price, setPrice] = useState('');
  // const [description, setDescription] = useState(
  //   editedProduct ? editedProduct.description : ''
  // );

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      description: editedProduct ? editedProduct.description : '',
      price: '',
    },
    inputValidites: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formisValid: editedProduct ? true : false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An error ocured', error, [{ text: 'Ok' }]);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong input', 'Please check the errors in the form', [
        { text: 'Ok' },
      ]);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      if (editedProduct) {
        await dispatch(
          updateProduct(
            prodId,
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl
          )
        );
      } else {
        await dispatch(
          createProduct(
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
            +formState.inputValues.price
          )
        );
      }

      props.navigation.goBack();
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);

    props.navigation.goBack();
  }, [dispatch, prodId, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const inputChangeHandler = useCallback(
    (inputIndetifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIndetifier,
      });
    },
    [dispatchFormState]
  );

  if (isLoading)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior='padding'
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id='title'
            label='Title'
            errorText='Pleae enter valid title'
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.title : ''}
            initiallyValid={!!editedProduct}
            required
          />

          <Input
            id='imageUrl'
            label='Image Url'
            errorText='Pleae enter valid image url'
            keyboardType='default'
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl : ''}
            initiallyValid={!!editedProduct}
            required
          />
          {editedProduct ? null : (
            <Input
              id='price'
              label='Price'
              errorText='Pleae enter valid price'
              keyboardType='decimal-pad'
              returnKeyType='next'
              required
              onInputChange={inputChangeHandler}
              min={0.1}
            />
          )}
          <Input
            id='description'
            label='Description'
            errorText='Pleae enter valid description'
            keyboardType='default'
            autoCapitalize='sentences'
            onInputChange={inputChangeHandler}
            autoCorrect
            multiline
            numberOfLines={3}
            initialValue={editedProduct ? editedProduct.description : ''}
            initiallyValid={!!editedProduct}
            required
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

EditProductScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam('submit');
  return {
    headerTitle: navData.navigation.getParam('productId')
      ? 'Edit Product'
      : 'Add product',
    headerRight: () => (
      <Ionicons
        name='md-checkmark'
        size={25}
        color='white'
        onPress={() => {
          submitFn();
        }}
      />
    ),
  };
};

export default EditProductScreen;
