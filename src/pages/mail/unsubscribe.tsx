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
import Input from "@/components/controls/Input";
import Form from "@/components/controls/Form";
import Heading from "@/components/layout/Heading";
import { makeOgMeta } from "@/utils/opengraph";

const unsubscribeSchema = z.object({
  email: z.string().email().min(3)
});
const unsubscribeSchemaResolver = zodResolver(unsubscribeSchema);
type UnsubscribeSchema = z.infer<typeof unsubscribeSchema>;


const UnsubscribePage: Page = ({ pathname }) => {
  const { handleSubmit, register } = useForm<UnsubscribeSchema>({
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
        {makeOgMeta({ title: "Unsubscribe", pathname })}
      </Head>
      <main className="flex items-center justify-center flex-1 w-full pb-8" aria-labelledby="unsubscribe">
        <Form
          className="flex flex-col gap-4 p-8 text-center border-2 rounded-md border-primary"
          onSubmit={submit}
          success={response?.success}
          successChildren={`${response?.message} 👍`}
          oneTime
        >
          <Heading.H1 id="unsubscribe" className="text-secondary">
            Unsubscribe
          </Heading.H1>
          <p className="max-w-md">
            Once you unsubscribe you won't receive any more emails from us and your email will be immediately deleted from our records.
          </p>
          <Input
            color="secondary"
            variant="outlined"
            placeholder="your@email.com"
            {...register("email")}
          />
          <Button type="submit" color="secondary">
            {!loading
              ? "Unsubscribe"
              : <ArrowPathIcon className="w-6 h-6 animate-spin" />
            }
          </Button>
        </Form>
      </main>
    </>
  );
};

export default UnsubscribePage;