import React from 'react';
import { Link } from 'react-router-dom';

type StyleProps = {
    style: React.CSSProperties;
}
export default function Home({ style }: StyleProps) {
    return <>
        <div>
            <p> Home </p>
            <Link to='/1'>Go to details</Link>
        </div>

    </>
}