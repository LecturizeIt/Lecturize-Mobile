import ErrorToast from "@/components/custom-toasts/error-toast";
import SuccessfulLoginToast from "@/components/custom-toasts/successful-login-toast";
import { useToast } from "@/components/ui/toast";

const useCustomToast = () => {
  const toast = useToast();

  const showSuccessfulLoginToast = () => {
    toast.show({
      placement: "top",
      render: () => <SuccessfulLoginToast />
    })
  }

  const showErrorToast = () => {
    toast.show({
      placement: "top",
      render: () => <ErrorToast />
    })
  }

  return { showSuccessfulLoginToast, showErrorToast }
}

export default useCustomToast;
