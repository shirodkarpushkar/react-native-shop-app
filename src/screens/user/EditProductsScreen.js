import React, {useState, useEffect, useCallback, useReducer} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/products';

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

const EditProductScreen = props => {
  const productId = props.route.params.productId;
  const editedProduct = useSelector(state =>
    state.products.userProducts.find(prod => prod.id === productId),
  );

  const [loader, setLoader] = useState(false);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      description: editedProduct ? editedProduct.description : '',
      price: '',
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  useEffect(() => {
    props.navigation.setOptions({
      title: editedProduct ? 'Edit Product' : 'Add Product',
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Save"
            iconName={
              Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
            }
            onPress={() => submitHandler()}
          />
        </HeaderButtons>
      ),
    });
  });

  const dispatch = useDispatch();
  /* handler */
  const textChangeHandler = (input, text) => {
    let isValid = false;
    if (text.trim().length) {
      isValid = true;
    } else {
      isValid = false;
    }
    dispatchFormState({
      type: FORM_UPDATE,
      value: text,
      isValid,
      input,
    });
  };
  const submitHandler = async () => {
    if (formState.formIsValid) {
      const data = {
        ...formState.inputValues,
      };
      setLoader(true);

      if (editedProduct) {
        /* edit product */
        await dispatch(
          productsActions.updateProduct(
            productId,
            data.title,
            data.description,
            data.imageUrl,
          ),
        );
      } else {
        /* create new product */
        await dispatch(
          productsActions.createProduct(
            data.title,
            data.description,
            data.imageUrl,
            data.price,
          ),
        );
      }
      setLoader(true);

      props.navigation.goBack();
    } else {
      Alert.alert('Invalid Form!', ' Please check your input', [
        {text: 'Okay'},
      ]);
    }
  };
  
  
  if (loader) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.keyboard}>
      <ScrollView>
        <View style={styles.form}>
          <View style={styles.formControl}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              value={formState.inputValues.title}
              onChangeText={text => textChangeHandler('title', text)}
              autoCapitalize="sentences"
            />
            {!formState.inputValidities.title && (
              <Text style={styles.errorText}> This field is required. </Text>
            )}
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>Image URL</Text>
            <TextInput
              style={styles.input}
              value={formState.inputValues.imageUrl}
              onChangeText={text => textChangeHandler('imageUrl', text)}
            />
            {!formState.inputValidities.imageUrl && (
              <Text style={styles.errorText}> This field is required. </Text>
            )}
          </View>
          {editedProduct ? null : (
            <View style={styles.formControl}>
              <Text style={styles.label}>Price</Text>
              <TextInput
                style={styles.input}
                value={formState.inputValues.price}
                onChangeText={text => textChangeHandler('price', text)}
                keyboardType="decimal-pad"
              />
              {!formState.inputValidities.price && (
                <Text style={styles.errorText}> This field is required. </Text>
              )}
            </View>
          )}
          <View style={styles.formControl}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.input}
              value={formState.inputValues.description}
              onChangeText={text => textChangeHandler('description', text)}
              multiline
              numberOfLines={3}
              returnKeyType="done"
            />
            {!formState.inputValidities.description && (
              <Text style={styles.errorText}> This field is required. </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
  },
  form: {
    margin: 20,
  },
  formControl: {
    width: '100%',
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  errorText: {
    color: 'red',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default EditProductScreen;
