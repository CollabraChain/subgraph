# CollabraChain Mainnet Subgraph

This subgraph indexes events and entities from the CollabraChain protocol on the Base network. It provides a GraphQL interface to query on-chain data related to projects, users, reputations, and various contract events.

## Features
- Indexes project creation, reputation minting, approvals, transfers, and role changes
- Exposes entities for Users, Projects, and Reputations
- Enables querying of historical and current state for CollabraChain contracts

## Deployment

This subgraph is deployed and hosted on The Graph Studio:

**Deployed to:**
https://thegraph.com/studio/subgraph/collabrachain-mainnet

**Subgraph endpoints:**
- Queries (HTTP): `https://api.studio.thegraph.com/query/113915/collabrachain-mainnet/v0.0.1`

## Usage

You can use the endpoint above to run GraphQL queries against the indexed data. Example queries include fetching projects, users, reputations, and event logs.

## Development

- Schema: `schema.graphql`
- Mappings: `src/`
- Subgraph manifest: `subgraph.yaml`

To generate types and build the subgraph locally:

```sh
npm install
npm run codegen
npm run build
```

To deploy (requires authentication):

```sh
graph auth --studio <DEPLOY_KEY>
graph deploy --studio collabrachain-mainnet
```

## License

MIT 