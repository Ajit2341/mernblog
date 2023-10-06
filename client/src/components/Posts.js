// import React, { Component } from 'react'

// export default function Posts ({title, summary, cover, content }) {

//     return (
//         <div className="post">
//         <div className="image">
//         <img src="https://techcrunch.com/wp-content/uploads/2022/08/Samsung-Self-Repair-S21_Mid-Repair.jpg?w=430&h=230&crop=1" />
//         </div>
//         <div className="texts">
//         <h2>Smart display company Hearth Display</h2>
//         <p className="info">
//           <a className="author">Ajit Auti </a>
//           <time>2023-08-15 03:25</time>
//         </p>
//         <p className="summary">Hearth Display, a hardware company making digital whiteboards for family task management, has raised $4.7 million in additional funding. The round, which is a bridge round, has a mix of existing and new investors including Female Founders Fund.</p>
//         </div>
//       </div>
//     )
//   }

import React from 'react'

import { format } from 'date-fns';
import { Link } from 'react-router-dom';

export default function Posts({ _id,title, summary, cover, content, createdAt, author }) {

  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={'http://localhost:4000/' + cover} />
        </Link>

      </div>
      <div className="texts">
      <Link to={`/post/${_id}`}>
        <h2>{title}</h2>
        </Link>
        <p className="info">
          <a className="author">{author.username}</a>
          <time>{format(new Date(createdAt), 'do MMM yyyy  h:mm aaa')}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  )
}


