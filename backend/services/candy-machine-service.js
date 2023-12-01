import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { mplCandyMachine } from "@metaplex-foundation/mpl-candy-machine";

// Use the RPC endpoint of your choice.
export const umi = createUmi("http://127.0.0.1:8899").use(mplCandyMachine());

export class CandyMachineService {
    constructor(
        umi,
    ) {
        // init the umi node
        this.umi = umi
    }
}