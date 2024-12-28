--Base de datos modificada para la fase de React.js - Desafio 360
--Pendiente a modificar
--Se recomienda ejecutar por partes, tablas, procedimientos almacenados y por ultimo los EXEC;

create database [GDA0050-OT-OscarChavez];

use [GDA0050-OT-OscarChavez];


----------------- Tablas ---------------------

-- Tabla Estados
CREATE TABLE Estados (
    id_estados INT IDENTITY(1,1),
    nombre VARCHAR(50) NOT NULL,
    CONSTRAINT PK_estados PRIMARY KEY(id_estados)
);

-- Tabla Rol
CREATE TABLE Rol (
    id_rol INT IDENTITY(1,1),
    nombre VARCHAR(50) NOT NULL,
    CONSTRAINT PK_rol PRIMARY KEY(id_rol)
);

-- Tabla Usuarios
CREATE TABLE Usuarios (
    id_usuario INT IDENTITY(1,1),
    correo_electronico VARCHAR(50) NOT NULL,
    nombre_completo VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    telefono VARCHAR(8),
    fecha_nacimiento DATE,
    fecha_creacion DATETIME DEFAULT GETDATE(),

    fk_id_rol INT NOT NULL,
    fk_id_estados INT NOT NULL,
    CONSTRAINT PK_usuarios PRIMARY KEY(id_usuario),
    CONSTRAINT FK_usuarios_rol FOREIGN KEY (fk_id_rol) REFERENCES Rol(id_rol),
    CONSTRAINT FK_usuarios_estados FOREIGN KEY (fk_id_estados) REFERENCES Estados(id_estados)
);

-- Tabla Clientes
CREATE TABLE Clientes (
    id_cliente INT IDENTITY(1,1),
    nombre_comercial VARCHAR(50) NOT NULL,
    razon_social VARCHAR(245) NOT NULL,
    direccion VARCHAR(150) NOT NULL,

    fk_id_usuario INT,
    CONSTRAINT PK_clientes PRIMARY KEY(id_cliente),
    CONSTRAINT FK_clientes_usuarios FOREIGN KEY (fk_id_usuario) REFERENCES Usuarios(id_usuario)
);


-- Tabla CategoriaProductos
CREATE TABLE CategoriaProductos (
    id_categoriaProductos INT IDENTITY(1,1),
    nombre VARCHAR(50) NOT NULL,
    fecha_creacion DATETIME DEFAULT GETDATE(),

    fk_id_estados INT NOT NULL,
    CONSTRAINT PK_categoriaProductos PRIMARY KEY (id_categoriaProductos),
    CONSTRAINT FK_categoriaProductos_estados FOREIGN KEY (fk_id_estados) REFERENCES Estados(id_estados)
);


-- Tabla Productos
CREATE TABLE Productos (
    id_codigo_producto INT IDENTITY(100,1),
    nombre VARCHAR(100) NOT NULL,
    marca VARCHAR(50) NOT NULL,
    stock FLOAT NOT NULL,
    precio FLOAT NOT NULL,
    fecha_creacion DATETIME DEFAULT GETDATE(),
    foto INT NOT NULL,

    fk_id_categoriaProductos INT NOT NULL,
    fk_id_usuario INT NOT NULL,
    fk_id_estados INT NOT NULL,
    CONSTRAINT PK_productos PRIMARY KEY (id_codigo_producto),
    CONSTRAINT FK_productos_categoriaProductos FOREIGN KEY (fk_id_categoriaProductos) REFERENCES CategoriaProductos(id_categoriaProductos),
    CONSTRAINT FK_productos_usuarios FOREIGN KEY (fk_id_usuario) REFERENCES Usuarios(id_usuario),
    CONSTRAINT FK_productos_estados FOREIGN KEY (fk_id_estados) REFERENCES Estados(id_estados)
);

-- Tabla Orden
CREATE TABLE Orden (
    id_orden INT IDENTITY(1,1),
    fecha_creacion DATETIME DEFAULT GETDATE(),
    direccion_entrega VARCHAR(150),
    telefono VARCHAR(8),
    fecha_entrega DATE,
    total_orden FLOAT,

    fk_id_cliente INT NOT NULL,
    fk_id_estados INT NOT NULL,
    CONSTRAINT PK_orden PRIMARY KEY (id_orden),
    CONSTRAINT FK_orden_clientes FOREIGN KEY (fk_id_cliente) REFERENCES Clientes(id_cliente),
    CONSTRAINT FK_orden_estados FOREIGN KEY (fk_id_estados) REFERENCES Estados(id_estados)
);

