import pool from '../config/db.js';

function formatBook(book) {
  return {
    ...book,
    disponivel: Boolean(book.disponivel)
  };
}

export async function findAllBooks(filters = {}) {
  const { titulo, autor, genero, disponivel } = filters;

  const conditions = [];
  const values = [];

  if (titulo) {
    conditions.push('titulo LIKE ?');
    values.push(`%${titulo}%`);
  }

  if (autor) {
    conditions.push('autor LIKE ?');
    values.push(`%${autor}%`);
  }

  if (genero) {
    conditions.push('genero LIKE ?');
    values.push(`%${genero}%`);
  }

  if (disponivel !== undefined) {
    conditions.push('disponivel = ?');
    values.push(disponivel);
  }

  let sql = 'SELECT * FROM livros';

  if (conditions.length > 0) {
    sql += ` WHERE ${conditions.join(' AND ')}`;
  }

  sql += ' ORDER BY id DESC';

  const [rows] = await pool.query(sql, values);

  return rows.map(formatBook);
}

export async function findBookById(id) {
  const [rows] = await pool.query(
    'SELECT * FROM livros WHERE id = ?',
    [id]
  );

  if (rows.length === 0) {
    return null;
  }

  return formatBook(rows[0]);
}

export async function createBook(bookData) {
  const { titulo, autor, ano_publicacao, genero } = bookData;

  const [result] = await pool.query(
    `
    INSERT INTO livros (titulo, autor, ano_publicacao, genero)
    VALUES (?, ?, ?, ?)
    `,
    [titulo, autor, ano_publicacao, genero]
  );

  return findBookById(result.insertId);
}

export async function updateBook(id, bookData) {
  const { titulo, autor, ano_publicacao, genero } = bookData;

  await pool.query(
    `
    UPDATE livros
    SET titulo = ?, autor = ?, ano_publicacao = ?, genero = ?
    WHERE id = ?
    `,
    [titulo, autor, ano_publicacao, genero, id]
  );

  return findBookById(id);
}

export async function borrowBook(id) {
  await pool.query(
    `
    UPDATE livros
    SET disponivel = FALSE
    WHERE id = ?
    `,
    [id]
  );

  return findBookById(id);
}

export async function returnBook(id) {
  await pool.query(
    `
    UPDATE livros
    SET disponivel = TRUE
    WHERE id = ?
    `,
    [id]
  );

  return findBookById(id);
}

export async function deleteBook(id) {
  const [result] = await pool.query(
    'DELETE FROM livros WHERE id = ?',
    [id]
  );

  return result.affectedRows > 0;
}
