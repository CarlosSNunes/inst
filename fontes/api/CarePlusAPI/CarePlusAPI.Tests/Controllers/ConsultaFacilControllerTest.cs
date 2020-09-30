using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using CarePlusAPI.Controllers;
using CarePlusAPI.Entities;
using CarePlusAPI.Helpers;
using CarePlusAPI.Models.Categorias;
using CarePlusAPI.Models.ConsultaFacil;
using CarePlusAPI.Services;
using System;
using System.Collections.Generic;
using System.IO;
using Xunit;

namespace CarePlusAPI.Tests.Controllers
{
    public class ConsultaFacilControllerTest : IDisposable
    {
        private readonly ConsultaFacilService _consultaFacilService;
        private readonly IMapper _mapper;
        private readonly IOptions<AppSettings> _appSettings;
        private readonly DbContextOptions<DataContext> _dbOptions;
        private readonly SqliteConnection _connection;
        private readonly IConfiguration _configuration;
        private readonly Clinica _clinica = new Clinica
        {
            Id = 1,
            EnderecoClinica = new List<EnderecoClinica> {
                new EnderecoClinica {
                    Id = 1,
                    Logradouro = "Rua Teste",
                    Numero = "10",
                    Bairro = "Bairro Teste",
                    Cidade = "Cidade Teste",
                    Complemento = "Complemento Teste",
                    Estado = "Estado Teste",
                    Municipio = "Municipio Teste",
                    ClinicaId = 1,
                },
                new EnderecoClinica {
                    Id = 2,
                    Logradouro = "Rua2 Teste",
                    Numero = "20",
                    Bairro = "Bairro2 Teste",
                    Cidade = "Cidade2 Teste",
                    Complemento = "Complemento2 Teste",
                    Estado = "Estado2 Teste",
                    Municipio = "Municipio2 Teste",
                    ClinicaId = 1,
                }
            },
            HorarioClinica = new List<HorarioClinica> {
                new HorarioClinica {
                    Id = 1,
                    DataHoraInicio = DateTime.Now,
                    DataHoraFim = DateTime.Now.AddHours(3),
                    Periodo = "Manhã",
                    ClinicaId = 1
                },
                new HorarioClinica {
                    Id = 2,
                    DataHoraInicio = DateTime.Now,
                    DataHoraFim = DateTime.Now.AddHours(3),
                    Periodo = "Tarde",
                    ClinicaId = 1
                }
            },
            Nome = "Nome Teste",
            Especialidade = "Especialidade Teste",
            Telefone = "9999999999",
            Fechada = '1',
            DataCadastro = DateTime.Now,
            UsuarioId = 1
        };

        private readonly ConsultaFacilCreateModel _consultaFacilCreateModel = new ConsultaFacilCreateModel
        {
            EnderecoClinica = new List<EnderecoClinica> {
                new EnderecoClinica {
                    Id = 1,
                    Logradouro = "Rua Teste",
                    Numero = "10",
                    Bairro = "Bairro Teste",
                    Cidade = "Cidade Teste",
                    Complemento = "Complemento Teste",
                    Estado = "Estado Teste",
                    Municipio = "Municipio Teste",
                    ClinicaId = 1,
                },
                new EnderecoClinica {
                    Id = 2,
                    Logradouro = "Rua2 Teste",
                    Numero = "20",
                    Bairro = "Bairro2 Teste",
                    Cidade = "Cidade2 Teste",
                    Complemento = "Complemento2 Teste",
                    Estado = "Estado2 Teste",
                    Municipio = "Municipio2 Teste",
                    ClinicaId = 1,
                }
            },
            HorarioClinica = new List<HorarioClinica> {
                new HorarioClinica {
                    Id = 1,
                    DataHoraInicio = DateTime.Now,
                    DataHoraFim = DateTime.Now.AddHours(3),
                    Periodo = "Manhã",
                    ClinicaId = 1
                },
                new HorarioClinica {
                    Id = 2,
                    DataHoraInicio = DateTime.Now,
                    DataHoraFim = DateTime.Now.AddHours(3),
                    Periodo = "Tarde",
                    ClinicaId = 1
                }
            },
            Nome = "Nome Teste",
            Especialidade = "Especialidade Teste",
            Telefone = "9999999999",
            Fechada = '1',
        };

