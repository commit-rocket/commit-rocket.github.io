import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CloseIcon from "@heroicons/react/24/solid/XMarkIcon";

const swal = withReactContent(Swal).mixin({
  closeButtonHtml: <CloseIcon className="w-6 h-6" />,
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
  }
});

export const modal = swal.mixin({
  position: "center",
  showConfirmButton: false,
  showCloseButton: true
});

export default swal;