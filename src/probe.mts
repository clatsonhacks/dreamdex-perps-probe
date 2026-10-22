// Read-only probe of every dreamDEX perp market on Somnia Tokyo testnet (chain 50383).
// Lists the markets from the indexer, then reads each pool on chain: mark and index price,
// feed status, funding rate and open interest. No key, no transactions.
//
// Run: npm run probe
import { SomniaMarkets, fundingRate8h } from "@somnia-chain/markets-sdk";
import { createPublicClient, defineChain, formatUnits, http } from "viem";

const RPC = "https://api.hideki2.infra.testnet.somnia.network";
const WS = "wss://api.hideki2.infra.testnet.somnia.network/ws";
const INDEXER = "https://hideki-dev.smk.somnia.host/v1/graphql";

const somniaTokyo = defineChain({
  id: 50383,
  name: "Somnia Tokyo testnet",
  nativeCurrency: { name: "Somnia Test Token", symbol: "STT", decimals: 18 },
  rpcUrls: { default: { http: [RPC], webSocket: [WS] } },
});

const { client } = new SomniaMarkets({ chain: somniaTokyo, wsRpcUrl: WS, indexerUrl: INDEXER });

/** A decimal string with at most `digits` fraction digits, without float rounding noise. */
const fmt = (raw: bigint, decimals: number, digits = 4) => {
  const [whole, frac = ""] = formatUnits(raw, decimals).split(".");
  const cut = frac.slice(0, digits).replace(/0+$/, "");
  return cut ? `${whole}.${cut}` : whole;
};

const markets = await client.listPerpMarkets();
const rows = [];
for (const m of markets) {
  const [state, feed] = await Promise.all([client.getPerpState(m.poolAddress), client.getPerpFeedStatus(m.poolAddress)]);
  rows.push({
    market: `${m.baseSymbol}-PERP`,
    mark: fmt(state.markPrice, 18),
    index: fmt(state.indexPrice, 18),
    markLive: feed.markPriceOk ? "yes" : "NO",
    // fundingRate8h is a 1e18-scaled fraction; 1e16 scale = percent.
    "funding 8h %": fmt(fundingRate8h(state.fundingRate, state.fundingWindowSec), 16),
    "open interest": fmt(state.openInterest, m.baseDecimals, 2),
  });
}

const block = await createPublicClient({ chain: somniaTokyo, transport: http(RPC) }).getBlockNumber();
console.log(`dreamDEX perps on Somnia Tokyo (chain 50383) — ${markets.length} markets — ${new Date().toISOString()} — block ${block}`);
console.table(rows);
process.exit(0);
