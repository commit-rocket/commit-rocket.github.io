import { useMemo, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { z } from "zod";

const ArrowPathIcon = dynamic(() => import("@heroicons/react/24/solid/ArrowPathIcon"));

import { BackendResponse } from "@/api/models/Response";
import perks from "@/assets/state/perks";
import Button from "@/components/controls/Button";
import Error from "@/components/controls/Error";
import Link from "@/components/navigation/Link";
import { backend } from "@/utils/wretch";
import Input from "@/components/controls/Input";


const signupSchema = z.object({
  email: z.string().email().min(3)
});
const signupSchemaResolver = zodResolver(signupSchema);

type SignupSchema = z.infer<typeof signupSchema>;

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

const SignupSection = () => {
  const { handleSubmit, register, formState } = useForm<SignupSchema>({
    resolver: signupSchemaResolver,
    mode: "onChange"
  });

  const [response, setResponse] = useState<null | BackendResponse>(null);
  const [loading, setLoading] = useState(false);

  const loadingRef = useRef(loading);
  loadingRef.current = loading;

  const submit = useMemo(() => handleSubmit(({ email }) => {
    if (loadingRef.current) return;
    setLoading(true);

    backend.url("/email/subscribe")
      .post({ email })
      .json((res: BackendResponse) => setResponse(res));
  }), [handleSubmit]);

  return (
    <section
      aria-labelledby="try-it-yourself"
      className="flex flex-col gap-12 py-16 mx-auto text-center max-w-7xl"
    >
      <h2
        id="try-it-yourself"
        className="text-4xl font-bold md:text-5xl text-secondary"
      >
        Try it Yourself
      </h2>
      <section className="flex flex-col gap-4">
        <h3 className="text-2xl text-primary md:text-3xl">Commit Rocket is not out yet!</h3>
        <p className="text-xl">
          Do you want to join in on this adventure and help develop Commit Rocket?
          We value your input and look forward to involving you in the process of making Commit Rocket as optimal as possible.
        </p>
      </section>
      <section className="flex flex-col gap-4">
        <h3 className="text-xl font-bold md:text-2xl text-primary">Perks</h3>
        <p className="text-xl">
          Sign up to stay in the loop on our progress,
          get early access to beta versions, and participate in surveys that help shape the development of our open-source and cross-platform Git client.
        </p>
        <div className="flex flex-wrap justify-center w-full gap-4" aria-hidden>
          {perks.map(({ title, icon: Icon }, i) => (
            <div key={i} className="flex flex-col items-center w-32 gap-2">
              <Icon className="w-12 sm:w-16 text-primary" />
              <div className="font-bold">{title}</div>
            </div>
          ))}
        </div>
      </section>
      <form aria-label="Sign up" className="flex flex-col items-center gap-4" onSubmit={submit}>
        <AnimatePresence mode="wait">
          {(!response || response.success === false) && <motion.div
            key="form"
            className="flex flex-col items-center w-full gap-4"
            variants={fadeAnim}
            initial="in"
            animate="anim"
            exit="exit"
          >
            <div className="w-full">
              <Input
                className="w-full p-4 text-lg md:text-xl"
                placeholder="your@email.com"
                {...register("email")}
              />
              <Error className="w-full px-2 text-start" state={formState} name="email" />
            </div>
            <Button type="submit" disabled={loading} color="secondary" className="px-5 py-3 text-lg md:text-xl w-fit">
              {!loading
                ? "Keep me up-to-date!"
                : <ArrowPathIcon className="w-6 h-6 animate-spin" />
              }
            </Button>
          </motion.div>}
          {(response && response.success) && <motion.div
            key="success"
            className="p-4 mb-8 text-xl font-semibold text-green-500 rounded-md bg-primary/10"
            variants={fadeAnim}
            initial="in"
            animate="anim"
            exit="exit"
          >
            🎉 {response.message} 🎉
          </motion.div>}
        </AnimatePresence>
        <p role="note">You can always unsubscribe by going to <Link color="primary" href="/mail/unsubscribe" underline>this link</Link></p>
      </form>
    </section>
  );
};

export default SignupSection;