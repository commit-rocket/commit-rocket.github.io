import wretch from "wretch";

export const backend = wretch(process.env.NEXT_PUBLIC_BACKEND_URL!)
  .options({
    mode: "cors"
  })
  .catcher(404, async () => {
    const { toast } = await import("./swal");
    toast.fire({
      title: "Error",
      icon: "error",
      text: "Resource was not found."
    });
  })
  .catcher(500, async () => {
    const { toast } = await import("./swal");
    
    toast.fire({
      title: "Error",
      icon: "error",
      text: "Internal Server Error, try again later."
    });
  });