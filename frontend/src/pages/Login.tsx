import Form from '@/components/authentication/AuthForm';

function Login() {
    return <Form route='/api/token/' method='login' />
}

export default Login;