import { format } from "date-fns";

export const formatDate = (date: string) => format(new Date(date).toString(), `hh:mm 'de' dd MMM, yyyy`);