-- Tabla OrdenDetalles
CREATE TABLE OrdenDetalles (
	fk_id_orden INT NOT NULL,
    fk_id_codigo_producto INT NOT NULL,

    cantidad INT NOT NULL,
    precio FLOAT NOT NULL,
    subtotal FLOAT NOT NULL,
    
	CONSTRAINT PK_OrdenDetalles PRIMARY KEY (fk_id_orden, fk_id_codigo_producto),
    CONSTRAINT FK_ordenDetalles_orden FOREIGN KEY (fk_id_orden) REFERENCES Orden(id_orden),
    CONSTRAINT FK_ordenDetalles_productos FOREIGN KEY (fk_id_codigo_producto) REFERENCES Productos(id_codigo_producto)
);
Go
----------------- Procedimientos Almacenados ---------------------

-- Store Procedures -------------------------------- Tabla Estados

CREATE OR ALTER PROC proc_estados_selectAll
AS
BEGIN
    SELECT id_estados, nombre FROM Estados;
END;
GO

----------------------------------------------

CREATE OR ALTER PROC proc_estados_selectById
	@id_estados INT
AS
BEGIN
    SELECT id_estados, nombre FROM Estados
	WHERE id_estados = @id_estados;
END;
GO

----------------------------------------------

CREATE OR ALTER PROC proc_estados_insert
    @nombre VARCHAR(50)
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
        INSERT INTO Estados (nombre)
        VALUES (@nombre);
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
GO

----------------------------------------------

CREATE OR ALTER PROC proc_estados_update
    @id_estados INT,
    @nombre VARCHAR(50)
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
        UPDATE Estados
        SET nombre = @nombre
        WHERE id_estados = @id_estados;
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
GO

----------------------------------------------

CREATE OR ALTER PROC proc_estados_erase
    @id_estados INT
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
        DELETE FROM Estados WHERE id_estados = @id_estados;
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
GO

-- Store Procedures -------------------------------- Tabla Rol
CREATE OR ALTER PROC proc_rol_selectAll
AS
BEGIN
    SELECT id_rol, nombre FROM Rol;
END;
GO

----------------------------------------------

CREATE OR ALTER PROC proc_rol_insert
    @nombre VARCHAR(50)
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
        INSERT INTO Rol (nombre)
        VALUES (@nombre);
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
GO

----------------------------------------------

CREATE OR ALTER PROC proc_rol_update
    @id_rol INT,
    @nombre VARCHAR(50)
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
        UPDATE Rol
        SET nombre = @nombre
        WHERE id_rol = @id_rol;
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
GO

----------------------------------------------

CREATE OR ALTER PROC proc_rol_erase
    @id_rol INT
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
        DELETE FROM Rol WHERE id_rol = @id_rol;
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
GO

-- Store Procedures -------------------------------- Tabla Clientes

CREATE OR ALTER PROC proc_clientes_selectAll
AS
BEGIN
    SELECT id_cliente, nombre_comercial, razon_social, direccion, fk_id_usuario
    FROM Clientes;
END;
GO

----------------------------------------------

CREATE OR ALTER PROC proc_clientes_selectUsuarioClientes
AS
BEGIN
    SELECT C.id_cliente, C.fk_id_usuario, U.fk_id_estados, C.nombre_comercial, C.razon_social, C.direccion 
    FROM Clientes C 
	INNER JOIN Usuarios U on U.id_usuario = C.fk_id_usuario
END;
GO

----------------------------------------------

CREATE OR ALTER PROC proc_clientes_selectById
    @id_cliente INT
AS
BEGIN
    SELECT id_cliente, nombre_comercial, razon_social, direccion, fk_id_usuario
    FROM Clientes
    WHERE id_cliente = @id_cliente;
END;
GO

----------------------------------------------

