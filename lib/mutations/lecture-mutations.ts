import useCustomToast from "@/hooks/use-custom-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { DocumentPickerAsset } from "expo-document-picker";
import { useRouter } from "expo-router";
import {
  deleteComment,
  deleteLecture,
  deleteLectureImage,
  postLecture,
  postLectureComment,
  putLecture,
  putLectureImage,
  putLectureShares,
  putLectureVisits,
  putParticipateLecture,
  putUnparticipateLecture
} from "../apis/lectures-api";
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
      console.log(`[LecturesMutation] - Erro ao fazer uma requisição POST de uma nova palestra: ${error}`);
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
      showSuccessToast("Palestra apagada com sucesso!");
      router.push("/");
    },
    onError: (error) => {
      console.log(`[LectureDeleteMutation] - Erro ao fazer uma requisição DELETE à uma palestra': ${error}`);
      showErrorToast("Falha ao apagar palestra");
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
      console.log(`[LectureUpdateMutation] - Erro ao fazer uma requisição PUT de uma lecture: ${error}`);
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
      console.log(`[LectureImageMutation] - Erro ao fazer uma requisição PUT de uma nova imagem: ${error}`);
      showErrorToast("Falha ao alterar imagem da palestra");
      router.push({ pathname: "/lecture/[id]", params: { id } });
    }
  });
};

export const useLectureVisitMutation = () => {
  return useMutation({
    mutationFn: putLectureVisits,
    onError: (error) => {
      if (isAxiosError(error)) {
        console.log(error)
      }
      console.log(`[LectureVisit] - Erro ao fazer uma requisição PUT de Visit da Lecture: ${error}`);
    },
  })
}

export const useLectureShareMutation = () => {
  return useMutation({
    mutationFn: putLectureShares,
    onError: (error) => {
      console.log(`[LectureShare] - Erro ao fazer uma requisição PUT de Share da Lecture: ${error}`);
    },
  })
}

export const useDeleteLectureImageMutation = () => {
  const { showErrorToast, showSuccessToast } = useCustomToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteLectureImage,
    onError: () => {
      showErrorToast("Falha ao apagar imagem da palestra");
    },
    onSuccess: (_, id, c) => {
      showSuccessToast("Imagem da palestra apagada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["lectures", "detail", id] });
    }
  })
}

export const useLectureCommentMutation = () => {
  const { showErrorToast, showSuccessToast } = useCustomToast();
  return useMutation({
    mutationFn: postLectureComment,
    onError: () => {
      showErrorToast("Falha ao criar um comentário");
    },
    onSuccess: () => {
      showSuccessToast("Comentário criado com sucesso!");
    }
  })
};

export const useCommentDeleteMutation = () => {
  const { showSuccessToast, showErrorToast } = useCustomToast();
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      showSuccessToast("Comentário apagado com sucesso!");
    },
    onError: (error) => {
      console.log(`[CommentDeleteMutation] - Erro ao fazer uma requisição DELETE a um comentário': ${error}`);
      showErrorToast("Falha ao apagar comentário");
    }
  });
};

export const useLectureParticipateMutation = () => {
  const { showSuccessToast, showErrorToast } = useCustomToast();
  return useMutation({
    mutationFn: putParticipateLecture,
    onSuccess: () => {
      showSuccessToast("Sua participação na palestra foi confirmada.");
    },
    onError: (error) => {
      console.log(`[ParticipateLectureMutation] - Erro ao fazer uma requisição PUT a uma participação de palestra': ${error}`);
      showErrorToast("Falha ao participar da palestra!");
    }
  });
}

export const useLectureUnparticipateMutation = () => {
  const { showSuccessToast, showErrorToast } = useCustomToast();
  return useMutation({
    mutationFn: putUnparticipateLecture,
    onSuccess: () => {
      showSuccessToast("Você não está mais participando desta palestra!");
    },
    onError: (error) => {
      console.log(`[UnparticipateLectureMutation] - Erro ao fazer uma requisição PUT a uma desparticipação de palestra': ${error}`);
      showErrorToast("Falha ao deixar de participar da palestra!");
    }
  });
}