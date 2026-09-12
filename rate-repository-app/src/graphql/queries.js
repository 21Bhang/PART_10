import { gql } from '@apollo/client';

import { REPOSITORY_FIELDS, PAGINATION_FIELDS } from './fragments';

export const GET_REPOSITORIES = gql`
  query getRepositories(
    $first: Int
    $after: String
    $searchKeyword: String
    $orderBy: RepositoryOrderField
    $orderDirection: OrderDirection
  ) {
    repositories(
      first: $first
      after: $after
      searchKeyword: $searchKeyword
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      totalCount
      edges {
        node {
          ...RepositoryFields
        }
        cursor
      }
      pageInfo {
        ...PaginationFields
      }
    }
  }
  ${REPOSITORY_FIELDS}
  ${PAGINATION_FIELDS}
`;

export const GET_REPOSITORY = gql`
  query getRepository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      ...RepositoryFields
      reviews(first: $first, after: $after) {
        totalCount
        edges {
          node {
            id
            text
            rating
            createdAt
            repositoryId
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          ...PaginationFields
        }
      }
    }
  }
  ${REPOSITORY_FIELDS}
  ${PAGINATION_FIELDS}
`;

export const GET_CURRENT_USER = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        totalCount
        edges {
          node {
            id
            text
            rating
            createdAt
            repositoryId
            repository {
              id
              fullName
            }
          }
          cursor
        }
        pageInfo {
          ...PaginationFields
        }
      }
    }
  }
  ${PAGINATION_FIELDS}
`;