"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextHelper = void 0;
/**
 * Helper functions for use with text.
 */
var TextHelper = /** @class */ (function () {
    function TextHelper() {
    }
    /**
     * Encode Non ASCII characters to escaped characters.
     * @param value The value to encode.
     * @returns The encoded value.
     */
    TextHelper.encodeNonASCII = function (value) {
        return typeof (value) === "string" ?
            value.replace(/[\u007F-\uFFFF]/g, function (chr) { return "\\u" + ("0000" + chr.charCodeAt(0).toString(16)).substr(-4); })
            : undefined;
    };
    /**
     * Decode escaped Non ASCII characters.
     * @param value The value to decode.
     * @returns The decoded value.
     */
    TextHelper.decodeNonASCII = function (value) {
        return typeof (value) === "string" ?
            value.replace(/\\u([\d\w]{4})/gi, function (match, grp) { return String.fromCharCode(parseInt(grp, 16)); }) :
            undefined;
    };
    return TextHelper;
}());
exports.TextHelper = TextHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dEhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy90ZXh0SGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBOztHQUVHO0FBQ0g7SUFBQTtJQXNCQSxDQUFDO0lBckJHOzs7O09BSUc7SUFDVyx5QkFBYyxHQUE1QixVQUE2QixLQUFhO1FBQ3RDLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDO1lBQ2hDLEtBQUssQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsVUFBQSxHQUFHLElBQUksT0FBQSxRQUFNLENBQUMsU0FBTyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBRyxFQUE1RCxDQUE0RCxDQUFDO1lBQ3RHLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDcEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDVyx5QkFBYyxHQUE1QixVQUE2QixLQUFhO1FBQ3RDLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDO1lBQ2hDLEtBQUssQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsVUFBQyxLQUFLLEVBQUUsR0FBRyxJQUFLLE9BQUEsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQXRDLENBQXNDLENBQUMsQ0FBQyxDQUFDO1lBQzNGLFNBQVMsQ0FBQztJQUNsQixDQUFDO0lBQ0wsaUJBQUM7QUFBRCxDQUFDLEFBdEJELElBc0JDO0FBdEJZLGdDQUFVIn0=