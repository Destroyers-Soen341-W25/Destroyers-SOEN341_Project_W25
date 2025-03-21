import React, {useState} from 'react';
import Header from "../Section/Header";
import AuthenticationModal from "../Section/AuthenticationModal";

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="app" style={{background: "url('/destroyers_logo.png') no-repeat center", width: '100%', height: '100vh'}}>
            <Header setIsModalOpen={setIsModalOpen}/>
            <AuthenticationModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
        </div>
    );
};

export default Home;