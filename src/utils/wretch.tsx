import wretch from "wretch";
import { toast } from "./swal";

export const backend = wretch(process.env.NEXT_PUBLIC_BACKEND_URL!)
  .options({
    mode: "cors"
  })
  .catcher(404, () => toast.fire({
    title: "Error",
    icon: "error",
    text: "Resource was not found."
  }))
  .catcher(500, () => toast.fire({
    title: "Error",
    icon: "error",
    text: "Internal Server Error, try again later."
  }));