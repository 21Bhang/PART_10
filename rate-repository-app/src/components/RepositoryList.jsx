import { FlatList, View, StyleSheet, Pressable, TextInput } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: { height: 10 },
  header: { backgroundColor: theme.colors.cardBackground, paddingBottom: 5 },
  searchContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f2f5',
    borderRadius: 24, marginHorizontal: 10, marginTop: 10, marginBottom: 5,
    paddingHorizontal: 12, height: 44,
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: theme.fontSizes.body, color: theme.colors.textPrimary },
  clearButton: { paddingLeft: 8 },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SearchBar = ({ value, onChange }) => (
  <View style={styles.searchContainer}>
    <Ionicons name="search" size={20} color={theme.colors.textSecondary} />
    <TextInput
      style={styles.searchInput}
      placeholder="Search repositories"
      value={value}
      onChangeText={onChange}
      autoCapitalize="none"
    />
    {value.length > 0 && (
      <Pressable style={styles.clearButton} onPress={() => onChange('')}>
        <Ionicons name="close-circle" size={20} color={theme.colors.textSecondary} />
      </Pressable>
    )}
  </View>
);

const ListHeader = ({ keyword, setKeyword, order, setOrder }) => (
  <View style={styles.header}>
    <SearchBar value={keyword} onChange={setKeyword} />
    <Picker selectedValue={order} onValueChange={(value) => value && setOrder(value)}>
      <Picker.Item label="Select an item..." value="" enabled={false} color={theme.colors.textSecondary} />
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highest" />
      <Picker.Item label="Lowest rated repositories" value="lowest" />
    </Picker>
  </View>
);

export const RepositoryListContainer = ({ repositories, onEndReached, onRepositoryPress, header, ...props }) => {
  const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={header}
      renderItem={({ item }) => (
        <Pressable onPress={() => onRepositoryPress(item.id)}>
          <RepositoryItem repository={item} />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      {...props}
    />
  );
};

const RepositoryList = () => {
  const [order, setOrder] = useState('latest');
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword, 500);
  const navigate = useNavigate();

  const { repositories, fetchMore } = useRepositories({
    first: 8,
    orderBy: order === 'latest' ? 'CREATED_AT' : 'RATING_AVERAGE',
    orderDirection: order === 'lowest' ? 'ASC' : 'DESC',
    searchKeyword: debouncedKeyword,
  });

  return (
    <RepositoryListContainer
      repositories={repositories}
      onEndReached={fetchMore}
      onRepositoryPress={(id) => navigate(`/repositories/${id}`)}
      header={<ListHeader keyword={keyword} setKeyword={setKeyword} order={order} setOrder={setOrder} />}
    />
  );
};

export default RepositoryList;