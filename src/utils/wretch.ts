import wretch from "wretch";

export const backend = wretch(process.env.NEXT_PUBLIC_BACKEND_URL!).options({ 
  mode: "cors"
});