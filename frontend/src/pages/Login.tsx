import Form from "@/components/authentication/AuthForm";

function Login() {
  return (
    <div className="h-screen grid items-center">
        
      <Form route="/api/token/" method="login" />
    </div>
  );
}

export default Login;
