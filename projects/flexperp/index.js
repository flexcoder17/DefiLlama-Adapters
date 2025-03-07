const ADDRESSES = require("../helper/coreAssets.json");

const FDX = "0xE248c0bCE837B8dFb21fdfa51Fb31D22fbbB4380";
const LFDX = "0x8ae234597bf9670aa854e3928a2b016AF2cbA33b";
const AEROLP = "0x789e4612f6c2b1c851493f015de0b32b567c281d";
const fdxStakingAddress = "0xbD5E6070E1dd19Bd3af24A46caE2634dA9f22e5B";
const stfdxlpStakingAddress = "0xF00e53B7F3112834625f5AD5d47dA0e6E427E660";
const vaultStorageAddress = "0x1375653D8a328154327e48A203F46Aa70B6C0b92";

async function baseTvl(api) {
  const flpUnderlyings = [
    ADDRESSES.base.USDC,
    ADDRESSES.base.WETH,
    "0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf" // cbBTC
  ];
  
  // Fetch base TVL from FLP pool
  await api.sumTokens({ owner: vaultStorageAddress, tokens: flpUnderlyings });

  // Fetch LFDX and AEROLP balances
  const balances = await api.sumTokens({ 
    owners: [fdxStakingAddress, stfdxlpStakingAddress], 
    tokens: [LFDX, AEROLP] 
  });

  if (balances[`base:${LFDX.toLowerCase()}`]) {
    api.add(FDX, balances[`base:${LFDX.toLowerCase()}`]);
  }
}

module.exports = {
  start: '2025-02-20',
  base: {
    tvl: baseTvl,
  },
};
