import { asciiToTrytes, TRYTE_ALPHABET, trytesToAscii } from "@iota/converter";
import * as crypto from "crypto";
import { TextHelper } from "./textHelper";

/**
 * Helper functions for use with trytes.
 */
export class TrytesHelper {
    /**
     * Convert an object to Trytes.
     * @param obj The obj to encode.
     * @returns The encoded trytes value.
     */
    public static toTrytes(obj: unknown): string {
        const json = JSON.stringify(obj);
        const encoded = TextHelper.encodeNonASCII(json);
        return encoded ? asciiToTrytes(encoded) : "";
    }

    /**
     * Convert an object from Trytes.
     * @param trytes The trytes to decode.
     * @returns The decoded object.
     */
    public static fromTrytes<T>(trytes: string): T {
        if (typeof (trytes) !== "string") {
            throw new Error("fromTrytes can only convert strings");
        }

        // Trim trailing 9s
        const trimmed = trytes.replace(/\9+$/, "");

        if (trimmed.length === 0) {
            throw new Error("fromTrytes trytes does not contain any data");
        }

        const ascii = trytesToAscii(trimmed);
        const json = TextHelper.decodeNonASCII(ascii);
        return json ? JSON.parse(json) : undefined;
    }

    /**
     * Generate a random hash.
     * @param length The length of the hash.
     * @returns The hash.
     */
    public static generateHash(length: number = 81): string {
        let hash = "";

        while (hash.length < length) {
            const byte = crypto.randomBytes(1);
            if (byte[0] < 243) {
                hash += TRYTE_ALPHABET.charAt(byte[0] % 27);
            }
        }

        return hash;
    }
}
