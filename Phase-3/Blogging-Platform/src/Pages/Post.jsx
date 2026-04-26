import React, {useState,useEffect} from 'react'
import { Link,useParams,useNavigate } from 'react-router-dom'
import service from '../appwrite/conf'
import Button from '../components/Button'
import Container from '../components/Container/container'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'

function Post() {
  const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userid === userData.$id : false;

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.featuredimgid);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8 w-full block min-h-screen text-black">
            <Container>
                <div className="w-full flex justify-center mb-8 relative border border-gray-200 bg-white shadow-sm rounded-xl p-4 overflow-hidden">
                    <img
                        src={service.getFilePreview(post.featuredimgid || post.featuredImage)}
                        alt={post.title}
                        className="rounded-2xl w-full object-cover max-h-[500px] shadow-lg"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6 bg-white/80 p-2 rounded-xl shadow-lg backdrop-blur-sm">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500 hover:bg-green-600" className="mr-3 shadow-sm">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500 hover:bg-red-600" className="shadow-sm" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6 max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">{post.title}</h1>
                </div>
                <div className="browser-css w-full max-w-4xl mx-auto prose prose-blue prose-lg md:prose-xl bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-gray-100">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null
}

export default Post