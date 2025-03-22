import { useMutation } from "@tanstack/react-query";
import { login } from "./apis/auth-api";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: login,
    onError: (err) => {
      console.log(err);
    }
  });
}