        private readonly ConsultaFacilUpdateModel _consultaFacilUpdateModel = new ConsultaFacilUpdateModel
        {
            Id = 1,
            EnderecoClinica = new List<EnderecoClinica> {
                new EnderecoClinica {
                    Id = 1,
                    Logradouro = "Rua3 Teste",
                    Numero = "10",
                    Bairro = "Bairro Teste",
                    Cidade = "Cidade Teste",
                    Complemento = "Complemento Teste",
                    Estado = "Estado Teste",
                    Municipio = "Municipio Teste",
                    ClinicaId = 1,
                },
                new EnderecoClinica {
                    Id = 2,
                    Logradouro = "Rua4 Teste",
                    Numero = "20",
                    Bairro = "Bairro2 Teste",
                    Cidade = "Cidade2 Teste",
                    Complemento = "Complemento2 Teste",
                    Estado = "Estado2 Teste",
                    Municipio = "Municipio2 Teste",
                    ClinicaId = 1,
                }
            },
            HorarioClinica = new List<HorarioClinica> {
                new HorarioClinica {
                    Id = 1,
                    DataHoraInicio = DateTime.Now,
                    DataHoraFim = DateTime.Now.AddHours(3),
                    Periodo = "Manhã",
                    ClinicaId = 1
                },
                new HorarioClinica {
                    Id = 2,
                    DataHoraInicio = DateTime.Now,
                    DataHoraFim = DateTime.Now.AddHours(3),
                    Periodo = "Tarde",
                    ClinicaId = 1
                }
            },
            Nome = "Nome Teste",
            Especialidade = "Especialidade Teste",
            Telefone = "9999999999",
            Fechada = '1',
        };

        public ConsultaFacilControllerTest()
        {
            AutoMapperProfile mapperProfile = new AutoMapperProfile();
            _connection = new SqliteConnection("DataSource=:memory:");
            _connection.Open();

            _dbOptions = new DbContextOptionsBuilder<DataContext>()
                    .UseSqlite(_connection)
                    .Options;

            using (DataContext context = new DataContext(_dbOptions))
                context.Database.EnsureCreated();

            _consultaFacilService = new ConsultaFacilService(new DataContext(_dbOptions));
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddEnvironmentVariables();

            _configuration = builder.Build();

            IConfigurationSection appSettingsSection = _configuration.GetSection("AppSettings");

            var appSettings = appSettingsSection.Get<AppSettings>();

            _appSettings = Options.Create<AppSettings>(appSettings);

            MapperConfiguration config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(mapperProfile);
            });

