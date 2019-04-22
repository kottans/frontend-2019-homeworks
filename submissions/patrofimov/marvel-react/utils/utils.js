export const DATE_FROM_DEFAULT = new Date(2010, 1, 1);
export const DATE_TO_DEFAULT = new Date(2020, 1, 1);

export const localFormatDate = dateString => {
  const date =
    typeof dateString === "string" ? new Date(dateString) : dateString;
  return new Intl.DateTimeFormat().format(date);
};

export const formatDate = date => {
  console.log(new Intl.DateTimeFormat("sv-SE").format(date).replace("/", "-"));
  return new Intl.DateTimeFormat("sv-SE").format(date).replace("/", "-");

};
