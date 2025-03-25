import LoginForm from '@/components/login-form';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Link } from 'expo-router';

const LoginPage = () => {
  return (
    <Box className='flex-1 items-center justify-center p-[3rem]'>
      <LoginForm />
      <Link href={"/register"} asChild>
        <Button variant='link' className=''>
          <ButtonText className='underline'>Não tem uma conta? Registre-se</ButtonText>
        </Button>
      </Link>
    </Box>
  );
}

export default LoginPage;