/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getHvData = /* GraphQL */ `
  query GetHvData($id: ID!) {
    getHvData(id: $id) {
      id
      html
      author
      title
      updatedAt
    }
  }
`;
export const listHvData = /* GraphQL */ `
  query ListHvData(
    $filter: ModelHvDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHvData(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        html
        author
        title
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      img
      joinId
      friends
    }
  }
`;
export const listUser = /* GraphQL */ `
  query ListUser(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUser(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        img
        joinId
        friends
      }
      nextToken
    }
  }
`;
export const getShareComp = /* GraphQL */ `
  query GetShareComp($id: ID!) {
    getShareComp(id: $id) {
      id
      html
      author
      name
      descript
      createdAt
      updatedAt
    }
  }
`;
export const listShareComps = /* GraphQL */ `
  query listShareComps(
    $filter: ModelShareCompFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShareComps(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        html
        author
        name
        descript
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;