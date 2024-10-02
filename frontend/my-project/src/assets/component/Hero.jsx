import React, { useState } from 'react'
import axios from 'axios'
import { Smile } from 'lucide-react';
import { Send } from 'lucide-react';
import { Loader } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


const Hero = () => {
    const [text, settext] = useState('');
    const [loading, setloading] = useState(false);
    const [response, setresponse] = useState();


    const handleresposne = async () => {
        if (!text) {
            return
        }
        setloading(true)

        const bodyparameter = {
            prompt: text
        }

        const axiosheader = {
            headers: {
                "Accept": "application/json",

            }
        }

        try {
            const res = await axios.post("http://localhost:3000/api/openai/textcompletion", bodyparameter, axiosheader)
            console.log("Full response:", res.data)
            setresponse(res.data.completion);

        } catch (error) {
            console.log("error in response")
            setresponse("An error occurred while fetching the response.");

        } finally {
            setloading(false);
        }

    }

    const handleEnter = (e) => {
        if (e.key ==='Enter ') {
            handleresposne();
        }

    }

    return (
        <>
            
          <div className='min-h-screen flex flex-col justify-between items-center '>
            <div>
            <h2 className='text-center font-serif text-white text-3xl  '>Let AI Complete Your <span>Thoughts</span>.</h2>
            </div>
            <div className='  flex flex-col  items-center  '>

                {loading ? (

                    <Loader size={25} className='text-white animate-spin' />
                ) : (

                    <div>
                        {(!loading && !response) && (

                            <DotLottieReact
                                src="/animation.json"
                                loop
                                autoplay
                                width={100}
                                height={100}

                            />

                        )}


                        {response && (
                            <div className="m-5 text-lg flex justify-center items-center mt-14 h-[300px] ">
                                <pre className="mx-44 mb-4 text-wrap font-sans  text-white">{response}</pre>
                            </div>
                        )}
                    </div>
                )}
                  </div>
                <div className='flex  mb-14 w-[50vw]  rounded-full justify-center  w items-center  bg-white'>
                    <div className='flex justify-center items-center ml-5 '>
                        <Smile size={22} className='  text-gray-700 ml-4 ' />
                        <input className='  h-12 w-[40vw] justify-center text-lg  ml-2 items-center  text-gray-900 focus:outline-none  placeholder:text-gray-700' type="text " placeholder='write a message' value={text}
                            onChange={(e) => settext(e.target.value)} onKeyDown={handleEnter} />
                    </div>
                    <div className='flex justify-center bg-gray-900  rounded-full items-center mx-2 mr-6 py-1 border-gray-900'>
                        <button className='text-white  h-9 rounded-full   px-4 flex  text-lg text-center ' onClick={handleresposne}>
                         
                         {loading ? (
                            <div className='px-1'>
                               sending...
                            </div>
                         ):(
                            <>
                            <span className='mt-1 text-xl' >send</span> <Send size={14} className=' ml-1  mt-3' />
                            </>
                         )}

                          </button>
                    </div>
                </div>


          
            </div>
        </>
    )

}

export default Hero

