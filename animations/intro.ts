export const titleParentAnim = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delay: 0.1,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

export const titleCharAnim = {
  hidden: { y: -4, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { ease: "easeInOut", duration: 0.6 } },
};
