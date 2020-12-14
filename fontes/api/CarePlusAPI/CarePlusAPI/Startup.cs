using AutoMapper;
using CarePlusAPI.Entities;
using CarePlusAPI.Helpers;
using CarePlusAPI.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarePlusAPI
{
    [ExcludeFromCodeCoverage]
    public class Startup
    {
        private readonly IWebHostEnvironment Env;
        public readonly IConfiguration Configuration;
        public static string ConnectionString { get; private set; }

        ///<summary>
        ///
        ///Esse método construtor é utilizado para pegar os objetos de injeção de dependencia
        ///e atribuir aos objetos da classe.
        ///
        ///</summary>
        ///<param name="env">Ambiente em que a API está sendo executada, ex(Develop, Release, Production)</param>
        ///<param name="configuration">Configurações da API</param>
        public Startup(IWebHostEnvironment env, IConfiguration configuration)
        {
            Env = env;
            Configuration = configuration;
            ConnectionString = Configuration.GetConnectionString("OracleExpressDatabase");
        }

        ///<summary>
        ///
        ///Esse método serve para configurar tudo que a API precisará inicialmente
        ///para seu total funcionamento.
        ///
        ///</summary>
        ///<param name="services">Coleção de serviços que serão utilizados na API, junto com suas configurações</param>
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>();

            services.AddCors();
            services.AddControllers();
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            IConfigurationSection appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);

            AppSettings appSettings = appSettingsSection.Get<AppSettings>();
            GetCipher cipher = new GetCipher();
            string secret = cipher.Decrypt(appSettings.Secret);
            byte[] key = Encoding.ASCII.GetBytes(secret);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.Events = new JwtBearerEvents
                {
                    OnTokenValidated = context =>
                    {
                        IUsuarioService userService = context.HttpContext.RequestServices.GetRequiredService<IUsuarioService>();
                        int userId = int.Parse(context.Principal.Identity.Name);
                        HttpUser.UsuarioId = userId;

                        if (!userService.Validar(userId))
                            context.Fail("Unauthorized");

                        return Task.CompletedTask;
                    },
                };
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
            };
            });

            services.AddScoped<IUsuarioService, UsuarioService>();
            services.AddScoped<IPerfilService, PerfilService>();
            services.AddScoped<IBannerService, BannerService>();
            services.AddScoped<ICategoriasService, CategoriasService>();
            services.AddScoped<ITagService, TagService>();
            services.AddScoped<INewsletterService, NewsletterService>();
            services.AddScoped<IPostService, PostService>();
            services.AddScoped<IFaleConoscoService, FaleConoscoService>();
            services.AddScoped<IDashboardService, DashboardService>();

            // Ativa o uso do token como forma de autorizar o acesso
            // a recursos deste projeto
            services.AddAuthorization(auth =>
            {
                auth.AddPolicy("Bearer", new AuthorizationPolicyBuilder()
                    .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
                    .RequireAuthenticatedUser().Build());

                auth.AddPolicy("Posts",
                      policy => policy.RequireClaim("Administrador"));
        });


            services.AddSwaggerGen(c =>
            {

                c.SwaggerDoc("v1",
                    new OpenApiInfo
                    {
                        Title = "CarePlusAPI",
                        Version = "v1",
                        Description = "API para gerenciamento do site Care Plus",
                        Contact = new OpenApiContact
                        {
                            Name = "Neotix",
                            Url = new Uri("https://github.com/neotix")
                        }
                    });
            });

            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);

                        services.AddMvc();
        }

        ///<summary>
        ///
        ///Esse método serve para configurar a parte de REST da APi.
        ///
        ///</summary>
        ///<param name="app">Objeto de aplicação para configurar a parte de REST</param>
        public virtual void Configure(IApplicationBuilder app)
        {
            app.UseRouting();

            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());

            app.UseStaticFiles();
            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"Src")),
                RequestPath = new PathString("/Src")
            });


            app.UseAuthentication();
            app.UseAuthorization();

            app.UseExceptionHandler(a => a.Run(async context =>
            {
                IExceptionHandlerPathFeature exceptionHandlerPathFeature = context.Features.Get<IExceptionHandlerPathFeature>();
                Exception exception = exceptionHandlerPathFeature.Error;
                string result = ErrorHandler.TreatError(exception);

                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync(result);
            }));

            app.UseEndpoints(endpoints => endpoints.MapControllers());

            var context = app.ApplicationServices.GetService<DataContext>();

            createUser(context);

            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "CarePlusAPI");
            });
        }

        ///<summary>
        ///
        ///Esse método serve para criar o perfil de Administrador e o usuário admin assim que a api é iniciada.
        ///
        ///</summary>
        ///<param name="context">Contexto do banco de dados</param>
        private void createUser(DataContext context)
        {
            try
            {
                Perfil perfil = new Perfil
                {
                    Descricao = "Administrador",
                    Prioridade = 1
                };

                Perfil foundProfile = context.Set<Perfil>().AsNoTracking().Where(p => p.Descricao == "Administrador").FirstOrDefault();

                if (foundProfile == null)
                {

                    context.Set<Perfil>().Add(perfil);

                    context.SaveChanges();
                    Console.Write("PerfilCriado");
                }
                else
                {
                    perfil = foundProfile;
                }

                string senha = "C@rePlusAdm!";

                UsuarioService.CriarSenha(senha, out byte[] senhaHash, out byte[] senhaSalt);

                ICollection<UsuarioPerfil> usuarioPerfis = new List<UsuarioPerfil>();

                usuarioPerfis.Add(new UsuarioPerfil
                {
                    PerfilId = perfil.Id,

                });

                Usuario usuario = new Usuario
                {
                    Nome = "Administrador",
                    Email = "admin@admin.com",
                    SenhaHash = senhaHash,
                    SenhaSalt = senhaSalt,
                    Ativo = '1',
                    UsuarioPerfil = usuarioPerfis
                };

                Usuario foundUser = context.Set<Usuario>().AsNoTracking().Where(u => u.Email == usuario.Email).FirstOrDefault();

                if (foundUser == null)
                {
                    context.Set<Usuario>().Add(usuario);
                    context.SaveChanges();

                    Console.Write("Usuario Criado");
                }

            }
            catch (Exception ex)
            {
                Console.Write("ERRO AO CRIAR USUÁRIO INICIAL", ex.StackTrace);
            }
        }

        public IConfiguration GetConfiguration()
        {
            return Configuration;
        }
    }
}
