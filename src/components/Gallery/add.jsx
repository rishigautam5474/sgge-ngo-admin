import { useEffect, useRef, useState } from "react";
import galleryModel from "../../models/gallery.model";
import helper from "../../lib/helper";
import { useNavigate } from "react-router-dom";

export const MediaAdd = () => {
    const navigate = useNavigate();

  const handleSaveMedia = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      if (
        e.target.mediaUrl.files.length > 0 ||
        e.target.mediaType.value !== ""
      ) {
        const res = await galleryModel.addPhoto(formData);
        if (res) {
          helper.toast("success", res?.data?.message);
          navigate(-1);
        }
      } else {
        helper.toast("error", "Please select image");
      }
    } catch (error) {
      helper.toast("error", error?.response?.data?.message);
    }
  };

  return (
    <div className="container-fluid py-4 mt-2">
      <div className="d-flex justify-content-between align-items-center">
        <h6>Add Media</h6>
      </div>

      <div className="mt-3 p-2">
        <form method="post" onSubmit={handleSaveMedia}>
          <div className="mt-2 row">
            <div className="pb-2 col-6">
              <label className="form-label pb-2">Media</label>
              <input
                type="file"
                className="form-control"
                name="mediaUrl"
                required
              />
            </div>
            <div className="pb-2 col-6">
              <label className="form-label pb-2">Media Type</label>
              <select className="form-control" name="mediaType" required>
                <option value="">Select Type</option>
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
            </div>
          </div>
          <div className="mt-3">
            <button type="submit" className="btn btn-primary mx-2">
              Save
            </button>
            <button className="btn btn-light mx-2" onClick={() => navigate(-1)}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
