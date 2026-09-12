import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Playerlist.css';

const Playerlist = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/players');
        setPlayers(res.data);
      } catch (err) {
        console.error('선수 목록 불러오기 실패:', err);
      }
    };

    fetchPlayers();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`${name} 선수를 목록에서 삭제하시겠습니까?`)) {
      return;
    }

    try {
      await axios.delete(`http://localhost:3001/api/players/${id}`);
      setPlayers((prev) => prev.filter((player) => player._id !== id));
      alert(`${name} 선수가 삭제되었습니다.`);
    } catch (err) {
      console.error('선수 삭제 실패:', err);
      alert('선수 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="playerlist-container">
      <h2 className="playerlist-header">선수 목록</h2>

      {players.length === 0 ? (
        <div className="empty-list-message">선수 목록이 비었습니다.</div>
      ) : (
        <div className="player-items-wrapper">
          {players.map((player) => (
            <div key={player._id} className="playerlist-item">
              <div className="player-info">
                <h3>{player.name}</h3>
                <p>팀: {player.team}</p>
                <p>포지션: {player.position}</p>
                <p>주발: {player.dominantFoot}</p>
              </div>
              <button
                className="delete-btn"
                onClick={() => handleDelete(player._id, player.name)}
              >
                삭제
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="button-group">
        <button className="nav-btn primary" onClick={() => navigate('/addplayer')}>
          선수 추가
        </button>
        <button className="nav-btn secondary" onClick={() => navigate('/')}>
          메인으로
        </button>
      </div>
    </div>
  );
};

export default Playerlist;