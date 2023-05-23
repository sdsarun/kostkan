export function formatJSON(val = {}) {
    try {
        const string = JSON.stringify(val);
        const res = JSON.parse(string);
        return JSON.stringify(res, null, 2)
    } catch {
        const errorJson = {
            "error": `非法返回${val}`
        }
        return JSON.stringify(errorJson, null, 2)
    }
}