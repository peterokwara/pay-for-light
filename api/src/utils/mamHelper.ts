import { composeAPI } from "@iota/core";
import { createChannel, createMessage, mamAttach } from "@iota/mam.js";
import config from "../data/config.local.json";
import { INodeConfiguration } from "../models/configuration/INodeConfiguration";
import { TrytesHelper } from "./trytesHelper";

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
    public async create(asciiMessage: object): Promise<void> {
        try {

            // set up details for the channel
            const mode = "public";

            // create a new mam channel
            const channelState = createChannel(TrytesHelper.generateHash(81), 2, mode);

            // Create a MAM message using the channel state.
            const mamMessage = createMessage(channelState, TrytesHelper.toTrytes(asciiMessage));

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
            throw new Error(`Could not store the message on the mam channel ${error} `);
        }

    }
}
