import React, { useEffect, useState } from 'react'


const imageList = ["https://watermark.lovepik.com/photo/20211209/large/lovepik-winter-snow-scenery-picture_501705719.jpg", "https://ynet-pic1.yit.co.il/picserver5/wcm_upload/2022/12/28/rJXgcNz75Kj/_________________________.jpg", "https://img.lovepik.com/photo/50199/9207.jpg_wh860.jpg", "https://upload.wikimedia.org/wikipedia/commons/a/ab/Alpine-panorama-247335.jpg"
]

const Carousel = () => {
    const [pos, setPos] = useState(0)
    let imageElements = imageList.map((url, index) => {
        return <img style={{ width: "25%", height: "100%", display: "inline", objectFit: "cover" }} key={index} src={url} />
    });

    let buttonElements = imageList.map((url, index) => {
        return <button onClick={() => setPos(index)} style={{
            width: "50px", height: "50px", borderRadius: "50%", zIndex: "6",
            backgroundColor: pos == index ? "black" : "white",
            margin: "10px", display: "inline",
        }}
            key={index} >
        </button>
    });


    useEffect(() => {
       const timer =  setTimeout(() => {
            setPos(prev => { return (prev + 1)%imageList.length })
        }, 3000)
        return ()=>{
            clearTimeout(timer)
        }

    }, [pos])





    return (
        <>
            <div style={{ display: "flax", width: `${100 * imageList.length}%`, position: "relative", left: `-${100 * pos}%`, transition: "left 0.9s ease-in-out" }}>
                {imageElements}
            </div>
            <div style={{ position: "fixed", top: "800px", left: "40vw" }}>{buttonElements}</div>
            <div style={{ position: "fixed", top: "400px", left: "2vw" }}><button onClick={() => setPos(prev => { return (prev - 1 + imageList.length) % imageList.length })} style={{ width: "50px", height: "50px", borderRadius: "50%", zIndex: "6", backgroundColor: "white", margin: "10px", display: "inline" }}  ></button></div>
            <div style={{ position: "fixed", top: "400px", left: "90vw" }}><button onClick={() => setPos(prev => { return (prev + 1) % imageList.length })} style={{ width: "50px", height: "50px", borderRadius: "50%", zIndex: "6", backgroundColor: "white", margin: "10px", display: "inline" }}  ></button></div>

        </>
    )
}

export default Carousel
