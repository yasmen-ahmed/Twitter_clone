"use client"
import React ,{useState,useEffect} from 'react'
import Image from 'next/image'


export default function News() {
    const [news,setNews]=useState([])
    const [articalNumber,setArticalNumber]=useState(3)

    useEffect(()=>{
        fetch('https://saurav.tech/NewsAPI/top-headlines/category/business/us.json')
       .then(response=>response.json())
       .then((data)=>{
        setNews(data.articles)
        console.log(data.articles);
    
    })
    .catch(error => console.error('Error fetching news:', error));
       
    },[])

  return (
    <div className='text-gray-700 space-y-3 bg-gray-100 rounded-xl p-2'>
        <h4 className='font-bold text-xl px-4'>What's happening ?</h4>
       {news.slice(0,articalNumber).map((article)=>
        (
            <div key={article.url}>
                <a href={article.url} target='_blank'>
                    <div className='flex items-center justify-between px-4 py-2
                    space-x-1 hover:bg-gray-200 transition duration-200
                    '>
                        <div className='space-y-0.5'>
                            <h6 className='text-sm font-bold '>{article.title}</h6>
                            <p className='text-xs font-medium text-gray-500'>{article.source.name}</p>

                        </div>

                <Image className='rounded-xl' src={article.urlToImage}
                width={70}
                height={70}
                alt={article.title}
                />
                    </div>
                    </a>
                
            </div>
        )
       )

       } 

<button onClick={()=> setArticalNumber(articalNumber + 3)}
    className='pl-4 pb-3 text-blue-300 hover:text-blue-400 text-sm'
    >
        Load More
 
</button>

    </div>


  )
}