CREATE OR ALTER PROC proc_clientes_insert
    @nombre_comercial VARCHAR(50),
    @razon_social VARCHAR(245),
    @direccion VARCHAR(150),
    @fk_id_usuario INT
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
        INSERT INTO Clientes (nombre_comercial, razon_social, direccion, fk_id_usuario)
        VALUES (@nombre_comercial, @razon_social, @direccion, @fk_id_usuario);
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
GO

----------------------------------------------

CREATE OR ALTER PROC proc_clientes_update
    @id_cliente INT,
    @nombre_comercial VARCHAR(50),
    @razon_social VARCHAR(245),
    @direccion VARCHAR(150),
    @fk_id_usuario INT
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
        UPDATE Clientes
        SET nombre_comercial = @nombre_comercial,
            razon_social = @razon_social,
            direccion = @direccion,
            fk_id_usuario = @fk_id_usuario
        WHERE id_cliente = @id_cliente;
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
GO

----------------------------------------------

CREATE OR ALTER PROC proc_clientes_erase
    @id_cliente INT
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
        DELETE FROM Clientes WHERE id_cliente = @id_cliente;
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
GO

-- Store Procedures -------------------------------- Tabla Usuarios

CREATE OR ALTER PROC proc_usuarios_selectAll
AS
BEGIN
    SELECT id_usuario, correo_electronico, nombre_completo, password, telefono, fecha_nacimiento, fk_id_rol, fk_id_estados
    FROM Usuarios;
END;
GO

----------------------------------------------

CREATE OR ALTER PROC proc_usuarios_selectAllForLogin
AS
BEGIN
    SELECT id_usuario, correo_electronico, nombre_completo, password, telefono, fecha_nacimiento, fk_id_rol, fk_id_estados
    FROM Usuarios
	WHERE fk_id_estados = 1;
END;
GO

----------------------------------------------

CREATE OR ALTER PROC proc_usuarios_selectById
    @id_usuario INT
AS
BEGIN
    SELECT id_usuario, correo_electronico, nombre_completo, password, telefono, fecha_nacimiento, fk_id_rol, fk_id_estados
    FROM Usuarios
    WHERE id_usuario = @id_usuario;
END;
GO

----------------------------------------------

CREATE OR ALTER PROC proc_usuarios_selectByEmail
    @correo_electronico VARCHAR(50)
AS
BEGIN
    SELECT id_usuario, correo_electronico, nombre_completo, password, telefono, fecha_nacimiento, fk_id_rol, fk_id_estados
    FROM Usuarios
    WHERE correo_electronico = @correo_electronico;
END;
GO

----------------------------------------------

CREATE OR ALTER PROC proc_usuarios_insert
    @correo_electronico VARCHAR(50),
    @nombre_completo VARCHAR(100),
    @password VARCHAR(100),
    @telefono VARCHAR(8),
    @fecha_nacimiento DATE,
    @fk_id_rol INT,
    @fk_id_estados INT
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
        INSERT INTO Usuarios (correo_electronico, nombre_completo, password, telefono, fecha_nacimiento, fk_id_rol, fk_id_estados)
        VALUES (@correo_electronico, @nombre_completo, @password, @telefono, @fecha_nacimiento, @fk_id_rol, @fk_id_estados);
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
GO

----------------------------------------------

CREATE OR ALTER PROC proc_usuarios_update
    @id_usuario INT,
    @correo_electronico VARCHAR(50),
    @nombre_completo VARCHAR(100),
    @password VARCHAR(100),
    @telefono VARCHAR(8),
    @fecha_nacimiento DATE,
    @fk_id_rol INT,
    @fk_id_estados INT
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
        UPDATE Usuarios
        SET correo_electronico = @correo_electronico,
            nombre_completo = @nombre_completo,
            password = @password,
            telefono = @telefono,
            fecha_nacimiento = @fecha_nacimiento,
            fk_id_rol = @fk_id_rol,
            fk_id_estados = @fk_id_estados
        WHERE id_usuario = @id_usuario;
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
GO

----------------------------------------------

CREATE OR ALTER PROC proc_usuarios_inactivate
    @id_usuario INT
