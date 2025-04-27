import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { getStudentAnswersByExam } from "@/services/ExamServices";

const downloadStudentSummary = async (examReference, examName) => {
    try {
        const students = await getStudentAnswersByExam(examReference);
        const data = students.data.map(student => {
            const totalQuestions = student.questions.length;
            const correctAnswers = student.score;

            return {
                "Nombre del Alumno": student.studentName.trim(),
                "Cantidad de respuestas correctas": `${correctAnswers}/${totalQuestions}`
            };
        });

        const worksheet = XLSX.utils.aoa_to_sheet([ 
            ["Nombre del Alumno", "Cantidad de respuestas correctas"], // Cabecera
            ...data.map(student => [student["Nombre del Alumno"], student["Cantidad de respuestas correctas"]]) // Filas de datos
        ]);


        // Ajuste automático del ancho de las columnas
        const columnWidths = [0, 0]; // Array para almacenar el ancho máximo de cada columna
        data.forEach((row) => {
            Object.keys(row).forEach((key, colIndex) => {
                const value = row[key];
                const length = value ? value.toString().length : 0;
                if (columnWidths[colIndex] < length) {
                    columnWidths[colIndex] = length; // Ajustar el ancho según el contenido
                }
            });
        });

        // Aplicar el ancho calculado a las columnas
        worksheet['!cols'] = columnWidths.map(width => ({
            wpx: width * 10 // Aumenta el tamaño para un buen ajuste visual
        }));

        // Crear y escribir el libro de Excel
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Resumen');

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

        const sanitizedExamName = examName.replace(/[^a-zA-Z0-9_\-]/g, "_");

        saveAs(blob, `Resumen_${sanitizedExamName}.xlsx`);
    } catch (error) {
        console.error("Error al descargar el resumen:", error);
    }
};

export default downloadStudentSummary;