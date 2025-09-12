import { createFileRoute } from "@tanstack/react-router";
import { ForbiddenError } from "@/components/errors/forbidden-error";

export const Route = createFileRoute("/(errors)/403")({
  component: ForbiddenError,
});
