import { Box } from "../ui/box";
import { Heading } from "../ui/heading";
import { Text } from "../ui/text";

const ErrorMessage = <T extends Error>({ error }: { error: T }) => {
  return (
    <>
      <Box className="flex-1 justify-center items-center w-full">
        <Heading className="text-typography-950" size="2xl">Error...</Heading>
        {error && <Text>{error.message}</Text>}
      </Box>
    </>
  )
}

export default ErrorMessage;
