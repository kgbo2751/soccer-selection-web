import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Soccer.css';

const AddPlayer = () => {
  const [name, setName] = useState('');
  const [team, setTeam] = useState('맨유');
  const [position, setPosition] = useState('공격');
  const [dominantFoot, setDominantFoot] = useState('왼발');
  const [alertMessage, setAlertMessage] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const navigate = useNavigate();

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !team || !position || !dominantFoot) {
      setAlertMessage('모든 필드를 입력해주세요!');
      return;
    }

    const playerData = { name, team, position, dominantFoot };

    try {
      await axios.post('http://localhost:3001/api/players', playerData);

      showToast('선수 추가 완료!');
      navigate('/playerlist');
    } catch (err) {
      console.error(err);
      setAlertMessage('서버 오류 발생');
    }
  };

  return (
    <div className="soccer-form-container">
      <div className="soccer-form-card">
        <h2>선수 추가</h2>

        {alertMessage && <div className="alert">{alertMessage}</div>}
        {toastMessage && <div className="toast show">{toastMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>선수 이름</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="이름을 입력하세요"
              required
            />
          </div>

          <div className="form-group">
            <label>팀</label>
            <select value={team} onChange={e => setTeam(e.target.value)} required>
              <option value="맨유">맨유</option>
              <option value="맨시티">맨시티</option>
              <option value="첼시">첼시</option>
              <option value="리버풀">리버풀</option>
              <option value="아스날">아스날</option>
              <option value="토트넘">토트넘</option>
            </select>
          </div>

          <div className="form-group">
            <label>포지션</label>
            <select value={position} onChange={e => setPosition(e.target.value)} required>
              <option value="공격">공격</option>
              <option value="미드필더">미드필더</option>
              <option value="수비">수비</option>
              <option value="골키퍼">골키퍼</option>
            </select>
          </div>

          <div className="form-group">
            <label>주발</label>
            <select value={dominantFoot} onChange={e => setDominantFoot(e.target.value)} required>
              <option value="왼발">왼발</option>
              <option value="오른발">오른발</option>
              <option value="양발">양발</option>
            </select>
          </div>

          <div className="button-group">
            <button type="submit" className="nav-btn primary">
              추가하기
            </button>
            <button type="button" className="nav-btn secondary" onClick={() => navigate('/')}>
              뒤로가기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPlayer;