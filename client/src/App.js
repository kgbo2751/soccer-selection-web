import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Soccer from './components/Soccer';
import AddPlayer from './components/AddPlayer';
import Playerlist from './components/Playerlist';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(savedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    alert('로그아웃 되었습니다.');
  };

  return (
    <div>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 24px',
        backgroundColor: '#1e293b',
        borderBottom: '1px solid #334155'
      }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Link to="/" style={{ color: '#10b981', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem' }}>
            ⚽ Soccer Selection
          </Link>
          <Link to="/playerlist" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.95rem' }}>
            선수 목록
          </Link>
          <Link to="/addplayer" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.95rem' }}>
            선수 추가
          </Link>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {currentUser ? (
            <>
              <span style={{ color: '#f8fafc', fontWeight: '600', fontSize: '0.95rem' }}>
                안녕하세요 <span style={{ color: '#10b981' }}>{currentUser}</span>님!
              </span>
              <button
                onClick={handleLogout}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#334155',
                  color: '#cbd5e1',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.85rem'
                }}
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{
                padding: '6px 14px',
                backgroundColor: '#334155',
                color: '#f8fafc',
                textDecoration: 'none',
                borderRadius: '6px',
                fontWeight: '600',
                fontSize: '0.9rem'
              }}>
                로그인
              </Link>
              <Link to="/register" style={{
                padding: '6px 14px',
                backgroundColor: '#10b981',
                color: '#0f172a',
                textDecoration: 'none',
                borderRadius: '6px',
                fontWeight: '600',
                fontSize: '0.9rem'
              }}>
                회원가입
              </Link>
            </>
          )}
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Soccer />} />
        <Route path="/addplayer" element={<AddPlayer />} />
        <Route path="/playerlist" element={<Playerlist />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLoginSuccess={(user) => setCurrentUser(user)} />} />
      </Routes>
    </div>
  );
}

export default App;