const umi = require("@metaplex-foundation/umi")


const test = require("./services/test")

test.getUri().then((res) => {
    console.log(res)
})
