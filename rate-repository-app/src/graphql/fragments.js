import { gql } from '@apollo/client';

export const REPOSITORY_FIELDS = gql`
  fragment RepositoryFields on Repository {
    id
    ownerAvatarUrl
    fullName
    description
    language
    forksCount
    stargazersCount
    ratingAverage
    reviewCount
    url
  }
`;

export const PAGINATION_FIELDS = gql`
  fragment PaginationFields on PageInfo {
    endCursor
    startCursor
    hasNextPage
  }
`;