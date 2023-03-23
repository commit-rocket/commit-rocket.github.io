import dynamic from "next/dynamic";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ArrowPathIcon = dynamic(() => import("@heroicons/react/24/solid/ArrowPathIcon"));

import { BackendResponse } from "@/api/models/Response";
import Button from "@/components/controls/Button";
import Error from "@/components/controls/Error";
import Link from "@/components/navigation/Link";
import { backend } from "@/utils/wretch";
import TextArea from "@/components/controls/TextArea";
import Form from "@/components/controls/Form";

const feedbackSchema = z.object({
  text: z.string()
});

const feedbackSchemaResolver = zodResolver(feedbackSchema);

type FeedbackSchema = z.infer<typeof feedbackSchema>;

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

const FeedbackSection = () => {
  const { handleSubmit, register, formState } = useForm<FeedbackSchema>({
    resolver: feedbackSchemaResolver,
    mode: "onChange"
  });

  const [response, setResponse] = useState<null | BackendResponse>(null);
  const [loading, setLoading] = useState(false);

  const loadingRef = useRef(loading);
  loadingRef.current = loading;

  const submit = useMemo(() => handleSubmit(({ text }) => {
    if (loadingRef.current) return;
    setLoading(true);

    backend.url("/feedback")
      .post({ text })
      .json((res: BackendResponse) => setResponse(res));
  }), [handleSubmit]);

  return (
    <section
      aria-labelledby="feedback"
      className="flex flex-col w-full gap-4 py-16 mx-auto text-center max-w-7xl"
    >
      <h2
        id="feedback"
        className="text-4xl font-bold md:text-5xl text-secondary"
      >
        Feedback
      </h2>
      <section aria-labelledby="anon-feedback" className="flex flex-col gap-4">
        <h3 id="anon-feedback" className="text-2xl text-primary md:text-3xl">Anonymous feedback</h3>
        <p className="text-xl">
          Want to help us out without signing up? You can send us feedback directly by filling in your feedback below!
        </p>
      </section>
      <Form
        aria-label="feedback-inbox"
        className="flex flex-col items-center gap-4"
        onSubmit={submit}
        success={response?.success}
        successChildren={`🎉 ${response?.message} 🎉`}
        oneTime
      >
        <TextArea
          color="primary"
          variant="outlined"
          className="w-full p-4 text-lg rounded-lg md:text-xl h-fit min-h-[3.25em] max-h-[50ex]"
          placeholder="I would like this feature!"
          rows={5}
          {...register("text")}
        />
        <Error className="w-full px-2 text-start" state={formState} name="text" />
        <Button type="submit" color="secondary" loading={loading} className="px-5 py-3 text-lg md:text-xl w-fit">
          Submit Feedback
        </Button>
        <p role="note">Alternatively you can send an email to <Link color="primary" href="mailto:feedback@commitrocket.com" underline>feedback@commitrocket.com</Link></p>
      </Form>
    </section>
  );
};

export default FeedbackSection;