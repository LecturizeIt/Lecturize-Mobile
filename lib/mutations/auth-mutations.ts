import { useAuthContext } from "@/contexts/auth-context";
import useLoginToast from "@/hooks/use-custom-toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { login, register } from "@/lib/apis/auth-api";

export const useLoginMutation = () => {
  const router = useRouter();
  const { login: loginUser } = useAuthContext();
  const { showSuccessfulLoginToast } = useLoginToast();

  return useMutation({
    mutationFn: login,
    onError: (err) => {
      console.log(err);
    },
    onSuccess: async (data) => {
      await loginUser(data.accessToken!);
      showSuccessfulLoginToast();
      router.replace("/");
    }
  });
}

export const useRegisterMutation = () => {
  const loginMutation = useLoginMutation();
  return useMutation({
    mutationFn: register,
    onError: (err) => {
      console.log(err);
    },
    onSuccess: (_data, { email, password, username }, _context) => {
      loginMutation.mutate({email, password});
    }
  });
}