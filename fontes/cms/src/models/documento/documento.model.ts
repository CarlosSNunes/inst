import { DocumentoTipoModel } from '../documento-tipo/documento-tipo.model';
import { CareplusPerfilModel } from '../careplus-perfil/careplus-perfil.model';

export class DocumentoModel {
    public constructor(init?: Partial<DocumentoModel>) {
        Object.assign(this, init);
    }

    id: number;
    descricao: string;
    dataCadastro: Date;
    usuarioId: number;
    caminhoDocumento: string;
    nomeDocumento: string;
    documentoTipo: DocumentoTipoModel;
    careplusPerfil: CareplusPerfilModel;
}
