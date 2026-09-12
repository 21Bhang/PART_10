import { StyleSheet, View, Pressable } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';

import Text from './Text';
import FormField from './FormField';
import useSignUp from '../hooks/useSignUp';
import theme from '../theme';

const styles = StyleSheet.create({
  container: { padding: 15 },
  button: {
    backgroundColor: theme.colors.primary, borderRadius: 5,
    paddingVertical: 12, alignItems: 'center', marginTop: 10,
  },
});

const validationSchema = yup.object().shape({
  username: yup.string().min(5).max(30).required('Username is required'),
  password: yup.string().min(5).max(50).required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Password confirmation must match')
    .required('Password confirmation is required'),
});

const initialValues = { username: '', password: '', passwordConfirmation: '' };

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormField name="username" placeholder="Username" autoCapitalize="none" />
          <FormField name="password" placeholder="Password" secureTextEntry />
          <FormField name="passwordConfirmation" placeholder="Password confirmation" secureTextEntry />
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text color="white" fontWeight="bold">Sign up</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      await signUp({ username: values.username, password: values.password });
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;