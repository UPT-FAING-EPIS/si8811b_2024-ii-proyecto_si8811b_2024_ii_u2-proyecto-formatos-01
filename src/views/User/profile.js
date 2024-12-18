import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch user data from the API
    const fetchUserData = async () => {
        setLoading(true);
        setError("");
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://52.225.232.58:3000/api/v1/auth/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Error al obtener los datos del usuario.");
            }

            const data = await response.json();
            setUser(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleGoBack = () => {
        navigate("/dashboard"); // Redirige a la vista principal
    };

    if (loading) return <div className="text-center mt-4">Cargando datos del usuario...</div>;
    if (error) return <div className="text-danger text-center mt-4">{error}</div>;

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Perfil del Usuario</h2>
            {user ? (
                <div className="card shadow-sm p-4">
                    <div className="row mb-3">
                        <div className="col-md-4 text-secondary">Nombre:</div>
                        <div className="col-md-8">{user.name}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-4 text-secondary">Correo Electrónico:</div>
                        <div className="col-md-8">{user.email}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-4 text-secondary">ID:</div>
                        <div className="col-md-8">{user.id}</div>
                    </div>
                    <button
                        className="btn btn-secondary mt-3"
                        onClick={handleGoBack}
                    >
                        Regresar
                    </button>
                </div>
            ) : (
                <p className="text-center">No se pudo cargar la información del usuario.</p>
            )}
        </div>
    );
}

export default Profile;
