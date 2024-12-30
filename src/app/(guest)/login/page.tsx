import LoginForm from "./form";

export default () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-4 md:p-10 w-full">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
};
