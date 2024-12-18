import { useState, useEffect } from "react";
import { useStore } from '../Auth/Login';  // Importa el contexto de autenticación

export function JustificationHistory() {
    const { token } = useStore(); // Obtiene el token desde el contexto

    const [justifications, setJustifications] = useState([]);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [totalPages, setTotalPages] = useState(1);

    const fetchJustifications = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch(
                `http://52.225.232.58:3000/api/v1/justifications/history?page=${page}&limit=${limit}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Error al obtener el historial de justificaciones.");
            }

            const data = await response.json();

            setJustifications(data.justifications || []); // Ajustado según la estructura de respuesta
            setTotalPages(data.totalPages || 1);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJustifications();
    }, [page]);

    const handlePrevPage = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    if (loading) return <div className="text-center mt-4"><i className="bi bi-arrow-clockwise fs-1 text-primary"></i> Cargando historial...</div>;
    if (error) return <div className="text-danger text-center mt-4">{error}</div>;

    return (
        <div className="container mt-4 col-md-8 mx-auto p-4 bg-light rounded shadow-sm">
            <h2 className="mb-4 text-center" style={{color: '#03346E'}}>Historial de Justificaciones</h2>
            {justifications.length === 0 ? (
                <p className="text-center">No hay justificaciones registradas.</p>
            ) : (
                <table className="table table-striped table-bordered table-sm">
                    <thead style={{ backgroundColor: '#03346E' }}>
                        <tr>
                            <th style={{ color: '#E2E2AA' , backgroundColor: '#03346E'}}>Fecha</th>
                            <th style={{ color: '#E2E2AA' , backgroundColor: '#03346E'}}>Razón</th>
                            <th style={{ color: '#E2E2AA' , backgroundColor: '#03346E'}}>Descripción</th>
                            <th style={{ color: '#E2E2AA' , backgroundColor: '#03346E'}}>Estado</th>
                            <th style={{ color: '#E2E2AA' , backgroundColor: '#03346E'}}>Archivo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {justifications.map((justification) => (
                            <tr key={justification.id}>
                                <td>{new Date(justification.date).toLocaleDateString()}</td>
                                <td>{justification.reason}</td>
                                <td>{justification.description}</td>
                                <td>
                                    <span
                                        className={`badge ${
                                            justification.status === "Aprobado"
                                                ? "bg-success"
                                                : justification.status === "Pendiente"
                                                ? "bg-warning"
                                                : "bg-danger"
                                        }`}
                                    >
                                        {justification.status}
                                    </span>
                                </td>
                                <td>
                                    {justification.attachmentUrl ? (
                                        <a
                                            href={`http://52.225.232.58:3000${justification.attachmentUrl}`} // Construye la URL completa
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-link btn-sm text-decoration-none"
                                        >
                                            <i className="bi bi-download me-2"></i> Descargar
                                        </a>
                                    ) : (
                                        <span>No disponible</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <div className="d-flex justify-content-between mt-3">
                <button
                    className="btn btn-outline-secondary"
                    onClick={handlePrevPage}
                    disabled={page === 1}
                >
                    <i className="bi bi-chevron-left"></i> Anterior
                </button>
                <span className="align-self-center">
                    Página {page} de {totalPages}
                </span>
                <button
                    className="btn btn-outline-secondary"
                    onClick={handleNextPage}
                    disabled={page === totalPages}
                >
                    Siguiente <i className="bi bi-chevron-right"></i>
                </button>
            </div>
        </div>
    );
}
