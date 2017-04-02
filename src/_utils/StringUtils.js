class StringUtils {
    static trimToEmpty(value) {
        let result = "";
        if (typeof value === "string" && value.length) {
            result = value.trim();
        }
        return result;
    }
}

export default StringUtils;

