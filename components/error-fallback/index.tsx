import { FallbackProps } from "react-error-boundary";
import { Box } from "../ui/box";
import { Heading } from "../ui/heading";
import { Text } from "../ui/text";

const ErrorFallback = ({ error, resetErrorBoundary }: Partial<FallbackProps>) => {
  return (
    <Box className="flex-1 justify-center items-center w-full">
      <Heading className="text-typography-950" size="2xl">Error...</Heading>
      {error && <Text>{error.message ?? "Erro... Tente novamente mais tarde!"}</Text>}
    </Box>
  )
}

export default ErrorFallback;
