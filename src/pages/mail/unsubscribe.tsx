import { useMemo, useRef, useState } from "react";
import Head from "next/head";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ArrowPathIcon from "@heroicons/react/24/solid/ArrowPathIcon";
import { AnimatePresence, motion } from "framer-motion";

import Button from "@/components/controls/Button";
import { Page } from "@/types/page";
import { backend } from "@/utils/wretch";
import { BackendResponse } from "@/api/models/Response";

const unsubscribeSchema = z.object({
  email: z.string().email().min(3)
});
const unsubscribeSchemaResolver = zodResolver(unsubscribeSchema);
type UnsubscribeSchema = z.infer<typeof unsubscribeSchema>;

const fadeAnim = {
  in: {
    opacity: 0
  },
  anim: {
    opacity: 1,
    transition: {
      duration: 0.35
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.35
    }
  }
} as const;

const UnsubscribePage: Page = ({ }) => {
  const { handleSubmit, register, formState } = useForm<UnsubscribeSchema>({
    resolver: unsubscribeSchemaResolver,
    mode: "onChange"
  });

  const [response, setResponse] = useState<null | BackendResponse>(null);
  const [loading, setLoading] = useState(false);

  const loadingRef = useRef(loading);
  loadingRef.current = loading;

  const submit = useMemo(() => handleSubmit(({ email }) => {
    if (loadingRef.current) return;
    setLoading(true);

    backend.url("/email/unsubscribe")
      .post({ email })
      .json((res: BackendResponse) => setResponse(res));
  }), [handleSubmit]);

  return (
    <>
      <Head>
        <title>Commit Rocket</title>
      </Head>
      <main className="flex items-center justify-center flex-1 w-full pb-8" aria-labelledby="unsubscribe">
        <form className="flex flex-col gap-4 p-4 text-center rounded-md shadow shadow-black/25 bg-primary/25" onSubmit={submit}>
          <h1 id="unsubscribe" className="text-5xl text-secondary">Unsubscribe</h1>
          <p className="max-w-md">Once you unsubscribe you won't receive any more emails from us and your email will be immediately deleted from our records.</p>
          <AnimatePresence mode="wait">
            {(!response || response.success === false) && <motion.div
              key="form"
              className="flex flex-col gap-4"
              variants={fadeAnim}
              initial="in"
              animate="anim"
              exit="exit"
            >
              <input
                className="p-2 border-2 rounded-md border-primary"
                placeholder="your@email.com"
                {...register("email")}
              />
              <Button type="submit" color="secondary">
                {!loading
                  ? "Unsubscribe"
                  : <ArrowPathIcon className="w-6 h-6 animate-spin" />
                }
              </Button>
            </motion.div>}
            {(response && response.success) && <motion.div
              key="success"
              className="py-4 text-xl font-semibold text-green-500 rounded-md bg-fill"
              variants={fadeAnim}
              initial="in"
              animate="anim"
              exit="exit"
            >
              {response.message} 👍
            </motion.div>}
          </AnimatePresence>
        </form>
      </main>
    </>
  );
};

export default UnsubscribePage;