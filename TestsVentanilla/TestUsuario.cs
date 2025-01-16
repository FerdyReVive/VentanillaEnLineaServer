using System;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace TestsVentanilla;

public class TestUsuario
{
    private static readonly HttpClient cliente;

    static TestUsuario()
    {
        cliente = new HttpClient();
        cliente.BaseAddress = new Uri("http://192.168.1.20:8080/");
        cliente.DefaultRequestHeaders.Authorization = 
            new System.Net.Http.Headers.AuthenticationHeaderValue("bearer", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzdWFyaW8iOjUsIm5vbWJyZSI6ImZlcm5hbmRvIiwiaWRUaXBvVXN1YXJpbyI6MSwiaWF0IjoxNzM2OTgxMjMwLCJleHAiOjE3MzY5ODQ4MzB9.dnlHm1pwelubjCMVjEv5Jx3MNnG3JVjcEHDqxQl46cI");
        cliente.DefaultRequestHeaders.Add("accept", "application/json");
    }

    /*[Fact]
    public async Task pruebaCrearUsuarioExitosa()
    {
        var usuarioValido = new
        {
            nombre = "Alesi",
            clave = "clave12345",
            correo = "alesi@example.com",
            contrasena = "password",
            idTipoUsuario = 2,
            idSecretarioAsignado = 5,
            estado = 1
        };

        var json = System.Text.Json.JsonSerializer.Serialize(usuarioValido);
        var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");
        var response = await cliente.PostAsync("VentanillaEnLinea/ServiciosNode/Usuario", content);

        response.EnsureSuccessStatusCode();
        var responseBody = await response.Content.ReadAsStringAsync();
        Console.WriteLine(responseBody);
        Assert.Contains("Usuario registrado exitosamente", responseBody, StringComparison.OrdinalIgnoreCase);
    }

    [Fact]
    public async Task pruebaCrearUsuarioFallida()
    {
        var usuarioValido = new
        {
            nombre = "Ales",
            clave = "clave1234",
            correo = "ales@example.com",
            idTipoUsuario = 2,
            idSecretarioAsignado = 5,
            estado = 1
        };

        var json = System.Text.Json.JsonSerializer.Serialize(usuarioValido);
        var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");
        var response = await cliente.PostAsync("VentanillaEnLinea/ServiciosNode/Usuario", content);
        var responseBody = await response.Content.ReadAsStringAsync();

        Console.WriteLine(responseBody);
        Assert.False(response.IsSuccessStatusCode, "Se esperaba que la solicitud fallara debido a la falta de campos obligatorios.");
        Assert.Contains("Todos los campos son obligatorios", responseBody, StringComparison.OrdinalIgnoreCase);
    }

    [Fact]
    public async Task pruebaEditarUsuarioExitosa()
    {
        var usuarioEditado = new
        {
            nombre = "NuevoNombre",
            contrasena = "newpassword",
            idTipoUsuario = 2,
            idSecretarioAsignado = 4,
            estado = 1
        };

        int idUsuario = 16;

        var json = System.Text.Json.JsonSerializer.Serialize(usuarioEditado);
        var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");
        var response = await cliente.PatchAsync($"VentanillaEnLinea/ServiciosNode/usuarios/{idUsuario}", content);
        response.EnsureSuccessStatusCode();
        var responseBody = await response.Content.ReadAsStringAsync();

        Console.WriteLine($"Código de estado: {response.StatusCode}");
        Console.WriteLine($"Cuerpo de la respuesta: {responseBody}");

        Assert.True(response.IsSuccessStatusCode, "Se esperaba que la solicitud tuviera éxito.");
        Assert.Contains("Usuario editado correctamente", responseBody, StringComparison.OrdinalIgnoreCase);
    }

    [Fact]
    public async Task pruebaEditarUsuarioFallida()
    {
        var usuarioEditado = new
        {
            nombre = "NombreFallido",
            clave = "claveFallida123",
            correo = "fallido@example.com",
            contrasena = "passwordfallido",
            idTipoUsuario = 3,
            idSecretarioAsignado = 4,
            estado = 1
        };

        int idUsuario = 9999;

        var json = System.Text.Json.JsonSerializer.Serialize(usuarioEditado);
        var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");
        var response = await cliente.PatchAsync($"VentanillaEnLinea/ServiciosNode/usuarios/{idUsuario}", content);

        var responseBody = await response.Content.ReadAsStringAsync();

        Console.WriteLine($"Código de estado: {response.StatusCode}");
        Console.WriteLine($"Cuerpo de la respuesta: {responseBody}");

        Assert.False(response.IsSuccessStatusCode, "Se esperaba que la solicitud fallara debido a un ID no existente.");
        Assert.Contains("Error al editar el usuario", responseBody, StringComparison.OrdinalIgnoreCase);
    }

    [Fact]
    public async Task pruebaDesactivarUsuarioExitosa()
    {
       var usuarioEditado = new
        {
            estado = 0
        };

        int idUsuario = 13;
        try
        {
            var json = System.Text.Json.JsonSerializer.Serialize(usuarioEditado);
            var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");
            var response = await cliente.PatchAsync($"VentanillaEnLinea/ServiciosNode/estausuarios/{idUsuario}", content);
            var responseBody = await response.Content.ReadAsStringAsync();

            Console.WriteLine($"Código de estado: {response.StatusCode}");
            Console.WriteLine($"Cuerpo de la respuesta: {responseBody}");

            Assert.True(response.IsSuccessStatusCode, "Se esperaba que la solicitud tuviera éxito.");
            Assert.Contains("Usuario eliminado correctamente", responseBody, StringComparison.OrdinalIgnoreCase);
        }catch (HttpRequestException ex)
        {
            Console.WriteLine($"Error al realizar la solicitud: {ex.Message}");
            throw;
        }
    }

    [Fact]
    public async Task pruebaDesactivarUsuarioFallida()
    {
        var usuarioEditado = new
        {
            estado = 0
        };

        int idUsuario = 9999;

        try{
            var json = System.Text.Json.JsonSerializer.Serialize(usuarioEditado);
            var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");
            var response = await cliente.PatchAsync($"VentanillaEnLinea/ServiciosNode/estausuarios/{idUsuario}", content);

            var responseBody = await response.Content.ReadAsStringAsync();

            Console.WriteLine($"Código de estado: {response.StatusCode}");
            Console.WriteLine($"Cuerpo de la respuesta: {responseBody}");

            Assert.False(response.IsSuccessStatusCode, "Se esperaba que la solicitud fallara debido a un ID no existente.");
            Assert.Contains("Error al eliminar el usuario", responseBody, StringComparison.OrdinalIgnoreCase);
        }catch (HttpRequestException ex)
        {
            Console.WriteLine($"Error al realizar la solicitud: {ex.Message}");
            throw;
        }
    }

    [Fact]
    public async Task pruebaConsultarUsuariosPorSecretarioExitosa()
    {
        int idUsuario = 5;

        try
        {
            var response = await cliente.GetAsync($"VentanillaEnLinea/ServiciosNode/usuarios/{idUsuario}");
            var responseBody = await response.Content.ReadAsStringAsync();

            Console.WriteLine($"Código de estado: {response.StatusCode}");
            Console.WriteLine($"Cuerpo de la respuesta: {responseBody}");

            Assert.True(response.IsSuccessStatusCode, $"Se esperaba que la solicitud tuviera éxito. Código: {response.StatusCode}");
            Assert.Contains("estado", responseBody, StringComparison.OrdinalIgnoreCase);
        }
        catch (HttpRequestException ex)
        {
            Console.WriteLine($"Error al realizar la solicitud: {ex.Message}");
            throw;
        }
    }

    [Fact]
    public async Task pruebaConsultarUsuariosPorSecretarioFallida()
    {
        int idUsuario = 9999;

        var response = await cliente.GetAsync($"VentanillaEnLinea/ServiciosNode/usuarios/{idUsuario}");
        var responseBody = await response.Content.ReadAsStringAsync();

        Console.WriteLine($"Código de estado: {response.StatusCode}");
        Console.WriteLine($"Cuerpo de la respuesta: {responseBody}");

        Assert.True(response.IsSuccessStatusCode, $"Se esperaba que la solicitud tuviera éxito. Código: {response.StatusCode}");
        Assert.Contains("[]", responseBody, StringComparison.OrdinalIgnoreCase);
    }

    [Fact]
    public async Task validarUsuarioExitosa()
    {
        var usuarioValido = new
        {
            clave = "1234",
            contrasena = "ferf"
        };

        var json = System.Text.Json.JsonSerializer.Serialize(usuarioValido);
        var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

        try
        {
            var response = await cliente.PostAsync("VentanillaEnLinea/ServiciosNode/validar-usuario", content);
            var responseBody = await response.Content.ReadAsStringAsync();

            Console.WriteLine($"Código de estado: {response.StatusCode}");
            Console.WriteLine($"Cuerpo de la respuesta: {responseBody}");

            Assert.True(response.IsSuccessStatusCode, $"Se esperaba que la solicitud tuviera éxito. Código: {response.StatusCode}");
            Assert.Contains("Token generado", responseBody, StringComparison.OrdinalIgnoreCase);
            Assert.Contains("token", responseBody, StringComparison.OrdinalIgnoreCase);
        }
        catch (HttpRequestException ex)
        {
            Console.WriteLine($"Error al realizar la solicitud: {ex.Message}");
            throw;
        }
    }

    [Fact]
    public async Task validarUsuarioFallida()
    {
        var usuarioInvalido = new
        {
            clave = "claveInvalida",
            contrasena = "passwordInvalida"
        };

        var json = System.Text.Json.JsonSerializer.Serialize(usuarioInvalido);
        var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

        try
        {
            var response = await cliente.PostAsync("VentanillaEnLinea/ServiciosNode/validar-usuario", content);
            var responseBody = await response.Content.ReadAsStringAsync();

            Console.WriteLine($"Código de estado: {response.StatusCode}");
            Console.WriteLine($"Cuerpo de la respuesta: {responseBody}");

            Assert.False(response.IsSuccessStatusCode, $"Se esperaba que la solicitud fallara. Código: {response.StatusCode}");
            Assert.Contains("Usuario o contraseña inválidos", responseBody, StringComparison.OrdinalIgnoreCase);
        }
        catch (HttpRequestException ex)
        {
            Console.WriteLine($"Error al realizar la solicitud: {ex.Message}");
            throw;
        }
    }*/

}
