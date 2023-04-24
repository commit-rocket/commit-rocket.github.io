import Head from "next/head";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ArrowPathIcon from "@heroicons/react/24/solid/ArrowPathIcon";

import { Page } from "@/types/page";
import backend from "@/lib/fetch/backend";
import { makeOgMeta } from "@/lib/meta/opengraph";
import makeSitemapMeta from "@/lib/meta/sitemap";
import useFormMutation from "@/hooks/useMutation";

import { BackendResponse } from "@/api/models/Response";
import { sendUnsubscribeEvent } from "@/api/analytics";

import Input from "@/components/controls/Input";
import Form from "@/components/controls/Form";
import Heading from "@/components/content/Heading";
import Button from "@/components/controls/Button";
import Label from "@/components/controls/Label";
import KeywordsMeta from "@/components/head/KeywordsMeta";


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

  const [submit, response, loading] = useFormMutation<BackendResponse, UnsubscribeSchema>(handleSubmit, (setResponse, { email }) => {
    backend.url("/email/unsubscribe")
      .post({ email })
      .json((res: BackendResponse) => {
        if (res.success) sendUnsubscribeEvent();
        setResponse(res);
      });
  });

  return (
    <>
      <Head>
        {makeOgMeta({ title: "Unsubscribe", pathname })}
        {makeSitemapMeta({ priority: 0.2 })}
        <KeywordsMeta tags={[
          "Unsubscribe"
        ]} />
      </Head>
      <main className="flex items-center justify-center flex-1 w-full pb-8" aria-labelledby="unsubscribe">
        <Form
          className="flex flex-col gap-4 p-8 text-center border-2 rounded-md border-primary"
          onSubmit={submit}
          success={response?.success}
          successChildren={`${response?.message} 👍`}
          oneTime
        >
          <Heading.H1 id="unsubscribe" >
            Unsubscribe
          </Heading.H1>
          <p className="max-w-md">
            Once you unsubscribe you won't receive any more emails from us and your email will be immediately deleted from our records.
          </p>
          <div>
            <Label htmlFor="email-input" className="text-secondary">
              Email:
            </Label>
            <Input
              id="email-input"
              color="secondary"
              placeholder="your@email.com"
              {...register("email")}
            />
          </div>
          <Button type="submit" color="secondary">
            {!loading
              ? "Unsubscribe"
              : <ArrowPathIcon
                className="w-6 h-6 animate-spin"
                width="1em"
                height="1em"
              />
            }
          </Button>
        </Form>
      </main>
    </>
  );
};

export default UnsubscribePage;