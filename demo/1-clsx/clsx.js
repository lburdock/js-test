const clsx = (...classNames) =>
  classNames.filter((className) => !!className).join(" ");

export default clsx;
