import { StyleSheet, View, Pressable } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';

import Text from './Text';
import FormField from './FormField';
import useSignIn from '../hooks/useSignIn';
import theme from '../theme';

const styles = StyleSheet.create({
  container: { padding: 15 },
  button: {
    backgroundColor: theme.colors.primary, borderRadius: 5,
    paddingVertical: 12, alignItems: 'center', marginTop: 10,
  },
});

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const initialValues = { username: '', password: '' };

export const SignInContainer = ({ onSubmit, onError }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      onError={onError}
    >
      {({ handleSubmit, errors }) => (
        <View style={styles.container}>
          <FormField
            name="username"
            placeholder="Username"
            autoCapitalize="none"
            error={errors.username}
          />
          <FormField
            name="password"
            placeholder="Password"
            secureTextEntry
            error={errors.password}
          />
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text color="white" fontWeight="bold">Sign in</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      await signIn({ username: values.username, password: values.password });
      navigate('/');
    } catch (e) {
      console.error('Login error:', e);
      // Error is already displayed via Formik error state
    }
  };

  return <SignInContainer onSubmit={onSubmit} onError={console.error} />;
};

export default SignIn;
