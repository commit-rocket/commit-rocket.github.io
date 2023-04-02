import { event as gtEvent } from "nextjs-google-analytics";

const sendEvent: typeof gtEvent = (actionName, options) => {
  try {
    if (options) options.event_name = actionName;
    gtEvent(actionName, options);
  } catch (error) {
    console.warn(error);
  }
};

export const sendCTAEvent = (ctaName: string) => () => sendEvent("cta_click", {
  label: "CTA",
  category: "CTA",
  cta_name: ctaName
});

export const sendFeedbackEvent = () => sendEvent("feedback_submission", {
  label: "Feedback submission",
  category: "Contact"
});

export const sendSubscribeEvent = () => sendEvent("sign_up", {
  label: "Subscribe",
  category: "Mailing List",
  method: "Email"
});

export const sendUnsubscribeEvent = () => sendEvent("mail_unsubscribe", {
  label: "Unsubscribe",
  category: "Mailing List"
});