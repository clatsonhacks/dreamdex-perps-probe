# dreamdex-perps-probe

A read-only probe of every dreamDEX perp market on **Somnia Tokyo testnet (chain 50383)**, built on [`@somnia-chain/markets-sdk`](https://www.npmjs.com/package/@somnia-chain/markets-sdk) 0.32.1.

For each market it reads:

- the market list from the indexer (`client.listPerpMarkets`)
- mark price, index price, funding rate and open interest from the pool on chain (`client.getPerpState`)
- whether the mark feed is live (`client.getPerpFeedStatus`)

No private key, no transactions.

## Run

```
npm install
npm run probe
```

Requires Node 20+. Endpoints (Somnia Tokyo / Hideki):

| What | Value |
|---|---|
| Chain ID | 50383 |
| WebSocket RPC | `wss://api.hideki2.infra.testnet.somnia.network/ws` |
| HTTP RPC | `https://api.hideki2.infra.testnet.somnia.network` |
| Indexer | `https://hideki-dev.smk.somnia.host/v1/graphql` |

## Latest run

```
dreamDEX perps on Somnia Tokyo (chain 50383) — 21 markets — 2026-10-22T20:09:31.108Z — block 30477412
┌─────────┬─────────────────┬──────────────┬─────────────┬──────────┬──────────────┬───────────────┐
│ (index) │ market          │ mark         │ index       │ markLive │ funding 8h % │ open interest │
├─────────┼─────────────────┼──────────────┼─────────────┼──────────┼──────────────┼───────────────┤
│ 0       │ 'ZRO-PERP'      │ '1.7937'     │ '1.7925'    │ 'yes'    │ '0.01'       │ '11426'       │
│ 1       │ 'LIT-PERP'      │ '3.6377'     │ '3.6419'    │ 'yes'    │ '-0.0542'    │ '2747.1'      │
│ 2       │ 'VVV-PERP'      │ '26.0987'    │ '26.0983'   │ 'yes'    │ '0.01'       │ '282.59'      │
│ 3       │ '1000PEPE-PERP' │ '0.0043'     │ '0.0043'    │ 'yes'    │ '0.01'       │ '1611200'     │
│ 4       │ 'PUMP-PERP'     │ '0.0046'     │ '0.0046'    │ 'yes'    │ '0.01'       │ '1960000'     │
│ 5       │ 'ZEC-PERP'      │ '1216.6836'  │ '1216.6486' │ 'yes'    │ '0.01'       │ '98.13'       │
│ 6       │ 'TAO-PERP'      │ '256.6204'   │ '256.7688'  │ 'yes'    │ '0.01'       │ '105.18'      │
│ 7       │ 'WLD-PERP'      │ '0.5524'     │ '0.553'     │ 'yes'    │ '0.0089'     │ '217699'      │
│ 8       │ 'NEAR-PERP'     │ '4.8989'     │ '4.9016'    │ 'yes'    │ '0.01'       │ '214666.2'    │
│ 9       │ 'XLM-PERP'      │ '0.1758'     │ '0.1759'    │ 'yes'    │ '0.01'       │ '221340'      │
│ 10      │ 'AVAX-PERP'     │ '9.1017'     │ '9.1084'    │ 'yes'    │ '0.01'       │ '7339.9'      │
│ 11      │ 'LINK-PERP'     │ '11.9271'    │ '11.9365'   │ 'yes'    │ '0.01'       │ '3474.1'      │
│ 12      │ 'SUI-PERP'      │ '0.974'      │ '0.9745'    │ 'yes'    │ '0.01'       │ '284389'      │
│ 13      │ 'ADA-PERP'      │ '0.2117'     │ '0.2119'    │ 'yes'    │ '0.01'       │ '115264'      │
│ 14      │ 'BNB-PERP'      │ '731.0886'   │ '731.1259'  │ 'yes'    │ '0.022'      │ '247.28'      │
│ 15      │ 'DOGE-PERP'     │ '0.0785'     │ '0.0786'    │ 'yes'    │ '0.01'       │ '1990830'     │
│ 16      │ 'XRP-PERP'      │ '1.3023'     │ '1.3029'    │ 'yes'    │ '-0.0913'    │ '781329.7'    │
│ 17      │ 'HYPE-PERP'     │ '77.5037'    │ '77.5335'   │ 'yes'    │ '0.01'       │ '17837.33'    │
│ 18      │ 'SOL-PERP'      │ '103.5249'   │ '103.5774'  │ 'yes'    │ '0.1016'     │ '26595.82'    │
│ 19      │ 'ETH-PERP'      │ '2383.815'   │ '2384.559'  │ 'yes'    │ '0.01'       │ '735.33'      │
│ 20      │ 'BTC-PERP'      │ '81328.7817' │ '81356.767' │ 'yes'    │ '0.1481'     │ '320.19'      │
└─────────┴─────────────────┴──────────────┴─────────────┴──────────┴──────────────┴───────────────┘
```

Funding is shown per 8 hours (`fundingRate8h`); prices are USDso per whole base unit; open interest is in base units.
