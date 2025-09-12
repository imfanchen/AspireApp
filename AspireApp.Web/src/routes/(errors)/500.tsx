import { createFileRoute } from "@tanstack/react-router";
import { InternalServerError } from "@/components/errors/internal-server-error";

export const Route = createFileRoute("/(errors)/500")({
  component: InternalServerError,
});
