using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Moq;
using CarePlusAPI.Controllers;
using CarePlusAPI.Entities;
using CarePlusAPI.Helpers;
using CarePlusAPI.Models.Banner;
using CarePlusAPI.Services;
using System;
using System.IO;
using System.Threading;
using Xunit;
using Microsoft.Data.Sqlite;
using System.Collections.Generic;

namespace CarePlusAPI.Tests.Controllers
{
    public class BannerControllerTest : IDisposable
    {
        private readonly BannerService _bannerService;
        private readonly IMapper _mapper;
        private readonly IOptions<AppSettings> _appSettings;
        private readonly DbContextOptions<DataContext> _dbOptions;
        private readonly SqliteConnection _connection;
        private readonly IConfiguration _configuration;
        private readonly FileStream _stream;
        private readonly Mock<SeriLog> _seriLogMock = new Mock<SeriLog>();
        private readonly Mock<IFtpUpload> _ftpUpload = new Mock<IFtpUpload>();
        private readonly Banner _banner = new Banner
        {
            Id = 1,
            DataCadastro = DateTime.Now,
            Descricao = "Campanha contra o cancer",
            NomeImagemDesktop = "",
            NomeImagemMobile = "",
            LinkExterno = '0',
            Rota = "/campanha/cancer",
            Titulo = "Faça seus exames",
            UsuarioId = 1,
            Area = "home",
            Ativo = '1'
        };

        private readonly List<Banner> _banners = new List<Banner>() {
            new Banner {
                DataCadastro = DateTime.Now,
                Descricao = "Campanha contra o cancer",
                NomeImagemDesktop = "",
                NomeImagemMobile = "",
                LinkExterno = '0',
                Rota = "/campanha/cancer",
                Titulo = "Faça seus exames",
                UsuarioId = 1,
                Area = "home",
                Ativo = '1',
                Ordem = 0,
            },
            new Banner {
                DataCadastro = DateTime.Now,
                Descricao = "Campanha contra o cancer",
                NomeImagemDesktop = "",
                NomeImagemMobile = "",
                LinkExterno = '0',
                Rota = "/campanha/cancer",
                Titulo = "Faça seus exames",
                UsuarioId = 1,
                Area = "home",
                Ativo = '1',
                Ordem = 1,
            }
        };


        private readonly BannerCreateModel _bannerCreateModel = new BannerCreateModel
        {
            Subtitulo = "",
            Descricao = "Campanha contra o cancer",
            NomeImagemDesktop = "",
            NomeImagemMobile = "",
            LinkExterno = '0',
            Rota = "/campanha/cancer",
            Titulo = "Faça seus exames",
            Area = "home",
            Ativo = '1'
        };

        private readonly BannerUpdateModel _bannerUpdateModel = new BannerUpdateModel
        {
            Id = 1,
            Descricao = "Campanha contra o cancer",
            NomeImagemDesktop = "",
            NomeImagemMobile = "",
            LinkExterno = '0',
            Rota = "/campanha/cancer",
            Titulo = "Faça seus exames",
            Area = "home",
            Ativo = '1'
        };

        public BannerControllerTest()
        {
            _seriLogMock.Setup(s => s.Log(EnumLogType.Error, "aaaa", "CarePlus"));

            AutoMapperProfile mapperProfile = new AutoMapperProfile();
            _connection = new SqliteConnection("DataSource=:memory:");
            _connection.Open();

            _dbOptions = new DbContextOptionsBuilder<DataContext>()
                    .UseSqlite(_connection)
                    .Options;

            using (DataContext context = new DataContext(_dbOptions))
                context.Database.EnsureCreated();

            _bannerService = new BannerService(new DataContext(_dbOptions));

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

            _stream = File.OpenRead("Src/Images/mock/cerebro.jpg");

            _bannerCreateModel.Arquivo = CreateFile();

            _bannerCreateModel.ArquivoMobile = CreateFile();

            _bannerUpdateModel.Arquivo = CreateFile();

            _bannerUpdateModel.ArquivoMobile = CreateFile();

            _ftpUpload.Setup(ftp => ftp.Upload(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>()));
        }

