import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CloseIcon from "@heroicons/react/24/solid/XMarkIcon";

const base = withReactContent(Swal).mixin({
  closeButtonHtml: <CloseIcon
    className="w-6 h-6"
    width="1em"
    height="1em"
  />,
  customClass: {
    icon: "mr-4"
  }
});

export default base;