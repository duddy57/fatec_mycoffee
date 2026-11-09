import { FormEvent, useEffect, useState } from "react";
import api, { Cafe, Tag } from "../../../services/api";
import { ActionButton, AdminForm, AdminMessage, CatalogGrid, FormActions, FormInput, FormLabel, FormPanel, FormTextarea, SuccessMessage, Table, TableWrap, TagOption, TagPicker, Status } from "../styles";
import { AdminAccess, AdminFrame } from "../shared";

type Feedback = { loading: boolean; error: string; success: string };

const emptyFeedback: Feedback = { loading: false, error: "", success: "" };

export function AdminCatalog() {
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "empty" | "error">("loading");
  const [busy, setBusy] = useState<number | null>(null);
  const [tagName, setTagName] = useState("");
  const [tagFeedback, setTagFeedback] = useState<Feedback>(emptyFeedback);
  const [coffeeFeedback, setCoffeeFeedback] = useState<Feedback>(emptyFeedback);
  const [coffeeForm, setCoffeeForm] = useState({ name: "", description: "", price: "", image: null as File | null, tagIds: [] as number[] });
  const [imageInputKey, setImageInputKey] = useState(0);

  function loadCafes() {
    setState("loading");
    api.listarCafesGestao().then((items) => {
      setCafes(items);
      setState(items.length ? "ready" : "empty");
    }).catch(() => setState("error"));
  }

  function loadTags() {
    api.listarTags().then(setTags).catch(() => setTags([]));
  }

  useEffect(() => {
    loadCafes();
    loadTags();
  }, []);

  function updateCoffee(field: "name" | "description" | "price", value: string) {
    setCoffeeForm((current) => ({ ...current, [field]: value }));
  }

  function toggleTag(id: number) {
    setCoffeeForm((current) => ({ ...current, tagIds: current.tagIds.includes(id) ? current.tagIds.filter((tagId) => tagId !== id) : [...current.tagIds, id] }));
  }

  async function createTag(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = tagName.trim();
    if (!name) {
      setTagFeedback({ loading: false, error: "Informe o nome da tag.", success: "" });
      return;
    }
    setTagFeedback({ loading: true, error: "", success: "" });
    try {
      await api.criarTag({ nome: name });
      setTagName("");
      setTagFeedback({ loading: false, error: "", success: "Tag criada com sucesso." });
      loadTags();
    } catch (cause) {
      setTagFeedback({ loading: false, error: cause instanceof Error ? cause.message : "Não foi possível criar a tag.", success: "" });
    }
  }

  async function createCoffee(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const price = Number(coffeeForm.price.replace(",", "."));
    if (!coffeeForm.name.trim() || !coffeeForm.description.trim() || !price || price < 0) {
      setCoffeeFeedback({ loading: false, error: "Preencha nome, descrição e preço.", success: "" });
      return;
    }
    if (!coffeeForm.image) {
      setCoffeeFeedback({ loading: false, error: "Envie uma imagem para o café.", success: "" });
      return;
    }
    setCoffeeFeedback({ loading: true, error: "", success: "" });
    try {
      await api.criarCafe({ nome: coffeeForm.name.trim(), descricao: coffeeForm.description.trim(), preco: price, imagem: coffeeForm.image, tagIds: coffeeForm.tagIds, ativo: true });
      setCoffeeForm({ name: "", description: "", price: "", image: null, tagIds: [] });
      setImageInputKey((key) => key + 1);
      setCoffeeFeedback({ loading: false, error: "", success: "Café criado com sucesso." });
      loadCafes();
    } catch (cause) {
      setCoffeeFeedback({ loading: false, error: cause instanceof Error ? cause.message : "Não foi possível criar o café.", success: "" });
    }
  }

  async function deactivate(id: number) {
    setBusy(id);
    try {
      await api.desativarCafe(id);
      loadCafes();
    } finally {
      setBusy(null);
    }
  }

  return <AdminAccess><AdminFrame title="Catálogo" description="Crie produtos, organize tags e mantenha os cafés disponíveis."><CatalogGrid><div><FormPanel><h2>Nova tag</h2><p>Use tags curtas para ajudar seus clientes a escolher.</p><AdminForm onSubmit={createTag}><FormLabel>Nome da tag<FormInput value={tagName} onChange={(event) => setTagName(event.target.value)} placeholder="Ex.: Tradicional" maxLength={40} /></FormLabel>{tagFeedback.error && <AdminMessage error role="alert">{tagFeedback.error}</AdminMessage>}{tagFeedback.success && <SuccessMessage role="status">{tagFeedback.success}</SuccessMessage>}<FormActions><ActionButton type="submit" disabled={tagFeedback.loading}>{tagFeedback.loading ? "Criando..." : "Criar tag"}</ActionButton></FormActions></AdminForm></FormPanel><FormPanel><h2>Novo café</h2><p>Adicione os dados e escolha uma imagem do produto.</p><AdminForm onSubmit={createCoffee}><FormLabel>Nome<FormInput value={coffeeForm.name} onChange={(event) => updateCoffee("name", event.target.value)} placeholder="Ex.: Cappuccino" maxLength={120} /></FormLabel><FormLabel>Descrição<FormTextarea value={coffeeForm.description} onChange={(event) => updateCoffee("description", event.target.value)} placeholder="Descreva o sabor e o preparo." maxLength={500} /></FormLabel><FormLabel>Preço<FormInput type="number" min="0" step="0.01" value={coffeeForm.price} onChange={(event) => updateCoffee("price", event.target.value)} placeholder="0,00" /></FormLabel><FormLabel>Imagem<FormInput key={imageInputKey} type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => setCoffeeForm((current) => ({ ...current, image: event.target.files?.[0] || null }))} /></FormLabel><FormLabel>Tags<TagPicker>{tags.length ? tags.map((tag) => <TagOption key={tag.id}><input type="checkbox" checked={coffeeForm.tagIds.includes(tag.id)} onChange={() => toggleTag(tag.id)} />{tag.nome}</TagOption>) : <span>Nenhuma tag cadastrada.</span>}</TagPicker></FormLabel>{coffeeFeedback.error && <AdminMessage error role="alert">{coffeeFeedback.error}</AdminMessage>}{coffeeFeedback.success && <SuccessMessage role="status">{coffeeFeedback.success}</SuccessMessage>}<FormActions><ActionButton type="submit" disabled={coffeeFeedback.loading}>{coffeeFeedback.loading ? "Salvando..." : "Criar café"}</ActionButton></FormActions></AdminForm></FormPanel></div><FormPanel><h2>Cafés cadastrados</h2><p>A lista atualiza após cada criação ou desativação.</p>{state === "loading" && <AdminMessage>Carregando cafés...</AdminMessage>}{state === "error" && <AdminMessage error role="alert">Não foi possível carregar o catálogo.</AdminMessage>}{state === "empty" && <AdminMessage>Nenhum café cadastrado.</AdminMessage>}{state === "ready" && <TableWrap><Table><thead><tr><th>Café</th><th>Preço</th><th>Status</th><th>Ação</th></tr></thead><tbody>{cafes.map((cafe) => <tr key={cafe.id}><td><strong>{cafe.nome}</strong></td><td>R$ {cafe.preco.toFixed(2).replace(".", ",")}</td><td><Status>{cafe.ativo ? "Ativo" : "Inativo"}</Status></td><td>{cafe.ativo && <ActionButton onClick={() => deactivate(cafe.id)} disabled={busy === cafe.id}>{busy === cafe.id ? "Salvando..." : "Desativar"}</ActionButton>}</td></tr>)}</tbody></Table></TableWrap>}</FormPanel></CatalogGrid></AdminFrame></AdminAccess>;
}
