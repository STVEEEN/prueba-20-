// models/Reserva.js
import { Schema, model, Types } from "mongoose";

const reservaSchema = new Schema(
  {
    clientId: {
      type: Types.ObjectId,
      ref: "Cliente",
      required: true,
    },
    vehicle: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pendiente", "en proceso", "completado", "cancelado"],
      default: "pendiente",
    },
  },
  {
    timestamps: true,
  }
);

export default model("Reserva", reservaSchema);
