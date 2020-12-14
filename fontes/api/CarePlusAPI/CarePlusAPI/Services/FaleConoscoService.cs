using CarePlusAPI.Helpers;
using CarePlusAPI.Models.FaleConosco;
using CarePlusHomolog;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.IO;
using System.Threading.Tasks;
using static CarePlusHomolog.PartnerServiceClient;

namespace CarePlusAPI.Services
{
    public interface IFaleConoscoService
    {
        Task<string> Logar();
        Task<TipoAssuntoFaleConoscoModel> ListarTipoAssuntoFaleConosco();
        Task<BuscarAssuntoOuvidoriaModel> BuscarAssuntoOuvidoria();
        Task<BuscarClassificacaoOuvidoriaModel> BuscarClassificacaoOuvidoria();
        Task<WSRetornoFaleConosco> GravarFaleConosco(GravarFaleConoscoEntradaModel model);
        Task<WSRetornoCanalDenuncia> GravarCanalDenuncia(GravarCanalDenunciaEntradaModel model);
        Task<OuvidoriaOut> GravarOuvidoria(GravarOuvidoriaEntradaModel model);
    }

    [ExcludeFromCodeCoverage]
    public class FaleConoscoService : IFaleConoscoService
    {
        private readonly EndpointConfiguration _endpointConfiguration;
        private readonly PartnerServiceClient _partnerServiceClient;
        private readonly AppSettings _appSettings;

        public FaleConoscoService(IOptions<AppSettings> appSettings)
        {
            _endpointConfiguration = EndpointConfiguration.SOAPEndPointPartner;

            _partnerServiceClient = new PartnerServiceClient(_endpointConfiguration);

            _appSettings = appSettings.Value;
        }

