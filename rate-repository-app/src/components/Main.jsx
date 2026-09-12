import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './RepositoryList';
import SingleRepository from './SingleRepository';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ReviewForm from './ReviewForm';
import MyReviews from './MyReviews';
import AppBar from './AppBar';
import theme from '../theme';

const styles = StyleSheet.create({
  container: { backgroundColor: theme.colors.mainBackground, flex: 1 },
});

const Main = () => (
  <View style={styles.container}>
    <AppBar />
    <Routes>
      <Route path="/" element={<RepositoryList />} />
      <Route path="/repositories/:id" element={<SingleRepository />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/create-review" element={<ReviewForm />} />
      <Route path="/my-reviews" element={<MyReviews />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </View>
);

export default Main;