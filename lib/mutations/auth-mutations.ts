import { useAuthContext } from "@/contexts/auth-context";
import useCustomToast from "@/hooks/use-custom-toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { login, register } from "@/lib/apis/auth-api";

export const useLoginMutation = () => {
  const router = useRouter();
  const { login: loginUser } = useAuthContext();
  const { showSuccessToast } = useCustomToast();

  return useMutation({
    mutationFn: login,
    onError: (err) => {
      console.log(err);
    },
    onSuccess: async (data) => {
      const user = await loginUser(data.accessToken!);
      showSuccessToast(`Bem vindo, ${user.username}`);
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