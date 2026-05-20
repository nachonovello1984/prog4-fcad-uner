import { useContext } from 'react';
import { UserContext } from '../UserContext/UserContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const { userData, setUserData } = useContext(UserContext);

    const handleLogout = async () => {
        const response = await fetch('http://localhost:3001/api/logout');
        if (!response.ok) {
            console.error('Error al cerrar sesión:', response.text);
            return;
        }

        setUserData(null);
        localStorage.removeItem("user");
        navigate('/');
    };

    return (<header>
        <div className="contenedor contenedor-flex">
            <h1>Programación <span className="cuatro"></span></h1>
            <img className="logo" src="/img/fcad-uner-70.png" alt="Logo FCAD-UNER 70 años" />
        </div>
    </header>);
};

export default Header;