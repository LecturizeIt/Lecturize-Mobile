import { Box } from "@/components/ui/box";
import { Button, ButtonText } from '@/components/ui/button';
import { FormControl } from '@/components/ui/form-control';
import { Heading } from '@/components/ui/heading';
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Image } from '@/components/ui/image';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Text } from "@/components/ui/text";
import { VStack } from '@/components/ui/vstack';
import { Mail } from 'lucide-react-native';
import Logo from "../../assets/images/logo.png";
import { useState } from "react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const handleState = () => {
    setShowPassword(prev => !prev);
  }


  return (
    <Box className='flex-1 items-center justify-center p-[3rem]'>
      <FormControl className="p-4 border rounded-lg border-outline-300 w-full">
        <Image source={Logo} alt='project logo'
          size='xl'
          className='mx-auto'
        />
        <VStack space="xl">
          <Heading className="text-typography-900">Register</Heading>
          <VStack space="xs">
            <Text className="text-typography-500">Email</Text>
            <Input className="min-w-[250px]">
              <InputSlot className="ps-3">
                <InputIcon as={Mail} />
              </InputSlot>
              <InputField type="text" placeholder='Seu email' />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text className="text-typography-500">Password</Text>
            <Input className="text-center">
              <InputField type={showPassword ? "text" : "password"} placeholder='Sua senha' />
              <InputSlot className="pr-3" onPress={handleState}>
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
              </InputSlot>
            </Input>
          </VStack>
          <VStack space="xs">
            <Text className="text-typography-500">Confirm Password</Text>
            <Input className="text-center">
              <InputField type={showPassword ? "text" : "password"} placeholder='Confirme sua senha' />
              <InputSlot className="pr-3" onPress={handleState}>
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
              </InputSlot>
            </Input>
          </VStack>
          <Button className="ml-auto">
            <ButtonText className="text-typography-0">Save</ButtonText>
          </Button>
        </VStack>
      </FormControl>


    </Box>
  );
}

export default Register;