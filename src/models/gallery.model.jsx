import axiosInstance from "../lib/axiosInstance"

const galleryModel = class {
    async getPhoto() {
        return await axiosInstance.get("/gallery");
    }

    async addPhoto(data) {
        return await axiosInstance.post("/gallery/add", data);
    }

    async deleteMedia(id) {
        return await axiosInstance.delete(`/gallery/${id}`);
    }
}

export default new galleryModel();