import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import api from '../services/api';
import more from '../assets/more.svg';
import like from '../assets/like.svg';
import comment from '../assets/comment.svg';
import send from '../assets/send.svg';
import './Feed.css';

const Feed = () => {
    
    const [feed, setFeed] = useState([]);
    
    const connectSocket = () => {
        const socket = io('http://localhost:3333');
        socket.on('post', data => {
            setFeed([...feed, data]);
        });
        socket.on('like', data => {
            if (feed.length > 0) {
                setFeed(feed.map(post => post._id == data._id ? data : post));                
            }
        });
    }
    connectSocket();

    useEffect(() => {
        const fetch = async () => {
            const res = await api.get('/posts');
            setFeed(res.data);
        }
        fetch();
    }, []);

    const handlerLike = id => {
        api.post(`/posts/${id}/like`);
    }

    return (
        <section id="post-list">
            {feed.map(post => (
                <article key={post._id}>
                    <header>
                        <div className="user-info">
                            <span>{post.author}</span>
                            <span className="place">{post.place}</span>
                        </div>
                        <img src={more} alt="Mais" />
                    </header>
                    <img src={`http://localhost:3333/files/${post.image}`} alt="" />
                    <footer>
                        <div className="actions">
                            <button type="button" onClick={() => handlerLike(post._id)}>
                                <img src={like} />
                            </button>
                            <img src={comment} />
                            <img src={send} />
                        </div>

                        <strong>{post.likes} curtidas</strong>
                        <p>
                            {post.description}
                            <span>#react</span>
                        </p>
                    </footer>
                </article>
            ))}
        </section>
    )
};

export default Feed;
