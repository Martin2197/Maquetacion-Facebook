// 1. Importar librerías
const express = require('express');
const cors = require('cors');
const XLSX = require('xlsx');
const fs = require('fs');

// 2. Configurar servidor
const app = express();
app.use(cors());
app.use(express.json());

const FILE_PATH = './data.xlsx';


// 3. Crear archivo Excel si no existe
if (!fs.existsSync(FILE_PATH)) {
  const wb = XLSX.utils.book_new(); // libro nuevo
  const ws = XLSX.utils.json_to_sheet([]); // hoja vacía
  XLSX.utils.book_append_sheet(wb, ws, 'Posts');
  XLSX.writeFile(wb, FILE_PATH);
}

// 4. Leer datos del Excel
function readExcel() {
  const workbook = XLSX.readFile(FILE_PATH);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  return XLSX.utils.sheet_to_json(worksheet);
}

// 5. Escribir datos al Excel
function writeExcel(data) {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Posts');
  XLSX.writeFile(workbook, FILE_PATH);
}

// 6. GET /posts - obtener posts
app.get('/posts', (req, res) => {
  const posts = readExcel();
  res.json(posts);
});

// 7. POST /posts - guardar nuevo post
app.post('/posts', (req, res) => {
  const posts = readExcel();
  const nuevoPost = {
    id: posts.length + 1,
    nombre: req.body.nombre,
    contenido: req.body.contenido,
    fecha: new Date().toLocaleString()
  };
  posts.push(nuevoPost);
  writeExcel(posts);
  res.status(201).json({ mensaje: 'Post guardado', post: nuevoPost });
});

// 8. Escuchar en puerto 3000
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});