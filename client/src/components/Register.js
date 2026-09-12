import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { username, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password) {
      setError('모든 항목을 입력해주세요.');
      return;
    }

    if (username.length < 3) {
      setError('아이디는 최소 3자 이상이어야 합니다.');
      return;
    }

    if (password.length < 4) {
      setError('비밀번호는 최소 4자 이상이어야 합니다.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || '회원가입에 실패했습니다.');
      }

      alert('회원가입 성공! 메인으로 이동합니다.');
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>⚽ Squad Join</h2>
          <p>나만의 베스트 11 라인업을 구성해보세요</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">감독 아이디</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="3자 이상 입력"
              value={username}
              onChange={handleChange}
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="4자 이상 입력"
              value={password}
              onChange={handleChange}
              autoComplete="new-password"
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? '등록 중...' : '회원가입 완료'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;