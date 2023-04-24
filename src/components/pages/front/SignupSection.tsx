import { useMemo, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { BackendResponse } from "@/api/models/Response";
import perks from "@/assets/state/perks";
import Button from "@/components/controls/Button";
import Error from "@/components/controls/Error";
import Link from "@/components/controls/Link";
import Input from "@/components/controls/Input";
import Form from "@/components/controls/Form";
import Heading from "@/components/content/Heading";

import backend from "@/lib/fetch/backend";
import useFormMutation from "@/hooks/useMutation";
import { sendSubscribeEvent } from "@/api/analytics";
import Label from "@/components/controls/Label";

const signupSchema = z.object({
  email: z.string().email().min(5, "Your email must at least contain 5 characters")
});
const signupSchemaResolver = zodResolver(signupSchema);

type SignupSchema = z.infer<typeof signupSchema>;

const SignupSection = () => {
  const { handleSubmit, register, formState } = useForm<SignupSchema>({
    resolver: signupSchemaResolver,
    mode: "onChange"
  });

  const [submit, response, loading] = useFormMutation<BackendResponse, SignupSchema>(handleSubmit, (setResponse, { email }) => {
    backend.url("/email/subscribe")
      .post({ email })
      .json((res: BackendResponse) => {
        if (res.success) sendSubscribeEvent();
        setResponse(res);
      });
  });

  return (
    <section
      aria-labelledby="sign-up"
      className="flex flex-col gap-12 mx-auto text-center max-w-7xl"
    >
      <Heading.H2 id="sign-up">
        Keep Up to Date
      </Heading.H2>
      <p className="text-xl">
        Do you want to join in on this adventure and help develop Commit Rocket?
        We value your input and look forward to involving you in the process of making Commit Rocket as optimal as possible.
        Sign up to stay in the loop on our progress,
        get early access to beta versions, and participate in surveys that help shape the development of our open-source and cross-platform Git client.
      </p>
      <ul aria-label="Perks" className="flex flex-wrap justify-center w-full gap-4" >
        {perks.map(({ title, icon: Icon }, i) => (
          <li key={i} className="flex flex-col items-center w-32 gap-2">
            <Icon
              className="w-12 h-12 sm:w-16 sm:h-16 text-primary"
              width="1em"
              height="1em"
            />
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
          <Label htmlFor="signup-email-input" className="text-primary ml-7">
            Email:
          </Label>
          <Input
            id="signup-email-input"
            color="primary"
            className="w-full p-4 text-lg md:text-xl"
            placeholder="your@email.com"
            {...register("email")}
          />
          <Error className="w-full px-2 text-start" state={formState} name="email" />
        </div>
        <Button
          className="relative w-full px-5 py-3 text-lg sm:w-fit md:text-xl"
          type="submit"
          color="secondary"
          loading={loading}
        >
          Keep me up-to-date!
        </Button>
        <p role="note">
          Tired of our updates? You can always <Link color="primary" href="/mail/unsubscribe" underline prefetch={false}>unsubscribe</Link>!
        </p>
      </Form>
    </section>
  );
};

export default SignupSection;