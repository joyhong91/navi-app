import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return <>
        <p> Home </p>
        <Link to='/1'>Go to details</Link>
    </>
}