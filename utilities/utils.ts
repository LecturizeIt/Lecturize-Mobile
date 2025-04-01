import { LectureTypes } from "@/types/lecture";
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

export const waitFor = async (milliseconds: number) => {
  await new Promise(resolve => setTimeout(resolve, milliseconds));
}

export const getApiFormattedLectureType = (type: LectureTypes) => {
  switch (type) {
    case (LectureTypes.HYRBID):
      return "HYBRID"
    case (LectureTypes.ONLINE):
      return "ONLINE";
    case (LectureTypes.PRESENTIAL):
      return "PRESENTIAL"
    default:
      throw new Error("Provided types does not exists");
  }
}

export const encodeRFC5987ValueChars = (fileName: string) => {
  return (
    encodeURIComponent(fileName)
      .replace(/['()*]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`)
      .replace(/%(7C|60|5E)/g, (str, hex) =>
        String.fromCharCode(parseInt(hex, 16)),
      )
  )
}