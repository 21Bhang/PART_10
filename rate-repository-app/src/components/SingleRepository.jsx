import { FlatList, View, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';

import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import useRepository from '../hooks/useRepository';
import theme from '../theme';

const styles = StyleSheet.create({ separator: { height: 10 } });
const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, fetchMore } = useRepository(id, { first: 8 });

  if (!repository) return <View />;

  const reviews = repository.reviews ? repository.reviews.edges.map((e) => e.node) : [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} title={item.user.username} />}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => <RepositoryItem repository={repository} showGitHubButton />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;