using System;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace TestsVentanilla;

public class TestTramite()
{
    private static readonly HttpClient cliente;

    static TestExperienciaEducativa()
    {
        cliente = new HttpClient();
        cliente.BaseAddress = new Uri("http://192.168.1.20:8080/");
        cliente.DefaultRequestHeaders.Authorization = 
            new System.Net.Http.Headers.AuthenticationHeaderValue("bearer", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzdWFyaW8iOjUsIm5vbWJyZSI6ImZlcm5hbmRvIiwiaWRUaXBvVXN1YXJpbyI6MSwiaWF0IjoxNzM2OTg1NjE1LCJleHAiOjE3MzY5ODkyMTV9.XVD-T2ZwWT-_9iC20KFh2hKR9UIRUpCsWUF3Wu9P2ko");
        cliente.DefaultRequestHeaders.Add("accept", "application/json");
    }

    
}