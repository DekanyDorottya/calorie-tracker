import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';


function Navbar() {
    const [click, setClick] = useState(false)
    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <Link to='/' className='navbar-logo'>
                        TRVL <i className='fab fa-typo3' />
                    </Link>
                    <div className='menu-icon'>
                        <i className={click ? 'fas fa-times' : ''} />
                    </div>
                </div>
            </nav>{' '}
        </>
    );
}

export default Navbar;
