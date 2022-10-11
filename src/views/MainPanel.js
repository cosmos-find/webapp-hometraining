import React, { useCallback, Component } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import HeadNav from '../components/headnav/HeadNav';

import './MainPanel.style.css';
import './slick.style.css';
import './slick.theme.css';

const topics = [
	{ id: 1, title: '스쿼트', body: '영상 길이: 8분 \n난이도: 중', address: 'https://img.youtube.com/vi/dHpN_Wv53Hw/sddefault.jpg', url: 'https://www.youtube.com/watch?v=dHpN_Wv53Hw' },
	{ id: 2, title: '스쿼트', body: '영상 길이: 9분 \n난이도: 중', address: 'https://img.youtube.com/vi/qEoa40A_aZY/sddefault.jpg', url: 'https://www.youtube.com/watch?v=qEoa40A_aZY' },
	{ id: 3, title: '푸쉬업', body: '영상 길이: 9분 \n난이도: 중', address: 'https://img.youtube.com/vi/aoH7qNedO8k/sddefault.jpg', url: 'https://www.youtube.com/watch?v=aoH7qNedO8k' },
	{ id: 4, title: '플랭크', body: '영상 길이: 5분 \n난이도: 상', address: 'https://img.youtube.com/vi/Zq8nRY9P_cM/sddefault.jpg',url:'https://www.youtube.com/watch?v=Zq8nRY9P_cM' },
    { id: 5, title: '푸쉬업', body: '영상 길이: 9분 \n난이도: 중', address: 'https://img.youtube.com/vi/aoH7qNedO8k/sddefault.jpg', url: 'https://www.youtube.com/watch?v=aoH7qNedO8k' },
    { id: 6, title: '푸쉬업', body: '영상 길이: 9분 \n난이도: 중', address: 'https://img.youtube.com/vi/aoH7qNedO8k/sddefault.jpg', url: 'https://www.youtube.com/watch?v=aoH7qNedO8k' },
    { id: 7, title: '푸쉬업', body: '영상 길이: 9분 \n난이도: 중', address: 'https://img.youtube.com/vi/aoH7qNedO8k/sddefault.jpg', url: 'https://www.youtube.com/watch?v=aoH7qNedO8k' },
    { id: 8, title: '푸쉬업', body: '영상 길이: 9분 \n난이도: 중', address: 'https://img.youtube.com/vi/aoH7qNedO8k/sddefault.jpg', url: 'https://www.youtube.com/watch?v=aoH7qNedO8k' },
    { id: 9, title: '푸쉬업', body: '영상 길이: 9분 \n난이도: 중', address: 'https://img.youtube.com/vi/aoH7qNedO8k/sddefault.jpg', url: 'https://www.youtube.com/watch?v=aoH7qNedO8k' },
    { id: 10, title: '푸쉬업', body: '영상 길이: 9분 \n난이도: 중', address: 'https://img.youtube.com/vi/aoH7qNedO8k/sddefault.jpg', url: 'https://www.youtube.com/watch?v=aoH7qNedO8k' },
	{ id: 11, title: '플랭크', body: '영상 길이: 5분 \n난이도: 상', address: 'https://img.youtube.com/vi/Zq8nRY9P_cM/sddefault.jpg',url:'https://www.youtube.com/watch?v=Zq8nRY9P_cM' },
	{ id: 12, title: '플랭크', body: '영상 길이: 5분 \n난이도: 상', address: 'https://img.youtube.com/vi/Zq8nRY9P_cM/sddefault.jpg',url:'https://www.youtube.com/watch?v=Zq8nRY9P_cM'  },
	{ id: 13, title: '플랭크', body: '영상 길이: 5분 \n난이도: 상', address: 'https://img.youtube.com/vi/Zq8nRY9P_cM/sddefault.jpg',url:'https://www.youtube.com/watch?v=Zq8nRY9P_cM'  },
	{ id: 14, title: '플랭크', body: '영상 길이: 5분 \n난이도: 상', address: 'https://img.youtube.com/vi/Zq8nRY9P_cM/sddefault.jpg',url:'https://www.youtube.com/watch?v=Zq8nRY9P_cM'  },
	{ id: 15, title: '플랭크', body: '영상 길이: 5분 \n난이도: 상', address: 'https://img.youtube.com/vi/Zq8nRY9P_cM/sddefault.jpg',url:'https://www.youtube.com/watch?v=Zq8nRY9P_cM'  },
	{ id: 16, title: '플랭크', body: '영상 길이: 5분 \n난이도: 상', address: 'https://img.youtube.com/vi/Zq8nRY9P_cM/sddefault.jpg',url:'https://www.youtube.com/watch?v=Zq8nRY9P_cM'  },
	{ id: 17, title: '플랭크', body: '영상 길이: 5분 \n난이도: 상', address: 'https://img.youtube.com/vi/Zq8nRY9P_cM/sddefault.jpg',url:'https://www.youtube.com/watch?v=Zq8nRY9P_cM'  },
	{ id: 18, title: '플랭크', body: '영상 길이: 5분 \n난이도: 상', address: 'https://img.youtube.com/vi/Zq8nRY9P_cM/sddefault.jpg',url:'https://www.youtube.com/watch?v=Zq8nRY9P_cM'  },
	{ id: 19, title: '플랭크', body: '영상 길이: 5분 \n난이도: 상', address: 'https://img.youtube.com/vi/Zq8nRY9P_cM/sddefault.jpg',url:'https://www.youtube.com/watch?v=Zq8nRY9P_cM'  },
	{ id: 20, title: '플랭크', body: '영상 길이: 5분 \n난이도: 상', address: 'https://img.youtube.com/vi/Zq8nRY9P_cM/sddefault.jpg',url:'https://www.youtube.com/watch?v=Zq8nRY9P_cM'  },
];

const MyCard = (props) => {
	const navigate = useNavigate();
    const handleOnClick = useCallback(() => navigate('/content/'+props.topic.id, {replace: true}), [navigate]);
	
	return (
		<div className="content-box" key={props.topic.id} onClick={handleOnClick}>
			<a id={props.topic.id}>
				<img src={props.topic.address} width="150px" height="120px" alt="none"></img>
			</a>
			<h3>{props.topic.title}</h3>
        	<p>{props.topic.body}</p>
		</div>
	);
}

function SampleNextArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{ ...style, display: "block", background: "#C70851" }}
			onClick={onClick}
		/>
	);
}

function SamplePrevArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{ ...style, display: "block", background: "#C70851" }}
			onClick={onClick}
		/>
	);
}
  

const MainPanel = () => {
	const cardList = topics.map((topic)=>{return (<MyCard topic={topic}></MyCard>);});
	const settings = {
		className: "center",
		infinite: true, // loop를 만들지(마지막 이미지-처음 이미지-중간 이미지들-마지막 이미지)
		slidesToShow: 5,
		slidesToScroll: 5,
		speed: 500, // 애니메이션의 속도, 단위는 milliseconds
		rows: 2,
		dots: true, //캐러셀이미지가 몇번째인지 알려주는 점을 보여줄지 정한다.
		nextArrow: <SampleNextArrow />,
	    prevArrow: <SamplePrevArrow />
	};

	return (
		<>
		<HeadNav></HeadNav>
		<div className='slider-main'>
			<Slider {...settings}>
				{cardList}
			</Slider>
		</div>
		</>
	);
};

export default MainPanel;

