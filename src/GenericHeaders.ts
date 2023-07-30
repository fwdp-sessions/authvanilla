export const headingBuilder = (
  content: string,
  size: "1" | "2" | "3" | "4" | "5" | "6" = "1"
): HTMLHeadingElement => {
  const heading = document.createElement(`h${size}`);
  heading.textContent = content;
  return heading;
};
