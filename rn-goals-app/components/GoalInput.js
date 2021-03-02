import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, Modal } from 'react-native';

const GoalInput = (props) => {
  const [enteredGoal, setEnteredGoal] = useState('');
  console.log('test');
  return (
    <Modal visible={props.visible} animationType='slide'>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={props.inputPlaceholder}
          style={styles.input}
          onChangeText={(e) => setEnteredGoal(e)}
          value={enteredGoal}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title='CANCEL'
              color='red'
              onPress={() => {
                props.onCancel();
                setEnteredGoal('');
              }}
            />
          </View>
          <View style={styles.button}>
            <Button
              title='ADD'
              onPress={() => {
                props.addGoalHanlder(enteredGoal);
                setEnteredGoal('');
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginBottom: 5,
    width: '80%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
  button: {
    width: '40%',
  },
});

export default GoalInput;
