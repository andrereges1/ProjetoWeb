const produtos = [
  {
    id: 1,
    nome: "iPhone 11",
    marca: "Apple",
    modelo: "iPhone 11",
    estado: "Excelente",
    cor: "Preto",
    armazenamento: "128 GB",
    bateria: "87%",
    preco: 1899.90,
    precoFormatado: "R$ 1.899,90",
    descricao: "Celular usado em excelente estado, revisado e pronto para uso.",
    imagem: "/imgs/iphone 11.png",
    disponivel: true,
    destaque: true,
    acessorios: [
      "Carregador compatível",
      "Cabo USB",
      "Capinha de proteção"
    ],
    pontosPositivos: [
      "Ótima câmera",
      "Bom desempenho",
      "Aparelho revisado",
      "Boa duração de bateria"
    ],
    observacoes: [
      "Produto usado, podendo conter pequenas marcas de uso.",
      "Todas as informações são simuladas para fins acadêmicos."
    ]
  },
  {
    id: 2,
    nome: "iPhone XR",
    marca: "Apple",
    modelo: "iPhone XR",
    estado: "Bom",
    cor: "Branco",
    armazenamento: "64 GB",
    bateria: "82%",
    preco: 1399.90,
    precoFormatado: "R$ 1.399,90",
    descricao: "Aparelho usado em bom estado, ideal para quem busca um iPhone com preço mais acessível.",
    imagem: "/imgs/XR.png",
    disponivel: false,
    destaque: false,
    acessorios: [
      "Cabo USB",
      "Capinha simples"
    ],
    pontosPositivos: [
      "Tela grande",
      "Sistema fluido",
      "Boa câmera",
      "Preço acessível"
    ],
    observacoes: [
      "Produto temporariamente indisponível.",
      "Dados simulados para demonstração do projeto."
    ]
  },
  {
    id: 3,
    nome: "Samsung Galaxy S20",
    marca: "Samsung",
    modelo: "Galaxy S20",
    estado: "Excelente",
    cor: "Azul",
    armazenamento: "128 GB",
    bateria: "90%",
    preco: 1599.90,
    precoFormatado: "R$ 1.599,90",
    descricao: "Smartphone Samsung usado, com ótimo desempenho, boa câmera e acabamento moderno.",
    imagem: "/imgs/s20.png",
    disponivel: true,
    destaque: true,
    acessorios: [
      "Carregador",
      "Cabo USB-C",
      "Película aplicada"
    ],
    pontosPositivos: [
      "Tela de alta qualidade",
      "Câmera versátil",
      "Bom desempenho",
      "Design moderno"
    ],
    observacoes: [
      "Aparelho revisado antes da venda.",
      "Produto usado com informações simuladas."
    ]
  },
  {
    id: 4,
    nome: "Samsung Galaxy A52",
    marca: "Samsung",
    modelo: "Galaxy A52",
    estado: "Bom",
    cor: "Preto",
    armazenamento: "128 GB",
    bateria: "85%",
    preco: 999.90,
    precoFormatado: "R$ 999,90",
    descricao: "Celular intermediário usado, indicado para redes sociais, estudos e uso diário.",
    imagem: "/imgs/A52.png",
    disponivel: true,
    destaque: false,
    acessorios: [
      "Carregador",
      "Cabo USB-C"
    ],
    pontosPositivos: [
      "Bom custo-benefício",
      "Tela grande",
      "Boa memória interna",
      "Ideal para uso diário"
    ],
    observacoes: [
      "Pode apresentar pequenas marcas de uso.",
      "Informações usadas apenas para simulação acadêmica."
    ]
  },
  {
    id: 5,
    nome: "Motorola Edge 30",
    marca: "Motorola",
    modelo: "Edge 30",
    estado: "Excelente",
    cor: "Cinza",
    armazenamento: "256 GB",
    bateria: "88%",
    preco: 1499.90,
    precoFormatado: "R$ 1.499,90",
    descricao: "Aparelho usado com bastante armazenamento, bom desempenho e visual moderno.",
    imagem: "/imgs/edge.png",
    disponivel: true,
    destaque: true,
    acessorios: [
      "Carregador TurboPower",
      "Cabo USB-C",
      "Capinha transparente"
    ],
    pontosPositivos: [
      "Muito armazenamento",
      "Carregamento rápido",
      "Design fino",
      "Bom desempenho"
    ],
    observacoes: [
      "Produto revisado e higienizado.",
      "Dados simulados para o projeto."
    ]
  },
  {
    id: 6,
    nome: "Xiaomi Redmi Note 11",
    marca: "Xiaomi",
    modelo: "Redmi Note 11",
    estado: "Regular",
    cor: "Azul",
    armazenamento: "128 GB",
    bateria: "80%",
    preco: 799.90,
    precoFormatado: "R$ 799,90",
    descricao: "Celular usado com preço acessível, indicado para tarefas básicas e uso cotidiano.",
    imagem: "/imgs/Redmi Note 11.png",
    disponivel: true,
    destaque: false,
    acessorios: [
      "Carregador",
      "Cabo USB-C"
    ],
    pontosPositivos: [
      "Preço baixo",
      "Boa memória",
      "Tela grande",
      "Atende bem ao uso básico"
    ],
    observacoes: [
      "Produto em estado regular, com marcas visíveis de uso.",
      "Informações simuladas para fins acadêmicos."
    ]
  }
];

module.exports = produtos;
