import { StyleSheet, View, Pressable } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';

import Text from './Text';
import FormField from './FormField';
import useCreateReview from '../hooks/useCreateReview';
import theme from '../theme';

const styles = StyleSheet.create({
  container: { padding: 15 },
  button: {
    backgroundColor: theme.colors.primary, borderRadius: 5,
    paddingVertical: 12, alignItems: 'center', marginTop: 10,
  },
});

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup.number().min(0).max(100).required('Rating is required'),
  text: yup.string(),
});

const initialValues = { ownerName: '', repositoryName: '', rating: '', text: '' };

export const ReviewFormContainer = ({ onSubmit }) => {
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormField name="ownerName" placeholder="Owner name (e.g. jaredpalmer)" autoCapitalize="none" />
          <FormField name="repositoryName" placeholder="Repo name (e.g. formik)" autoCapitalize="none" />
          <FormField name="rating" placeholder="Rating (0-100)" keyboardType="numeric" />
          <FormField name="text" placeholder="Review" multiline />
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text color="white" fontWeight="bold">Create a review</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

const ReviewForm = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const created = await createReview({
        ownerName: values.ownerName,
        repositoryName: values.repositoryName,
        rating: Number(values.rating),
        text: values.text,
      });
      navigate(`/repositories/${created.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return <ReviewFormContainer onSubmit={onSubmit} />;
};

export default ReviewForm;