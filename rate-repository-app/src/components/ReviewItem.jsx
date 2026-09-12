import { View, StyleSheet, Pressable } from 'react-native';

import Text from './Text';
import theme from '../theme';
import { formatDate } from '../utils/format';

const styles = StyleSheet.create({
  container: { backgroundColor: theme.colors.cardBackground, paddingHorizontal: 10, paddingVertical: 15 },
  contentRow: { flexDirection: 'row' },
  ratingBadge: {
    width: 40, height: 40, borderRadius: 20, borderWidth: 2,
    borderColor: theme.colors.primary, alignItems: 'center', justifyContent: 'center', marginRight: 10,
  },
  body: { flexShrink: 1 },
  reviewText: { marginTop: 8 },
  actionsRow: { flexDirection: 'row', marginTop: 15 },
  actionButton: { flex: 1, alignItems: 'center', paddingVertical: 12, borderRadius: 5 },
  viewButton: { backgroundColor: theme.colors.primary, marginRight: 5 },
  deleteButton: { backgroundColor: theme.colors.error, marginLeft: 5 },
});

const ReviewItem = ({ review, title, showActions, onViewRepository, onDelete, ...props }) => (
  <View style={styles.container} testID="reviewItem" {...props}>
    <View style={styles.contentRow}>
      <View style={styles.ratingBadge}>
        <Text color="primary" fontWeight="bold">{review.rating}</Text>
      </View>
      <View style={styles.body}>
        <Text fontWeight="bold">{title}</Text>
        <Text color="textSecondary">{formatDate(review.createdAt)}</Text>
        <Text style={styles.reviewText}>{review.text}</Text>
      </View>
    </View>
    {showActions && (
      <View style={styles.actionsRow}>
        <Pressable style={[styles.actionButton, styles.viewButton]} onPress={() => onViewRepository(review.repositoryId)}>
          <Text color="white" fontWeight="bold">View repository</Text>
        </Pressable>
        <Pressable style={[styles.actionButton, styles.deleteButton]} onPress={() => onDelete(review)}>
          <Text color="white" fontWeight="bold">Delete review</Text>
        </Pressable>
      </View>
    )}
  </View>
);

export default ReviewItem;