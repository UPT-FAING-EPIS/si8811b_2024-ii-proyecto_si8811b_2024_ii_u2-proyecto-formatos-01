import axios from 'axios';
import { useState } from 'react';
import { useStore } from '../Auth/Login';

export function SyncPanel() {
    const [syncStatus, setSyncStatus] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isPersonalSyncDone, setIsPersonalSyncDone] = useState(false);

    const { token } = useStore();

    const syncItems = [
        { id: 'schedule', label: 'Horarios', endpoint: 'http://52.225.232.58:3000/api/v1/sync/schedule' },
        { id: 'attendance', label: 'Asistencias', endpoint: 'http://52.225.232.58:3000/api/v1/sync/attendance' },
    ];

    const handleSync = async (endpoint, id) => {
        setSyncStatus((prev) => ({ ...prev, [id]: 'Sincronizando...' }));
        try {
            const res = await axios.post(`http://52.225.232.58:3000/api/v1/sync/${id}`, { codigo: username, contrasena: password }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.data) {
                setSyncStatus((prev) => ({ ...prev, [id]: 'Sincronización exitosa' }));
            } else {
                throw new Error('Error en la sincronización');
            }
        } catch (error) {
            setSyncStatus((prev) => ({ ...prev, [id]: 'Error en la sincronización' }));
        }
    };

    const handlePersonalSync = async (e) => {
        e.preventDefault();
        setSyncStatus((prev) => ({ ...prev, personal: 'Sincronizando...' }));
        try {
            const res = await axios.post("http://52.225.232.58:3000/api/v1/sync/data", { codigo: username, contrasena: password }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.data.message) {
                setIsPersonalSyncDone(true);
                setSyncStatus({ personal: 'Sincronización exitosa' });
            }
        } catch (error) {
            setSyncStatus((prev) => ({ ...prev, personal: 'Error en la sincronización' }));
        } finally {
            setIsModalOpen(false);
        }
    };

    return (
        <div className="container mt-4">
            {/* Banner */}
            <div className="alert alert-primary text-center mb-4 position-relative" role="alert" style={{ backgroundImage: "url('https://www.upt.edu.pe/upt/sgc/assets/ckeditor/kcfinder/upload/images/IMG_8848%281%29.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', color: 'white' }}>
                <div style={{ backdropFilter: 'brightness(0.5)' }} className="p-3 rounded">
                    <h1 className="fw-bold">¡Bienvenido al Panel de Sincronización!</h1>
                </div>
            </div>

           

            {/* Sincronización Personalizada */}
            <div className="card mb-3 shadow-sm border-0">
                <div className="card-body d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <i className="bi bi-person-circle me-3 fs-4 text-primary"></i>
                        <span className="fw-bold">Sincronización Personalizada</span>
                    </div>
                    <div className="d-flex align-items-center">
                        <span className="text-muted me-2">{syncStatus.personal}</span>
                        <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => setIsModalOpen(true)}
                            disabled={isPersonalSyncDone}
                        >
                            <i className="bi bi-lock me-1"></i>
                            {isPersonalSyncDone ? 'Sincronizado' : 'Sincronizar'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Sincronización de otros elementos */}
            <div className="row">
                {syncItems.map((item) => (
                    <div key={item.id} className="col-md-6 mb-3">
                        <div className="card h-100 shadow-sm border-0">
                            <div className="card-body d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <i className="bi bi-layers me-3 fs-4 text-secondary"></i>
                                    <span className="fw-bold">{item.label}</span>
                                </div>
                                <div className="d-flex align-items-center">
                                    <span className="text-muted me-2">{syncStatus[item.id]}</span>
                                    <button
                                        className="btn btn-outline-secondary btn-sm"
                                        onClick={() => handleSync(item.endpoint, item.id)}
                                        disabled={!isPersonalSyncDone}
                                    >
                                        <i className="bi bi-arrow-clockwise me-1"></i>
                                        Sincronizar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Sincronización Personalizada</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setIsModalOpen(false)}
                                    aria-label="Close"
                                ></button>
                            </div>
                            <form onSubmit={handlePersonalSync}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">
                                            Usuario
                                        </label>
                                        <input
                                            id="username"
                                            type="text"
                                            className="form-control"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">
                                            Contraseña
                                        </label>
                                        <input
                                            id="password"
                                            type="password"
                                            className="form-control"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                                        Cancelar
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Sincronizar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
