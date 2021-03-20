// --------------------------------------------------------------------
// Example: node fetch.js 0xa2e1624116Ac3C9deC0e4F0d697063f30c732F2D
// Options:
//        -f, force overwrite
// Validates eth address, fetches and tidies up assets from OpenSea API
// --------------------------------------------------------------------

const axios = require("axios")
const fs = require("fs")

// Validate eth address or exit
const isEthAddress = (address) => {
  if (/^(0x){1}[0-9a-fA-F]{40}$/i.test(address) == false) {
    console.log("Enter a valid wallet address.")
    return process.exit(1)
  } else {
    return address
  }
}

// Modify the tokens coming from OpenSea
const formatTokens = (tokenArray, owner) => {
  var formattedTokens = []
  tokenArray.forEach((ufT) => {
    let fT = {
      id: ufT.id,
      token_id: ufT.token_id,
      name: ufT.name,
      hidden: false,
      private: false,
      description: ufT.description || null,
      collection: ufT.collection.name || null,
      created_by: ufT.creator.address || null,
      owned_by: owner,
      created_by_owner: ufT.creator == owner,
      properties: ufT.traits,
      featured: false,
      timestamp: null,
      created_at: ufT.asset_contract.created_date || null,
      tags: [],
      meta_title: null,
      meta_description: null,
    }
    // @ts-ignore
    fT.contract = {
      contract_address: ufT.asset_contract.address || null,
      contract_name: ufT.asset_contract.name || null,
      contract_symbol: ufT.asset_contract.symbol || null,
      contract_description: ufT.asset_contract.description || null,
      contract_external_url: ufT.asset_contract.external_link || null,
    }
    // @ts-ignore
    fT.media = {
      image_url: ufT.image_url || null,
      video_url: ufT.video_url || null,
      audio_url: ufT.audio_url || null,
    }
    formattedTokens.push(fT)
  })
  return formattedTokens
}

// Read JSON from file
const readData = (path) => {
  try {
    let rawdata = fs.readFileSync(path)
    return JSON.parse(rawdata)
  } catch (err) {
    console.error("No existing " + output + ". Creating new file.")
  }
}

// Write JSON to file
const storeData = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data, null, 4))
  } catch (err) {
    console.error(err)
  }
}

// If user has changed properties of tokens in rodeo.json, these will
// not be overwritten by an update. If you delete a token in rodeo.json,
// it will be restored on re-running of the script.

const syncData = () => {
  let savedTokens = readData(output) || []
  let owner = isEthAddress(process.argv[3])
  let force_overwrite = process.argv[3] == "-f"
  let uri =
    "https://api.opensea.io/api/v1/assets?&order_direction=desc&offset=0&limit=100&owner=" +
    owner

  axios
    .get(uri)
    .then((response) => {
      let tokenArray = response.data.assets
      let formattedTokens = formatTokens(tokenArray, owner)
      if (force_overwrite) {
        return storeData(formattedTokens, output)
      } else {
        let syncedArray = []
        savedTokens.forEach((savedTokenData) => {
          let matchIndex = formattedTokens.findIndex(
            (newTokenData) => newTokenData.token_id == savedTokenData.token_id
          )
          if (matchIndex != -1) {
            let newlyPulledData = formattedTokens[matchIndex]
            let synced = Object.assign(newlyPulledData, savedTokenData)
            syncedArray.push(synced)
            formattedTokens.splice(matchIndex, 1)
          }
        })
        formattedTokens.forEach((x) => syncedArray.push(x))
        storeData(syncedArray, output)
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

<<<<<<< HEAD
let output = "./rodeo.json"
=======
let owner = isEthAddress(process.argv[2])
let force_overwrite = process.argv[3] == '-f'
let uri = 'https://api.opensea.io/api/v1/assets?&order_direction=desc&offset=0&limit=100&owner=' + owner
let output = './rodeo.json'
>>>>>>> 371532db1f05d3a16637873cbb3e4e04798d0446

export default syncData
