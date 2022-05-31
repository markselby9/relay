/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @generated SignedSource<<533a9e5bd44f5a20a553cd18824d9310>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type RelayReaderClientEdgesTest7Query$variables = {||};
export type RelayReaderClientEdgesTest7Query$data = {|
  +me: ?{|
    +null_client_edge: ?{|
      +name: ?string,
    |},
  |},
|};
export type RelayReaderClientEdgesTest7Query = {|
  response: RelayReaderClientEdgesTest7Query$data,
  variables: RelayReaderClientEdgesTest7Query$variables,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "RelayReaderClientEdgesTest7Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "kind": "ClientEdgeToServerObject",
            "operation": require('./ClientEdgeQuery_RelayReaderClientEdgesTest7Query_me__null_client_edge.graphql'),
            "backingField": {
              "alias": null,
              "args": null,
              "fragment": {
                "args": null,
                "kind": "FragmentSpread",
                "name": "UserNullClientEdgeResolver"
              },
              "kind": "RelayResolver",
              "name": "null_client_edge",
              "resolverModule": require('./../../../../relay-test-utils-internal/resolvers/UserNullClientEdgeResolver.js'),
              "path": "me.null_client_edge"
            },
            "linkedField": {
              "alias": null,
              "args": null,
              "concreteType": "User",
              "kind": "LinkedField",
              "name": "null_client_edge",
              "plural": false,
              "selections": [
                (v0/*: any*/)
              ],
              "storageKey": null
            }
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "RelayReaderClientEdgesTest7Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "706e58758dec3281bf6ae34dfed9489d",
    "id": null,
    "metadata": {},
    "name": "RelayReaderClientEdgesTest7Query",
    "operationKind": "query",
    "text": "query RelayReaderClientEdgesTest7Query {\n  me {\n    ...UserNullClientEdgeResolver\n    id\n  }\n}\n\nfragment UserNullClientEdgeResolver on User {\n  name\n}\n"
  }
};
})();

if (__DEV__) {
  (node/*: any*/).hash = "2bb6b1ba5045fb1a37b30e4f29e7b0df";
}

module.exports = ((node/*: any*/)/*: Query<
  RelayReaderClientEdgesTest7Query$variables,
  RelayReaderClientEdgesTest7Query$data,
>*/);
