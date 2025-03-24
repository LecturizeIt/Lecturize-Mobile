import RegisterForm from "@/components/register-form";
import { Box } from "@/components/ui/box";

const Register = () => {

  return (
    <Box className='flex-1 items-center justify-center p-[3rem]'>
      <RegisterForm />
    </Box>
  );
}

export default Register;