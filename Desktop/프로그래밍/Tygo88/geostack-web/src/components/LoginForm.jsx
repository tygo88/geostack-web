// src/components/LoginForm.jsx
import { signInWithGoogle } from '../firebase-auth';

function LoginForm() {
  const handleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      alert(`환영합니다! ${user.displayName}`);
      console.log(user);
    } catch (err) {
      alert('로그인 실패: ' + err.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Google 계정으로 로그인</h2>
      <button onClick={handleLogin}>Google 로그인</button>
    </div>
  );
}

export default LoginForm;
