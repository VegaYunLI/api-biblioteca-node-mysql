import {
  findAllBooks,
  findBookById,
  createBook,
  updateBook,
  borrowBook,
  returnBook,
  deleteBook
} from '../models/bookModel.js';

function getValidId(req, res) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({
      message: 'ID inválido'
    });

    return null;
  }

  return id;
}

function validateBookData(data) {
  const { titulo, autor, ano_publicacao, genero } = data;

  if (!titulo || !autor) {
    return 'Título e autor são obrigatórios';
  }

  if (typeof titulo !== 'string' || typeof autor !== 'string') {
    return 'Título e autor devem ser textos';
  }

  if (titulo.trim().length < 2) {
    return 'Título deve ter pelo menos 2 caracteres';
  }

  if (autor.trim().length < 2) {
    return 'Autor deve ter pelo menos 2 caracteres';
  }

  if (ano_publicacao && !Number.isInteger(Number(ano_publicacao))) {
    return 'Ano de publicação deve ser um número inteiro';
  }

  if (genero && typeof genero !== 'string') {
    return 'Gênero deve ser um texto';
  }

  return null;
}

export async function listBooks(req, res, next) {
  try {
    const { titulo, autor, genero, disponivel } = req.query;

    let disponivelFilter;

    if (disponivel !== undefined) {
      if (disponivel !== 'true' && disponivel !== 'false') {
        return res.status(400).json({
          message: 'O filtro disponivel deve ser true ou false'
        });
      }

      disponivelFilter = disponivel === 'true';
    }

    const books = await findAllBooks({
      titulo,
      autor,
      genero,
      disponivel: disponivelFilter
    });

    res.json({
      message: 'Livros listados com sucesso',
      filters: {
        titulo: titulo || null,
        autor: autor || null,
        genero: genero || null,
        disponivel: disponivelFilter ?? null
      },
      total: books.length,
      data: books
    });
  } catch (error) {
    next(error);
  }
}

export async function showBook(req, res, next) {
  try {
    const id = getValidId(req, res);

    if (!id) {
      return;
    }

    const book = await findBookById(id);

    if (!book) {
      return res.status(404).json({
        message: 'Livro não encontrado'
      });
    }

    res.json({
      message: 'Livro encontrado com sucesso',
      data: book
    });
  } catch (error) {
    next(error);
  }
}

export async function storeBook(req, res, next) {
  try {
    const validationError = validateBookData(req.body);

    if (validationError) {
      return res.status(400).json({
        message: validationError
      });
    }

    const { titulo, autor, ano_publicacao, genero } = req.body;

    const newBook = await createBook({
      titulo: titulo.trim(),
      autor: autor.trim(),
      ano_publicacao: ano_publicacao || null,
      genero: genero ? genero.trim() : null
    });

    res.status(201).json({
      message: 'Livro cadastrado com sucesso',
      data: newBook
    });
  } catch (error) {
    next(error);
  }
}

export async function editBook(req, res, next) {
  try {
    const id = getValidId(req, res);

    if (!id) {
      return;
    }

    const book = await findBookById(id);

    if (!book) {
      return res.status(404).json({
        message: 'Livro não encontrado'
      });
    }

    const validationError = validateBookData(req.body);

    if (validationError) {
      return res.status(400).json({
        message: validationError
      });
    }

    const { titulo, autor, ano_publicacao, genero } = req.body;

    const updatedBook = await updateBook(id, {
      titulo: titulo.trim(),
      autor: autor.trim(),
      ano_publicacao: ano_publicacao || null,
      genero: genero ? genero.trim() : null
    });

    res.json({
      message: 'Livro atualizado com sucesso',
      data: updatedBook
    });
  } catch (error) {
    next(error);
  }
}

export async function loanBook(req, res, next) {
  try {
    const id = getValidId(req, res);

    if (!id) {
      return;
    }

    const book = await findBookById(id);

    if (!book) {
      return res.status(404).json({
        message: 'Livro não encontrado'
      });
    }

    if (!book.disponivel) {
      return res.status(400).json({
        message: 'Livro já está emprestado'
      });
    }

    const updatedBook = await borrowBook(id);

    res.json({
      message: 'Livro emprestado com sucesso',
      data: updatedBook
    });
  } catch (error) {
    next(error);
  }
}

export async function giveBackBook(req, res, next) {
  try {
    const id = getValidId(req, res);

    if (!id) {
      return;
    }

    const book = await findBookById(id);

    if (!book) {
      return res.status(404).json({
        message: 'Livro não encontrado'
      });
    }

    if (book.disponivel) {
      return res.status(400).json({
        message: 'Livro já está disponível'
      });
    }

    const updatedBook = await returnBook(id);

    res.json({
      message: 'Livro devolvido com sucesso',
      data: updatedBook
    });
  } catch (error) {
    next(error);
  }
}

export async function removeBook(req, res, next) {
  try {
    const id = getValidId(req, res);

    if (!id) {
      return;
    }

    const book = await findBookById(id);

    if (!book) {
      return res.status(404).json({
        message: 'Livro não encontrado'
      });
    }

    await deleteBook(id);

    res.json({
      message: 'Livro deletado com sucesso',
      data: book
    });
  } catch (error) {
    next(error);
  }
}
