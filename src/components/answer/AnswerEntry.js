import React, { Component } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

class AnswerEntry extends Component {

  constructor(props) {
    super(props);
    this.state = {
      answerContents : {
        id: null,
        contents: null,
        username: null,
        answerFlag: null,
        like: null,
        createdAt: null,
        updatedAt: null
      },
      havePermission: false
    }
  }

  // const { id={answer.id} isLogin, username, questionFlag(true일 때만 답글 수정/삭제 가능)
  // getAnswerListInformation 답글 정보를 새로 요청하는 함수 } = this.props

  handleHavePermission = () => {
    const { isLogin, username, questionFlag } = this.props;
    const { answerContents } = this.state;
    if (isLogin && questionFlag && username === answerContents.username) {
      this.setState({
        havePermission: true
      });
    }
  }

  getAnswerInformation = (id) => {
    axios.get(`http://localhost:5000/answer/${id}`)
      .then(res => {
        console.log('답변글 한 개 요청 성공');
        this.setState({
          answerContents : {
            id: 1,
            contents: ' 답글 랜더 테스트용 내용',
            username: 'rami',
            answerFlag: null,
            like: null,
            createdAt: '2020-01-02',
            updatedAt: '2020-01-02'
          }
        });
      }, () => this.handleHavePermission())
      .catch(err => {
        console.log(err.message);
        // this.setState({ errorMessage: err.message });
      });
  }

  modifyAnswer = () => {
    const { id, contents } = this.state.answerContents;

    axios.patch(`http://localhost:5000/answer/${id}`, {
      contents: contents
    })
    .then(res => {
      console.log('답글 수정 성공');
      // 다시 해당 글 정보 요청
      this.getAnswerInformation(id);
    }).catch(err => {
      console.log(err.message);
      // this.setState({ errorMessage: err.message });
    });    
  }

  deleteAnswer = () => {
    const { id } = this.state.answerContents;

    axios.delete(`http://localhost:5000/answer/${id}`)
    .then(res => {
      console.log('답글 삭제 성공')
      // 새로고침
      this.props.history.go(0);
    }).catch(err => {
      console.log(err.message);
      // this.setState({ errorMessage: err.message });
    });
  }

  componentDidMount() {
    console.log('AnswerEntry.js - componentDidMount 불림')

    // props로 넘어온 답글id로 해당 글 정보 요청
    const id = this.props.id;
    this.getAnswerInformation(id);
  }

  render() {
    const { getAnswerInformation } = this;
    const { isLogin, username } = this.props;
    const { answerContents, havePermission } = this.state;
    const { id, contents, createdAt, updatedAt } = this.state.askContents;
    return (
      <div>
        <ul>
          <li>id: {id}</li>
          <li>contents: {contents}</li>
          <li>username: {answerContents.username}</li>
          <li>createdAt: {createdAt}</li>
          <li>updatedAt: {updatedAt}</li>
        </ul>
      { havePermission && <button onClick={() => this.modifyAnswer()}>modifyAnswer 실행 권한 있음</button>}
      { havePermission && <button onClick={() => this.deleteAnswer()}>deleteAnswer 실행 권한 있음</button>}
      </div>
    );
  }
}

export default AnswerEntry;