AS
BEGIN
    BEGIN TRANSACTION;

    BEGIN TRY
        IF EXISTS (SELECT 1 FROM Usuarios WHERE id_usuario = @id_usuario)
        BEGIN
            UPDATE Usuarios
            SET fk_id_estados = 2
            WHERE id_usuario = @id_usuario;
            COMMIT TRANSACTION;
        END
        ELSE
        BEGIN
            ROLLBACK TRANSACTION;
            THROW 50000, 'El usuario especificado no existe.', 1;
        END
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
GO

----------------------------------------------

CREATE OR ALTER PROC proc_usuarios_activate
    @id_usuario INT
AS
BEGIN
    BEGIN TRANSACTION;

    BEGIN TRY
        IF EXISTS (SELECT 1 FROM Usuarios WHERE id_usuario = @id_usuario)
        BEGIN
            UPDATE Usuarios
            SET fk_id_estados = 1
            WHERE id_usuario = @id_usuario;
            COMMIT TRANSACTION;
        END
        ELSE
        BEGIN
            ROLLBACK TRANSACTION;
            THROW 50000, 'El usuario especificado no existe.', 1;
        END
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
GO


-- Store Procedures -------------------------------- Tabla Productos

CREATE OR ALTER PROC proc_productos_selectAll
AS
BEGIN
    SELECT id_codigo_producto, nombre, marca, precio, stock, foto, fk_id_categoriaProductos, fk_id_usuario, fk_id_estados
    FROM Productos;
END;
GO

----------------------------------------------

CREATE OR ALTER PROC proc_productos_selectById
    @id_producto INT
AS
BEGIN
    SELECT  id_codigo_producto, nombre, marca, precio, stock, foto, fk_id_categoriaProductos, fk_id_usuario, fk_id_estados
    FROM Productos
    WHERE id_codigo_producto = @id_producto;
END;
GO

----------------------------------------------

CREATE OR ALTER PROC proc_productos_insert
    @nombre VARCHAR(100),
    @marca VARCHAR(50),
    @precio FLOAT,
    @stock FLOAT, 
    @foto INT, 
    @fk_id_categoriaProductos INT,
    @fk_id_usuario INT,
    @fk_id_estados INT
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
        INSERT INTO Productos (nombre, marca, precio, stock, foto, fk_id_categoriaProductos, fk_id_usuario, fk_id_estados)
        VALUES (@nombre, @marca, @precio, @stock, @foto, @fk_id_categoriaProductos, @fk_id_usuario, @fk_id_estados);
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
GO

----------------------------------------------

CREATE OR ALTER PROC proc_productos_update
    @id_codigo_producto INT,
    @nombre VARCHAR(100),
    @marca VARCHAR(50),
    @precio FLOAT,
    @stock FLOAT,
    @foto INT, 
    @fk_id_categoriaProductos INT, 
    @fk_id_usuario INT,
    @fk_id_estados INT
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
        UPDATE Productos
        SET nombre = @nombre,
            marca = @marca,
            precio = @precio,
            stock = @stock,
            foto = @foto,
            fk_id_categoriaProductos = @fk_id_categoriaProductos,
            fk_id_usuario = @fk_id_usuario,
            fk_id_estados = @fk_id_estados
        WHERE id_codigo_producto = @id_codigo_producto;
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
GO

----------------------------------------------

CREATE OR ALTER PROC proc_productos_delete
    @id_producto INT
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
        DELETE FROM Productos WHERE id_codigo_producto = @id_producto;
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
GO

----------------------------------------------

CREATE OR ALTER PROC proc_productos_inactivate
    @id_codigo_producto INT
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM Productos WHERE id_codigo_producto = @id_codigo_producto)
        BEGIN
            UPDATE Productos
            SET fk_id_estados = 2
            WHERE id_codigo_producto = @id_codigo_producto;
            COMMIT TRANSACTION;
        END
        ELSE
        BEGIN
            ROLLBACK TRANSACTION;
            THROW 50000, 'El producto especificado no existe.', 1;
        END
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
GO


----------------------------------------------

CREATE OR ALTER PROC proc_productos_activate
    @id_codigo_producto INT
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM Productos WHERE id_codigo_producto = @id_codigo_producto)
        BEGIN
            UPDATE Productos
            SET fk_id_estados = 1
            WHERE id_codigo_producto = @id_codigo_producto;
            COMMIT TRANSACTION;
        END
        ELSE
        BEGIN
            ROLLBACK TRANSACTION;
            THROW 50000, 'El producto especificado no existe.', 1;
        END
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
GO

