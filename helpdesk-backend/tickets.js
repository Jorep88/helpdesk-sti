const express = require('express');
const router = express.Router();
const db = require('../db'); 

// Obtener todos los tickets
router.get('/', async (req, res) => {
  try {
    const [tickets] = await db.query('SELECT * FROM tickets');
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener tickets', error });
  }
});

// Obtener un ticket específico
router.get('/:id', async (req, res) => {
  try {
    const [ticket] = await db.query('SELECT * FROM tickets WHERE id = ?', [req.params.id]);
    if (ticket.length > 0) {
      res.json(ticket[0]);
    } else {
      res.status(404).json({ message: 'Ticket no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el ticket', error });
  }
});

// Crear un nuevo ticket
router.post('/', async (req, res) => {
  const { title, description, user_id, category_id, status_id } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO tickets (title, description, user_id, category_id, status_id) VALUES (?, ?, ?, ?, ?)',
      [title, description, user_id, category_id, status_id]
    );
    res.status(201).json({ id: result.insertId, message: 'Ticket creado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el ticket', error });
  }
});

// Actualizar un ticket
router.put('/:id', async (req, res) => {
  const { title, description, category_id, status_id, assigned_to } = req.body;
  try {
    await db.query(
      'UPDATE tickets SET title = ?, description = ?, category_id = ?, status_id = ?, assigned_to = ? WHERE id = ?',
      [title, description, category_id, status_id, assigned_to, req.params.id]
    );
    res.json({ message: 'Ticket actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el ticket', error });
  }
});

// Eliminar un ticket
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM tickets WHERE id = ?', [req.params.id]);
    res.json({ message: 'Ticket eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el ticket', error });
  }
});

module.exports = router;