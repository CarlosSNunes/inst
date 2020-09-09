using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Neotix.Neocms.CarePlusAPI.Entities;
using Neotix.Neocms.CarePlusAPI.Helpers;
using Neotix.Neocms.CarePlusAPI.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Neotix.Neocms.CarePlusAPI.Tests.Services
{
    public class ConsultaFacilServiceTest : IDisposable
    {
        private readonly ConsultaFacilService _consultaFacilService;
        private readonly DbContextOptions<DataContext> _options;
        private readonly SqliteConnection _connection;
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

        public ConsultaFacilServiceTest()
        {
            _connection = new SqliteConnection("DataSource=:memory:");
            _connection.Open();

            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);

            _options = new DbContextOptionsBuilder<DataContext>()
                    .UseSqlite(_connection)
                    .Options;

            using (DataContext context = new DataContext(_options))
                context.Database.EnsureCreated();

            using (DataContext context = new DataContext(_options))
            {
                context.Categoria.Add(new Categoria { Id = 1, Descricao = "Saúde" });
                context.Tag.Add(new Tag { Id = 1, Descricao = "Saúde" });

                context.SaveChanges();
            }

            _consultaFacilService = new ConsultaFacilService(new DataContext(_options));
        }

        [Fact]
        public async Task ListaSucesso()
        {
            await _consultaFacilService.Criar(_clinica);

            var result = await _consultaFacilService.Listar();
            Assert.NotEmpty(result);
        }

        [Fact]
        public async Task BuscarPorIdErro()
        {
            await _consultaFacilService.Criar(_clinica);

            await Assert.ThrowsAsync<AppException>(() => _consultaFacilService.BuscarPorId(999));
        }

        [Fact]
        public async Task BuscarPorIdErroZero()
        {
            await _consultaFacilService.Criar(_clinica);

            await Assert.ThrowsAsync<AppException>(() => _consultaFacilService.BuscarPorId(0));
        }

        [Fact]
        public async Task BuscarPorIdSucesso()
        {
            await _consultaFacilService.Criar(_clinica);

            var result = await _consultaFacilService.BuscarPorId(1);
            Assert.NotNull(result);
        }

        [Fact]
        public async Task BuscarPorDataSucesso()
        {
            await _consultaFacilService.Criar(_clinica);

            var result = await _consultaFacilService.BuscarPorData(DateTime.Now.Date);
            Assert.NotNull(result);
        }

        [Fact]
        public async Task BuscarPorDataErro()
        {
            await _consultaFacilService.Criar(_clinica);

            await Assert.ThrowsAsync<AppException>(() => _consultaFacilService.BuscarPorData(DateTime.Now.AddDays(2)));           
        }

        [Fact]
        public async Task CriarSucesso()
        {
            await _consultaFacilService.Criar(_clinica);
            return;
        }

        [Fact]
        public async Task CriarErro()
        {
            await Assert.ThrowsAsync<AppException>(() => _consultaFacilService.Criar(null));
        }

        [Fact]
        public async Task CriarErroNulo()
        {
            await Assert.ThrowsAsync<AppException>(() => _consultaFacilService.Criar(null));
        }

        [Fact]
        public async Task AtualizarSucesso()
        {
            await _consultaFacilService.Criar(_clinica);
            await _consultaFacilService.Atualizar(_clinica);
            return;
        }

        [Fact]
        public async Task AtualizarErro()
        {
            await _consultaFacilService.Criar(_clinica);
            await Assert.ThrowsAsync<AppException>(() => _consultaFacilService.Atualizar(null));
        }

        [Fact]
        public async Task AtualizarErroNulo()
        {
            await _consultaFacilService.Criar(_clinica);
            await Assert.ThrowsAsync<AppException>(() => _consultaFacilService.Atualizar(null));
        }

        [Fact]
        public async Task ExcluirSucesso()
        {
            await _consultaFacilService.Criar(_clinica);
            await _consultaFacilService.Excluir(1);
            return;
        }

        [Fact]
        public async Task ExcluirErro()
        {
            await _consultaFacilService.Criar(_clinica);
            await Assert.ThrowsAsync<AppException>(() => _consultaFacilService.Excluir(999));
        }

        [Fact]
        public async Task ExcluirErroZero()
        {
            await _consultaFacilService.Criar(_clinica);
            await Assert.ThrowsAsync<AppException>(() => _consultaFacilService.Excluir(0));
        }

        public void Dispose()
        {
            _connection.Close();
        }
    }
}
