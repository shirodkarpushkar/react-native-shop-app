import React, {useCallback, useReducer, useState} from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  TextInput,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native';

import Colors from '../../constants/Colors';
import Card from '../../components/UI/Card';
import Input from '../../components/UI/Input';
import {useDispatch} from 'react-redux';
import * as authActions from '../../store/actions/auth';
const FORM_UPDATE = 'UPDATE';

const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_UPDATE:
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value,
      };
      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid,
      };
      const formIsValid = Object.values(updatedValidities).every(
        value => value === true,
      );
      return {
        ...state,
        inputValues: updatedValues,
        inputValidities: updatedValidities,
        formIsValid,
      };

    default:
      return {...state};
  }
};

const AuthScreen = props => {
  const dispatch = useDispatch();
  const [btnloader, setBtnloader] = useState(false);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });
  const inputChangeHandler = useCallback(
    (input, value, isValid) => {
      dispatchFormState({
        type: FORM_UPDATE,
        value,
        isValid,
        input,
      });
    },
    [dispatchFormState],
  );

  const signinHandler = async () => {
    if (formState.formIsValid) {
      setBtnloader(true);
      try {
        await dispatch(
          authActions.login(
            formState.inputValues.email,
            formState.inputValues.password,
          ),
        );
      } catch (e) {
        console.log(e.toString())
        Alert.alert('Invalid Login Credentials!', e.message, [{text: 'Okay'}]);
      }

      setBtnloader(false);
    } else {
      Alert.alert('Invalid Form!', ' Please check your input', [
        {text: 'Okay'},
      ]);
    }
  };
  const register = () => {
    props.navigation.navigate('SignUp');
  };
  return (
    <KeyboardAvoidingView style={styles.screen}>
      <View style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
              {btnloader ? (
                <ActivityIndicator color={Colors.primary} />
              ) : (
                <Button
                  title="Login"
                  color={Colors.primary}
                  onPress={() => signinHandler()}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Register"
                color={Colors.accent}
                onPress={() => register()}
              />
            </View>
          </ScrollView>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  screenContent: {},
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default AuthScreen;
