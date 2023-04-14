import Swal from "sweetalert2";
import swal from "./base";

const toast = swal.mixin({
  timer: 5000,
  timerProgressBar: true,
  position: "top",
  showConfirmButton: false,
  toast: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  }
});

export default toast;