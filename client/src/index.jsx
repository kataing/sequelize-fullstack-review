import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import CommentsList from './components/CommentsList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // comments: [{
      //   "id": 0,
      //   "content": "Hi Charlie! Wassup?",
      //   "userId": 0
      // },
      // {
      //   "id": 1,
      //   "content": "I don't understand JS",
      //   "userId": 1
      // },
      // {
      //   "id": 2,
      //   "content": "Hungry right now!, feed me!",
      //   "userId": 0
      // },
      // {
      //   "id": 3,
      //   "content": "WHY ME!!!",
      //   "userId": 2
      // },
      // {
      //   "id": 4,
      //   "content": "How's life going?",
      //   "userId": 0
      // },
      // {
      //   "id": 5,
      //   "content": "Bees Bees Bees... Classes, classes, classes",
      //   "userId": 3
      // },
      // {
      //   "id": 6,
      //   "content": "Wow, that's not nice.",
      //   "userId": 4
      // },
      // {
      //   "id": 7,
      //   "content": "Nobody is on help desk",
      //   "userId": 2
      // },
      // {
      //   "id": 8,
      //   "content": "Who are you???",
      //   "userId": 2
      // },
      // {
      //   "id": 9,
      //   "content": "What do you want from me?",
      //   "userId": 0
      // }],
      comments: [],
      users: [],
      selectedUser: ''
    }
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers() {
    axios
      .get('/users')
      .then(({ data }) => {
        this.setState({
          users: data
        })
      })
      .then(() => {
        this.fetchComments();
      })
      .catch(() => console.error('Could not fetch users'));
  }

  fetchComments() {
    axios
      .get('/comments')
      .then(({ data }) => {
        this.setState({
          comments: data
        })
      })
  }

  fetchUsersComments(username) {
    axios
      .get(`/comments/${username}`)
      .then(({ data }) => {
        this.setState({
          comments: data
        })
      })
  }

  handleSelect(e) {
    this.setState({
      selectedUser: e.target.value
    }, () => {
      this.fetchUsersComments(this.state.selectedUser);
    })
  }

  render() {
    return (<div className="main">
      <div>
        <h2>List of Users:</h2>
        <select onChange={this.handleSelect}>
          <option>Select a User</option>
          {this.state.users.map((user, key) => {
            return(
              <option key={key}>{user.username}</option>
            )
          })}
          {/* <option>John</option>
          <option>Adam</option>
          <option>Charlie</option>
          <option>Lily</option>
          <option>Kate</option> */}
        </select>
      </div>
      <CommentsList comments={this.state.comments} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));