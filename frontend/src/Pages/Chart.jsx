import { useContext, useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { IsLoginContext } from "../App";
import { useNavigate } from "react-router-dom";


const Chart = () => {
    const [data, setData] = useState([]);
    const { isLogin } = useContext(IsLoginContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogin) {
            navigate("/login");
        }
        fetchGasData();
    }, []);

    useEffect(() => {
        const interval = setInterval(fetchGasData, 5000);
        return () => clearInterval(interval);
    }, []);


    const fetchGasData = async () => {
        try {
            const response = await fetch("http://127.0.0.1:5000/api/gaz");
            const json = await response.json();
            setData(json.reverse());
        } catch (error) {
            console.error("Erreur lors de la récupération des données :", error);
        }
    };

    return (
        <div style={{ marginLeft: "220px", padding: "2rem" }}>
            <div className="container mt-3">
                <h4 className="mb-4 text-center">Diagramme des valeurs PPM</h4>
                <ResponsiveContainer width="100%" height={500}>
                    <LineChart data={data}>
                        <CartesianGrid stroke="#00000042" strokeDasharray="3 3" />
                        <XAxis dataKey="timestamp" tick={{ fontSize: 12, fill: "#000", fontWeight: "bold" }} angle={-90} textAnchor="end" height={150} />
                        <YAxis label={{ value: "PPM", angle: -90, position: "insideLeft", fill: "#000", fontWeight: "bold" }} tick={{
                            fontSize: 12, fill: "#000", fontWeight: "bold"
                        }} />
                        < Tooltip />
                        <Line type="monotone" dataKey="ppm" stroke="#007bff" strokeWidth={2} dot={{ r: 3 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Chart;
