import LoginForm from '@/components/login-form';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Link } from 'expo-router';

const Login = () => {
  return (
    <Box className='flex-1 items-center justify-center p-[3rem]'>
      <LoginForm />
      <Link href={"/(tabs)/register"} asChild>
        <Button variant='link' className=''>
          <ButtonText className='underline'>Não tem uma conta? Registre-se</ButtonText>
        </Button>
      </Link>
    </Box>
  );
}

export default Login;