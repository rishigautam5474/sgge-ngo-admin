import axiosInstance from "../lib/axiosInstance";

const authModel = class {

    async login(data) {
        return await axiosInstance.post("/auth/login", data);
    }

    async logout() {
        return await axiosInstance.get("/auth/logout");
    }

}

export default new authModel();
