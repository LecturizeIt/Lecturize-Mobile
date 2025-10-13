import ErrorToast from "@/components/custom-toasts/error-toast";
import SuccessToast from "@/components/custom-toasts/successful-login-toast";
import { useToast } from "@/components/ui/toast";

const useCustomToast = () => {
  const toast = useToast();

  const showSuccessToast = (message: string) => {
    toast.show({
      placement: "top",
      render: () => <SuccessToast message={message} />
    })
  }

  const showErrorToast = (message: string) => {
    toast.show({
      placement: "top",
      render: () => <ErrorToast message={message} />
    });
  }

  return { showSuccessToast, showErrorToast }
}

export default useCustomToast;
