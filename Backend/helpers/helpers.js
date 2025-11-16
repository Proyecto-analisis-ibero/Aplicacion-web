// helpers.js

// =========================
// FORMATO DE RESPUESTAS
// =========================

// Respuesta exitosa
function success(res, message = "Operación exitosa", data = null, status = 200) {
    return res.status(status).json({
        ok: true,
        message,
        data
    });
}

// Respuesta de error
function error(res, message = "Error en la operación", status = 500, details = null) {
    console.error("❌ Error:", details || message);
    return res.status(status).json({
        ok: false,
        message,
        details
    });
}


// =========================
// VALIDACIONES
// =========================

// Verifica si existe un campo vacío
function validateRequiredFields(requiredFields, body) {
    for (const field of requiredFields) {
        if (!body[field] || body[field].toString().trim() === "") {
            return `El campo '${field}' es obligatorio.`;
        }
    }
    return null;
}

// Validación de email simple
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}


// =========================
// FECHAS Y FORMATEOS
// =========================

// Fecha y hora actual formateada para MySQL
function now() {
    return new Date().toISOString().slice(0, 19).replace("T", " ");
}

// Convierte objeto Date a formato yyyy-mm-dd
function toDate(date) {
    return new Date(date).toISOString().split("T")[0];
}


// =========================
// GENERADOR DE CÓDIGOS / TOKENS
// =========================

// Token numérico corto (p. ej., para códigos de verificación)
function generateCode(length = 6) {
    return Math.random().toString().slice(2, 2 + length);
}

// Token aleatorio (para notificaciones o reportes)
function generateToken(size = 32) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let token = "";

    for (let i = 0; i < size; i++) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
}


// =========================
// EXPORTS
// =========================

module.exports = {
    success,
    error,
    validateRequiredFields,
    validateEmail,
    now,
    toDate,
    generateCode,
    generateToken
};
