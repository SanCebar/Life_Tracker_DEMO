import './Home.css';
import Hero from '../Hero/Hero';

const bgImage =
    "https://images.unsplash.com/photo-1579126038374-6064e9370f0f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=717&q=80";

export default function Home() {
    return (
        <div className="Home">
            <Hero bgImage={bgImage} />
            <h1>Home Page</h1>
        </div>
    )
}