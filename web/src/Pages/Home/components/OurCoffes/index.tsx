import { TitleText } from "../../../../Components/Header/Typography";
import { CoffeeCards } from "../CoffeeCard";
import { api, type Cafe } from "../../../../services/api";
import { CoffeeList, OurCoffeeCOntainer, CatalogMessage } from "./styles";
import { useEffect, useMemo, useState } from "react";

export function OurCoffee() {
    const [coffees, setCoffees] = useState<Cafe[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedTag, setSelectedTag] = useState("");
    const [tags, setTags] = useState<{ id: number; nome: string }[]>([]);
    useEffect(() => {
      let active = true;
      api.listarCafes({ busca: search || undefined, tag: selectedTag || undefined }).then((catalog) => { if (active) setCoffees(catalog); })
        .catch(() => { if (active) setError(true); })
        .finally(() => { if (active) setLoading(false); });
      return () => { active = false; };
    }, [search, selectedTag]);
    useEffect(() => {
      api.listarTags().then(setTags).catch(() => setTags([]));
    }, []);
    const normalizedCoffees = useMemo(() => coffees.map((coffee) => ({
      ...coffee,
      price: Number(coffee.preco),
      imagemUrl: api.obterUrlImagem(coffee.imagemUrl),
    })), [coffees]);
    return(
        <OurCoffeeCOntainer className="container">
            <TitleText size="l" color="subtitle">Nossos cafés</TitleText>
            <div className="catalog-controls">
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar café" aria-label="Buscar café" />
              <select value={selectedTag} onChange={(event) => setSelectedTag(event.target.value)} aria-label="Filtrar por tag">
                <option value="">Todos os tipos</option>
                {tags.map((tag) => <option key={tag.id} value={tag.nome}>{tag.nome}</option>)}
              </select>
            </div>

          {loading && <CatalogMessage>Carregando cafés...</CatalogMessage>}
          {!loading && error && <CatalogMessage role="alert">Não foi possível carregar os cafés. Tente novamente mais tarde.</CatalogMessage>}
          {!loading && !error && coffees.length === 0 && <CatalogMessage>Nenhum café disponível no momento.</CatalogMessage>}
          {!loading && !error && normalizedCoffees.length > 0 && <CoffeeList>
            {normalizedCoffees.map((coffee) => <CoffeeCards key={coffee.id} coffee={coffee} />)}
          </CoffeeList>}
          {!loading && !error && normalizedCoffees.length === 0 && <CatalogMessage>Nenhum café encontrado.</CatalogMessage>}
        </OurCoffeeCOntainer>

    )
}
