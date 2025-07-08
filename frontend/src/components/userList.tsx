import * as React from 'react';
import axios from 'axios';

interface User {
    id: number;
    username: string;
}


interface State {
    users: User[];
}

export default class UserList extends React.Component<{}, State>{ 
    state: State = {
        users: []
    };
    
componentDidMount() {
    axios.get<User[]>('http://localhost:3000/api/users')
        .then(response => {
            const users = response.data;
            this.setState({ users});
        });
}

render() {
    return (
        <div>
            <ul>
                {this.state.users.map(user => (
                    <li key={user.id}>
                        {user.username}
                    </li>
                ))}
            </ul>
        </div>
    )
}

















}