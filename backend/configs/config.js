const generateSigner = require("@metaplex-foundation/umi").generateSigner

const createUmi = require("@metaplex-foundation/umi-bundle-defaults").createUmi

// Use the RPC endpoint of your choice.
const umi = createUmi("http://127.0.0.1:8899")

const myCustomAuthority = generateSigner(umi)

const NFT_STORAGE_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDNGQjZDMDMzMjlkNmIzYWUyQTQwMUU1MUZFMzc4RTQzN0U1M0UyNmMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwMTQ3Mjc3OTIwNiwibmFtZSI6IlRlbW9mZXlhIn0.VwaD162sUoHf5aTCpx273MEABj5kMIEwdZckR7uOwlE"

module.exports = {
    myCustomAuthority,
    umi,
    NFT_STORAGE_TOKEN,
}