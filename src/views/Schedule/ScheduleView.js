import axios from 'axios';
import { useState, useEffect } from 'react';
import { useStore } from '../Auth/Login';

export function ScheduleView() {
    const [schedule, setSchedule] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const { token } = useStore();

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const response = await axios.get('http://52.225.232.58:3000/api/v1/schedule', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.schedule) {
                    setSchedule(response.data.schedule);
                } else {
                    throw new Error('Error al obtener el horario');
                }
            } catch (error) {
                setError('No se pudo cargar el horario. Por favor, intente más tarde.');
            } finally {
                setLoading(false);
            }
        };

        fetchSchedule();
    }, [token]);

    if (loading) return <div style={styles.centerText}>Cargando horario...</div>;
    if (error) return <div style={{ ...styles.centerText, color: '#E38E49' }}>{error}</div>;

    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

    const normalizeDay = (day) => {
        const mapping = {
            Lunes: 'Lunes',
            Martes: 'Martes',
            Miércoles: 'Miércoles',
            Jueves: 'Jueves',
            Viernes: 'Viernes',
            Sábado: 'Sabado',
            Domingo: 'Domingo',
        };
        return mapping[day] || day;
    };

    const scheduleByDay = days.map((day) => ({
        day: day,
        courses: schedule
            .map((course) => ({
                ...course,
                times: course.schedule[normalizeDay(day)] || [],
            }))
            .filter((course) => course.times),
    }));

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Mi Horario</h2>
            <div style={styles.tableContainer}>
                <table style={styles.scheduleTable}>
                    <thead>
                        <tr>
                            <th style={styles.courseColumn}>Curso</th>
                            {days.map((day) => (
                                <th key={day} style={styles.dayColumn}>{day}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {scheduleByDay[0].courses.map((course, index) => (
                            <tr key={index}>
                                <td style={styles.courseCell}>{course.name} ({course.code})</td>
                                {days.map((day) => {
                                    const courseForDay = course.schedule[normalizeDay(day)] || [];
                                    return (
                                        <td key={day} style={styles.timeCell}>
                                            {courseForDay.length > 0 ? (
                                                <ul style={styles.timeList}>
                                                    {courseForDay.map((time, idx) => (
                                                        <li key={idx} style={styles.timeItem}>{time}</li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <span style={styles.noClasses}>-</span>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
const styles = {
    container: {
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
    },
    heading: {
        fontSize: '28px',
        fontWeight: '600',
        color: '#03346E',
        marginBottom: '20px',
    },
    centerText: {
        textAlign: 'center',
        fontSize: '18px',
        color: '#E38E49',
        marginTop: '20px',
    },
    tableContainer: {
        overflowX: 'auto',
        width: '100%',
        maxWidth: '1200px',
        backgroundColor: '#03346E',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    scheduleTable: {
        width: '100%',
        borderCollapse: 'separate',
        borderSpacing: '0', // Quita separación entre celdas
    },
    courseColumn: {
        fontWeight: 'bold',
        padding: '10px',
        textAlign: 'left',
        fontSize: '16px',
        backgroundColor: '#03346E',
        border: '1px solid #03346E', // Bordes para todas las celdas
        color: '#E2E2B6',
    },
    dayColumn: {
        textAlign: 'center',
        padding: '10px',
        fontSize: '16px',
        fontWeight: 'bold',
        backgroundColor: '#03346E',
        border: '1px solid #03346E',
        color: '#E2E2B6',
    },
    courseCell: {
        padding: '10px',
        fontSize: '14px',
        color: '#03346E',
        border: '1px solid #03346E',
        textAlign: 'center',
        backgroundColor: '#F9F9F9', // Fondo más claro para contraste
    },
    timeCell: {
        textAlign: 'center',
        padding: '8px',
        fontSize: '14px',
        color: '#03346E',
        border: '1px solid #03346E',
        backgroundColor: '#FFFFFF', // Fondo blanco para mayor claridad
    },
    timeList: {
        listStyleType: 'none',
        padding: 0,
        margin: 0,
    },
    timeItem: {
        color: '#03346E',
        fontWeight: '500',
    },
    noClasses: {
        color: '#03346E',
        fontStyle: 'italic',
    },
};
