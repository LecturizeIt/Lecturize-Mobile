import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLecture, putLectureImage } from "../apis/lectures-api";
import useCustomToast from "@/hooks/use-custom-toast";
import { DocumentPickerAsset } from "expo-document-picker";


export const useLecturesMutation = () => {
  const { showErrorToast } = useCustomToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postLecture,
    onSuccess: (lecture) => {
      queryClient.invalidateQueries({ queryKey: ["lectures", "list"] });
    },
    onError: (error) => {
      console.log(error);
      showErrorToast("Falha ao criar palestra");
    }
  })
};

export const useLectureImageMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ file, id }: { file: DocumentPickerAsset, id: string }) => {
      return putLectureImage(file, id);
    },
    onSuccess: (_, { id }) => {
      return queryClient.invalidateQueries({ queryKey: ["lectures", "detail", id] });
    }
  })
};