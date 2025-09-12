export function MaintenanceError() {
  return (
    <div className="h-svh">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-[7rem] leading-tight font-bold">503</h1>
        <span className="font-medium">Website is under maintenance!</span>
        <p className="text-muted-foreground text-center">
          The site is not available at the moment. <br />
          We'll be back online shortly.
        </p>
      </div>
    </div>
  );
}
