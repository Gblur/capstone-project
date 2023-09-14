/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query getMapById($ID: ID!) {\n  mapById(id: $ID) {\n    nodes\n    edges\n    name\n    description\n  }\n}": types.GetMapByIdDocument,
    "mutation PostMap($input: Post!) {\n  postMap(input: $input) {\n    id\n    team\n    description\n    name\n    mapType\n  }\n}": types.PostMapDocument,
    "query SortMaps($input: SortByName) {\n  orderByName(orderBy: $input) {\n    id\n    team\n    description\n    nodes\n    edges\n    date\n    name\n    mapType\n  }\n}": types.SortMapsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getMapById($ID: ID!) {\n  mapById(id: $ID) {\n    nodes\n    edges\n    name\n    description\n  }\n}"): (typeof documents)["query getMapById($ID: ID!) {\n  mapById(id: $ID) {\n    nodes\n    edges\n    name\n    description\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation PostMap($input: Post!) {\n  postMap(input: $input) {\n    id\n    team\n    description\n    name\n    mapType\n  }\n}"): (typeof documents)["mutation PostMap($input: Post!) {\n  postMap(input: $input) {\n    id\n    team\n    description\n    name\n    mapType\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query SortMaps($input: SortByName) {\n  orderByName(orderBy: $input) {\n    id\n    team\n    description\n    nodes\n    edges\n    date\n    name\n    mapType\n  }\n}"): (typeof documents)["query SortMaps($input: SortByName) {\n  orderByName(orderBy: $input) {\n    id\n    team\n    description\n    nodes\n    edges\n    date\n    name\n    mapType\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;