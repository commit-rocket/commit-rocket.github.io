import { event as gtEvent } from "nextjs-google-analytics";

const sendEvent: typeof gtEvent = (...args) => {
  try {
    console.log(...args);
    gtEvent(...args);
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

export const sendSubscribeEvent = () => sendEvent("mail_subscribe", {
  label: "Subscribe",
  category: "Mailing List"
});

export const sendUnsubscribeEvent = () => sendEvent("mail_unsubscribe", {
  label: "Unsubscribe",
  category: "Mailing List"
});