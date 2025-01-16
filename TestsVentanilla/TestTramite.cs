using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace TestsVentanilla
{
    public class TestTramite
    {
        private static readonly HttpClient clienteSecretario;
        private static readonly HttpClient clienteEstudiante;

        static TestTramite()
        {
            clienteSecretario = new HttpClient
            {
                BaseAddress = new Uri("http://192.168.1.20:8080/")
            };
            clienteSecretario.DefaultRequestHeaders.Authorization =
                new System.Net.Http.Headers.AuthenticationHeaderValue("bearer", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzdWFyaW8iOjUsIm5vbWJyZSI6ImZlciIsImlkVGlwb1VzdWFyaW8iOjEsImlhdCI6MTczNjk5ODExNywiZXhwIjoxNzM3MDAxNzE3fQ.jT7cZTjKo2B0aMo3c_yrlhWUrwcTzHC7BBKd0H9-0-8");
            clienteSecretario.DefaultRequestHeaders.Add("accept", "application/json");

            clienteEstudiante = new HttpClient
            {
                BaseAddress = new Uri("http://192.168.1.20:8080/")
            };
            clienteEstudiante.DefaultRequestHeaders.Authorization =
                new System.Net.Http.Headers.AuthenticationHeaderValue("bearer", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzdWFyaW8iOjYsIm5vbWJyZSI6ImZlcmQiLCJpZFRpcG9Vc3VhcmlvIjoyLCJpYXQiOjE3MzY5OTgwODIsImV4cCI6MTczNzAwMTY4Mn0.HkklAUJQPGf6SDqHDx6_Y8wB1W__d0-jbop9UnVIrbo");
            clienteEstudiante.DefaultRequestHeaders.Add("accept", "application/json");
        }

        /*[Fact]
        public async Task pruebaCrearTramiteExitosa()
        {
            var tramiteValido = new
            {
                fecha = "2025-01-15",
                idTipoTramite = 1,
                idUsuario = 6,
                estado = 1
            };

            var json = System.Text.Json.JsonSerializer.Serialize(tramiteValido);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await clienteEstudiante.PostAsync("VentanillaEnLinea/ServiciosNode/tramites", content);
            var responseBody = await response.Content.ReadAsStringAsync();

            Console.WriteLine($"Código de estado: {response.StatusCode}");
            Console.WriteLine($"Cuerpo de la respuesta: {responseBody}");

            Assert.True(response.IsSuccessStatusCode, "Se esperaba que la solicitud tuviera éxito.");
            Assert.Contains("idTramite", responseBody, StringComparison.OrdinalIgnoreCase);
        }

        [Fact]
        public async Task pruebaCrearTramiteFallida()
        {
            var tramiteInvalido = new
            {
                idTipoTramite = 1,
                idUsuario = 1,
                estado = 1
            };

            var json = System.Text.Json.JsonSerializer.Serialize(tramiteInvalido);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await clienteEstudiante.PostAsync("VentanillaEnLinea/ServiciosNode/tramites", content);
            var responseBody = await response.Content.ReadAsStringAsync();

            Console.WriteLine($"Código de estado: {response.StatusCode}");
            Console.WriteLine($"Cuerpo de la respuesta: {responseBody}");

            Assert.False(response.IsSuccessStatusCode, "Se esperaba que la solicitud fallara.");
            Assert.Contains("Todos los campos son obligatorios", responseBody, StringComparison.OrdinalIgnoreCase);
        }

        [Fact]
        public async Task pruebaEditarEstadoTramiteExitosa()
        {
            var estadoActualizado = new
            {
                nuevoEstado = 2
            };

            var json = System.Text.Json.JsonSerializer.Serialize(estadoActualizado);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await clienteSecretario.PatchAsync("VentanillaEnLinea/ServiciosNode/tramites/2", content);
            var responseBody = await response.Content.ReadAsStringAsync();

            Console.WriteLine($"Código de estado: {response.StatusCode}");
            Console.WriteLine($"Cuerpo de la respuesta: {responseBody}");

            Assert.True(response.IsSuccessStatusCode, "Se esperaba que la solicitud tuviera éxito.");
            Assert.Contains("Estado del trámite actualizado correctamente", responseBody, StringComparison.OrdinalIgnoreCase);
        }

        [Fact]
        public async Task pruebaEditarEstadoTramiteFallida()
        {
            var estadoInvalido = new
            {
                nuevoEstado = 2
            };

            var json = System.Text.Json.JsonSerializer.Serialize(estadoInvalido);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await clienteSecretario.PatchAsync("VentanillaEnLinea/ServiciosNode/tramites/9999", content);
            var responseBody = await response.Content.ReadAsStringAsync();

            Console.WriteLine($"Código de estado: {response.StatusCode}");
            Console.WriteLine($"Cuerpo de la respuesta: {responseBody}");

            Assert.False(response.IsSuccessStatusCode, "Se esperaba que la solicitud fallara.");
            Assert.Contains("Error al editar el estado del trámite", responseBody, StringComparison.OrdinalIgnoreCase);
        }

        [Fact]
        public async Task pruebaConsultarTramitesPorUsuarioExitosa()
        {
            var response = await clienteEstudiante.GetAsync("VentanillaEnLinea/ServiciosNode/tramites/6");
            var responseBody = await response.Content.ReadAsStringAsync();

            Console.WriteLine($"Código de estado: {response.StatusCode}");
            Console.WriteLine($"Cuerpo de la respuesta: {responseBody}");

            Assert.True(response.IsSuccessStatusCode, "Se esperaba que la solicitud tuviera éxito.");
            Assert.Contains("idTramite", responseBody, StringComparison.OrdinalIgnoreCase);
        }

        [Fact]
        public async Task pruebaConsultarTramitesPorUsuarioFallida()
        {
            var response = await clienteEstudiante.GetAsync("VentanillaEnLinea/ServiciosNode/tramites/9999");
            var responseBody = await response.Content.ReadAsStringAsync();

            Console.WriteLine($"Código de estado: {response.StatusCode}");
            Console.WriteLine($"Cuerpo de la respuesta: {responseBody}");

            Assert.False(response.IsSuccessStatusCode, "Se esperaba que la solicitud fallara.");
            Assert.Contains("No se encontraron trámites para este usuario", responseBody, StringComparison.OrdinalIgnoreCase);
        }

        [Fact]
        public async Task pruebaConsultarTramitesPorSecretarioExitosa()
        {
            var response = await clienteSecretario.GetAsync("VentanillaEnLinea/ServiciosNode/tramites/secretario/5");
            var responseBody = await response.Content.ReadAsStringAsync();

            Console.WriteLine($"Código de estado: {response.StatusCode}");
            Console.WriteLine($"Cuerpo de la respuesta: {responseBody}");

            Assert.True(response.IsSuccessStatusCode, "Se esperaba que la solicitud tuviera éxito.");
            Assert.Contains("idTramite", responseBody, StringComparison.OrdinalIgnoreCase);
        }

        [Fact]
        public async Task pruebaConsultarTramitesPorSecretarioFallida()
        {
            var response = await clienteSecretario.GetAsync("VentanillaEnLinea/ServiciosNode/tramites/secretario/9999");
            var responseBody = await response.Content.ReadAsStringAsync();

            Console.WriteLine($"Código de estado: {response.StatusCode}");
            Console.WriteLine($"Cuerpo de la respuesta: {responseBody}");

            Assert.False(response.IsSuccessStatusCode, "Se esperaba que la solicitud fallara.");
            Assert.Contains("No se encontraron trámites asignados a este secretario", responseBody, StringComparison.OrdinalIgnoreCase);
        }*/
    }
}
