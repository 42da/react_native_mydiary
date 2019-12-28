import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import Navigation from './Navigator';

// 어떤 개체(데이터)를 고유하게 식별하기 위해 32개 16진수로 구성된 숫자
import uuid from 'uuid/v4';

import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export default class App extends React.Component {

  state = {
    inputTitle: '',
    inputContent: '',
    selectedDate: '',
    imageUrl: '',
    Posts: [{
      id: 'abcdefg1',
      title: '11/20에 쓴 글',
      content: '입니다',
      date: '20191120',
      image: ''
    },
    {
      id: 'abcdefg2',
      title: '11/21에 쓴 글',
      content: '입니다',
      date: '20191121',
      image: '',
    }]
  }
  
  // 저장한 데이터를 불러오는 함수입니다.
componentDidMount(){
	// 예전에 만들어 둔 _getToday 함수를 이용해 오늘 날짜를 받아옵니다.
  const today = this._getToday();
  // 스토리지의 데이터를 가져옵니다.
  AsyncStorage.getItem('@diary:state')
  .then((state)=> {
    if(state != null){
				//받아온 데이터로 state를 설정합니다.
        this.setState(JSON.parse(state));
    }
  }).then(() => {
		// 오늘 날짜에 해당하는 글 부터 출력되도록 state를 변경합니다.
    this.setState({
      selectedDate: today
    });
  });
}

// 데이터를 저장하는 함수입니다.
saveData = () => {
  AsyncStorage.setItem('@diary:state',JSON.stringify(this.state));
}

  //글의 id를 받아오는 함수를 생성합니다.
  _deletePost = (id) => {
    // 이전에 썼던 글들의 리스트를 받아오고
    const prevPosts = [...this.state.Posts];
    // 받아온 아이디와 일치하는 글의 인덱스를 찾아서
    deleteIndex = prevPosts.findIndex((item) => { return item.id == id });
    // 지워줍니다.
    deletePost = prevPosts.splice(deleteIndex, 1);
    // 그리고 저장
    this.setState({ Posts: prevPosts });
  }

  // 사진을 선택해 해당 uri를 저장하는 함수입니다.
  // async-await를 사용합니다.
  _selectPicture = async () => {
    // 현재 사용하는 플랫폼이 ios라면 사진의 접근권한을 체크합니다.
    if (Platform.OS == 'ios') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      // 접근 권한이 허용되지 않았다면, 권한 허용을 요청합니다.
      if (status !== 'granted') {
        alert('설정 > expo > 사진 읽기 및 쓰기 허용을 설정해주세요.');
      }
    }
    // 사진을 받아와, 정보를 저장합니다.
    const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true });
    // 사진의 uri를 state에 설정합니다.
    this.setState({ 
      imageUrl: result.uri,
       });
  }

  _getToday = () => {
    let date = new Date();
    let year = date.getFullYear().toString();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();

    //ex) 9/3 => 09/03
    if (month.length == 1) month = "0" + month;
    if (day.length == 1) day = "0" + day;

    return year + month + day;
  }

  _addPost = () => {
    // uuid를 만들어줍니다.
    let id = uuid();
    // 오늘 날짜를 받아옵니다.
    const today = this._getToday();

    // 지금까지 쓴 글들을 배열 타입으로 가져오고
    const prevPosts = [...this.state.Posts];

    // 추가할 글의 정보를 객체타입으로 정의합니다
    const newPost = {
      //방금 uuid를 이용해 만든 id
      id: id
      , title: this.state.inputTitle
      , content: this.state.inputContent
      // _getToday() 함수를 이용해 만든 오늘 날짜
      , date: today
      , image: this.state.imageUrl
    }

    //만든 아이디가 어떻게 되는지 한 번 출력해보세요!
    // console.log("새로운 아이디"+newPost.id);

    // 저장-!
    this.setState({
      inputTitle: '',
      inputContent: '',
      selectedDate: today,
      imageUrl: '',
      Posts: prevPosts.concat(newPost)
    });
  }

  _changeTitle = (value) => {
    this.setState({ inputTitle: value });
  }

  _changeContent = (value) => {
    this.setState({ inputContent: value });
  }

  _changeDate = (value) => {
    let year = value._i.year.toString();
    let month = (value._i.month + 1).toString();
    let day = value._i.day.toString();

    if (month.length == 1) month = "0" + month;
    if (day.length == 1) day = "0" + day;

    this.setState({
      selectedDate: year + month + day
    });
  }

  render() {
    return (
      <Navigation
        screenProps={{
          inputTitle: '',
          inputContent: '',
          Posts: this.state.Posts,
          selectedDate: this.state.selectedDate,
          changeDate: this._changeDate,
          changeTitle: this._changeTitle,
          changeContent: this._changeContent,
          addPost: this._addPost,
          imageUrl: this.state.imageUrl,
          selectPicture: this._selectPicture,
          deletePost: this._deletePost,
        }} />
    );
  }
}