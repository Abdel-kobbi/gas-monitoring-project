import { useContext, useEffect, useState } from 'react';
import { IsLoginContext } from '../App';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [typePwd, setTypePwd] = useState('password');
    const [error, setError] = useState(false);
    const { isLogin, setIsLogin } = useContext(IsLoginContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogin) {
            navigate("/dashboard");
        }
    }, [])

    const handleLogin = (e) => {
        e.preventDefault();
        if (userName === "admin" && password === "admin") {
            setIsLogin(true);
            navigate("/dashboard");
        } else {
            setError(true);
        }
    };

    const toggleShowPwd = (e) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            setTypePwd("text");
        } else {
            setTypePwd("password");
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%", borderRadius: "20px" }}>
                <h2 className="text-center mb-4 text-primary">Connexion</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor='userName' className="form-label">Nom d'utilisateur</label>
                        <input
                            type="text"
                            id='userName'
                            className="form-control"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                            placeholder="Nom d'utilisateur"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor='password' className="form-label">Mot de passe</label>
                        <input
                            type={typePwd}
                            id='password'
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="********"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="checkbox"
                            id='togglePwd'
                            className="form-check-input me-1"
                            onChange={toggleShowPwd}
                        />
                        <label htmlFor='togglePwd' className="form-check-label">Afficher le mot de passe</label>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Se connecter
                    </button>
                </form>
                <div className="text-center mt-3">
                    <small className="text-muted d-block mb-2">Surveillance de gaz</small>
                    {error && <small className="text-danger">Nom d'utilisateur ou mot de passe incorrect</small>}
                </div>
            </div>
        </div>
    );
}

export default Login;