            _mapper = config.CreateMapper();
        }

        [Fact]
        public void ConstrutorSucesso()
        {
            var result = new ConsultaFacilController(_consultaFacilService, _mapper, _appSettings);
            Assert.NotNull(result);
        }

        [Fact]
        public async void ListarSucesso()
        {
            ConsultaFacilController controller = new ConsultaFacilController(_consultaFacilService, _mapper, _appSettings);
            var result = await controller.Get();
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void BuscarSucesso()
        {
            await _consultaFacilService.Criar(_clinica);
            ConsultaFacilController controller = new ConsultaFacilController(_consultaFacilService, _mapper, _appSettings);
            IActionResult result = await controller.GetById(1);
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void BuscarErro()
        {
            await _consultaFacilService.Criar(_clinica);
            ConsultaFacilController controller = new ConsultaFacilController(_consultaFacilService, _mapper, _appSettings);
            await Assert.ThrowsAsync<AppException>(() => controller.GetById(999));
        }


        [Fact]
        public async void BuscarPorDataSucesso()
        {
            await _consultaFacilService.Criar(_clinica);
            ConsultaFacilController controller = new ConsultaFacilController(_consultaFacilService, _mapper, _appSettings);
            IActionResult result = await controller.GetByDate(DateTime.Now.Date);
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void BuscarPorDataErro()
        {
            await _consultaFacilService.Criar(_clinica);
            ConsultaFacilController controller = new ConsultaFacilController(_consultaFacilService, _mapper, _appSettings);
            await Assert.ThrowsAsync<AppException>(() => controller.GetByDate(DateTime.Now.AddDays(2)));
        }

        [Fact]
        public async void BuscarErroZero()
        {
            await _consultaFacilService.Criar(_clinica);
            ConsultaFacilController controller = new ConsultaFacilController(_consultaFacilService, _mapper, _appSettings);
            await Assert.ThrowsAsync<AppException>(() => controller.GetById(0));
        }

        [Fact]
        public async void CriarSucesso()
        {
            ConsultaFacilController controller = new ConsultaFacilController(_consultaFacilService, _mapper, _appSettings);
            IActionResult result = await controller.Post(_consultaFacilCreateModel);
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async void CriarErro()
        {
            var connection = new SqliteConnection("");
            connection.Open();
            var dbOptions = new DbContextOptionsBuilder<DataContext>()
                    .UseSqlite(connection)
                    .Options;
            var categoriasService = new ConsultaFacilService(new DataContext(dbOptions));

            ConsultaFacilController controller = new ConsultaFacilController(categoriasService, _mapper, _appSettings);
            IActionResult result = await controller.Post(_consultaFacilCreateModel);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void CriarErroNulo()
        {
            ConsultaFacilController controller = new ConsultaFacilController(_consultaFacilService, _mapper, _appSettings);
            await Assert.ThrowsAsync<AppException>(() => controller.Post(null));
        }

        [Fact]
        public async void AtualizarSucesso()
        {
            var c = new ConsultaFacilController(_consultaFacilService, _mapper, _appSettings);
            await c.Post(_consultaFacilCreateModel);

            using (DataContext context = new DataContext(_dbOptions))
            {
                ConsultaFacilService service = new ConsultaFacilService(context);
                ConsultaFacilController controller = new ConsultaFacilController(service, _mapper, _appSettings);
                IActionResult result = await controller.Put(_consultaFacilUpdateModel);
                Assert.IsType<OkResult>(result);
            }
        }

        [Fact]
        public async void AtualizarErro()
        {
            ConsultaFacilController controller = new ConsultaFacilController(_consultaFacilService, _mapper, _appSettings);
            IActionResult result = await controller.Put(_consultaFacilUpdateModel);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void AtualizarErroNulo()
        {
            ConsultaFacilController controller = new ConsultaFacilController(_consultaFacilService, _mapper, _appSettings);
            await Assert.ThrowsAsync<AppException>(() => controller.Put(null));
        }

        [Fact]
        public async void ExcluirSucesso()
        {
            var c = new ConsultaFacilController(_consultaFacilService, _mapper, _appSettings);
            await c.Post(_consultaFacilCreateModel);

            ConsultaFacilController controller = new ConsultaFacilController(_consultaFacilService, _mapper, _appSettings);
            IActionResult result = await controller.Delete(1);
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async void ExcluirErro()
        {
            await _consultaFacilService.Criar(_clinica);
            ConsultaFacilController controller = new ConsultaFacilController(_consultaFacilService, _mapper, _appSettings);
            await Assert.ThrowsAsync<AppException>(() => controller.Delete(999));
        }

        [Fact]
        public async void ExcluirErroZero()
        {
            await _consultaFacilService.Criar(_clinica);
            ConsultaFacilController controller = new ConsultaFacilController(_consultaFacilService, _mapper, _appSettings);
            await Assert.ThrowsAsync<AppException>(() => controller.Delete(0));
        }

        public void Dispose()
        {

            _connection.Close();
        }
    }
}