-- Store Procedures -------------------------------- Tabla Orden

CREATE OR ALTER PROC proc_orden_selectAll
AS
BEGIN
    SELECT id_orden, fecha_creacion, direccion_entrega, telefono, fecha_entrega, total_orden, fk_id_cliente, fk_id_estados
    FROM Orden;
END;
GO

----------------------------------------------

CREATE OR ALTER PROC proc_orden_selectById
	@id_orden INT
AS
BEGIN
    SELECT id_orden, fecha_creacion, direccion_entrega, telefono, fecha_entrega, total_orden, fk_id_cliente, fk_id_estados
    FROM Orden
	WHERE id_orden =  @id_orden;
END;
GO

----------------------------------------------

CREATE OR ALTER PROC proc_orden_insert
    @direccion_entrega VARCHAR(150),
    @telefono VARCHAR(8),
    @fecha_entrega DATE,
    @total_orden FLOAT,
    @fk_id_cliente INT,
    @fk_id_estados INT
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
        INSERT INTO Orden (direccion_entrega, telefono, fecha_entrega, total_orden, fk_id_cliente, fk_id_estados)
        VALUES (@direccion_entrega, @telefono, @fecha_entrega, @total_orden, @fk_id_cliente, @fk_id_estados);
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
GO

----------------------------------------------

CREATE OR ALTER PROC proc_orden_update
    @id_orden INT,
    @direccion_entrega VARCHAR(150),
    @telefono VARCHAR(8),
    @fecha_entrega DATE,
    @total_orden FLOAT,
    @fk_id_cliente INT,
    @fk_id_estados INT
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
        UPDATE Orden
        SET direccion_entrega = @direccion_entrega,
            telefono = @telefono,
            fecha_entrega = @fecha_entrega,
            total_orden = @total_orden,
            fk_id_cliente = @fk_id_cliente,
            fk_id_estados = @fk_id_estados
        WHERE id_orden = @id_orden;
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
GO

----------------------------------------------

CREATE OR ALTER PROC proc_orden_erase
    @id_orden INT
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
        DELETE FROM Orden WHERE id_orden = @id_orden;
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
GO

-- Store Procedures -------------------------------- Tabla OrdenDetalles

CREATE OR ALTER PROC proc_ordenDetalles_selectAll
AS
BEGIN
    SELECT fk_id_orden, fk_id_codigo_producto, cantidad, precio, subtotal
    FROM OrdenDetalles;
END;
GO

----------------------------------------------

CREATE OR ALTER PROC proc_ordenDetalles_selectById
	@fk_id_orden INT,
    @fk_id_codigo_producto INT
AS
BEGIN
    SELECT fk_id_orden, fk_id_codigo_producto, cantidad, precio, subtotal
    FROM OrdenDetalles
	WHERE fk_id_orden = @fk_id_orden AND fk_id_codigo_producto = @fk_id_codigo_producto;
END;
GO

----------------------------------------------

CREATE OR ALTER PROC proc_ordenDetalles_insert
    @fk_id_orden INT,
    @fk_id_codigo_producto INT,
    @cantidad INT,
    @precio FLOAT,
    @subtotal FLOAT
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
        INSERT INTO OrdenDetalles (fk_id_orden, fk_id_codigo_producto, cantidad, precio, subtotal)
        VALUES (@fk_id_orden, @fk_id_codigo_producto, @cantidad, @precio, @subtotal);
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
GO

----------------------------------------------

CREATE OR ALTER PROC proc_ordenDetalles_update
    @fk_id_orden INT,
    @fk_id_codigo_producto INT,
    @cantidad INT,
    @precio FLOAT,
    @subtotal FLOAT
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
        UPDATE OrdenDetalles
        SET cantidad = @cantidad,
            precio = @precio,
            subtotal = @subtotal
        WHERE fk_id_orden = @fk_id_orden AND fk_id_codigo_producto = @fk_id_codigo_producto;
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
GO

----------------------------------------------

CREATE OR ALTER PROC proc_ordenDetalles_erase
    @fk_id_orden INT,
    @fk_id_codigo_producto INT
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
        DELETE FROM OrdenDetalles WHERE fk_id_orden = @fk_id_orden AND fk_id_codigo_producto = @fk_id_codigo_producto;
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
GO

