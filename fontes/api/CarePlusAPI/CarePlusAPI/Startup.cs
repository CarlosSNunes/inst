//===============================================================================
//Web API Usuario
//
//===============================================================================
//Copyright (C) 2020-2020 Neotix
//Todos direitos reservados.
//Web API da entidade Usuario para uso do NEOCMS
//==============================================================================

using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Neotix.Neocms.CarePlusAPI.Helpers;
using Neotix.Neocms.CarePlusAPI.Services;
using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using Microsoft.OpenApi.Models;
using Microsoft.Extensions.FileProviders;
using System.IO;

namespace Neotix.Neocms.CarePlusAPI
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
            byte[] key = Encoding.ASCII.GetBytes(appSettings.Secret);
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
                    }
                };
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
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

            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "CarePlusAPI");
            });
        }

        public IConfiguration GetConfiguration()
        {
            return Configuration;
        }
    }
}
