import axios from 'axios'
import { useState, useEffect } from 'react'
import { useStore } from '../Auth/Login'


export function AttendanceView() {
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const { token } = useStore();

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const response = await axios.get('http://52.225.232.58:3000/api/v1/attendance', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("API Response:", response.data);

                if (response.data.attendanceData) {
                    setAttendanceData(response.data.attendanceData);
                } else {
                    console.error("Error: Attendance data is missing in the response.");
                    throw new Error('Error al obtener las asistencias');
                }
            } catch (error) {
                console.error("Error fetching attendance:", error);
                setError('No se pudo cargar la asistencia. Por favor, intente más tarde.');
            } finally {
                setLoading(false);
            }
        };

        fetchAttendance();
    }, [token]);

    if (loading) return <div style={styles.centerText}>Cargando asistencias...</div>;
    if (error) return <div style={{ ...styles.centerText, color: 'red' }}>{error}</div>;

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Horario de Asistencias</h2>
            {attendanceData.map((course, index) => {
                const allDates = [
                    ...new Set(course.asistencias.map((attendance) => attendance.fecha)),
                ];

                return (
                    <div key={index} style={styles.courseContainer}>
                        <h3 style={styles.courseHeading}>{course.curso}</h3>
                        <div style={styles.tableContainer}>
                            <table style={styles.attendanceTable}>
                                <thead>
                                    <tr>
                                        <th style={styles.tableHeader}>Día</th>
                                        {allDates.map((date, idx) => (
                                            <th key={idx} style={styles.tableHeader}>{date}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={styles.dayCell}>Asistencia</td>
                                        {allDates.map((date, idx) => {
                                            const attendance = course.asistencias.find(
                                                (a) => a.fecha === date
                                            );
                                            return (
                                                <td key={idx} style={styles.attendanceCell}>
                                                    {attendance ? (
                                                        <span
                                                            style={{
                                                                ...styles.attendanceStatus,
                                                                color:
                                                                    attendance.estado === 'Asiste'
                                                                        ? 'green'
                                                                        : 'red',
                                                            }}
                                                        >
                                                            {attendance.estado}
                                                        </span>
                                                    ) : (
                                                        <span style={styles.noAttendance}>-</span>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            })}
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
    courseContainer: {
        width: '100%',
        maxWidth: '1200px',
        backgroundColor: '#FFFFFF',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
        padding: '16px',
    },
    courseHeading: {
        fontSize: '22px',
        fontWeight: 'bold',
        color: '#03346E',
        marginBottom: '10px',
    },
    tableContainer: {
        overflowX: 'auto',
        width: '100%',
    },
    attendanceTable: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    tableHeader: {
        backgroundColor: '#03346E',
        color: '#E2E2B6',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '10px',
        border: '1px solid #03346E',
    },
    dayCell: {
        padding: '10px',
        fontSize: '14px',
        fontWeight: 'bold',
        textAlign: 'center',
        border: '1px solid #03346E',
        backgroundColor: '#F9F9F9',
    },
    attendanceCell: {
        padding: '10px',
        fontSize: '14px',
        textAlign: 'center',
        border: '1px solid #03346E',
    },
    attendanceStatus: {
        fontWeight: 'bold',
    },
    noAttendance: {
        color: '#888',
        fontStyle: 'italic',
    },
};
