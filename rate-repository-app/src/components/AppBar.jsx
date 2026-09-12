import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link, useNavigate } from 'react-router-native';
import { useApolloClient } from '@apollo/client/react';
import Constants from 'expo-constants';

import Text from './Text';
import theme from '../theme';
import useCurrentUser from '../hooks/useCurrentUser';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
    flexDirection: 'row',
  },
  tab: { paddingHorizontal: 15, paddingVertical: 15 },
});

const AppBarTab = ({ to, label }) => (
  <Link to={to} style={styles.tab}>
    <Text color="white" fontWeight="bold">{label}</Text>
  </Link>
);

const AppBar = () => {
  const { currentUser } = useCurrentUser();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate('/');
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab to="/" label="Repositories" />
        {currentUser ? (
          <>
            <AppBarTab to="/create-review" label="Create a review" />
            <AppBarTab to="/my-reviews" label="My reviews" />
            <Pressable style={styles.tab} onPress={signOut}>
              <Text color="white" fontWeight="bold">Sign out</Text>
            </Pressable>
          </>
        ) : (
          <>
            <AppBarTab to="/signin" label="Sign in" />
            <AppBarTab to="/signup" label="Sign up" />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;