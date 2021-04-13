import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useReducer, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  Button,
  Alert,
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import Card from '../../components/UI/Card';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';
import { login, signup } from '../../store/actions/auth';

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

const AuthScreen = (props) => {
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidites: {
      email: false,
      password: false,
    },
    formisValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured', error, [{ text: 'Ok' }]);
    }
  }, [error]);

  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = signup(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate('Shop');
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

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

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior='padding'
      keyboardVerticalOffset={50}
    >
      <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id='email'
              label='E-mail'
              keyboardType='email-address'
              required
              email
              autoCapitaliza={false}
              errorText='Please enter valid email address'
              onInputChange={inputChangeHandler}
              initialValue=''
            />
            <Input
              id='password'
              label='Password'
              keyboardType='default'
              secureTextEntry
              required
              minLength={5}
              autoCapitaliza='none'
              errorText='Please enter valid password'
              onInputChange={inputChangeHandler}
              initialValue=''
            />
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size='small' color={Colors.primary} />
              ) : (
                <Button
                  title={isSignup ? 'Signup' : 'Login'}
                  color={Colors.primary}
                  onPress={authHandler}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignup ? 'Login' : 'Singup'}`}
                color={Colors.accent}
                onPress={() => {
                  setIsSignup((prevState) => !prevState);
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: 'Authenticate',
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 15,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default AuthScreen;
