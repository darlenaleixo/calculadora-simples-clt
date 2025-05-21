# Instruções para Integração da Calculadora INSS ao seu Site

## Visão Geral
Este guia explica como adicionar a Calculadora de Depósitos INSS como uma nova página no seu site existente (calculadorasimplesclt.com.br). A calculadora foi adaptada para combinar com o estilo visual do seu site atual.

## Novidades nesta Versão
- **Edição de Registros**: Agora é possível editar registros salariais existentes, clicando no botão "Editar" na tabela de registros.

## Arquivos Incluídos
- `index.html` - Página principal da calculadora
- `assets/` - Pasta contendo os arquivos CSS e JavaScript necessários
  - `index-BBBPK6QZ.css` - Estilos da calculadora
  - `index-PVMp2cGI.js` - Código JavaScript da calculadora

## Passos para Integração

### 1. Criar uma Nova Pasta no Servidor
Crie uma pasta chamada `calculadora-inss` na raiz do seu site. Esta pasta conterá todos os arquivos da calculadora.

```
www.calculadorasimplesclt.com.br/
├── (arquivos existentes)
└── calculadora-inss/    <-- Nova pasta
    ├── index.html
    └── assets/
        ├── index-BBBPK6QZ.css
        └── index-PVMp2cGI.js
```

### 2. Fazer Upload dos Arquivos
- Faça upload do arquivo `index.html` para a pasta `calculadora-inss`
- Faça upload da pasta `assets` e seu conteúdo para dentro da pasta `calculadora-inss`

### 3. Adicionar Link no Menu Principal
Para permitir que os usuários acessem a nova calculadora, adicione um link no menu principal do seu site. Localize o código HTML do menu no seu site e adicione o seguinte link:

```html
<a href="/calculadora-inss/">Calculadora INSS</a>
```

Se o seu site não tiver um menu de navegação, você pode adicionar um link na página inicial:

```html
<a href="/calculadora-inss/" style="display: block; margin: 10px 0;">Calculadora de Depósitos INSS</a>
```

### 4. Personalização (Opcional)
Se desejar personalizar ainda mais a aparência da calculadora:

- **Cabeçalho e Rodapé**: Você pode copiar o cabeçalho e rodapé do seu site principal para o arquivo `index.html` da calculadora para manter a consistência visual.

- **Cores e Fontes**: Edite a seção `<style>` no arquivo `index.html` para ajustar cores, fontes ou outros elementos visuais.

### 5. Verificação
Após a integração, acesse a URL `www.calculadorasimplesclt.com.br/calculadora-inss/` para verificar se a calculadora está funcionando corretamente e se o visual está harmonizado com o restante do site.

## Funcionalidades da Calculadora

### Registrar Períodos Salariais
- Preencha as datas de início e fim, valor do salário e opções adicionais
- Clique em "Salvar Registro" para adicionar à lista

### Editar Registros Existentes
- Clique no botão "Editar" ao lado do registro que deseja modificar
- O formulário será preenchido com os dados do registro selecionado
- Faça as alterações necessárias e clique em "Atualizar"
- Para cancelar a edição, clique em "Cancelar"

### Remover Registros
- Clique no botão "Remover" ao lado do registro que deseja excluir

### Verificar Depósitos
- Adicione o valor depositado no INSS para verificar se está correto
- A calculadora comparará com o valor esperado e indicará se há diferenças

## Solução de Problemas

### Se os estilos não carregarem corretamente:
Verifique se os caminhos para os arquivos CSS e JavaScript estão corretos. Se necessário, ajuste os caminhos no arquivo `index.html`:

```html
<!-- De: -->
<link rel="stylesheet" href="./assets/index-BBBPK6QZ.css">
<script src="./assets/index-PVMp2cGI.js"></script>

<!-- Para (se necessário): -->
<link rel="stylesheet" href="/calculadora-inss/assets/index-BBBPK6QZ.css">
<script src="/calculadora-inss/assets/index-PVMp2cGI.js"></script>
```

### Se a calculadora não funcionar:
Verifique o console do navegador para identificar possíveis erros JavaScript e certifique-se de que todos os arquivos foram carregados corretamente.

## Suporte
Se precisar de ajuda adicional com a integração, entre em contato para obter suporte técnico.
