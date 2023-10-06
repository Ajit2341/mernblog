import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {useState} from "react"
import { Navigate } from "react-router-dom";
import Editor from "../Editor";

export default function CreatePost() {

    const [title, setTitle] = useState('');
    const [summary, setSummarry] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false)

    async function createNewPost(ev){
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file',files[0]);
        console.log(files)
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/post',{
            method: 'POST',
            body: data,
            credentials:'include',
        })
      //console.log(await response.json())
      if(response.ok){
        setRedirect(true)
      }
    }

    if(redirect){
        return <Navigate to="/"></Navigate>
    }
    return (
        <form onSubmit ={createNewPost}>
            <input type="title" 
            placeholder="Enter Post title here" 
            value={title}
            onChange ={ev => setTitle(ev.target.value)}>
            </input>
            <input type="summary" 
            placeholder={'Summary'} 
            value={summary}
            onChange ={ev => setSummarry(ev.target.value)}>
            </input>

            <input 
            type="file"
            // value={files}
            onChange = {ev => setFiles(ev.target.files)}
            >
            </input>

            {/* <textarea name="" id=" " cols="30" rows="10"></textarea> */}
            {/* <ReactQuill 
            value={content} 
           onChange ={event => setContent(event)}
          // console.log(event)
            modules={modules} 
            formats={formats} /> */}
            <Editor value={content} onChange={setContent}/>
            <button style={{marginTop:'10px'}}>Create post</button>

        </form>
    )
}