import { Button, Center, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

export const DashboardPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [received, setReceived] = useState<string | null>(null);

  useEffect(() => {
    socket.on("hey", (data) => {
      setReceived(data);
    });
  }, []);

  const handleEmit = () => {
    socket.emit("hey", inputRef.current?.value);
  };
  return (
    <Center h="90vh">
      <VStack>
        <Heading>Socket Client + Nestjs</Heading>
        <Input ref={inputRef} />
        <Button onClick={handleEmit}>emit event hey</Button>
        <Text>Check the logs of the backend</Text>
        <Text>message received from the backend: {received}</Text>
      </VStack>
    </Center>
  );
};
