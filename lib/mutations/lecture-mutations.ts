import useCustomToast from "@/hooks/use-custom-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DocumentPickerAsset } from "expo-document-picker";
import { useRouter } from "expo-router";
import { deleteLecture, deleteLectureImage, postLecture, putLecture, putLectureImage, putLectureShares, putLectureVisits } from "../apis/lectures-api";
import { LectureFormValues } from "../schemas/lecture-schema";


export const useLecturesMutation = () => {
  const { showErrorToast } = useCustomToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postLecture,
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries({ queryKey: ["lectures", "list"] });
    },
    onError: (error) => {
      console.error(`[LecturesMutation] - Erro ao fazer uma requisição POST de uma nova palestra: ${error}`);
      showErrorToast("Falha ao criar palestra");
    }
  })
};

export const useLectureDeleteMutation = () => {
  const { showSuccessToast, showErrorToast } = useCustomToast();
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: deleteLecture,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lectures", "list"] });
      showSuccessToast("Palestra deletada com sucesso!");
      router.push("/");
    },
    onError: (error) => {
      console.error(`[LectureDeleteMutation] - Erro ao fazer uma requisição DELETE à uma palestra': ${error}`);
      showErrorToast("Falha ao deletar palestra");
    }
  })
};

export const useLectureUpdateMutation = () => {
  const queryClient = useQueryClient();
  const { showErrorToast } = useCustomToast();
  return useMutation({
    mutationFn: ({ id, newLecture }: { id: string, newLecture: LectureFormValues }) => putLecture(id, newLecture),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["lectures", "detail", id] });
    },
    onError: (error) => {
      console.error(`[LectureUpdateMutation] - Erro ao fazer uma requisição PUT de uma lecture: ${error}`);
      showErrorToast("Falha ao atualizar palestra");
    }
  });
}

export const useLectureImageMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { showErrorToast } = useCustomToast();
  return useMutation({
    mutationFn: ({ file, id }: { file: DocumentPickerAsset, id: string }) => {
      return putLectureImage(file, id);
    },
    onSuccess: (_, { id }) => {
      return queryClient.invalidateQueries({ queryKey: ["lectures", "detail", id] });
    },
    onError: (error, { id }) => {
      console.error(`[LectureImageMutation] - Erro ao fazer uma requisição PUT de uma nova imagem: ${error}`);
      showErrorToast("Falha ao alterar imagem da palestra");
      router.push({ pathname: "/lecture/[id]", params: { id } });
    }
  });
};

export const useLectureVisitMutation = () => {
  return useMutation({
    mutationFn: putLectureVisits,
    onError: (error) => {
      console.error(`[LectureVisit] - Erro ao fazer uma requisição PUT de Visit da Lecture: ${error}`);
    },
  })
}

export const useLectureShareMutation = () => {
  return useMutation({
    mutationFn: putLectureShares,
    onError: (error) => {
      console.error(`[LectureShare] - Erro ao fazer uma requisição PUT de Share da Lecture: ${error}`);
    },
  })
}

export const useDeleteLectureImageMutation = () => {
  const { showErrorToast, showSuccessToast } = useCustomToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteLectureImage,
    onError: () => {
      showErrorToast("Falha ao deletar imagem da palestra");
    },
    onSuccess: (_, id, c) => {
      showSuccessToast("Imagem da palestra apagada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["lectures", "detail", "image", id] });
      router.push({ pathname: "/lecture/[id]", params: { id } });
    }
  })
}
