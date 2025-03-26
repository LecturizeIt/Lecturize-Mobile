import {
  Toast,
  ToastTitle
} from "@/components/ui/toast";
import { useAuthContext } from "@/contexts/auth-context";
import { SafeAreaView } from "react-native-safe-area-context";

const SuccessfulLoginToast = () => {
  const { user } = useAuthContext();
  return (
    <SafeAreaView>
      <Toast
        className='p-4 gap-3 w-full max-w-[386px] shadow-hard-2 border-2 border-green-700'
        variant="outline"
        action="success"
      >
        <ToastTitle>
          {`Bem vindo, ${user?.username}!`}
        </ToastTitle>
      </Toast>
    </SafeAreaView>
  )
}

export default SuccessfulLoginToast;