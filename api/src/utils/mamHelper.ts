import { asciiToTrytes } from "@iota/converter";
import { composeAPI } from "@iota/core";
import { createChannel, createMessage, mamAttach } from "@iota/mam.js";
import crypto from "crypto";
import config from "../../data/config.local.json";
import { INodeConfiguration } from "../models/configuration/INodeConfiguration";

/**
 * Class to handle the storage of information on the mam channel
 */
export class MamHelper {

    /**
     * Node configuratin settins
     */
    private readonly _nodeConfig: INodeConfiguration;

    constructor() {
        this._nodeConfig = config.node;
    }

    /**
     * Function to store information on the mam channel
     * @param asciiMessage The message to be stored on the mam channel
     */
    public async create(asciiMessage: string): Promise<void> {
        try {

            // set up details for the channel
            const mode = "public";

            // create a new mam channel
            const channelState = createChannel(this.generateSeed(81), 2, mode);

            // Create a MAM message using the channel state.
            const mamMessage = createMessage(channelState, asciiToTrytes(asciiMessage));

            // Display the details for the MAM message.
            console.log("Seed:", channelState.seed);
            console.log("Address:", mamMessage.address);
            console.log("Root:", mamMessage.root);
            console.log("NextRoot:", channelState.nextRoot);

            const iota = composeAPI({
                provider: this._nodeConfig.provider
            });
            // Attach the message.
            console.log("Attaching to tangle, please wait...");

            await mamAttach(iota, mamMessage, this._nodeConfig.depth, this._nodeConfig.mwm);

            console.log(`You can view the mam channel here https://utils.iota.org/mam/${mamMessage.root}/devnet`);

        } catch (error) {
            throw new Error("Could not store the message on the mam channel");
        }

    }

    /**
     * Function for creating iota seeds
     * @param length the length of the seed
     * @returns the generate seed
     */
    public generateSeed(length: number): string {
        const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ9";
        let seed = "";
        while (seed.length < length) {
            const byte = crypto.randomBytes(1);
            if (byte[0] < 243) {
                seed += charset.charAt(byte[0] % 27);
            }
        }
        return seed;
    }
}
