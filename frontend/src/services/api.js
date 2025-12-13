const BASE = "http://localhost:5000";

export default function API(path, token) {
    return {
        url: BASE + path,
        headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : ""
        }
    };
}