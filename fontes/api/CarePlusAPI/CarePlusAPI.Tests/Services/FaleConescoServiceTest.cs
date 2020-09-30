using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using CarePlusAPI.Helpers;
using CarePlusAPI.Services;
using System;
using System.IO;
using System.Threading.Tasks;
using Xunit;

namespace CarePlusAPI.Tests.Services
{
    public class FaleConescoServiceTest : IDisposable
    {
        private readonly IOptions<AppSettings> _appSettings;
        private FaleConoscoService _faleConoscoService;
        private IConfiguration _configuration;

        public FaleConescoServiceTest()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddEnvironmentVariables();

            _configuration = builder.Build();

            IConfigurationSection appSettingsSection = _configuration.GetSection("AppSettings");

            var appSettings = appSettingsSection.Get<AppSettings>();

            _appSettings = Options.Create<AppSettings>(appSettings);

            _faleConoscoService = new FaleConoscoService(_appSettings);
        }

        [Fact]
        public async Task LogarSucesso()
        {
            var result = await _faleConoscoService.Logar();
            Assert.NotEmpty(result);
        }

        [Fact]
        public async Task LogarErro()
        {
            var result = await _faleConoscoService.Logar();
            result = string.Empty;
            Assert.Empty(result);
        }

        [Fact]
        public async Task ListarTipoAssuntoFaleConoscoSucesso()
        {
            var result = await _faleConoscoService.ListarTipoAssuntoFaleConosco();
            Assert.NotNull(result);
        }

        [Fact]
        public async Task ListarTipoAssuntoFaleConoscoErro()
        {
            var result = await _faleConoscoService.ListarTipoAssuntoFaleConosco();
            result = null;
            Assert.Null(result);
        }


        [Fact]
        public async Task BuscarAssuntoOuvidoriaSucesso()
         {
            var result = await _faleConoscoService.BuscarAssuntoOuvidoria();
            Assert.NotNull(result);
        }

        [Fact]
        public async Task BuscarAssuntoOuvidoriaErro()
        {
            var result = await _faleConoscoService.BuscarAssuntoOuvidoria();
            result = null;
            Assert.Null(result);
        }


        [Fact]
        public async Task BuscarClassificacaoSucesso()
        {
            var result = await _faleConoscoService.BuscarClassificacaoOuvidoria();
            Assert.NotNull(result);
        }

        [Fact]
        public async Task BuscarClassificacaoErro()
        {
            var result = await _faleConoscoService.BuscarClassificacaoOuvidoria();
            result = null;
            Assert.Null(result);
        }   

        public void Dispose()
        {

        }
    }
}