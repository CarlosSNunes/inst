using CarePlusAPI.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;

namespace CarePlusAPI.Helpers
{
    [ExcludeFromCodeCoverage]
    public class DataContext : DbContext
    {
        protected static string decryptedConnection;
        ///<summary>
        ///
        ///Esse método serve para iniciar a instancia do construtor ja recebendo suas configurações iniciais.
        ///
        ///</summary>
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        { }

        ///<summary>
        ///
        ///Esse método serve para configurar o contexto do banco de dados a ser utilizado na aplicação.
        ///Caso não esteja configurado, irá usar banco em memória para testes unitários
        ///
        ///</summary>
        ///<param name="optionsBuilder">Objeto de configuração do contexto do banco</param>
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                if (decryptedConnection == null)
                {
                    GetCipher cipher = new GetCipher();
                    decryptedConnection = cipher.Decrypt(Startup.ConnectionString);
                }

                optionsBuilder.UseOracle(decryptedConnection);
            }
        }

        ///<summary>
        ///
        ///Esse método serve para configurar a parte das models do banco de dados
        ///
        ///</summary>
        ///<param name="modelBuilder">Objeto de configuração de models do banco</param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("APP_INSTITUCIONAL");

            modelBuilder.Entity<Usuario>()
                .Property(u => u.UsuarioRoot)
                .HasDefaultValue('0');

            modelBuilder.Entity<UsuarioPerfil>()
                .HasOne(p => p.Usuario)
                .WithMany(x => x.UsuarioPerfil)
                .HasForeignKey(f => f.UsuarioId);

            modelBuilder.Entity<UsuarioPerfil>()
                .HasOne(p => p.Perfil)
                .WithMany(x => x.UsuarioPerfil)
                .HasForeignKey(f => f.PerfilId);

            modelBuilder.Entity<UsuarioPerfil>()
                .HasOne(p => p.Perfil)
                .WithMany(x => x.UsuarioPerfil)
                .HasForeignKey(f => f.PerfilId);

            modelBuilder.Entity<Post>()
                .HasOne(c => c.Categoria)
                .WithMany(p => p.Posts)
                .HasForeignKey(f => f.CategoriaId);

            modelBuilder.Entity<Post>()
                .Property(a => a.Descricao).HasColumnType("CLOB");

            modelBuilder.Entity<PostTag>()
                .HasOne(p => p.Post)
                .WithMany(x => x.PostTag)
                .HasForeignKey(f => f.PostId);

            modelBuilder.Entity<PostTag>()
                .HasOne(t => t.Tag)
                .WithMany(x => x.PostTag)
                .HasForeignKey(f => f.TagId);

            modelBuilder.Entity<EnderecoClinica>()
                .HasOne(h => h.Clinica)
                .WithMany(x => x.EnderecoClinica)
                .HasForeignKey(f => f.ClinicaId);

            modelBuilder.Entity<HorarioClinica>()
               .HasOne(h => h.Clinica)
               .WithMany(x => x.HorarioClinica)
               .HasForeignKey(f => f.ClinicaId);
        }

        public DbSet<Usuario> Usuario { get; set; }
        public DbSet<UsuarioPerfil> UsuarioPerfil { get; set; }
        public DbSet<Perfil> Perfil { get; set; }
        public DbSet<Banner> Banner { get; set; }
        public DbSet<Categoria> Categoria { get; set; }
        public DbSet<Tag> Tag { get; set; }
        public DbSet<Newsletter> Newsletter { get; set; }
        public DbSet<Post> Post { get; set; }
        public DbSet<PostTag> PostTag { get; set; }
        public DbSet<Clinica> Clinica { get; set; }
        public DbSet<EnderecoClinica> EnderecoClinica { get; set; }
        public DbSet<HorarioClinica> HorarioClinica { get; set; }
        public DbSet<RequisicaoUsuario> RequisicaoUsuario { get; set; }
        public DbSet<LogUsuarioDesativado> LogUsuarioDesativado { get; set; }

        public override int SaveChanges()
        {
            var changedEntities = ChangeTracker
                .Entries()
                .Where(_ => _.State == EntityState.Added ||
                            _.State == EntityState.Modified);

            foreach (var e in changedEntities)
            {
                PropertyInfo data = e.Entity.GetType().GetProperty("DataCadastro");
                PropertyInfo usuarioId = e.Entity.GetType().GetProperty("UsuarioId");

                if (e.State == EntityState.Added && data != null)
                {
                    data.SetValue(e.Entity, DateTime.Now, null);
                }

                if (e.State == EntityState.Modified && data != null)
                {
                    base.Entry(e.Entity).Property("DataCadastro").IsModified = false;
                }

                if (usuarioId != null && HttpUser.UsuarioId != null && (usuarioId.GetValue(e.Entity) == null || (int)usuarioId.GetValue(e.Entity) == 0))
                {
                    usuarioId.SetValue(e.Entity, HttpUser.UsuarioId, null);
                }
            }

            return base.SaveChanges();
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            var changedEntities = ChangeTracker
                .Entries()
                .Where(_ => _.State == EntityState.Added ||
                            _.State == EntityState.Modified);

            foreach (var e in changedEntities)
            {
                PropertyInfo data = e.Entity.GetType().GetProperty("DataCadastro");
                PropertyInfo usuarioId = e.Entity.GetType().GetProperty("UsuarioId");

                if (e.State == EntityState.Added && data != null)
                {
                    data.SetValue(e.Entity, DateTime.Now, null);
                }

                if (e.State == EntityState.Modified && data != null)
                {
                    base.Entry(e.Entity).Property("DataCadastro").IsModified = false;
                }

                if (usuarioId != null && HttpUser.UsuarioId != null && (usuarioId.GetValue(e.Entity) == null || (int)usuarioId.GetValue(e.Entity) == 0))
                {
                    usuarioId.SetValue(e.Entity, HttpUser.UsuarioId, null);
                }
            }
            return (await base.SaveChangesAsync(true, cancellationToken));
        }
    }
}