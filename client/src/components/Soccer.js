import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Soccer.css';

const Soccer = () => {
  const navigate = useNavigate();

  return (
    <div className="soccer-form-container">
      <div className="soccer-form-card soccer-menu-card">
        <h2>⚽ 축구 선택 시스템</h2>
        <p className="soccer-menu-desc">원하는 작업을 선택하세요</p>

        <div className="menu-button-group">
          <button
            className="nav-btn primary full-width"
            onClick={() => navigate('/addplayer')}
          >
            선수 추가
          </button>
          <button
            className="nav-btn secondary full-width"
            onClick={() => navigate('/playerlist')}
          >
            선수 목록 보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Soccer;