import React from 'react';
import LinkWrapper from '../LinkWrapper';


const Header = () => {
    return (
        <nav>
            <div className="nav-wrapper indigo lighten-2">
                <LinkWrapper to="/" className="brand-logo" activeStyle={{}}>Prova BRD</LinkWrapper>
                <ul className="right">
                    <li><LinkWrapper to='/'>Home</LinkWrapper></li>
                    <li><LinkWrapper to='/caselist'>Cases</LinkWrapper></li>
                    <li><LinkWrapper to='/case'>New Case</LinkWrapper></li>
                </ul>
            </div>
        </nav>
    );
}
export default Header;
