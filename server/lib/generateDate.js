import { format } from "date-fns";

export const generateDateNow = () => {
  const date = format(Date.now(), "MM-dd-yyyy_HH-mm");
  return date;
};
