import { FlatList, View, StyleSheet, Alert } from 'react-native';
import { useNavigate } from 'react-router-native';

import ReviewItem from './ReviewItem';
import useCurrentUser from '../hooks/useCurrentUser';
import useDeleteReview from '../hooks/useDeleteReview';
import theme from '../theme';

const styles = StyleSheet.create({ separator: { height: 10 } });
const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { currentUser, refetch } = useCurrentUser({ includeReviews: true });
  const [deleteReview] = useDeleteReview();
  const navigate = useNavigate();

  const onDelete = (review) => {
    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      { text: 'CANCEL', style: 'cancel' },
      {
        text: 'DELETE',
        style: 'destructive',
        onPress: async () => {
          await deleteReview(review.id);
          refetch();
        },
      },
    ]);
  };

  const reviews = currentUser?.reviews?.edges.map((edge) => edge.node) ?? [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <ReviewItem
          review={item}
          title={item.repository?.fullName}
          showActions
          onViewRepository={(repositoryId) => navigate(`/repositories/${repositoryId}`)}
          onDelete={onDelete}
        />
      )}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;