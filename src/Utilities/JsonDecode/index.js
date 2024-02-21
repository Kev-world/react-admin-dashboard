import { jwtDecode } from "jwt-decode";

export const decodeToken = (accessToken) => {
    const jwt = jwtDecode(accessToken)
    return jwt.sub
}