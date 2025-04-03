export enum ChartType {
  MOST_VIEWED="Mais Vista",
  MOST_SHARED="Mais Compartilhada"
}

export type ChartData = {
  name: string,
  data: number | undefined,
  id: number,
}