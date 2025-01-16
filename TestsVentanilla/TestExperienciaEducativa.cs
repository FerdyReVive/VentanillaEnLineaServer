using System;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace TestsVentanilla;

public class TestExperienciaEducativa()
{
    /*private static readonly HttpClient cliente;

    static TestExperienciaEducativa()
    {
        cliente = new HttpClient();
        cliente.BaseAddress = new Uri("http://192.168.1.20:8080/");
        cliente.DefaultRequestHeaders.Authorization = 
            new System.Net.Http.Headers.AuthenticationHeaderValue("bearer", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzdWFyaW8iOjUsIm5vbWJyZSI6ImZlcm5hbmRvIiwiaWRUaXBvVXN1YXJpbyI6MSwiaWF0IjoxNzM2OTg1NjE1LCJleHAiOjE3MzY5ODkyMTV9.XVD-T2ZwWT-_9iC20KFh2hKR9UIRUpCsWUF3Wu9P2ko");
        cliente.DefaultRequestHeaders.Add("accept", "application/json");
    }

    [Fact]
    public async Task pruebaCrearExperienciaEducativaExitosa()
    {
        var experienciaValida = new
        {
            nombre = "Logica",
            NRC = "12345"
        };

        var json = System.Text.Json.JsonSerializer.Serialize(experienciaValida);
        var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

        var response = await cliente.PostAsync("VentanillaEnLinea/ServiciosNode/experiencias", content);
        var responseBody = await response.Content.ReadAsStringAsync();

        Console.WriteLine($"Código de estado: {response.StatusCode}");
        Console.WriteLine($"Cuerpo de la respuesta: {responseBody}");

        Assert.True(response.IsSuccessStatusCode, $"Se esperaba que la solicitud tuviera éxito. Código: {response.StatusCode}");
        Assert.Contains("Experiencia educativa creada correctamente", responseBody, StringComparison.OrdinalIgnoreCase);
    }

    [Fact]
    public async Task pruebaCrearExperienciaEducativaFallida()
    {
        var experienciaInvalida = new
        {
            nombre = "",
            NRC = ""
        };

        var json = System.Text.Json.JsonSerializer.Serialize(experienciaInvalida);
        var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

        var response = await cliente.PostAsync("VentanillaEnLinea/ServiciosNode/experiencias", content);
        var responseBody = await response.Content.ReadAsStringAsync();

        Console.WriteLine($"Código de estado: {response.StatusCode}");
        Console.WriteLine($"Cuerpo de la respuesta: {responseBody}");

        Assert.False(response.IsSuccessStatusCode, $"Se esperaba que la solicitud fallara. Código: {response.StatusCode}");
        Assert.Contains("Error al crear la experiencia educativa", responseBody, StringComparison.OrdinalIgnoreCase);
    }

    [Fact]
    public async Task pruebaEditarExperienciaEducativaExitosa()
    {
        int idExperienciaEducativa = 1;
        var experienciaEditada = new
        {
            nombre = "Logica II",
            NRC = "54321"
        };

        var json = System.Text.Json.JsonSerializer.Serialize(experienciaEditada);
        var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

        var response = await cliente.PatchAsync($"VentanillaEnLinea/ServiciosNode/experiencias/{idExperienciaEducativa}", content);
        var responseBody = await response.Content.ReadAsStringAsync();

        Console.WriteLine($"Código de estado: {response.StatusCode}");
        Console.WriteLine($"Cuerpo de la respuesta: {responseBody}");

        Assert.True(response.IsSuccessStatusCode, $"Se esperaba que la solicitud tuviera éxito. Código: {response.StatusCode}");
        Assert.Contains("Experiencia educativa editada correctamente", responseBody, StringComparison.OrdinalIgnoreCase);
    }

    [Fact]
    public async Task pruebaEditarExperienciaEducativaFallida()
    {
        int idExperienciaEducativa = 1;
        var experienciaEditada = new
        {
            nombre = "",
            NRC = ""
        };

        var json = System.Text.Json.JsonSerializer.Serialize(experienciaEditada);
        var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

        var response = await cliente.PatchAsync($"VentanillaEnLinea/ServiciosNode/experiencias/{idExperienciaEducativa}", content);
        var responseBody = await response.Content.ReadAsStringAsync();

        Console.WriteLine($"Código de estado: {response.StatusCode}");
        Console.WriteLine($"Cuerpo de la respuesta: {responseBody}");

        Assert.False(response.IsSuccessStatusCode, "Se esperaba que la solicitud fallara debido a datos inválidos.");
        Assert.Contains("Error al editar la experiencia educativa", responseBody, StringComparison.OrdinalIgnoreCase);
    }

    [Fact]
    public async Task pruebaEliminarExperienciaEducativaExitosa()
    {
        int idExperienciaEducativa = 4;

        var response = await cliente.DeleteAsync($"VentanillaEnLinea/ServiciosNode/experiencias/{idExperienciaEducativa}");
        var responseBody = await response.Content.ReadAsStringAsync();

        Console.WriteLine($"Código de estado: {response.StatusCode}");
        Console.WriteLine($"Cuerpo de la respuesta: {responseBody}");

        Assert.True(response.IsSuccessStatusCode, $"Se esperaba que la solicitud tuviera éxito. Código: {response.StatusCode}");
        Assert.Contains("Experiencia educativa eliminada correctamente", responseBody, StringComparison.OrdinalIgnoreCase);
    }

    [Fact]
    public async Task pruebaEliminarExperienciaEducativaFallida()
    {
        int idExperienciaEducativa = 9999;

        var response = await cliente.DeleteAsync($"VentanillaEnLinea/ServiciosNode/experiencias/{idExperienciaEducativa}");
        var responseBody = await response.Content.ReadAsStringAsync();

        Console.WriteLine($"Código de estado: {response.StatusCode}");
        Console.WriteLine($"Cuerpo de la respuesta: {responseBody}");

        Assert.False(response.IsSuccessStatusCode, "Se esperaba que la solicitud fallara debido a un ID inexistente.");
        Assert.Contains("Error al eliminar la experiencia educativa", responseBody, StringComparison.OrdinalIgnoreCase);
    }

    [Fact]
    public async Task pruebaConsultarExperienciasEducativasExitosa()
    {
        var response = await cliente.GetAsync("VentanillaEnLinea/ServiciosNode/experiencias");
        var responseBody = await response.Content.ReadAsStringAsync();

        Console.WriteLine($"Código de estado: {response.StatusCode}");
        Console.WriteLine($"Cuerpo de la respuesta: {responseBody}");

        Assert.True(response.IsSuccessStatusCode, $"Se esperaba que la solicitud tuviera éxito. Código: {response.StatusCode}");
        Assert.Contains("[", responseBody);
    }

    [Fact]
    public async Task pruebaConsultarExperienciasCompletasPorUsuarioExitosa()
    {
        int idUsuario = 6;

        var response = await cliente.GetAsync($"VentanillaEnLinea/ServiciosNode/experiencias/{idUsuario}");
        var responseBody = await response.Content.ReadAsStringAsync();

        Console.WriteLine($"Código de estado: {response.StatusCode}");
        Console.WriteLine($"Cuerpo de la respuesta: {responseBody}");

        Assert.True(response.IsSuccessStatusCode, $"Se esperaba que la solicitud tuviera éxito. Código: {response.StatusCode}");
        Assert.Contains("[", responseBody);
    }

    [Fact]
    public async Task pruebaConsultarExperienciasCompletasPorUsuarioFallida()
    {
        int idUsuario = 9999;

        var response = await cliente.GetAsync($"VentanillaEnLinea/ServiciosNode/experiencias/{idUsuario}");
        var responseBody = await response.Content.ReadAsStringAsync();

        Console.WriteLine($"Código de estado: {response.StatusCode}");
        Console.WriteLine($"Cuerpo de la respuesta: {responseBody}");

        Assert.True(response.IsSuccessStatusCode, "Se esperaba que la solicitud devolviera un código exitoso incluso para un ID inexistente.");
        Assert.Contains("[]", responseBody, StringComparison.OrdinalIgnoreCase);
    }*/

}