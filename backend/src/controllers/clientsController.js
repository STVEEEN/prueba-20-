import Cliente from "../models/Cliente.js";

const clientsController = {};

// GET all clients
clientsController.getClients = async (req, res) => {
  try {
    const clients = await Cliente.find();
    console.log("GET /clients - Lista de clientes obtenida");
    res.status(200).json(clients);
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    res.status(500).json({ message: "Error al obtener clientes" });
  }
};

// GET client by ID
clientsController.getClientById = async (req, res) => {
  try {
    const client = await Cliente.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    console.log(`GET /clients/${req.params.id} - Cliente obtenido`);
    res.status(200).json(client);
  } catch (error) {
    console.error("Error al obtener cliente:", error);
    res.status(500).json({ message: "Error al obtener cliente" });
  }
};

// POST create client
clientsController.createClient = async (req, res) => {
  try {
    const { name, email, password, phone, age } = req.body;

    // Validaciones
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Nombre, email y contraseña son obligatorios" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Formato de email inválido" });
    }

    const existingClient = await Cliente.findOne({ email });
    if (existingClient) {
      return res.status(409).json({ message: "El cliente ya está registrado con este email" });
    }

    const newClient = new Cliente({ name, email, password, phone, age });
    await newClient.save();
    console.log("POST /clients - Cliente creado");
    res.status(201).json({ message: "Cliente creado" });
  } catch (error) {
    console.error("Error al crear cliente:", error);
    res.status(500).json({ message: "Error al crear cliente" });
  }
};

// PUT update client
clientsController.updateClient = async (req, res) => {
  try {
    const updatedClient = await Cliente.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedClient) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    console.log(`PUT /clients/${req.params.id} - Cliente actualizado`);
    res.status(200).json({ message: "Cliente actualizado" });
  } catch (error) {
    console.error("Error al actualizar cliente:", error);
    res.status(500).json({ message: "Error al actualizar cliente" });
  }
};

// DELETE client
clientsController.deleteClient = async (req, res) => {
  try {
    const deletedClient = await Cliente.findByIdAndDelete(req.params.id);
    if (!deletedClient) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    console.log(`DELETE /clients/${req.params.id} - Cliente eliminado`);
    res.status(200).json({ message: "Cliente eliminado" });
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    res.status(500).json({ message: "Error al eliminar cliente" });
  }
};

export default clientsController;
