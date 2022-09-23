import React from 'react'

export default function NewsItem({ key, id, name, email }) {
    console.log("key, id, name, email", key, id, name, email);
    return (
        <div className=" border cursor-pointer" >
            <div className="grid grid-cols-2 ">

                <div className="text-black pl-10 overflow-hidden py-4 text-sm pr-6 shorten-word">
                    {name}
                </div>


                <div className="text-black pl-0 overflow-hidden py-4 text-sm pr-6 shorten-word">
                    {email}
                </div>

            </div>
        </div>

    )
}
