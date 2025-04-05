import SuspenseLoading from "@/components/suspense-loading";
import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { CloseIcon, Icon } from "@/components/ui/icon";
import { Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from "@/components/ui/modal";
import { Text } from "@/components/ui/text";
import { useLectureChartsData } from "@/hooks/use-lecture-charts-data";
import { ChartType } from "@/types/chart";
import { Lecture } from "@/types/lecture";
import React, { PropsWithChildren } from "react";
import { Pressable } from "react-native";
import LectureChart from "./lecture-chart";

type LectureChartModalProps = {
  currentLecture: Lecture,
  chartType: ChartType
}

type ChartDescription = {
  [key in ChartType]: {
    title: string,
    description: string
  }
}

const chartDescription: ChartDescription = {
  "Mais Compartilhada": {
    title: "Compartilhamentos",
    description: "Este gráfico mostra a quantidade de compartilhamentos da sua palestra em relação às 10 palestras mais visitadas"
  },
  "Mais Vista": {
    title: "Visualizações",
    description: "Este gráfico mostra a quantidade de visualizações da sua palestra em relação às 10 palestras mais visitadas"
  }
}

const LectureChartModal = ({ children, currentLecture, chartType }: PropsWithChildren<LectureChartModalProps>) => {
  const [showModal, setShowModal] = React.useState(false);
  const { chartData, lecturesQuery } = useLectureChartsData(chartType);

  return (
    <Center>
      <Pressable onPress={() => setShowModal(true)} className="underline">
        {children}
      </Pressable>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        size="lg"
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="md" className="text-typography-700">
              Estatisticas
            </Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} size="md"
                className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900" />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text className="text-md text-typography-600 text-center mb-1">{chartDescription[chartType].title}</Text>
            <Text className="text-xs text-typography-400 text-center mb-4">{chartDescription[chartType].description}</Text>
            {lecturesQuery.isLoading ? <SuspenseLoading /> : (
              <LectureChart chartData={chartData!} currentLecture={currentLecture} />
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              action="secondary"
              onPress={() => {
                setShowModal(false);
              }}
            >
              <ButtonText>Fechar</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
}

export default LectureChartModal;