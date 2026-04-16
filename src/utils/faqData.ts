export interface FAQItem {
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    question: "What is Meerow?",
    answer:
      "Meerow is a story-sharing platform where authors can publish their stories and readers can discover, read, and engage with content through likes and comments.",
  },
  {
    question: "How do I create an account?",
    answer:
      "Click on the 'Get Started' button on the home page and fill in your email and password. You can also sign up using Google OAuth for faster registration.",
  },
  {
    question: "Can I publish my story immediately after writing it?",
    answer:
      "No, all stories go through an admin moderation process. Once you submit your story, an admin will review it and either approve or reject it. You'll be notified of the decision.",
  },
  {
    question: "What types of stories can I publish?",
    answer:
      "You can publish standalone stories or episodic series. For episodic series, each episode is submitted and moderated independently.",
  },
  {
    question: "How is read time calculated?",
    answer:
      "Read time is automatically calculated based on the word count of your story. We estimate an average reading speed of 200 words per minute.",
  },
  {
    question: "Can I edit my story after publishing?",
    answer:
      "Yes, you can edit approved stories from your dashboard. However, significant changes may require re-moderation.",
  },
  {
    question: "How do comments work?",
    answer:
      "Readers can leave comments on published stories and episodes. Comments are displayed in chronological order and help foster community engagement.",
  },
  {
    question: "Can I delete my account?",
    answer:
      "Yes, you can delete your account from your profile settings. This action is permanent and cannot be undone.",
  },
  {
    question: "What happens if my story is rejected?",
    answer:
      "If your story is rejected, you'll receive feedback explaining why. You can edit your story and resubmit it for moderation.",
  },
  {
    question: "How can I report inappropriate content?",
    answer:
      "If you encounter inappropriate content, please use the report feature on that story or contact us through the feedback page.",
  },
];
