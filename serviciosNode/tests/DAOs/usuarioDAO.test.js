const UsuarioDAO = require('../../DataAccessObjects/UsuarioDAO');
const usuario = require('../../Models/usuario');
jest.mock('../../Models/usuario');

jest.mock('../Models/usuario');

describe('UsuarioDAO - crearUsuario', () => {
    it('debería crear un usuario correctamente cuando se proporcionan los datos válidos', async () => {
        const mockUsuario = { nombre: 'Juan', email: 'juan@test.com' };
        usuario.create.mockResolvedValue({ id: 1, ...mockUsuario });

        const result = await UsuarioDAO.crearUsuario(mockUsuario);

        expect(usuario.create).toHaveBeenCalledWith(mockUsuario);
        expect(result).toEqual({ id: 1, nombre: 'Juan', email: 'juan@test.com' });
    });

    it('debería lanzar un error si faltan campos obligatorios', async () => {
        const mockUsuario = { nombre: 'Juan' }; // Falta el email

        await expect(UsuarioDAO.crearUsuario(mockUsuario))
            .rejects
            .toThrow('Los campos obligatorios (nombre, email) deben estar presentes');
    });
});

describe('UsuarioDAO - editarUsuario', () => {
    it('debería actualizar un usuario correctamente cuando se proporcionan datos válidos', async () => {
        const mockUsuario = { email: 'actualizado@test.com' };
        usuario.update.mockResolvedValue([1]);

        const result = await UsuarioDAO.editarUsuario(1, mockUsuario);

        expect(usuario.update).toHaveBeenCalledWith(mockUsuario, { where: { idUsuario: 1 } });
        expect(result).toEqual({ message: 'Usuario actualizado correctamente' });
    });

    it('debería lanzar un error si no se proporciona un ID de usuario', async () => {
        await expect(UsuarioDAO.editarUsuario(null, { email: 'test@test.com' }))
            .rejects
            .toThrow('El ID del usuario es obligatorio');
    });

    it('debería lanzar un error si no se proporcionan datos para actualizar', async () => {
        await expect(UsuarioDAO.editarUsuario(1, {}))
            .rejects
            .toThrow('No hay datos para actualizar');
    });

    it('debería lanzar un error si no se encuentra el usuario', async () => {
        usuario.update.mockResolvedValue([0]);

        await expect(UsuarioDAO.editarUsuario(1, { email: 'test@test.com' }))
            .rejects
            .toThrow('No se encontró un usuario con el ID 1');
    });
});

describe('UsuarioDAO - eliminarUsuario', () => {
    it('debería cambiar el estado del usuario a 0 correctamente', async () => {
        usuario.update.mockResolvedValue([1]);

        const result = await UsuarioDAO.eliminarUsuario(1);

        expect(usuario.update).toHaveBeenCalledWith(
            { estado: 0 },
            { where: { idUsuario: 1 } }
        );
        expect(result).toEqual({ message: 'Usuario eliminado (estado cambiado a 0) correctamente' });
    });

    it('debería lanzar un error si no se proporciona un ID de usuario', async () => {
        await expect(UsuarioDAO.eliminarUsuario(null))
            .rejects
            .toThrow('El ID del usuario es obligatorio');
    });

    it('debería lanzar un error si no se encuentra el usuario', async () => {
        usuario.update.mockResolvedValue([0]);

        await expect(UsuarioDAO.eliminarUsuario(1))
            .rejects
            .toThrow('No se encontró un usuario con el ID 1');
    });
});

describe('UsuarioDAO - consultarUsuariosPorSecretario', () => {
    it('debería devolver usuarios asignados al secretario proporcionado', async () => {
        const mockUsuarios = [
            { idUsuario: 1, nombre: 'Juan', idSecretarioAsignado: 2, estado: 1 },
            { idUsuario: 2, nombre: 'Ana', idSecretarioAsignado: 2, estado: 1 }
        ];
        usuario.findAll.mockResolvedValue(mockUsuarios);

        const result = await UsuarioDAO.consultarUsuariosPorSecretario(2);

        expect(usuario.findAll).toHaveBeenCalledWith({
            where: { idSecretarioAsignado: 2, estado: 1 }
        });
        expect(result).toEqual(mockUsuarios);
    });

    it('debería lanzar un error si no se proporciona el ID del secretario', async () => {
        await expect(UsuarioDAO.consultarUsuariosPorSecretario(null))
            .rejects
            .toThrow('El identificador del secretario es obligatorio');
    });
});


describe('UsuarioDAO - validarUsuarioYContrasena', () => {
    it('debería devolver el usuario si la clave y contraseña son correctas', async () => {
        const mockUsuario = { idUsuario: 1, nombre: 'Juan', clave: 'clave123', estado: 1 };
        usuario.findOne.mockResolvedValue(mockUsuario);

        const result = await UsuarioDAO.validarUsuarioYContrasena('clave123', 'password123');

        expect(usuario.findOne).toHaveBeenCalledWith({
            where: { clave: 'clave123', contrasena: 'password123', estado: 1 }
        });
        expect(result).toEqual(mockUsuario);
    });

    it('debería lanzar un error si la clave o contraseña no son válidas', async () => {
        usuario.findOne.mockResolvedValue(null);

        await expect(UsuarioDAO.validarUsuarioYContrasena('clave123', 'password123'))
            .rejects
            .toThrow('Usuario o contraseña inválidos');
    });

    it('debería lanzar un error si no se proporciona la clave o contraseña', async () => {
        await expect(UsuarioDAO.validarUsuarioYContrasena(null, 'password123'))
            .rejects
            .toThrow('La clave y la contraseña son obligatorios');
    });
});
