const URL_PADRAO = 'https://mycoffeapi-atb2aybxbdhdercb.brazilsouth-01.azurewebsites.net';

export enum Papel {
  CLIENTE = 'CLIENTE',
  FUNCIONARIO = 'FUNCIONARIO',
  ADMIN = 'ADMIN',
}
export type StatusPedido = 'CONFIRMADO' | 'EM_PREPARO' | 'SAIU_PARA_ENTREGA' | 'ENTREGUE' | 'CANCELADO';

export interface HealthDto { [key: string]: unknown }
export interface UsuarioRespostaDto { papel: Papel; id: number; nome: string; email: string; telefone: string | null; ativo: boolean; ultimoLoginEm: string | null; criadoEm: string; atualizadoEm: string }
export interface CadastroDto { nome: string; email: string; senha: string; telefone?: string }
export interface LoginDto { email: string; senha: string }
export interface RespostaAutenticacaoDto { accessToken: string; usuario: UsuarioRespostaDto }
export interface AtualizarUsuarioDto { papel?: Papel; ativo?: boolean }
export interface Tag { id: number; nome: string }
export interface Cafe { id: number; nome: string; descricao: string; preco: number; imagemUrl: string; ativo: boolean; criadoEm: string; atualizadoEm: string; tags: Tag[] }
export interface CriarTagDto { nome: string }
export interface FormaPagamento { id: number; codigo: string; descricao: string; ativo: boolean }
export interface ItemPedidoDto { cafeId: number; quantidade: number }
export type Uf = 'AC' | 'AL' | 'AP' | 'AM' | 'BA' | 'CE' | 'DF' | 'ES' | 'GO' | 'MA' | 'MT' | 'MS' | 'MG' | 'PA' | 'PB' | 'PR' | 'PE' | 'PI' | 'RJ' | 'RN' | 'RS' | 'RO' | 'RR' | 'SC' | 'SP' | 'SE' | 'TO';
export interface EnderecoDto { cep: string; logradouro: string; numero: string; complemento?: string; bairro: string; cidade: string; uf: Uf }
export interface CriarPedidoDto { formaPagamentoId: number; itens: ItemPedidoDto[]; endereco: EnderecoDto }
export interface FormaPagamentoResumoDto { id: number; codigo: string; descricao: string }
export interface ItemPedidoRespostaDto { cafeId: number; nome: string; imagemUrl: string; quantidade: number; precoUnitario: number; subtotal: number }
export interface EnderecoRespostaDto { cep: string; logradouro: string; numero: string; complemento: string | null; bairro: string; cidade: string; uf: string }
export interface ClienteResumoDto { id: number; nome: string; email: string; telefone: string | null }
export interface PedidoRespostaDto { codigo: string; status: StatusPedido; criadoEm: string; subtotal: number; taxaEntrega: number; total: number; previsaoMin: number; previsaoMax: number; formaPagamento: FormaPagamentoResumoDto; itens: ItemPedidoRespostaDto[]; endereco: EnderecoRespostaDto | null; cliente?: ClienteResumoDto }
export interface AlteradoPorDto { papel: Papel; id: number; nome: string }
export interface EventoHistoricoDto { status: StatusPedido; statusAnterior: StatusPedido | null; dataHora: string; alteradoPor: AlteradoPorDto | null }
export interface AtualizarStatusDto { status: StatusPedido }
export interface FiltrosCatalogo { tag?: string; busca?: string }
export interface FiltrosPedidos { status?: StatusPedido; pagina?: number; limite?: number }
export interface DadosCafe { nome?: string; descricao?: string; preco?: number; imagem?: File | Blob | string; tagIds?: number[]; ativo?: boolean }

export class ErroApi extends Error {
  constructor(public readonly status: number, public readonly dados: unknown, mensagem: string) { super(mensagem); this.name = 'ErroApi'; }
}

type OpcoesRequisicao = { token?: string; query?: Record<string, string | number | boolean | undefined>; corpo?: unknown; formData?: FormData };

export class ApiClient {
  private token?: string;
  constructor(private readonly baseUrl: string = ((import.meta as ImportMeta & { env?: { VITE_API_URL?: string } }).env?.VITE_API_URL || URL_PADRAO).replace(/\/$/, '')) {}

  configurarToken(token?: string): void { this.token = token; }
  obterBaseUrl(): string { return this.baseUrl; }
  obterUrlImagem(caminho: string): string { return new URL(caminho, `${this.baseUrl}/`).toString(); }

  private async requisitar<T>(metodo: string, caminho: string, opcoes: OpcoesRequisicao = {}): Promise<T> {
    const url = new URL(`${this.baseUrl}${caminho}`);
    Object.entries(opcoes.query || {}).forEach(([chave, valor]) => { if (valor !== undefined) url.searchParams.set(chave, String(valor)); });
    const headers: Record<string, string> = { Accept: 'application/json' };
    const token = opcoes.token ?? this.token;
    if (token) headers.Authorization = `Bearer ${token}`;
    let body: BodyInit | undefined;
    if (opcoes.formData) body = opcoes.formData;
    else if (opcoes.corpo !== undefined) { headers['Content-Type'] = 'application/json'; body = JSON.stringify(opcoes.corpo); }
    const resposta = await fetch(url, { method: metodo, headers, body });
    const texto = await resposta.text();
    let dados: unknown = undefined;
    if (texto) { try { dados = JSON.parse(texto); } catch { dados = texto; } }
    if (!resposta.ok) throw new ErroApi(resposta.status, dados, typeof dados === 'object' && dados !== null && 'message' in dados ? String((dados as { message: unknown }).message) : `Erro HTTP ${resposta.status}`);
    return dados as T;
  }

