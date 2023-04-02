import { event as gtEvent } from "nextjs-google-analytics";

const sendEvent: typeof gtEvent = (...args) => {
  try {
    gtEvent(...args);
  } catch (error) {
    console.warn(error);
  }
};

export const sendContributeEvent = () => sendEvent("cta_contribute", {
  label: "Contribute CTA",
  category: "CTA"
});

export const sendLearnMoreEvent = () => sendEvent("cta_learn_more", {
  label: "Learn More CTA",
  category: "CTA"
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