import { useContext, useEffect, useState } from 'react';
import Historique from '../Components/Historique';
import { useToast } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import { IsLoginContext } from "../App"

function Dashboard() {
    const [gasData, setGasData] = useState([]);
    const [latest, setLatest] = useState(null);
    const toast = useToast();
    const { isLogin } = useContext(IsLoginContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogin) {
            navigate("/login");
        }
        const interval = setInterval(fetchGasData, 3000);
        return () => clearInterval(interval);
    }, []);

    const fetchGasData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/gaz');
            const data = await response.json();
            setGasData(data);
            if (data.length > 0) setLatest(data[0]);
        } catch (error) {
            console.error('Erreur de chargement des données :', error);
        }
    };

    const buzzerOFF = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/buzzer/off', { method: "POST" });
            const data = await response.json();
            toast({
                title: "Succès",
                description: data?.message,
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: "top-right"
            })
        } catch (error) {
            toast({
                title: "Erreur",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
        }

    }

    return (
        <div style={{ marginLeft: "220px", padding: "2rem" }}>
            <div className="container mt-3" >
                <h1 className="text-center mb-4">Tableau de bord de surveillance des gaz</h1>
                <div className="row mb-3 align-items-stretch">
                    <div className="col-md-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <h4>Dernière mesure PPM :</h4>
                                <h2>{latest ? latest.ppm + ' ppm' : 'Chargement...'}</h2>
                                <p>Reçue le : {latest ? new Date(latest.timestamp).toLocaleString() : ''}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className='card h-100'>
                            <div className='card-body'>
                                <h4>Statut d’alerte :</h4>
                                <h2 className={
                                    latest && latest.ppm >= 500 ? 'text-danger text-center mt-4 fw-bold' :
                                        latest && latest.ppm > 300 ? 'text-warning text-center mt-4 fw-bold' : 'text-success text-center mt-4 fw-bold'
                                }>
                                    {latest ? (
                                        latest.ppm >= 500 ? 'DANGER' : latest.ppm > 300 ? 'ATTENTION' : 'Normal'
                                    ) : 'Chargement...'}
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div className='card h-100'>
                            <div className="card-body">
                                <h4>Désactiver le buzzer</h4>
                                <img src="button.png" alt="button" className='img-fluid w-25 d-block m-auto click' onClick={buzzerOFF} />
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h4>Historique des mesures</h4>
                    {<Historique data={gasData} />}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