        ///<summary>
        ///
        ///Esse método serve para consumir o método Logar do WS Partner e obter um token       
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        public async Task<string> Logar()
        {
            try
            {
                GetCipher cipher = new GetCipher();
                string decryptedToken = cipher.Decrypt(_appSettings.WSPartnerToken);
                string decryptedLogin = cipher.Decrypt(_appSettings.WSPartnerLogin);
                string decryptedPass = cipher.Decrypt(_appSettings.WSPartnerSenha);
                LoginPartnerOut loginPartnerOut = new LoginPartnerOut()
                {
                    Origem = WebServiceOrigem.Partner,
                    Token = decryptedToken,
                    Login = decryptedLogin,
                    Senha = decryptedPass,
                    TokenTransacao = ""
                };

                var result = await _partnerServiceClient.LogarAsync(loginPartnerOut);

                var token = result.LoginPartner.TokenTransacao;

                return token;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        ///<summary>
        ///
        ///Esse método serve para buscar o tipo de assunto fale conosco através do WS Partner       
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        public async Task<TipoAssuntoFaleConoscoModel> ListarTipoAssuntoFaleConosco()
        {
            var token = Logar().Result;

            try
            {
                WSFiltro wSFiltro = new WSFiltro()
                {
                    Origem = WebServiceOrigem.Partner,
                    Token = token.ToString(),
                    CodSeg = 0,
                    CodSub = 0,
                    Seq = 0
                };

                var result = await _partnerServiceClient.ListarTipoAssuntoFaleConoscoAsync(wSFiltro);

                var sObj = JsonConvert.SerializeObject(result);

                var dObj = JsonConvert.DeserializeObject<TipoAssuntoFaleConoscoModel>(sObj);

                return dObj;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        ///<summary>
        ///
        ///Esse método serve para buscar o assunto o ouvidoria através do WS Partner       
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        public async Task<BuscarAssuntoOuvidoriaModel> BuscarAssuntoOuvidoria()
        {
            var token = Logar().Result;

            try
            {
                WSFiltroToken wSFiltro = new WSFiltroToken()
                {
                    Origem = WebServiceOrigem.Partner,
                    Token = token.ToString(),
                    CodSeg = 0,
                    CodSeq = 0,
                    CodSub = 0,
                    Cultura = "pt-BR"
                };

                var result = await _partnerServiceClient.BuscarAssuntoOuvidoriaAsync(wSFiltro);

                var sObj = JsonConvert.SerializeObject(result);

                var dObj = JsonConvert.DeserializeObject<BuscarAssuntoOuvidoriaModel>(sObj);

                // Adicionando validação para erro com status "200" do WS cliente 
                if (dObj.Sucesso == false)
                {
                    throw new Exception(dObj.Erros);
                }

                return dObj;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        ///<summary>
        ///
        ///Esse método serve para buscar a classificacao ouvidoria através do WS Partner       
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        public async Task<BuscarClassificacaoOuvidoriaModel> BuscarClassificacaoOuvidoria()
        {
            var token = Logar().Result;

            try
            {
                WSFiltroToken wSFiltro = new WSFiltroToken()
                {
                    Origem = WebServiceOrigem.Partner,
                    Token = token.ToString(),
                    CodSeg = 0,
                    CodSeq = 0,
                    CodSub = 0,
                    Cultura = "pt-BR"
                };

                var result = await _partnerServiceClient.BuscarClassificacaoOuvidoriaAsync(wSFiltro);

                var sObj = JsonConvert.SerializeObject(result);

                var dObj = JsonConvert.DeserializeObject<BuscarClassificacaoOuvidoriaModel>(sObj);

                // Adicionando validação para erro com status "200" do WS cliente 
                if (dObj.Sucesso == false)
                {
                    throw new Exception(dObj.Erros);
                }

                return dObj;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        ///<summary>
        ///
        ///Esse método serve para enviar dados de fale conosco através do WS Partner       
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão POST.
        ///
        ///</summary>
        public async Task<WSRetornoFaleConosco> GravarFaleConosco(GravarFaleConoscoEntradaModel model)
        {
            try
            {
                var token = Logar().Result;

                List<AnexoByte> lstAnexoBytes = new List<AnexoByte>();

                if (model.LstAnexo != null)
                {

                    var files = model.LstAnexo.Arquivo;

                    foreach (var file in files)
                    {
                        var bytes = await GetBytes(file);

                        AnexoByte anexoByte = new AnexoByte()
                        {
                            FileBytes = bytes,
                            FileName = file.FileName
                        };

                        lstAnexoBytes.Add(anexoByte);
                    }
                }

                AnexoByte[] anexoBytes = lstAnexoBytes.ToArray();
                GetCipher cipher = new GetCipher();
                WSFiltroFaleConosco wSFiltro = new WSFiltroFaleConosco()
                {
                    Origem = WebServiceOrigem.Partner,
                    Token = token.ToString(),
                    Assunto = model.Assunto,
                    CPFCNPJ = model.CPFCNPJ,
                    Certificado = cipher.Decrypt(_appSettings.WSPartnerCertificado),
                    CodigoCarePlus = model.CodigoCarePlus,
                    Comentario = model.Comentario,
                    DDDTelefone1 = model.DDDTelefone1,
                    Telefone1 = model.Telefone1,
                    DDDTelefone2 = model.DDDTelefone2,
                    Telefone2 = model.Telefone2,
                    Email = model.Email,
                    IdTipo = model.IdTipo,
                    NomeContato = model.NomeContato,
                    TokenAutenticacao = string.Empty,
                    NomeEntidade = model.NomeEntidade,
                    lstAnexo = anexoBytes
                };

                var result = await _partnerServiceClient.GravarFaleConoscoAsync(wSFiltro);

                // Adicionando validação para erro com status "200" do WS cliente 
                if (result.sucesso == false)
                {
                    throw new Exception(result.erros);
                }

                return result;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        ///<summary>
        ///
        ///Esse método serve para enviar dados do canal denuncia através do WS Partner       
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão POST.
        ///
        ///</summary>
        public async Task<WSRetornoCanalDenuncia> GravarCanalDenuncia(GravarCanalDenunciaEntradaModel model)
        {
            try
            {
                var token = Logar().Result;

                List<AnexoByte> lstAnexoBytes = new List<AnexoByte>();

                if (model.LstAnexo != null)
                {

                    var files = model.LstAnexo.Arquivo;

                    foreach (var file in files)
                    {
                        var bytes = await GetBytes(file);

                        AnexoByte anexoByte = new AnexoByte()
                        {
                            FileBytes = bytes,
                            FileName = file.FileName
                        };

                        lstAnexoBytes.Add(anexoByte);
                    }

                }

                AnexoByte[] anexoBytes = lstAnexoBytes.ToArray();
                GetCipher cipher = new GetCipher();
                WSFiltroCanalDenuncia wSFiltro = new WSFiltroCanalDenuncia()
                {
                    Origem = WebServiceOrigem.Partner,
                    Token = token.ToString(),
                    CPFCNPJ = model.CPFCNPJ,
                    Certificado = cipher.Decrypt(_appSettings.WSPartnerCertificado),
                    Mensagem = model.Mensagem,
                    DDDTelefone = model.DDDTelefone,
                    Telefone = model.Telefone,
                    DDDTelefoneCel = model.DDDTelefoneCel,
                    TelefoneCel = model.TelefoneCel,
                    Email = model.Email,
                    NomeContato = model.NomeContato,
                    TokenAutenticacao = string.Empty,
                    lstAnexo = anexoBytes
                };

                var result = await _partnerServiceClient.GravarCanalDenunciaAsync(wSFiltro);

                // Adicionando validação para erro com status "200" do WS cliente 
                if (result.sucesso == false)
                {
                    throw new Exception(result.erros);
                }

                return result;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        ///<summary>
        ///
        ///Esse método serve para enviar dados de ouvidoria através do WS Partner       
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão POST.
        ///
        ///</summary>
        public async Task<OuvidoriaOut> GravarOuvidoria(GravarOuvidoriaEntradaModel model)
        {
            try
            {
                var token = Logar().Result;

                List<AnexoByte> lstAnexoBytes = new List<AnexoByte>();

                if (model.Anexo != null)
                {
                    var files = model.Anexo.Arquivo;

                    foreach (var file in files)
                    {
                        var bytes = await GetBytes(file);

                        AnexoByte anexoByte = new AnexoByte()
                        {
                            FileBytes = bytes,
                            FileName = file.FileName
                        };

                        lstAnexoBytes.Add(anexoByte);
                    }
                }

                AnexoByte[] anexoBytes = lstAnexoBytes.ToArray();

                WSOuvidoria wSFiltro = new WSOuvidoria()
                {
                    Origem = WebServiceOrigem.Partner,
                    Token = token.ToString(),
                    Certificado = model.CPF.ToString(),
                    DDDTelefoneCelular = model.DDDTelefoneCelular,
                    TelefoneCelular = model.TelefoneCelular,
                    DDDTelefoneResidencial = model.DDDTelefoneResidencial,
                    TelefoneResidencial = model.TelefoneResidencial,
                    Email = model.Email,
                    IdAssunto = model.IdAssunto,
                    IdClassificacao = model.IdClassificacao,
                    Mensagem = model.Mensagem,
                    Nome = model.Nome,
                    //TODO Aguardar resposta do cliente referente ao campo CPF
                    //CPF = model.CPF,
                    ProtocoloAtendimento = model.ProtocoloAtendimento,
                    Anexo = anexoBytes
                };

                var result = await _partnerServiceClient.GravarOuvidoriaAsync(wSFiltro);

                // Adicionando validação para erro com status "200" do WS cliente 
                if (result.Sucesso == false)
                {
                    throw new Exception(result.Erros);
                }

                return result;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        /// <summary>
        /// Método auxiliar
        /// </summary>
        /// <param name="formFile"></param>
        /// <returns></returns>
        private static async Task<byte[]> GetBytes(IFormFile formFile)
        {
            using (var memoryStream = new MemoryStream())
            {
                await formFile.CopyToAsync(memoryStream);
                return memoryStream.ToArray();
            }
        }
    }
}
