document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const listElement = document.getElementById('charactersList');

    const apiUrl = 'https://api.batmanapi.com/v1/characters';
    const fixedImageUrl = 'https://via.placeholder.com/200x300'; // Imagem fixa para todos os personagens

    searchButton.addEventListener('click', function() {
        const searchTerm = searchInput.value.trim().toLowerCase(); // Remove espaços em branco e converte para minúsculas

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                listElement.innerHTML = ''; // Limpa a lista antes de adicionar novos itens

                // Verifica se a resposta tem a chave 'data' e se é um array
                if (data.data && Array.isArray(data.data)) {
                    // Filtra os resultados com base no termo de busca
                    const filteredResults = data.data.filter(item => {
                        const name = item.attributes.name.toLowerCase();
                        const alias = item.attributes.alias.toLowerCase();
                        return name.includes(searchTerm) || alias.includes(searchTerm);
                    });

                    // Exibe os resultados filtrados
                    if (filteredResults.length > 0) {
                        filteredResults.forEach(item => {
                            const li = document.createElement('li');

                            // Imagem fixa para todos os personagens
                            const imageElement = document.createElement('img');
                            imageElement.src = fixedImageUrl; // Usa a imagem fixa
                            imageElement.alt = item.attributes.name;
                            imageElement.style.borderRadius = '10px';
                            li.appendChild(imageElement);

                            // Nome do personagem
                            const nameElement = document.createElement('h3');
                            nameElement.textContent = item.attributes.name;
                            li.appendChild(nameElement);

                            // Apelido (alias)
                            const aliasElement = document.createElement('p');
                            aliasElement.textContent = `Apelido: ${item.attributes.alias}`;
                            li.appendChild(aliasElement);

                            // Descrição
                            const descriptionElement = document.createElement('p');
                            descriptionElement.textContent = item.attributes.description;
                            li.appendChild(descriptionElement);

                            // Habilidades
                            if (item.attributes.abilities && item.attributes.abilities.length > 0) {
                                const abilitiesElement = document.createElement('ul');
                                abilitiesElement.innerHTML = '<strong>Habilidades:</strong>';
                                item.attributes.abilities.forEach(ability => {
                                    const abilityItem = document.createElement('li');
                                    abilityItem.textContent = ability;
                                    abilitiesElement.appendChild(abilityItem);
                                });
                                li.appendChild(abilitiesElement);
                            }

                            // Adiciona o item à lista
                            listElement.appendChild(li);
                        });
                    } else {
                        // Exibe uma mensagem se nenhum resultado for encontrado
                        const noResultsElement = document.createElement('li');
                        noResultsElement.textContent = 'Nenhum resultado encontrado.';
                        listElement.appendChild(noResultsElement);
                    }
                } else {
                    console.error('A resposta da API não contém um array válido:', data);
                }
            })
            .catch(error => console.error('Erro ao buscar dados:', error));
    });
});