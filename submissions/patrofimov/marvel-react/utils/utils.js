export const convertDate = dateString => {
    const date = typeof dateString === "string" ? new Date(dateString) : dateString;
    return new Intl.DateTimeFormat().format(date);
  };

  export const formatDate = date => {
      const  month = String(date.getMonth() + 1).padStart(2, "0");
      const  day = String(date.getDate()).padStart(2, "0");
      const  year = date.getFullYear();

    return [year, month, day].join('-');
}