-- Store Procedures -------------------------------- Maestro Detalle

CREATE OR ALTER PROC proc_orden_detalles_insert
    @direccion_entrega VARCHAR(150),
    @telefono VARCHAR(8),
    @fecha_entrega DATE,
    @total_orden FLOAT,
    @fk_id_cliente INT,
    @fk_id_estados INT,
    @detalles NVARCHAR(MAX) 
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
  
        DECLARE @id_orden INT;
        INSERT INTO Orden (direccion_entrega, telefono, fecha_entrega, total_orden, fk_id_cliente, fk_id_estados)
        VALUES (@direccion_entrega, @telefono, @fecha_entrega, @total_orden, @fk_id_cliente, @fk_id_estados);

        SET @id_orden = SCOPE_IDENTITY();

        DECLARE @detalleTabla TABLE (
            fk_id_codigo_producto INT,
            cantidad INT,
            precio FLOAT,
            subtotal FLOAT
        );

        INSERT INTO @detalleTabla (fk_id_codigo_producto, cantidad, precio, subtotal)
        SELECT 
            Detalle.fk_id_codigo_producto,
            Detalle.cantidad,
            Detalle.precio,
            Detalle.subtotal
        FROM OPENJSON(@detalles) 
        WITH (
            fk_id_codigo_producto INT,
            cantidad INT,
            precio FLOAT,
            subtotal FLOAT
        ) AS Detalle;

        INSERT INTO OrdenDetalles (fk_id_orden, fk_id_codigo_producto, cantidad, precio, subtotal)
        SELECT @id_orden, fk_id_codigo_producto, cantidad, precio, subtotal
        FROM @detalleTabla;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
GO


-- Store Procedures -------------------------------- Tabla CategoriaProductos

CREATE OR ALTER PROC proc_categoriaProductos_selectAll
AS
BEGIN
    SELECT id_categoriaProductos, nombre, fecha_creacion, fk_id_estados
    FROM CategoriaProductos;
END;
GO

----------------------------------------------

CREATE OR ALTER PROC proc_categoriaProductos_selectById
	@id_categoriaProductos INT
AS
BEGIN
    SELECT id_categoriaProductos, nombre, fecha_creacion, fk_id_estados
    FROM CategoriaProductos
	WHERE id_categoriaProductos = @id_categoriaProductos;
END;
GO

----------------------------------------------

CREATE OR ALTER PROC proc_categoriaProductos_insert
    @nombre VARCHAR(50),
    @fk_id_estados INT
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
        INSERT INTO CategoriaProductos (nombre, fk_id_estados)
        VALUES (@nombre, @fk_id_estados);
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
GO

----------------------------------------------

CREATE OR ALTER PROC proc_categoriaProductos_update
    @id_categoriaProductos INT,
    @nombre VARCHAR(50),
    @fk_id_estados INT
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
        UPDATE CategoriaProductos
        SET nombre = @nombre,
            fk_id_estados = @fk_id_estados
        WHERE id_categoriaProductos = @id_categoriaProductos;
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
GO

----------------------------------------------

CREATE OR ALTER PROC proc_categoriaProductos_erase
    @id_categoriaProductos INT
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
        DELETE FROM CategoriaProductos WHERE id_categoriaProductos = @id_categoriaProductos;
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
GO

----------------------------------------------

CREATE OR ALTER PROC proc_categoriaProductos_inactivate
    @id_categoriaProductos INT
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM CategoriaProductos WHERE id_categoriaProductos = @id_categoriaProductos)
        BEGIN
            UPDATE CategoriaProductos
            SET fk_id_estados = 2
            WHERE id_categoriaProductos = @id_categoriaProductos;
            COMMIT TRANSACTION;
        END
        ELSE
        BEGIN
            ROLLBACK TRANSACTION;
            THROW 50000, 'La categoria especificada no existe.', 1;
        END
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
GO

----------------------------------------------

