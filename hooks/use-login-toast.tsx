import SuccessfulLoginToast from "@/components/successful-login";
import { useToast } from "@/components/ui/toast";

const useLoginToast = () => {
  const toast = useToast();

  const showSuccessfulLoginToast = () => {
    toast.show({
      placement: "top",
      render: () => <SuccessfulLoginToast />
    })
  }

  return { showSuccessfulLoginToast }
}

export default useLoginToast;
