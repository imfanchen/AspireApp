import { useState, useEffect, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MessageSquare } from "lucide-react";
import {
  HubConnectionBuilder,
  HubConnection,
  HubConnectionState,
} from "@microsoft/signalr";
import type { UserMessage } from "@/types/user-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Message, MessageContent } from "@/components/ai-elements/message";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  PromptInput,
  PromptInputActionMenu,
  PromptInputBody,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";

export const Route = createFileRoute("/chat")({
  component: RouteComponent,
});

function RouteComponent() {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [messages, setMessages] = useState<UserMessage[]>([]);
  const [input, setInput] = useState("");
  const [user, setUser] = useState("User");
  const [connectionState, setConnectionState] = useState<HubConnectionState>(
    HubConnectionState.Disconnected
  );
  const latestMessages = useRef(messages);

  latestMessages.current = messages;

  useEffect(() => {
    const hubConnection = new HubConnectionBuilder()
      .withUrl("/hub/message")
      .withAutomaticReconnect()
      .build();

    setConnection(hubConnection);
    setConnectionState(hubConnection.state);

    hubConnection.onreconnecting(() =>
      setConnectionState(HubConnectionState.Reconnecting)
    );
    hubConnection.onreconnected(() =>
      setConnectionState(HubConnectionState.Connected)
    );
    hubConnection.onclose(() =>
      setConnectionState(HubConnectionState.Disconnected)
    );
  }, []);

  useEffect(() => {
    if (connection && connection.state === HubConnectionState.Disconnected) {
      connection
        .start()
        .then(() => {
          console.log("Connected!");
          setConnectionState(HubConnectionState.Connected);

          connection.on("MessageReceived", (message: UserMessage) => {
            const updatedMessages = [...latestMessages.current, message];
            setMessages(updatedMessages);
          });
        })
        .catch((e) => {
          console.log("Connection failed: ", e);
          setConnectionState(HubConnectionState.Disconnected);
        });
    }
  }, [connection]);

  const sendMessage = async (messageText: string) => {
    if (
      connection &&
      connection.state === HubConnectionState.Connected &&
      messageText
    ) {
      const message: UserMessage = { user, message: messageText };
      await connection.invoke("SendMessage", message);
      setMessages([...messages, message]);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <Label htmlFor="username" className="mb-0">
            Name:
          </Label>
          <Input
            type="text"
            placeholder="Your name"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <div className="flex items-center">
          <span
            className={`h-2 w-2 rounded-full mr-2 ${connectionState === HubConnectionState.Connected ? "bg-green-900 animate-ping" : "bg-gray-900"}`}
          ></span>
          <Label className="text-sm">
            {connectionState === HubConnectionState.Connected
              ? "Connected"
              : connectionState === HubConnectionState.Reconnecting
                ? "Reconnecting..."
                : "Disconnected"}
          </Label>
        </div>
      </div>
      <Separator />
      <div className="flex-grow p-4 overflow-auto">
        <Conversation className="relative w-full h-full">
          <ConversationContent>
            {messages.length === 0 ? (
              <ConversationEmptyState
                icon={<MessageSquare className="size-12" />}
                title="No messages yet"
                description="Start a conversation to see messages here"
              />
            ) : (
              messages.map((message, index) => (
                <Message
                  from={message.user === user ? "user" : "assistant"}
                  key={index}
                >
                  <MessageContent>
                    {message.user}: {message.message}
                  </MessageContent>
                </Message>
              ))
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
      </div>
      <div className="p-4">
        <PromptInput
          onSubmit={(message) => sendMessage(message.text ?? "")}
          className="relative"
        >
          <PromptInputBody>
            <PromptInputTextarea
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
          </PromptInputBody>
          <PromptInputToolbar>
            <PromptInputTools>
              <PromptInputActionMenu />
            </PromptInputTools>
            <PromptInputSubmit
              disabled={
                !input || connectionState !== HubConnectionState.Connected
              }
            />
          </PromptInputToolbar>
        </PromptInput>
      </div>
    </div>
  );
}
