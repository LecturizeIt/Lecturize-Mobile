import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';

export const formatDateTime = (date: string) => format(new Date(date).toString(), `hh:mm 'de' dd MMM, yyyy`, { locale: ptBR });

export const formatDate = (date: string) => format(new Date(date).toString(), `dd MMM, yyyy`, { locale: ptBR });

export const formatDateTimeToSentence = (fromDate: string, toDate: string) => {
  const fromDateFormatted = new Date(fromDate).toString();
  const toDateFormatted = new Date(toDate).toString();

  const fromDateSentence = format(fromDateFormatted, "dd 'de' MMMM 'das' hh:mm 'até'", { locale: ptBR });
  const toDateSentence = format(toDateFormatted, "dd 'de' MMMM 'às' hh:mm", { locale: ptBR })

  return `${fromDateSentence} ${toDateSentence}`
}