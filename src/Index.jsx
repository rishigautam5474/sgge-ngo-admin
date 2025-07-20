import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AdminLogin } from "./components/Login/login";
import { GalleryIndex } from "./components/Gallery/Index";
import { AdminLayout } from "./layout/admin-layout";
import { Dashboard } from "./components/Dashboard/dashboard";
import ProtectedRoute from "./lib/protectedRoute";
import { MediaAdd } from "./components/Gallery/add";

export function Index() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<AdminLogin />} />
          {/* <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}> */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="gallery" element={<GalleryIndex />} />
            <Route path="gallery/add" element={<MediaAdd />} />
          </Route>
          <Route path="*" element={<h2 className="text-center">Page not found</h2>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
