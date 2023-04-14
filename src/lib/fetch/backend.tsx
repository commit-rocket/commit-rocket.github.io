import wretch from "wretch";

const backend = wretch(process.env.NEXT_PUBLIC_BACKEND_URL!)
  .options({
    mode: "cors"
  })
  .catcher(404, async () => {
    const { default: toast } = await import("../../utils/alerts/toast");
    toast.fire({
      title: "Error",
      icon: "error",
      text: "Resource was not found."
    });
  })
  .catcher(500, async () => {
    const { default: toast } = await import("../../utils/alerts/toast");
    toast.fire({
      title: "Error",
      icon: "error",
      text: "Internal Server Error, try again later."
    });
  })
  .catcher(400, async () => {
    const { default: toast } = await import("../../utils/alerts/toast");
    toast.fire({
      title: "Error",
      icon: "error",
      text: "Bad request."
    });
  });

export default backend;