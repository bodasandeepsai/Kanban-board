import React from 'react';
import './styles/Card.css';
import { getPriorityIcon, getStatusIcon } from './utils';

const Card = ({ ticket, user, grouping }) => {
  return (
    <div className="card">
      <div className="card-header">
        <span className="ticket-id">{ticket.id}</span>
        {grouping !== 'user' && (
          <div className="user-avatar">
            <img
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${user?.name}`}
              alt={user?.name}
            />
            <span className={`status-dot ${user?.available ? 'available' : ''}`} />
          </div>
        )}
      </div>
      <div className="card-title">
        {grouping !== 'status' && getStatusIcon(ticket.status)}
        <p className="truncate" title={ticket.title}>{ticket.title}</p>
      </div>
      <div className="card-tags">
        {grouping !== 'priority' && (
          <div className="tag priority-tag">
            {getPriorityIcon(ticket.priority)}
          </div>
        )}
        {ticket.tag.map((tag, index) => (
          <div key={index} className="tag feature-tag">
            <span className="dot" />
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;