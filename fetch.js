// --------------------------------------------------------------------
// Usage: node fetch.js 0xbcba11ef0dc585f028d8f4442e82ee6ceecbcbba
// Validates eth address, fetches and tidies up assets from OpenSea API
// --------------------------------------------------------------------

const axios = require('axios');
const fs = require('fs');

// Validate eth address or throw error
const isEthAddress = (address) => {
    if ((/^(0x){1}[0-9a-fA-F]{40}$/i.test(address)) == false) {
        throw 'Enter a valid wallet address.'
    } else {
        return address
    }
}

// Modify the tokens coming from OpenSea
const formatTokens = (tokenArray) => {
    var formattedTokens = []
    tokenArray.forEach(ufT => {
        let fT = {}

        fT.id = ufT.id
        fT.hidden = false
        fT.private = false
        fT.name = ufT.name
        // fT.type = ...
        fT.description = ufT.description
        fT.collection = ufT.collection.name
        fT.created_by = ufT.creator.address
        // implied by the api call that token belongs to this address
        fT.owned_by = owner
        fT.created_by_owner = (ufT.creator == owner)
        // fT.tx_hash = ...
        fT.contract = {}
        // propose shortening to .contract.address, .contract.name, etc.
        fT.contract.contract_address = ufT.asset_contract.address
        fT.contract.contract_name = ufT.asset_contract.name
        fT.contract.contract_symbol = ufT.asset_contract.symbol
        fT.contract.contract_description = ufT.asset_contract.description
        fT.contract.contract_external_url = ufT.asset_contract.external_link
        fT.media = {}
        fT.media.image_url = ufT.image_url
        fT.media.video_url = ufT.video_url
        fT.media.audio_url = ufT.audio_url
        // ?? properties == traits ??
        fT.properties = ufT.traits
        fT.featured = false
        fT.timestamp = "To Do"
        fT.created_at = ufT.asset_contract.created_date
        // not sure what published_at means
        fT.tags = []
        fT.meta_title = "To Do"
        fT.meta_description = "To Do"

        formattedTokens.push(fT)
    })
    return formattedTokens
}

// Write JSON to file
const storeData = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data, null, 4))
  } catch (err) {
    console.error(err)
  }
}

let owner = isEthAddress(process.argv[2])
let uri = 'https://api.opensea.io/api/v1/assets?&order_direction=desc&offset=0&limit=100&owner=' + owner

// OpenSea API.
axios.get(uri)
  .then(response => {
    let tokenArray = response.data.assets
    formattedTokens = formatTokens(tokenArray)
    storeData(formattedTokens,'./rodeo.json')
  })
  .catch(error => {
    console.log(error);
  });