import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function CreatePost(props) {
    let navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault()

        console.log(localStorage.getItem('token'));
        let myHeaders = new Headers()
        myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`)
        myHeaders.append('Content-Type', 'application/json')

        let postFormData = JSON.stringify({
            title: e.target.title.value,
            body: e.target.body.value,
        })

        fetch('http://localhost:5000/api/posts', {
            method: 'POST',
            headers: myHeaders,
            body: postFormData
        })
            .then(res => res.json())
            .then(data => {
                if (data.error){
                    console.log(data.error);
                } else {
                    console.log(data);
                    props.flashMessage('Post successfully created.', 'success')
                    navigate('/')
                }
            })
    }



    return (
        <>
            <h3 className="text-center">Create Post!</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group" style={{margin: "0 20vw"}} id='inlineTest'>
                    <label htmlFor="title">Title</label>
                    <input type="text" className='form-control mb-3' placeholder="Title..." name='title'/>
                    <label htmlFor="body">Post Body</label>
                    <input type="text" className='form-control mb-3' placeholder="Post body..." name='body'/>

                    <input type="submit" className='btn btn-primary w-100' value='Publish'/>
                </div>
            </form>
        </>
    )
}
