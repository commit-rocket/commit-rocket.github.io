import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { BackendResponse } from "@/api/models/Response";
import Button from "@/components/controls/Button";
import Error from "@/components/controls/Error";
import Link from "@/components/controls/Link";
import backend from "@/lib/fetch/backend";
import TextArea from "@/components/controls/TextArea";
import Form from "@/components/controls/Form";
import Heading from "@/components/content/Heading";
import Label from "@/components/controls/Label";
import useFormMutation from "@/hooks/useMutation";
import { sendFeedbackEvent } from "@/api/analytics";

const feedbackSchema = z.object({
  text: z.string().min(1, "Your feedback message must at least contain 1 character")
});

const feedbackSchemaResolver = zodResolver(feedbackSchema);

type FeedbackSchema = z.infer<typeof feedbackSchema>;

const FeedbackSection = () => {
  const { handleSubmit, register, formState } = useForm<FeedbackSchema>({
    resolver: feedbackSchemaResolver,
    mode: "onChange"
  });

  const [submit, response, loading] = useFormMutation<BackendResponse, FeedbackSchema>(handleSubmit, (setResponse, { text }) => {
    backend.url("/feedback")
      .post({ text })
      .json((res: BackendResponse) => {
        if (res.success) sendFeedbackEvent();
        setResponse(res);
      });

  });

  return (
    <section
      aria-labelledby="feedback"
      className="flex flex-col w-full gap-4 mx-auto text-center max-w-7xl"
    >
      <Heading.H2 id="feedback">
        Feedback
      </Heading.H2>
      <p>
        We welcome your input and ideas!
        Feel free to share your feedback and suggestions with us through our anonymous feedback form.
      </p>
      <Form
        aria-label="feedback-inbox"
        className="flex flex-col items-center gap-4"
        onSubmit={submit}
        success={response?.success}
        successChildren={`🎉 ${response?.message} 🎉`}
        oneTime
      >
        <div className="w-full">
          <Label htmlFor="message-input" className="text-start text-cr-primary">
            Your Message:
          </Label>
          <TextArea
            id="message-input"
            color="primary"
            className="w-full p-4 text-lg md:text-xl h-fit min-h-[3.25em] max-h-[50ex]"
            placeholder="I would like this feature!"
            rows={5}
            {...register("text")}
          />
        </div>
        <Error className="w-full px-2 text-start" state={formState} name="text" />
        <Button type="submit" color="primary" loading={loading} className="w-full px-5 py-3 text-lg md:text-xl sm:w-fit">
          Submit Feedback
        </Button>
      </Form>
    </section>
  );
};

export default FeedbackSection;