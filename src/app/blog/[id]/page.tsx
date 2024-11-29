"use client"

import { useParams } from 'next/navigation';
import React from 'react';

const page = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const id = useParams()
    console.log(id);


    return (
        <div>
            sdsdsdsdsd
        </div>
    );
};

export default page;