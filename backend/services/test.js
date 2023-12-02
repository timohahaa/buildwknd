const umi = require("../configs/config").umi
const NFT_STORAGE_TOKEN = require("../configs/config").NFT_STORAGE_TOKEN

const nftStorage = require("@metaplex-foundation/umi-uploader-nft-storage").nftStorageUploader

umi.use(nftStorage({token: NFT_STORAGE_TOKEN}));


// Upload the JSON metadata.

const getUri = async function() {
  return umi.uploader.uploadJson({
    name: "My NFT #1",
    description: "My description",
    image: "file:///filename.txt",
  })
}
module.exports = {
  getUri,
}
