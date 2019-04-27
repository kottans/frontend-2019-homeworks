import React, { Component } from 'react';
import Friend from './Friend';
import SortButtons from './SortButtons';
import InputSearch from './InputSearch';
import { getFriendList } from './api';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    padding-top: 20px;
    padding-bottom: 20px;
    background-image: linear-gradient(#03D8E3, #58FAAF);
`;
const SideMenuList = styled.form`
    flex-grow:1;
    flex-basis: 20%;
    padding:20px;
    @media screen and (max-width:400px) {
    padding: 0 10px;
    }
`;
const FriendContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-grow: 2;
    flex-basis: 80%;
    @media screen and (min-width:400px) and (max-width:500px) {
    padding:20px 10px;
    }
`;
const Reset = styled.button`
    box-sizing: border-box;
    min-width: 150px;
    display: block;
    text-align: center;
    line-height: 24px;
    padding: 15px 0;
    margin-bottom: 20px;
    font-weight:bold;
    color:rgb(248, 238, 226);
    text-transform: uppercase;
    background-color:#1f635c;
    border-radius: 20px;
    :hover {
    background-color:#3AAAA1; 
    }
`;
class App extends Component {
  state = {
    list: [],
    name: '',
    id: '',
    result: [],
  }
  async componentDidMount() {
    const list = await getFriendList();
    this.setState({ list });
  }
  searchName = ({ name }) => {
    this.setState({ name })
  }
  sortFriends = ({ id }) => {
    this.setState({ id });
  }
  resetAll = () => {
    this.myFormRef.reset();
    this.setState({ name: '', id: '' });
  }
  getFormRef = (el) => {
    this.myFormRef = el;
  }
  render() {
    const { list, id, name } = this.state;
    let result = [...list];

    if (name) {
      result = list.filter(friends =>
        friends.name.first.includes(name));
    }

    if (id) {
      switch (id) {
        case 'sortNameUp':
          result.sort((a, b) =>
            ((a.name.first > b.name.first) - (a.name.first < b.name.first)));
          break;
        case 'sortNameDown':
          result.sort((a, b) =>
            ((b.name.first > a.name.first) - (b.name.first < a.name.first)));
          break;
        case 'sortAgeUp':
          result.sort((a, b) =>
            a.dob.age - b.dob.age);
          break;
        case 'sortAgeDown':
          result.sort((a, b) =>
            b.dob.age - a.dob.age);
          break;
      }
    }

    return (
      <Wrapper>
        <SideMenuList ref={this.getFormRef}>
          <InputSearch handleSearch={this.searchName} />
          <SortButtons handleSort={this.sortFriends} />
          <Reset onClick={this.resetAll} type="button"> Reset</Reset>
        </SideMenuList>
        <FriendContainer>
          {result.map(friends => (
            <Friend
              key={friends.cell}
              {...friends}
              name={friends.name.first.toUpperCase()}
              picture={friends.picture.large}
              gender={friends.gender}
              age={friends.dob.age}
              city={friends.location.city}
              phone={friends.phone}
            />))}
        </FriendContainer>
      </Wrapper>
    );
  }
}


export default App
