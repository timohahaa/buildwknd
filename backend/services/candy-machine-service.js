const create = require("@metaplex-foundation/mpl-candy-machine").create

const createNft = require("@metaplex-foundation/mpl-token-metadata").createNft
const TokenStandard = require("@metaplex-foundation/mpl-token-metadata").createNft

const generateSigner = require("@metaplex-foundation/umi").generateSigner
const percentAmount = require("@metaplex-foundation/umi").percentAmount

const myCustomAuthority = require("../configs/config").myCustomAuthority

const mplCandyMachine = require("@metaplex-foundation/mpl-candy-machine").mplCandyMachine


class CandyMachineService{
    constructor(
        _umi
    ) {
        // add candy machine plugin
        _umi.use(mplCandyMachine())
        this.umi = _umi
    }

    async createCollection(
        userId, // userId is a generic web2 UUID in the DB
        collectionName,
        feePercentage,
        itemCount,
        nftName,
    ) {
        // Create the Collection NFT.
        const collectionUpdateAuthority = generateSigner(this.umi);
        const collectionMint = generateSigner(this.umi);

        await createNft(this.umi, {
        mint: collectionMint,
        authority: collectionUpdateAuthority,
        name: collectionName,
        //uri: "https://example.com/path/to/some/json/metadata.json",
        sellerFeeBasisPoints: percentAmount(feePercentage),
        isCollection: true,
        }).sendAndConfirm(this.umi).then(() => {
            // save collection mint and authority to DB
        });

        // Create the Candy Machine.
        const candyMachine = generateSigner(umi);

        await create(this.umi, {
        candyMachine,
        collectionMint: collectionMint.publicKey,
        collectionUpdateAuthority,
        tokenStandard: TokenStandard.NonFungible,
        sellerFeeBasisPoints: percentAmount(percentAmount),
        itemsAvailable: itemCount,
        creators: [
            {
            address: this.umi.identity.publicKey,
            verified: true,
            percentageShare: 100,
            },
        ],
        configLineSettings: some({
            prefixName: nftName + "#$ID+1$",
            nameLength: 0,
            prefixUri: "https://nftstorage.link/ipfs/",
            uriLength: 60,
            isSequential: false,
        }),
        }).sendAndConfirm(this.umi).then(() => {
            // save candy machine address to DB
        });
    }
}

module.exports = {
    CandyMachineService,
}