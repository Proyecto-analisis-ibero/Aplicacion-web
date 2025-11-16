-- Crear base de datos
CREATE DATABASE IF NOT EXISTS peluqueria_rizos_de_oro;
USE peluqueria_rizos_de_oro;

-- Tabla Cliente
CREATE TABLE Cliente (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    telefono VARCHAR(20),
    contrasena VARCHAR(255) NOT NULL,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Estilista / Barbero
CREATE TABLE Estilista (
    id_estilista INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE,
    telefono VARCHAR(20),
    disponibilidad VARCHAR(255)
);

-- Tabla Administrador / Propietario
CREATE TABLE Administrador (
    id_admin INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE,
    telefono VARCHAR(20),
    rol VARCHAR(50)
);

-- Tabla Servicio
CREATE TABLE Servicio (
    id_servicio INT AUTO_INCREMENT PRIMARY KEY,
    nombre_servicio VARCHAR(100) NOT NULL,
    duracion INT NOT NULL, -- duración en minutos
    precio DECIMAL(10,2) NOT NULL,
    descripcion TEXT
);

-- Tabla Cita
CREATE TABLE Cita (
    id_cita INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    estado ENUM('pendiente','en_curso','finalizada','cancelada') DEFAULT 'pendiente',
    observaciones TEXT,
    id_cliente INT NOT NULL,
    id_estilista INT NOT NULL,
    id_servicio INT NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente),
    FOREIGN KEY (id_estilista) REFERENCES Estilista(id_estilista),
    FOREIGN KEY (id_servicio) REFERENCES Servicio(id_servicio)
);

-- Tabla Notificación
CREATE TABLE Notificacion (
    id_notificacion INT AUTO_INCREMENT PRIMARY KEY,
    tipo ENUM('email','sms','whatsapp') NOT NULL,
    mensaje TEXT NOT NULL,
    fecha_envio DATETIME DEFAULT CURRENT_TIMESTAMP,
    id_cita INT NOT NULL,
    FOREIGN KEY (id_cita) REFERENCES Cita(id_cita)
);

-- Tabla Reporte (opcional)
CREATE TABLE Reporte (
    id_reporte INT AUTO_INCREMENT PRIMARY KEY,
    tipo_reporte VARCHAR(50) NOT NULL,
    fecha_generacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    datos TEXT,
    id_estilista INT,
    id_admin INT,
    FOREIGN KEY (id_estilista) REFERENCES Estilista(id_estilista),
    FOREIGN KEY (id_admin) REFERENCES Administrador(id_admin)
);

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';

INSERT INTO Cliente (nombre, correo, telefono, clave) VALUES
('Valeria Gómez', 'valeria@gmail.com', '3001234567', '1234'),
('Carlos López', 'carlos.lopez@gmail.com', '3017654321', 'abcd123'),
('María Rodríguez', 'maria.rod@gmail.com', '3029988776', 'maria2025'),
('Juan Pérez', 'juanp@gmail.com', '3004455667', 'juanpass'),
('Ana Torres', 'ana.torres@gmail.com', '3012233445', 'ana789');

INSERT INTO Estilista (nombre, correo, telefono, disponibilidad) VALUES
('Laura Méndez', 'laura@peluqueria.com', '3001112233', 'Lunes-Viernes 9am-6pm'),
('Daniel Ruiz', 'daniel@peluqueria.com', '3002223344', 'Martes-Domingo 10am-7pm'),
('Sofia Martínez', 'sofia@peluqueria.com', '3003334455', 'Lunes-Sábado 8am-5pm');

INSERT INTO Administrador (nombre, correo, telefono, rol) VALUES
('Carolina Herrera', 'admin1@peluqueria.com', '3201112233', 'Gerente'),
('Luis Ramírez', 'admin2@peluqueria.com', '3204445566', 'Supervisor');

INSERT INTO Servicio (nombre_servicio, duracion, precio, descripcion) VALUES
('Corte de Cabello Dama', 45, 30000, 'Corte profesional para mujer'),
('Corte de Cabello Caballero', 30, 20000, 'Corte para hombre con estilo'),
('Tintura Completa', 120, 85000, 'Aplicación de color permanente en todo el cabello'),
('Peinado Profesional', 60, 50000, 'Peinado para eventos o maquillaje social'),
('Manicure', 40, 15000, 'Limpieza, corte y esmaltado de uñas');

INSERT INTO Cita (fecha, hora, estado, observaciones, id_cliente, id_estilista, id_servicio) VALUES
('2025-02-01', '10:00:00', 'pendiente', 'Cliente solicita corte en capas', 1, 1, 1),
('2025-02-01', '13:00:00', 'en_curso', NULL, 3, 2, 3),
('2025-02-02', '09:30:00', 'pendiente', 'Cliente llega con referencia de color', 2, 1, 3),
('2025-02-03', '15:00:00', 'finalizada', 'Resultado satisfactorio', 5, 3, 5),
('2025-02-04', '11:00:00', 'cancelada', 'Cliente no puede asistir', 4, 2, 2);

INSERT INTO Notificacion (tipo, mensaje, id_cita) VALUES
('email', 'Tu cita ha sido programada correctamente.', 1),
('sms', 'Tu cita está en curso. Gracias por visitarnos.', 2),
('whatsapp', 'Recordatorio: tu cita es mañana a las 9:30 AM.', 3),
('email', 'Tu cita ha sido finalizada. ¡Gracias por preferirnos!', 4),
('sms', 'Tu cita fue cancelada. Puedes reagendar cuando desees.', 5);

INSERT INTO Reporte (tipo_reporte, datos, id_estilista, id_admin) VALUES
('Ventas Mensuales', 'Ingresos totales enero 2025: $3.500.000', 1, 1),
('Servicios Más Solicitados', 'Corte caballero y peinados lideran la demanda', 2, 2),
('Productividad Estilistas', 'Evaluación semanal de citas completadas', 3, 1);

ALTER TABLE Cliente 
CHANGE COLUMN contrasena clave VARCHAR(255) NOT NULL;

ALTER TABLE Administrador
ADD COLUMN clave VARCHAR(255) NOT NULL;

UPDATE Administrador
SET clave = '1234'
WHERE id_admin = 1;

UPDATE Administrador
SET clave = 'abcd1234'
WHERE id_admin = 2;