import React, { useState, useeRef, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
  Alert,
  Image,
} from 'react-native';
import Colors from '../constants/colors';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <TitleText>Game over</TitleText>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../assets/success.png')}
          // source={{
          //   uri:
          //     'https://media.istockphoto.com/photos/ama-dablam-mount-in-the-nepal-himalaya-picture-id485966046?k=6&m=485966046&s=612x612&w=0&h=rpI0-lFzV1XwBNwV5stQy_cDeICYTN8xGn_O0dOlync=',
          // }}
          fadeDuration={500}
        />
      </View>
      <BodyText style={styles.resultText}>
        Number of rounds:{' '}
        <Text style={styles.highlight}>{props.roundsNumber}</Text> Number was{' '}
        <Text style={styles.highlight}>{props.userNumber}</Text>
      </BodyText>
      <MainButton onPress={props.onRestart}>New Game</MainButton>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    borderRadius: 150,
    borderWidth: 3,
    borderColor: 'black',
    width: 300,
    height: 300,
    overflow: 'hidden',
    margin: 30,
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold',
  },
  resultText: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20,
  },
});

export default GameOverScreen;
