import LoginForm from "./form";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 w-full">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <img src="/logo.jpg" alt="Logo" className="w-7" />
            </div>
            <span>Alva</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:flex justify-center items-center bg-white">
        <img src="/login.svg" alt="Login Image" className="lg:h-2/3 lg:w-2/3" />
      </div>
    </div>
  );
}
