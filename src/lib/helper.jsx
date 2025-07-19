import Swal from "sweetalert2";

class helper {
  toast(icon, title) {
    return Swal.fire({
      toast: true,
      position: "top",
      icon: icon,
      title: title,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  }

  confirm(icon, text) {
    return Swal.fire({
      text: text,
      title: "Are you sure?",
      icon: icon,
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });
  }
}

export default new helper();