CREATE OR ALTER PROC proc_categoriaProductos_activate
	@id_categoriaProductos INT
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM CategoriaProductos WHERE id_categoriaProductos = @id_categoriaProductos)
        BEGIN
            UPDATE CategoriaProductos
            SET fk_id_estados = 1
            WHERE id_categoriaProductos= @id_categoriaProductos;
            COMMIT TRANSACTION;
        END
        ELSE
        BEGIN
            ROLLBACK TRANSACTION;
            THROW 50000, 'La categoria especificada no existe.', 1;
        END
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
GO

------------------------------ INSERT de las tablas mediante los procedimientos almacenados
-- Estados
EXEC proc_estados_insert 'Activo';
EXEC proc_estados_insert 'Inactivo';
EXEC proc_estados_insert 'Pendiente';
EXEC proc_estados_insert 'Aprobado';
EXEC proc_estados_insert 'Rechazado';
EXEC proc_estados_insert 'Entregado';

-- Rol
EXEC proc_rol_insert 'Operador';
EXEC proc_rol_insert 'Cliente';

-- Usuarios
EXEC proc_usuarios_insert 'admin1@tienda.com', 'Juan Pérez', '123456', '30101010', '1985-05-20', 1, 1;
EXEC proc_usuarios_insert 'cliente1@tienda.com', 'Maria López', 'abcdef', '31212121', '1990-08-15', 2, 1;
EXEC proc_usuarios_insert 'vendedor1@tienda.com', 'Luis García', 'qwerty', '32323232', '1988-09-10', 1, 1;
EXEC proc_usuarios_insert 'soporte1@tienda.com', 'Ana Morales', 'zxcvbn', '33434343', '1995-02-28', 1, 1;
EXEC proc_usuarios_insert 'gerente1@tienda.com', 'Carlos Mendoza', 'ghijkl', '34545454', '1982-11-12', 1, 1;
EXEC proc_usuarios_insert 'supervisor1@tienda.com', 'Julia Estrada', 'mnopqr', '35656565', '1987-07-04', 1, 1;
EXEC proc_usuarios_insert 'contador1@tienda.com', 'Fernando Ruiz', 'stuvwx', '36767676', '1991-03-22', 1, 1;
EXEC proc_usuarios_insert 'auditor1@tienda.com', 'Laura Castillo', 'yzabcd', '37878787', '1993-06-18', 1, 1;
EXEC proc_usuarios_insert 'comprador1@tienda.com', 'Ernesto López', 'efghij', '38989898', '1980-12-30', 1, 1;
EXEC proc_usuarios_insert 'invitado1@tienda.com', 'Sofia Martínez', 'klmnop', '39090909', '1998-01-25', 2, 1;

-- Clientes
EXEC proc_clientes_insert 'Tienda La Económica', 'La Económica S.A.', 'Zona 1, Ciudad de Guatemala', '22121212', 1;
EXEC proc_clientes_insert 'Distribuidora El Buen Precio', 'Buen Precio S.A.', 'Zona 3, Mixco', '23131313', 2;
EXEC proc_clientes_insert 'Supermercado Las Flores', 'Las Flores S.A.', 'Zona 5, Ciudad de Guatemala', '24141414', 3;
EXEC proc_clientes_insert 'Tienda El Ahorro', 'El Ahorro S.A.', 'Zona 7, Villa Nueva', '25151515', 4;
EXEC proc_clientes_insert 'Abastecedora Los Ángeles', 'Los Ángeles S.A.', 'Zona 12, Ciudad de Guatemala', '26161616', 5;
EXEC proc_clientes_insert 'Tienda San José', 'San José S.A.', 'Zona 10, Ciudad de Guatemala', '27171717', 6;
EXEC proc_clientes_insert 'Supermercado Mi Pueblo', 'Mi Pueblo S.A.', 'Zona 18, Ciudad de Guatemala', '28181818', 7;
EXEC proc_clientes_insert 'Comercial El Centro', 'El Centro S.A.', 'Zona 2, Ciudad de Guatemala', '29191919', 8;
EXEC proc_clientes_insert 'Distribuidora La Central', 'La Central S.A.', 'Zona 6, Ciudad de Guatemala', '20102010', 9;
EXEC proc_clientes_insert 'Bodega El Norte', 'El Norte S.A.', 'Zona 11, Ciudad de Guatemala', '21112111', 10;

