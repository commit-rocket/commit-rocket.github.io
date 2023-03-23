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
import Form from "@/components/controls/Form";


const signupSchema = z.object({
  email: z.string().email().min(3)
});
const signupSchemaResolver = zodResolver(signupSchema);

type SignupSchema = z.infer<typeof signupSchema>;


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
        id="sign-up"
        className="text-4xl font-bold md:text-5xl text-secondary"
      >
        Keep Up to Date <br />
        Join Our Mailing List
      </h2>
      <p className="text-xl">
        Do you want to join in on this adventure and help develop Commit Rocket?
        We value your input and look forward to involving you in the process of making Commit Rocket as optimal as possible.
        Sign up to stay in the loop on our progress,
        get early access to beta versions, and participate in surveys that help shape the development of our open-source and cross-platform Git client.
      </p>
      <ul aria-label="Perks" className="flex flex-wrap justify-center w-full gap-4" >
        {perks.map(({ title, icon: Icon }, i) => (
          <li key={i} className="flex flex-col items-center w-32 gap-2">
            <Icon className="w-12 sm:w-16 text-primary" />
            <div className="font-bold">{title}</div>
          </li>
        ))}
      </ul>
      <Form
        aria-label="Sign up"
        className="flex flex-col items-center gap-4"
        onSubmit={submit}
        successChildren={`🎉 ${response?.message} 🎉`}
        success={response?.success}
        oneTime
      >
        <div className="w-full">
          <Input
            color="primary"
            variant="outlined"
            className="w-full p-4 text-lg md:text-xl"
            placeholder="your@email.com"
            {...register("email")}
          />
          <Error className="w-full px-2 text-start" state={formState} name="email" />
        </div>
        <Button type="submit" loading={loading} color="secondary" className="relative px-5 py-3 text-lg md:text-xl w-fit">
          Keep me up-to-date!
        </Button>
        <p role="note">
          Tired of our updates? You can always <Link color="primary" href="/mail/unsubscribe" underline>unsubscribe</Link>!
        </p>
      </Form>
    </section>
  );
};

export default SignupSection;