import { useAuthContext } from "@/contexts/auth-context";
import useCustomToast from "@/hooks/use-custom-toast";
import { login, register } from "@/lib/apis/auth-api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { Href, useLocalSearchParams, useRouter } from "expo-router";

export const useLoginMutation = () => {
  const router = useRouter();
  const { login: loginUser } = useAuthContext();
  const { showSuccessToast } = useCustomToast();
  const { redirectTo } = useLocalSearchParams<{ redirectTo?: string }>();

  return useMutation({
    mutationFn: login,
    onError: (error) => {
      console.log(`[LoginMutation] - Erro ao fazer uma requisição POST de uma autenticação: ${error}`);
    },
    onSuccess: async ({ accessToken, refreshToken }) => {
      await AsyncStorage.setItem("accessToken", accessToken);
      await AsyncStorage.setItem("refreshToken", refreshToken);
      const user = await loginUser();
      showSuccessToast(`Bem vindo, ${user.username}`);
      router.replace((redirectTo ?? "/") as Href);
    }
  });
}

export const useRegisterMutation = () => {
  const loginMutation = useLoginMutation();
  return useMutation({
    mutationFn: register,
    onError: (error) => {
      console.log(`[RegisterMutation] - Erro ao fazer uma requisição POST de uma nova conta: ${error}`);
    },
    onSuccess: (_data, { email, password, username }, _context) => {
      loginMutation.mutate({ email, password });
    }
  });
}