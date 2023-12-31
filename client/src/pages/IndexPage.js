import { useEffect, useState } from "react";
import Posts from "../components/Posts";


export default function IndexPage() {

    const[posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/post').then(response => {
            response.json().then(posts => {
                // console.log(posts)
                setPosts(posts)
            })
        })
    }, [])
    return (
        <>
            {/* <Posts />
            <Posts />
            <Posts />
             */}
             {posts.length > 0 && posts.map(post =>(
                <Posts {...post} />
             ))}
        </>

    )
}