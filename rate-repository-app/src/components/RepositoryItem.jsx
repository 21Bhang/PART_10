import { View, StyleSheet, Image, Pressable } from 'react-native';
import * as Linking from 'expo-linking';
import Text from './Text';
import theme from '../theme';
import { formatCount } from '../utils/format';

const styles = StyleSheet.create({
  container: { backgroundColor: theme.colors.cardBackground, paddingHorizontal: 10, paddingVertical: 15 },
  topRow: { flexDirection: 'row', alignItems: 'flex-start' },
  avatar: { width: 50, height: 50, borderRadius: 5, marginRight: 10 },
  languageBadge: {
    backgroundColor: theme.colors.primary, borderRadius: 4,
    paddingHorizontal: 8, paddingVertical: 4, alignSelf: 'flex-start', marginTop: 12,
  },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, paddingHorizontal: 5 },
  statColumn: { alignItems: 'center', flexGrow: 1 },
  githubButton: {
    backgroundColor: theme.colors.primary, borderRadius: 5,
    paddingVertical: 12, alignItems: 'center', marginTop: 15,
  },
});

const Stat = ({ value, label }) => (
  <View style={styles.statColumn}>
    <Text fontWeight="bold">{value}</Text>
    <Text color="textSecondary">{label}</Text>
  </View>
);

const RepositoryItem = ({ repository, showGitHubButton, ...props }) => {
  const {
    ownerAvatarUrl, fullName, description, language,
    stargazersCount, forksCount, reviewCount, ratingAverage, url,
  } = repository;

  const openInGitHub = async () => {
    if (url) await Linking.openURL(url);
  };

  return (
    <View style={styles.container} testID="repositoryItem" {...props}>
      <View style={styles.topRow}>
        <Image style={styles.avatar} source={{ uri: ownerAvatarUrl }} />
        <View style={{ flexShrink: 1 }}>
          <Text fontWeight="bold" fontSize="subheading">{fullName}</Text>
          <Text color="textSecondary" style={{ marginTop: 5 }}>{description}</Text>
        </View>
      </View>
      <View style={styles.languageBadge}>
        <Text color="white" fontWeight="bold">{language}</Text>
      </View>
      <View style={styles.statsRow}>
        <Stat value={formatCount(stargazersCount)} label="Stars" />
        <Stat value={formatCount(forksCount)} label="Forks" />
        <Stat value={formatCount(reviewCount)} label="Reviews" />
        <Stat value={formatCount(ratingAverage)} label="Rating" />
      </View>
      {showGitHubButton && (
        <Pressable style={styles.githubButton} onPress={openInGitHub}>
          <Text color="white" fontWeight="bold">Open in GitHub</Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;