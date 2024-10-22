import React from 'react';
import './styles/Board.css';
import Column from './Column.js';
import { getPriorityLabel, getStatusIcon, getUserAvatar } from './utils';

const Board = ({ tickets, users, grouping, sorting }) => {
  const organizeTickets = () => {
    let groups = {};
    let sortedTickets = [...tickets];

    if (sorting === 'priority') {
      sortedTickets.sort((a, b) => b.priority - a.priority);
    } else {
      sortedTickets.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (grouping === 'status') {
      groups = {
        'Backlog': [],
        'Todo': [],
        'In progress': [],
        'Done': [],
        'Canceled': []
      };
      sortedTickets.forEach(ticket => {
        groups[ticket.status].push(ticket);
      });
    } else if (grouping === 'user') {
      users.forEach(user => {
        groups[user.name] = [];
      });
      sortedTickets.forEach(ticket => {
        const user = users.find(u => u.id === ticket.userId);
        if (user) {
          groups[user.name].push(ticket);
        }
      });
    } else if (grouping === 'priority') {
      groups = {
        'No Priority': [],
        'Low': [],
        'Medium': [],
        'High': [],
        'Urgent': []
      };
      sortedTickets.forEach(ticket => {
        groups[getPriorityLabel(ticket.priority)].push(ticket);
      });
    }

    return groups;
  };

  const groups = organizeTickets();

  return (
    <div className="board">
      {Object.entries(groups).map(([groupName, groupTickets]) => (
        <Column
          key={groupName}
          title={groupName}
          tickets={groupTickets}
          users={users}
          grouping={grouping}
        />
      ))}
    </div>
  );
};

export default Board;
