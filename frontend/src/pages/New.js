import React, { useState } from 'react';

import api from '../services/api';
import './New.css';

const New = ({ history }) => {

    const [post, setPost] = useState({
        image: null,
        author: '',
        place: '',
        description: '',
        hashtags: ''
    });

    const handlerSubmit = e => {
        e.preventDefault();
        const data = new FormData();
        Object.entries(post).forEach(entry => {
            const [key, value] = entry;
            data.append(key, value);
        });
        api.post('/posts', data).then(res => {
            history.push('/');
        });
    }

    const handleChange = e => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    const handlerImageChange = e => {
        setPost({ ...post, image: e.target.files[0] });
    }

    return (
        <form id="new-post" onSubmit={handlerSubmit}>
            <input type="file" onChange={handlerImageChange} />

            <input type="text" onChange={handleChange} value={post.author} name="author" placeholder="Author" />
            <input type="text" onChange={handleChange} value={post.place} name="place" placeholder="Place" />
            <input type="text" onChange={handleChange} value={post.description} name="description" placeholder="Description" />
            <input type="text" onChange={handleChange} value={post.hashtags} name="hashtags" placeholder="Hashtags do post" />

            <button type="submit">Enviar</button>
        </form>
    )
};

export default New;