-- Categoría Producto
EXEC proc_categoriaProductos_insert 'Electrónica', 1;
EXEC proc_categoriaProductos_insert 'Computación', 1;
EXEC proc_categoriaProductos_insert 'Audio', 1;
EXEC proc_categoriaProductos_insert 'Redes', 1;
EXEC proc_categoriaProductos_insert 'Almacenamiento', 1;
EXEC proc_categoriaProductos_insert 'Accesorios', 2;
EXEC proc_categoriaProductos_insert 'Móviles', 2;
EXEC proc_categoriaProductos_insert 'Impresión', 2;
EXEC proc_categoriaProductos_insert 'Hogar', 1;
EXEC proc_categoriaProductos_insert 'Seguridad', 2;

-- Productos
EXEC proc_productos_insert 'Laptop HP', 'HP', 4500.00, 20, 0, 1, 1, 1;
EXEC proc_productos_insert 'Impresora Epson', 'Epson', 1200.00, 15, 0, 2, 1, 1;
EXEC proc_productos_insert 'Mouse Logitech', 'Logitech', 150.00, 50, 0, 3, 1, 1;
EXEC proc_productos_insert 'Teclado Microsoft', 'Microsoft', 300.00, 30, 0, 4, 1, 1;
EXEC proc_productos_insert 'Monitor Samsung', 'Samsung', 2500.00, 10, 0, 5, 1, 1;
EXEC proc_productos_insert 'Disco Duro Seagate', 'Seagate', 800.00, 25, 0, 6, 1, 1;
EXEC proc_productos_insert 'Memoria USB Sandisk', 'Sandisk', 75.00, 100, 0, 7, 1, 1;
EXEC proc_productos_insert 'Auriculares Sony', 'Sony', 1500.00, 12, 0, 8, 1, 1;
EXEC proc_productos_insert 'Cámara Logitech', 'Logitech', 800.00, 20, 0, 9, 1, 1;
EXEC proc_productos_insert 'Router TP-Link', 'TP-Link', 650.00, 18, 0, 10, 1, 1;


-- Orden
EXEC proc_orden_insert 'Zona 1, Guatemala', '30101010', '2024-08-15', 1000.00, 1, 1;
EXEC proc_orden_insert 'Zona 3, Mixco', '31212121', '2024-08-20', 2000.00, 2, 1;
EXEC proc_orden_insert 'Zona 5, Guatemala', '32323232', '2023-06-10', 350.00, 3, 1;
EXEC proc_orden_insert 'Zona 7, Villa Nueva', '33434343', '2023-04-25', 500.00, 4, 1;
EXEC proc_orden_insert 'Zona 12, Guatemala', '34545454', '2024-03-30', 4500.00, 5, 1;
EXEC proc_orden_insert 'Zona 10, Guatemala', '35656565', '2022-09-18', 700.00, 6, 1;
EXEC proc_orden_insert 'Zona 18, Guatemala', '36767676', '2024-01-10', 3000.00, 7, 1;
EXEC proc_orden_insert 'Zona 2, Guatemala', '37878787', '2022-12-20', 850.00, 8, 1;
EXEC proc_orden_insert 'Zona 6, Guatemala', '38989898', '2023-11-12', 1200.00, 9, 1;
EXEC proc_orden_insert 'Zona 11, Guatemala', '39090909', '2023-05-22', 1800.00, 10, 1;

-- Orden Detalles
EXEC proc_ordenDetalles_insert 1, 101, 2, 4500.00, 9000.00;
EXEC proc_ordenDetalles_insert 2, 102, 1, 1200.00, 1200.00;
EXEC proc_ordenDetalles_insert 3, 103, 3, 150.00, 450.00;
EXEC proc_ordenDetalles_insert 4, 104, 4, 300.00, 1200.00;
EXEC proc_ordenDetalles_insert 5, 105, 1, 2500.00, 2500.00;
EXEC proc_ordenDetalles_insert 6, 106, 2, 800.00, 1600.00;
EXEC proc_ordenDetalles_insert 7, 107, 5, 75.00, 375.00;
EXEC proc_ordenDetalles_insert 8, 108, 1, 1500.00, 1500.00;
EXEC proc_ordenDetalles_insert 9, 109, 3, 800.00, 2400.00;
EXEC proc_ordenDetalles_insert 10, 101, 1, 650.00, 650.00;

