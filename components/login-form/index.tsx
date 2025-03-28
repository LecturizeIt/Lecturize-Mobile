import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText } from '@/components/ui/form-control';
import { Heading } from '@/components/ui/heading';
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Image } from '@/components/ui/image';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useLoginMutation } from '@/lib/mutations/auth-mutations';
import { LoginFormValues, loginSchema } from '@/lib/schemas/login-schema';
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from 'axios';
import { AlertCircle, Mail } from 'lucide-react-native';
import { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import colors from "tailwindcss/colors";
import Logo from "../../assets/images/logo.png";


const defaultValues: LoginFormValues = {
  email: "admin@admin.com",
  password: "1234",
};

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLoginMutation();

  const handleState = () => {
    setShowPassword(prev => !prev);
  }

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues,
    mode: "onSubmit"
  });

  const { errors } = form.formState;
  const { control, handleSubmit } = form;

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data, {
      onError: (error) => {
        if (isAxiosError(error) && error.response) {
          const serverError = error.response?.data;
          form.setError("root", { message: serverError.detail });
        } else form.setError("root", { message: error.message })
      },
    });
  };

  return (
    <FormControl className="p-4 border rounded-lg border-outline-300 w-full" isInvalid={Boolean(errors.root)}>
      <Image source={Logo} alt='project logo'
        size='xl'
        className='mx-auto'
      />
      <VStack space="xl">
        <Heading className="text-typography-900 text-center">Login</Heading>
        <FormControlError>
          <VStack className='w-full px-[1rem] gap-4'>
            <FormControlErrorIcon as={AlertCircle} className='mx-auto' />
            <FormControlErrorText className='w-full text-center'>
              {errors.root?.message}
            </FormControlErrorText>
          </VStack>
        </FormControlError>
        <VStack space="xs">

          <Text className="text-typography-500">Email</Text>
          <Controller
            control={control}
            name='email'
            render={({ field }) => (
              <Input className="min-w-[250px]" isInvalid={Boolean(errors.email)}>
                <InputSlot className="ps-3">
                  <InputIcon as={Mail} />
                </InputSlot>
                <InputField
                  type="text"
                  placeholder='Seu email'
                  onChangeText={field.onChange}
                  value={field.value}
                  onBlur={field.onBlur}
                />
              </Input>
            )}
          />
          {errors.email && (
            <Text className='color-error-500'>{errors.email.message}</Text>
          )}

        </VStack>
        <VStack space="xs">

          <Text className="text-typography-500">Password</Text>
          <Controller
            control={control}
            name='password'
            render={({ field }) => (
              <Input className="text-center" isInvalid={Boolean(errors.password)}>
                <InputField
                  type={showPassword ? "text" : "password"}
                  placeholder='Sua senha'
                  onChangeText={field.onChange}
                  value={field.value}
                  onBlur={field.onBlur}
                />
                <InputSlot className="pr-3" onPress={handleState}>
                  <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                </InputSlot>
              </Input>
            )}
          />
          {errors.password && (
            <Text className='color-error-500'>{errors.password.message}</Text>
          )}

        </VStack>
        <Button
          className="mx-auto w-full max-w-[100px] items-center justify-center"
          onPress={handleSubmit(onSubmit)}
          isDisabled={loginMutation.isPending}
          action='accent'
        >
          {loginMutation.isPending ? (
            <ButtonSpinner color={colors.purple[500]} />
          ) : (
            <ButtonText className="text-typography-0">Entrar</ButtonText>
          )}
        </Button>
      </VStack>
    </FormControl>
  )
}

export default LoginForm;
