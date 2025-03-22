import { Button, ButtonText } from '@/components/ui/button';
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText } from '@/components/ui/form-control';
import { Heading } from '@/components/ui/heading';
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Image } from '@/components/ui/image';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { LoginFormValues, loginSchema } from '@/lib/schemas/login-schema';
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Mail } from 'lucide-react-native';
import { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import Logo from "../../assets/images/logo.png";
import {
  useToast,
  Toast,
  ToastTitle,
  ToastDescription,
} from "@/components/ui/toast"
import { useLoginMutation } from '@/lib/mutations';
import { isAxiosError } from 'axios';


const defaultValues: LoginFormValues = {
  email: "admin@admin.com",
  password: "1234",
};

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
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
      onSuccess: (data) => {
        toast.show({
          placement: "top",
          render: () => (
            <Toast
              className='p-4 gap-3 w-full max-w-[386px] shadow-hard-2'
            >
              <ToastTitle>Response</ToastTitle>
              <ToastDescription>
                <Text className='text-primary-0'>{JSON.stringify(data, null, 2)}</Text>
              </ToastDescription>
            </Toast>
          )
        })
      },
      onError: (err) => {
        if (isAxiosError(err)) {
          toast.show({
            placement: "top",
            render: () => (
              <Toast
                className='p-4 gap-3 w-full max-w-[386px] shadow-hard-2'
              >
                <ToastTitle>Response</ToastTitle>
                <ToastDescription>
                  <Text className='text-error-0'>{JSON.stringify(err.response?.data, null, 2)}</Text>
                </ToastDescription>
              </Toast>
            )
          })
        }
      }
    });
  };

  return (
    <FormControl className="p-4 border rounded-lg border-outline-300 w-full" >
      <Image source={Logo} alt='project logo'
        size='xl'
        className='mx-auto'
      />
      <VStack space="xl">
        <Heading className="text-typography-900">Login</Heading>
        <FormControlError>
          <FormControlErrorIcon as={AlertCircle} />
          <FormControlErrorText>
            Choose one time slot for the meeting
          </FormControlErrorText>
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
        <Button className="ml-auto" onPress={handleSubmit(onSubmit)}>
          <ButtonText className="text-typography-0">Save</ButtonText>
        </Button>
      </VStack>
    </FormControl>
  )
}

export default LoginForm;
