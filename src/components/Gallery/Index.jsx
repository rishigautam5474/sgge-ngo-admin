import { useEffect, useRef, useState } from "react";
import galleryModel from "../../models/gallery.model";
import helper from "../../lib/helper";
import { Link } from "react-router-dom";

export const GalleryIndex = () => {
  const [media, setMedia] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perPageItems = 8;

  const lastItemIndex = currentPage * perPageItems;
  const firstItemIndex = lastItemIndex - perPageItems;
  const mediaData = media.slice(firstItemIndex, lastItemIndex);
  const totalPages = Math.ceil(media.length / perPageItems);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getAllMedia = async () => {
    try {
      const res = await galleryModel.getPhoto();
      if (res) {
        setMedia(res?.data?.media);
      }
    } catch (error) {
      // console.log(error,"error+++++++++++++1")
      helper.toast("error", error?.response?.data?.message);
    }
  };

const handleDeleteClick = async (id) => {
    try {
      const res = await helper.confirm(
        "warning",
        "do you want to delete this User"
      );

      if (res.isConfirmed) {
        await galleryModel.deleteMedia(id).then((response) => {
          if (response) {
            helper.toast("success", response?.data?.message);
            getAllMedia();
          }
        });
      }
    } catch (error) {
      helper.toast("error", error?.response?.data?.message);
    }
};

  useEffect(() => {
    getAllMedia();
  }, []);

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center">
        <h6>Media</h6>
        <Link className="btn btn-primary bi bi-plus" to="add">Add</Link>
      </div>

      <div className="table-responsive mt-3">
        <table className="table table-bordered table-hover text-center align-middle">
          <thead className="table-dark">
            <tr>
              <th>SN</th>
              <th>Media</th>
              <th>Media Type</th>
              <th>Posted At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mediaData.length > 0 ? (
              mediaData.map((media, index) => (
                <tr key={media._id}>
                  <td>{(currentPage - 1) * perPageItems + index + 1}</td>
                  <td>
                    {media.mediaType === "image" ? (
                      <img
                        src={media?.mediaUrl}
                        alt="media"
                        style={{
                          width: "80px",
                          height: "40px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <video
                        src={media?.mediaUrl}
                        style={{
                          width: "80px",
                          height: "40px",
                          objectFit: "cover",
                        }}
                      ></video>
                    )}
                  </td>
                  <td>
                    {media?.mediaType.charAt(0).toUpperCase() +
                      media?.mediaType.slice(1).toLowerCase()}
                  </td>
                  <td>{new Date(media.createdAt).toDateString("en")}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteClick(media?._id)}>
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">
                  <h5 className="text-center py-2 m-0">Media not found</h5>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {media.length > 0 && (
        <div className="py-3">
          <nav>
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Prev
                </button>
              </li>

              {numbers.map((item, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === item ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(item)}
                  >
                    {item}
                  </button>
                </li>
              ))}

              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};
