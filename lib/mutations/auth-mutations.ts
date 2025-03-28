import { useAuthContext } from "@/contexts/auth-context";
import useCustomToast from "@/hooks/use-custom-toast";
import { login, register } from "@/lib/apis/auth-api";
import { useMutation } from "@tanstack/react-query";
import { Href, useLocalSearchParams, useRouter } from "expo-router";

export const useLoginMutation = () => {
  const router = useRouter();
  const { login: loginUser } = useAuthContext();
  const { showSuccessToast } = useCustomToast();
  const { redirectTo } = useLocalSearchParams<{ redirectTo?: string }>();

  return useMutation({
    mutationFn: login,
    onError: (err) => {
      console.log(err);
    },
    onSuccess: async (data) => {
      const user = await loginUser(data.accessToken!);
      showSuccessToast(`Bem vindo, ${user.username}`);
      router.replace((redirectTo ?? "/") as Href);
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
      loginMutation.mutate({ email, password });
    }
  });
}