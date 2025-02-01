import Form from "@/components/authentication/AuthForm";

function Register() {
    return <Form route='/api/user/register/' method='register' />
}

export default Register;