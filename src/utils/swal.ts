import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const swal = withReactContent(Swal).mixin({
  customClass: {
    icon: "mr-4"
  }
});

export const toast = swal.mixin({
  timer: 5000,
  timerProgressBar: true,
  position: "top",
  showConfirmButton: false,
  toast: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
  customClass: {

  }
});

export default swal;