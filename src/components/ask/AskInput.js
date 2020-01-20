import React from 'react';

const AskInput = ({
  title,
  contents,
  category,
  answerLength,
  answerAmount,
  dueTo,
  onInputChange
}) => {
  return (
    <div>
      <h1>질문하기!</h1>
      <form>
        <div>
          카테고리 선택
          <select type="category" value={category} onChange={onInputChange('category')}>
            <option>&nbsp;</option>
            <option>개발</option>
            <option>내발</option>
            <option>새발</option>
          </select>
        </div>
        <div>
          <input
            style={{
              width: '400px',
              height: '30px',
              margin: '5px',
              borderRadius: '5px',
            }}
            type="title"
            placeholder="질문 제목 입력"
            value={title}
            onChange={onInputChange('title')}
          ></input>
        </div>
        <div>
          <input
            style={{
              width: '400px',
              height: '75px',
              margin: '5px',
              borderRadius: '5px',
            }}
            type="contents"
            placeholder="질문 입력"
            value={contents}
            onChange={onInputChange('contents')}
          ></input>
        </div>
        <div>
          답변 옵션
          <div></div>
          <span>
            답변 길이
            <select type="answerLength" value={answerLength} onChange={onInputChange('answerLength')}>
              <option>&nbsp;</option>
              <option>1 ~ 10개의 단어</option>
              <option>한 줄</option>
              <option>한 문장</option>
              <option>doesn't matter</option>
            </select>
          </span>
          <span>
            답변 갯수
            <select type="answerAmount" value={answerAmount} onChange={onInputChange('answerAmount')}>
              <option>&nbsp;</option>
              <option>1 answer</option>
              <option>2 answers</option>
              <option>3 answers</option>
              <option>doesn't matter</option>
            </select>
          </span>
        </div>
        <div>
          답변 제출 마감 시간?
          <select type="dueTo" value={dueTo} onChange={onInputChange('dueTo')}>
            <option>&nbsp;</option>
            <option>6 hours later</option>
            <option>12 hours later</option>
            <option>1 day later</option>
            <option>doesn't matter</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default AskInput;