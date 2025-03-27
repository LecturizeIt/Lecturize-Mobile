import {
  Toast,
  ToastTitle
} from "@/components/ui/toast";
import { SafeAreaView } from "react-native-safe-area-context";

const ErrorToast = ({ message="Oh, no. Something Happened" }: { message?: string }) => {
  return (
    <SafeAreaView>
      <Toast
        className='p-4 gap-3 w-full max-w-[386px] shadow-hard-2 border-2 border-red-700'
        variant="outline"
        action="error"
      >
        <ToastTitle>
          {message}
        </ToastTitle>
      </Toast>
    </SafeAreaView>
  )
}

export default ErrorToast;