import { createFileRoute } from "@tanstack/react-router";
import { UnderConstruction } from "@/components/under-construction";

export const Route = createFileRoute("/")({
  component: IndexComponent,
});

function IndexComponent() {
  return (
    <>
      <UnderConstruction />
    </>
  );
}
