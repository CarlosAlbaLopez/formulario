const database = require("../infrastructure/database");

async function create(
  clientId,
  firstQ,
  secondQ,
  thirdQ,
  fourthQ,
  fifthQ,
  sixthQ,
  seventhQ
) {
  const pool = await database.getPool();
  const query = 'INSERT INTO formularios (id_cliente, primera_formacion, experiencia_moodle, tipo_formacion, catalogo_IPE, particularidades, tipo_aprendizaje, cita_formacion) VALUES (?,?,?,?,?,?,?,?)';
  const [newScheudle] = await pool.query(query, [
    clientId,
    firstQ,
    secondQ,
    thirdQ,
    fourthQ,
    fifthQ,
    sixthQ,
    seventhQ
  ]);

  return newScheudle.insertId;
}

module.exports = {create};