import {
  Toast,
  ToastTitle
} from "@/components/ui/toast";
import { SafeAreaView } from "react-native-safe-area-context";

const ErrorToast = () => {
  return (
    <SafeAreaView>
      <Toast
        className='p-4 gap-3 w-full max-w-[386px] shadow-hard-2 border-2 border-green-700'
        variant="outline"
        action="error"
      >
        <ToastTitle>
          Oh, no. Something happened!
        </ToastTitle>
      </Toast>
    </SafeAreaView>
  )
}

export default ErrorToast;