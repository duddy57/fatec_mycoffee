import { api, type CadastroDto, type RespostaAutenticacaoDto } from "../../services/api";

export const createUser = (dados: CadastroDto): Promise<RespostaAutenticacaoDto> => api.cadastrarUsuario(dados);
