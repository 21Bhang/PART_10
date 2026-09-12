import { TextInput, StyleSheet } from 'react-native';
import { useField } from 'formik';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
    backgroundColor: theme.colors.cardBackground,
  },
  errorInput: { borderColor: theme.colors.error },
  errorText: { marginBottom: 10 },
});

const FormField = ({ name, placeholder, secureTextEntry, multiline, ...inputProps }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        style={[styles.input, showError && styles.errorInput]}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        value={field.value}
        onChangeText={helpers.setValue}
        onBlur={() => helpers.setTouched(true)} // <-- FIX IS HERE
        {...inputProps}
      />
      {showError && <Text color="error" style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormField;