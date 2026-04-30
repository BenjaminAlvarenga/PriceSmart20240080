import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Limita a 100 solicitudes por IP
    message: {
        status: 429,
        message: "Demasiadas solicitudes desde esta IP, por favor intente nuevamente después de 15 minutos."
    }
})

export default limiter;