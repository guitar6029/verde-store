/**
 * Scrolls the main element to the top with a smooth animation.
 * This function selects the main element on the page and scrolls it
 * to the top position. If the main element is found, it utilizes the
 * smooth scrolling behavior for a gradual scrolling effect.
 */

export const scrollToTop = () => {
  const mainElement = document.querySelector("main");
  if (mainElement) {
    mainElement.scrollTo({ top: 0, behavior: "smooth" });
  }
};