        private IFormFile CreateFile()
        {
            var formFile = new Mock<IFormFile>();
            var ms = new MemoryStream();
            var writer = new StreamWriter(ms);
            writer.Write(_stream);
            writer.Flush();
            ms.Position = 0;
            var fileName = "cerebro.jpg";
            var contentDisposition = "form-data; name=\"Arquivo\"; filename=\"cerebro.jpg\"";

            formFile.Setup(_ => _.FileName).Returns(fileName);
            formFile.Setup(_ => _.Length).Returns(ms.Length);
            formFile.Setup(_ => _.OpenReadStream()).Returns(ms);
            formFile.Setup(_ => _.ContentDisposition).Returns(contentDisposition);
            formFile.Setup(_ => _.ContentType).Returns("image/jpeg");
            formFile.Setup(_ => _.CopyToAsync(ms, CancellationToken.None)).Returns(System.Threading.Tasks.Task.CompletedTask);
            formFile.Verify();

            return formFile.Object;
        }

        [Fact]
        public void ConstrutorSucesso()
        {

            var result = new BannerController(_bannerService, _mapper, _appSettings, _seriLogMock.Object, _ftpUpload.Object);
            Assert.NotNull(result);
        }

        [Fact]
        public async void ListarSucesso()
        {
            await _bannerService.Criar(_banner);
            BannerController controller = new BannerController(_bannerService, _mapper, _appSettings, _seriLogMock.Object, _ftpUpload.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            int offset = 0;
            int limit = 50;
            var result = await controller.Get(offset, limit, null, null);
            Assert.IsType<OkObjectResult>(result);
        }


        [Fact]
        public async void ListarSucessoComImagem()
        {
            Banner bannerComImagem = _banner;
            bannerComImagem.CaminhoDesktop = "/Src/Img/Banner/cerebro.jpg";
            bannerComImagem.CaminhoMobile = "/Src/Img/Banner/cerebro.jpg";
            await _bannerService.Criar(bannerComImagem);
            BannerController controller = new BannerController(_bannerService, _mapper, _appSettings, _seriLogMock.Object, _ftpUpload.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            int offset = 0;
            int limit = 50;
            var result = await controller.Get(offset, limit, null, null);
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void BuscarSucesso()
        {
            await _bannerService.Criar(_banner);
            BannerController controller = new BannerController(_bannerService, _mapper, _appSettings, _seriLogMock.Object, _ftpUpload.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.GetById(1);
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void BuscarSucessoComImagem()
        {
            Banner bannerComImagem = _banner;
            bannerComImagem.CaminhoDesktop = "/Src/Img/Banner/cerebro.jpg";
            bannerComImagem.CaminhoMobile = "/Src/Img/Banner/cerebro.jpg";
            await _bannerService.Criar(bannerComImagem);
            BannerController controller = new BannerController(_bannerService, _mapper, _appSettings, _seriLogMock.Object, _ftpUpload.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.GetById(1);
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void BuscarErro()
        {
            await _bannerService.Criar(_banner);
            BannerController controller = new BannerController(_bannerService, _mapper, _appSettings, _seriLogMock.Object, _ftpUpload.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.GetById(999);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void BuscarErroZero()
        {
            await _bannerService.Criar(_banner);
            BannerController controller = new BannerController(_bannerService, _mapper, _appSettings, _seriLogMock.Object, _ftpUpload.Object); controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            await Assert.ThrowsAsync<AppException>(() => controller.GetById(0));
        }

        [Fact]
        public async void GetByAreaSucesso()
        {
            await _bannerService.Criar(_banner);
            BannerController controller = new BannerController(_bannerService, _mapper, _appSettings, _seriLogMock.Object, _ftpUpload.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.GetByArea("home");
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void GetByAreaSucessoComImagem()
        {
            Banner bannerComImagem = _banner;
            bannerComImagem.CaminhoDesktop = "/Src/Img/Banner/cerebro.jpg";
            bannerComImagem.CaminhoMobile = "/Src/Img/Banner/cerebro.jpg";
            await _bannerService.Criar(bannerComImagem);

            BannerController controller = new BannerController(_bannerService, _mapper, _appSettings, _seriLogMock.Object, _ftpUpload.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.GetByArea("home");
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void GetByAreaErro()
        {
            await _bannerService.Criar(_banner);
            BannerController controller = new BannerController(_bannerService, _mapper, _appSettings, _seriLogMock.Object, _ftpUpload.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.GetByArea(null);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void CriarSucesso()
        {
            var controller = new BannerController(_bannerService, _mapper, _appSettings, _seriLogMock.Object, _ftpUpload.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Post(_bannerCreateModel, "CarePlus");
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void CriarSucessoDiretorioNovo()
        {
            BannerController controller = new BannerController(_bannerService, _mapper, _appSettings, _seriLogMock.Object, _ftpUpload.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Post(_bannerCreateModel, "CarePlus");
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void CriarErro()
        {
            var connection = new SqliteConnection("");
            connection.Open();
            var dbOptions = new DbContextOptionsBuilder<DataContext>()
                    .UseSqlite(connection)
                    .Options;
            var bannerService = new BannerService(new DataContext(dbOptions));

            BannerController controller = new BannerController(bannerService, _mapper, _appSettings, _seriLogMock.Object, _ftpUpload.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Post(_bannerCreateModel, "CarePlus");
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void CriarErroNulo()
        {
            BannerController controller = new BannerController(_bannerService, _mapper, _appSettings, _seriLogMock.Object, _ftpUpload.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            await Assert.ThrowsAsync<AppException>(() => controller.Post(null, "CarePlus"));
        }

        [Fact]
        public async void AtualizarSucesso()
        {
            var c = new BannerController(_bannerService, _mapper, _appSettings, _seriLogMock.Object, _ftpUpload.Object);
            c.ControllerContext = new ControllerContext();
            c.ControllerContext.HttpContext = new DefaultHttpContext();
            c.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";

            await c.Post(_bannerCreateModel, "CarePlus");

            using (DataContext context = new DataContext(_dbOptions))
            {
                BannerService service = new BannerService(context);
                BannerController controller = new BannerController(service, _mapper, _appSettings, _seriLogMock.Object, _ftpUpload.Object);
                controller.ControllerContext = new ControllerContext();
                controller.ControllerContext.HttpContext = new DefaultHttpContext();
                controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
                BannerUpdateModel bannerToUpdate = _bannerUpdateModel;
                bannerToUpdate.Ativo = '0';
                IActionResult result = await controller.Put(bannerToUpdate);
                Assert.IsType<OkObjectResult>(result);
            }
        }

        [Fact]
        public async void AtualizarSucessoBannerInativo()
        {
            var c = new BannerController(_bannerService, _mapper, _appSettings, _seriLogMock.Object, _ftpUpload.Object);
            c.ControllerContext = new ControllerContext();
            c.ControllerContext.HttpContext = new DefaultHttpContext();
            c.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";

            BannerCreateModel bannerToCreate = _bannerCreateModel;
            bannerToCreate.Ativo = '0';
            await c.Post(_bannerCreateModel, "CarePlus");

            using (DataContext context = new DataContext(_dbOptions))
            {
                BannerService service = new BannerService(context);
                BannerController controller = new BannerController(service, _mapper, _appSettings, _seriLogMock.Object, _ftpUpload.Object);
                controller.ControllerContext = new ControllerContext();
                controller.ControllerContext.HttpContext = new DefaultHttpContext();
                controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
                BannerUpdateModel bannerToUpdate = _bannerUpdateModel;
                bannerToUpdate.Ativo = '1';
                IActionResult result = await controller.Put(bannerToUpdate);
                Assert.IsType<OkObjectResult>(result);
            }
        }

        [Fact]
        public async void AtualizarSucessoNovoDiretorio()
        {

            var c = new BannerController(_bannerService, _mapper, _appSettings, _seriLogMock.Object, _ftpUpload.Object);
            c.ControllerContext = new ControllerContext();
            c.ControllerContext.HttpContext = new DefaultHttpContext();
            c.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";

            await c.Post(_bannerCreateModel, "CarePlus");

            using (DataContext context = new DataContext(_dbOptions))
            {
                BannerService service = new BannerService(context);
                BannerController controller = new BannerController(service, _mapper, _appSettings, _seriLogMock.Object, _ftpUpload.Object);
                controller.ControllerContext = new ControllerContext();
                controller.ControllerContext.HttpContext = new DefaultHttpContext();
                controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
                IActionResult result = await controller.Put(_bannerUpdateModel);
                Assert.IsType<OkObjectResult>(result);
            }
        }

        [Fact]
        public async void AtualizarSucessoArquivoNulo()
        {
            var c = new BannerController(_bannerService, _mapper, _appSettings, _seriLogMock.Object, _ftpUpload.Object);
            c.ControllerContext = new ControllerContext();
            c.ControllerContext.HttpContext = new DefaultHttpContext();
            c.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            await c.Post(_bannerCreateModel, "CarePlus");

            using (DataContext context = new DataContext(_dbOptions))
            {
                BannerService service = new BannerService(context);
                BannerController controller = new BannerController(service, _mapper, _appSettings, _seriLogMock.Object, _ftpUpload.Object);
                controller.ControllerContext = new ControllerContext();
                controller.ControllerContext.HttpContext = new DefaultHttpContext();
                controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
                _bannerUpdateModel.Arquivo = null;
                _bannerUpdateModel.ArquivoMobile = null;
                IActionResult result = await controller.Put(_bannerUpdateModel);
                Assert.IsType<OkObjectResult>(result);
            }
        }

        [Fact]
        public async void AtualizarErro()
        {
            BannerController controller = new BannerController(_bannerService, _mapper, _appSettings, _seriLogMock.Object, _ftpUpload.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Put(_bannerUpdateModel);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void AtualizarErroNulo()
        {
            BannerController controller = new BannerController(_bannerService, _mapper, _appSettings, _seriLogMock.Object, _ftpUpload.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            await Assert.ThrowsAsync<AppException>(() => controller.Put(null));
        }


        [Fact]
        public async void AtualizarOrdem()
        {
            BannerController c = new BannerController(_bannerService, _mapper, _appSettings, _seriLogMock.Object, _ftpUpload.Object);
            c.ControllerContext = new ControllerContext();
            c.ControllerContext.HttpContext = new DefaultHttpContext();
            c.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";

            await c.Post(_bannerCreateModel, "CarePlus");
            await c.Post(_bannerCreateModel, "CarePlus");

            using (DataContext context = new DataContext(_dbOptions))
            {

                BannerService service = new BannerService(context);
                BannerController controller = new BannerController(service, _mapper, _appSettings, _seriLogMock.Object, _ftpUpload.Object);
                controller.ControllerContext = new ControllerContext();
                controller.ControllerContext.HttpContext = new DefaultHttpContext();
                controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";

                AreaUpdateOrder updateOrderModel = new AreaUpdateOrder()
                {
                    Area = new BannerUpdateOrder()
                    {
                        AreaName = "home",
                        Banners = new List<BannerOrder>()
                        {
                            new BannerOrder()
                            {
                                BannerId = 1,
                                Ordem = 1,
                                Ativo = '1'
                            },
                            new BannerOrder()
                            {
                                BannerId = 2,
                                Ordem = 0,
                                Ativo = '1'
                            }
                        }
                    },
                };

                IActionResult result = await controller.AtualizarOrdem(updateOrderModel, "CarePlus");
                Assert.IsType<OkObjectResult>(result);
            }
        }

        [Fact]
        public async void AtualizarOrdemErroNulo()
        {
            BannerController controller = new BannerController(_bannerService, _mapper, _appSettings, _seriLogMock.Object, _ftpUpload.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";

            IActionResult result = await controller.AtualizarOrdem(null, "CarePlus");
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void DuplicarSucesso()
        {
            BannerController controller = new BannerController(_bannerService, _mapper, _appSettings, _seriLogMock.Object, _ftpUpload.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";

            await controller.Post(_bannerCreateModel, "CarePlus");
            IActionResult result = await controller.Duplicate(1, "CarePlus");
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async void DuplicarErroZero()
        {
            BannerController controller = new BannerController(_bannerService, _mapper, _appSettings, _seriLogMock.Object, _ftpUpload.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";

            IActionResult result = await controller.Duplicate(0, "CarePlus");
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void DuplicarErroNotFound()
        {
            BannerController controller = new BannerController(_bannerService, _mapper, _appSettings, _seriLogMock.Object, _ftpUpload.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";

            IActionResult result = await controller.Duplicate(2, "CarePlus");
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void ExcluirSucesso()
        {
            var c = new BannerController(_bannerService, _mapper, _appSettings, _seriLogMock.Object, _ftpUpload.Object);
            c.ControllerContext = new ControllerContext();
            c.ControllerContext.HttpContext = new DefaultHttpContext();
            c.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            await c.Post(_bannerCreateModel, "CarePlus");

            BannerController controller = new BannerController(_bannerService, _mapper, _appSettings, _seriLogMock.Object, _ftpUpload.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Delete(1);
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async void ExcluirErro()
        {
            BannerController controller = new BannerController(_bannerService, _mapper, _appSettings, _seriLogMock.Object, _ftpUpload.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Delete(1);
            Assert.IsType<BadRequestObjectResult>(result);
        }


        [Fact]
        public async void ExcluirErroZero()
        {
            await _bannerService.Criar(_banner);
            BannerController controller = new BannerController(_bannerService, _mapper, _appSettings, _seriLogMock.Object, _ftpUpload.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            await Assert.ThrowsAsync<AppException>(() => controller.Delete(0));
        }

        public void Dispose()
        {
            _stream.Close();
            _connection.Close();
        }
    }
}
