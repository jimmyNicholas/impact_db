import { useActionState } from "react";
import { useFormStatus } from 'react-dom';
import api from "@/api/config";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants";

interface FormProps {
  route: string;
  method: string;
}

function SubmitButton({ name }: { name: string }) {
  const { pending } = useFormStatus();
  return (
    <button className="form-button" type="submit" disabled={pending}>
      {name}
    </button>
  );
}

const Form: React.FC<FormProps> = ({ route, method }: FormProps) => {
  const navigate = useNavigate();
  const name = method === "login" ? "Login" : "Register";

  const [error, submitAction] = useActionState(
    async (_prevState: string | null, formData: FormData) => {
      try {
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        
        const res = await api.post(route, { username, password });
        
        if (method === "login") {
          localStorage.setItem(ACCESS_TOKEN, res.data.access);
          localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
          navigate("/");
        } else {
          navigate("/login");
        }
        return null;
      } catch (error) {
        return error instanceof Error ? error.message : 'An error occurred';
      }
    },
    null
  );

  return (
    <form action={submitAction}>
      <h1>{name}</h1>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        name="username"
        placeholder="Username"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
      />
      <SubmitButton name={name} />
    </form>
  );
};

export default Form;
