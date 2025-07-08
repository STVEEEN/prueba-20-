import Reserva from "../models/Reserva.js";
import Cliente from "../models/Cliente.js";

const reservationsController = {};

// GET all reservations
reservationsController.getReservations = async (req, res) => {
  try {
    const reservations = await Reserva.find().populate("clientId");
    console.log("GET /reservations - Reservas obtenidas");
    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error al obtener reservas:", error);
    res.status(500).json({ message: "Error al obtener reservas" });
  }
};

// GET reservation by ID
reservationsController.getReservationById = async (req, res) => {
  try {
    const reservation = await Reserva.findById(req.params.id).populate("clientId");
    if (!reservation) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }
    console.log(`GET /reservations/${req.params.id} - Reserva obtenida`);
    res.status(200).json(reservation);
  } catch (error) {
    console.error("Error al obtener reserva:", error);
    res.status(500).json({ message: "Error al obtener reserva" });
  }
};

// POST create reservation
reservationsController.createReservation = async (req, res) => {
  try {
    const { clientId, vehicle, service, status } = req.body;

    if (!clientId || !vehicle || !service) {
      return res.status(400).json({ message: "clientId, vehículo y servicio son obligatorios" });
    }

    const clientExists = await Cliente.findById(clientId);
    if (!clientExists) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    const newReservation = new Reserva({ clientId, vehicle, service, status });
    await newReservation.save();
    console.log("POST /reservations - Reserva creada");
    res.status(201).json({ message: "Reserva creada" });
  } catch (error) {
    console.error("Error al crear reserva:", error);
    res.status(500).json({ message: "Error al crear reserva" });
  }
};

// PUT update reservation
reservationsController.updateReservation = async (req, res) => {
  try {
    const updatedReservation = await Reserva.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedReservation) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }
    console.log(`PUT /reservations/${req.params.id} - Reserva actualizada`);
    res.status(200).json({ message: "Reserva actualizada" });
  } catch (error) {
    console.error("Error al actualizar reserva:", error);
    res.status(500).json({ message: "Error al actualizar reserva" });
  }
};

// DELETE reservation
reservationsController.deleteReservation = async (req, res) => {
  try {
    const deletedReservation = await Reserva.findByIdAndDelete(req.params.id);
    if (!deletedReservation) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }
    console.log(`DELETE /reservations/${req.params.id} - Reserva eliminada`);
    res.status(200).json({ message: "Reserva eliminada" });
  } catch (error) {
    console.error("Error al eliminar reserva:", error);
    res.status(500).json({ message: "Error al eliminar reserva" });
  }
};

export default reservationsController;