  verificarSaude(token?: string) { return this.requisitar<HealthDto>('GET', '/health', { token }); }
  cadastrarUsuario(dados: CadastroDto) { return this.requisitar<RespostaAutenticacaoDto>('POST', '/auth/cadastro', { corpo: dados }); }
  login(dados: LoginDto) { return this.requisitar<RespostaAutenticacaoDto>('POST', '/auth/login', { corpo: dados }); }
  obterUsuarioAtual(token?: string) { return this.requisitar<UsuarioRespostaDto>('GET', '/auth/me', { token }); }
  listarUsuarios(papel?: Papel, token?: string) { return this.requisitar<UsuarioRespostaDto[]>('GET', '/usuarios', { token, query: { papel } }); }
  buscarUsuario(id: number, token?: string) { return this.requisitar<UsuarioRespostaDto>('GET', `/usuarios/${id}`, { token }); }
  atualizarUsuario(id: number, dados: AtualizarUsuarioDto, token?: string) { return this.requisitar<UsuarioRespostaDto>('PATCH', `/usuarios/${id}`, { token, corpo: dados }); }
  listarCafes(filtros: FiltrosCatalogo = {}) { return this.requisitar<Cafe[]>('GET', '/cafes', { query: { ...filtros } }); }
  criarCafe(dados: DadosCafe, token?: string) { return this.requisitar<Cafe>('POST', '/cafes', { token, formData: this.formularioCafe(dados) }); }
  listarRecomendacoes(limite = 3) { return this.requisitar<Cafe[]>('GET', '/cafes/recomendacoes', { query: { limite } }); }
  listarCafesGestao(filtros: FiltrosCatalogo = {}, token?: string) { return this.requisitar<Cafe[]>('GET', '/cafes/gestao', { token, query: { ...filtros } }); }
  buscarCafe(id: number) { return this.requisitar<Cafe>('GET', `/cafes/${id}`); }
  atualizarCafe(id: number, dados: DadosCafe, token?: string) { return this.requisitar<Cafe>('PATCH', `/cafes/${id}`, { token, formData: this.formularioCafe(dados) }); }
  desativarCafe(id: number, token?: string) { return this.requisitar<void>('DELETE', `/cafes/${id}`, { token }); }
  listarTags() { return this.requisitar<Tag[]>('GET', '/tags'); }
  criarTag(dados: CriarTagDto, token?: string) { return this.requisitar<Tag>('POST', '/tags', { token, corpo: dados }); }
  listarFormasPagamento() { return this.requisitar<FormaPagamento[]>('GET', '/formas-pagamento'); }
  criarPedido(dados: CriarPedidoDto, token?: string) { return this.requisitar<PedidoRespostaDto>('POST', '/pedidos', { token, corpo: dados }); }
  listarPedidos(filtros: FiltrosPedidos = {}, token?: string) { return this.requisitar<PedidoRespostaDto[]>('GET', '/pedidos', { token, query: { pagina: 1, limite: 20, ...filtros } }); }
  listarMeusPedidos(filtros: FiltrosPedidos = {}, token?: string) { return this.requisitar<PedidoRespostaDto[]>('GET', '/pedidos/meus', { token, query: { pagina: 1, limite: 20, ...filtros } }); }
  detalharPedido(codigo: string, token?: string) { return this.requisitar<PedidoRespostaDto>('GET', `/pedidos/${encodeURIComponent(codigo)}`, { token }); }
  listarHistoricoPedido(codigo: string, token?: string) { return this.requisitar<EventoHistoricoDto[]>('GET', `/pedidos/${encodeURIComponent(codigo)}/historico`, { token }); }
  atualizarStatusPedido(codigo: string, dados: AtualizarStatusDto, token?: string) { return this.requisitar<PedidoRespostaDto>('PATCH', `/pedidos/${encodeURIComponent(codigo)}/status`, { token, corpo: dados }); }
  cancelarPedido(codigo: string, token?: string) { return this.requisitar<PedidoRespostaDto>('POST', `/pedidos/${encodeURIComponent(codigo)}/cancelar`, { token }); }

  private formularioCafe(dados: DadosCafe): FormData {
    const form = new FormData();
    if (dados.nome !== undefined) form.append('nome', dados.nome);
    if (dados.descricao !== undefined) form.append('descricao', dados.descricao);
    if (dados.preco !== undefined) form.append('preco', String(dados.preco));
    if (dados.imagem !== undefined) form.append('imagem', dados.imagem);
    dados.tagIds?.forEach(id => form.append('tagIds', String(id)));
    if (dados.ativo !== undefined) form.append('ativo', String(dados.ativo));
    return form;
  }
}

export const api = new ApiClient();
export const configurarToken = (token?: string) => api.configurarToken(token);
export default api;
