import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { BackendResponse } from "@/api/models/Response";
import Button from "@/components/controls/Button";
import Error from "@/components/controls/Error";
import Link from "@/components/navigation/Link";
import { backend } from "@/utils/wretch";
import TextArea from "@/components/controls/TextArea";
import Form from "@/components/controls/Form";
import Heading from "@/components/layout/Heading";

const feedbackSchema = z.object({
  text: z.string()
});

const feedbackSchemaResolver = zodResolver(feedbackSchema);

type FeedbackSchema = z.infer<typeof feedbackSchema>;

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
      className="flex flex-col w-full gap-4 mx-auto text-center max-w-7xl"
    >
      <Heading.H2
        id="feedback"
        className="text-4xl font-bold md:text-5xl text-secondary"
      >
        Feedback
      </Heading.H2>
      <p>
        We welcome your input and ideas!
        Feel free to share your feedback and suggestions with us through our anonymous feedback form. <br />
        You can also reach out to us via email at <Link color="primary" href="mailto:feedback@commitrocket.com" underline>feedback@commitrocket.com</Link>.
      </p>
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
      </Form>
    </section>
  );
};

export default FeedbackSection;