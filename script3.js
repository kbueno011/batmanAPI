document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const listElement = document.getElementById('storylinesList');

    const apiUrl = 'https://api.batmanapi.com/v1/storylines';

    searchButton.addEventListener('click', function() {
        const searchTerm = searchInput.value.trim().toLowerCase(); // Remove espaços em branco e converte para minúsculas

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log('Resposta da API:', data); // Log da resposta para depuração
                listElement.innerHTML = ''; // Limpa a lista antes de adicionar novos itens

                // Verifica se a resposta tem a chave 'data' e se é um array
                const items = data.data || data.results || data.items || data; // Tenta acessar os dados de diferentes formas
                if (Array.isArray(items)) {
                    // Filtra os resultados com base no termo de busca
                    const filteredResults = items.filter(item => {
                        const name = item.attributes?.name?.toLowerCase() || item.name?.toLowerCase() || '';
                        return name.includes(searchTerm);
                    });

                    // Exibe os resultados filtrados
                    if (filteredResults.length > 0) {
                        filteredResults.forEach(item => {
                            const li = document.createElement('li');

                            // Imagem da história (se existir)
                            const imageUrl = item.attributes?.image_url || item.image_url;
                            if (imageUrl) {
                                const imageElement = document.createElement('img');
                                imageElement.src = imageUrl;
                                imageElement.alt = item.attributes?.name || item.name;
                                imageElement.style.borderRadius = '10px';
                                imageElement.style.width = '100%';
                                li.appendChild(imageElement);
                            }

                            // Título da história
                            const titleElement = document.createElement('h3');
                            titleElement.textContent = item.attributes?.name || item.name;
                            li.appendChild(titleElement);

                            // Descrição
                            const descriptionElement = document.createElement('p');
                            descriptionElement.textContent = item.attributes?.description || item.description;
                            li.appendChild(descriptionElement);

                            // Issues (edições)
                            const issues = item.attributes?.issues || item.issues || [];
                            if (issues.length > 0) {
                                const issuesElement = document.createElement('ul');
                                issuesElement.innerHTML = '<strong>Edições:</strong>';
                                issues.forEach(issue => {
                                    const issueItem = document.createElement('li');
                                    issueItem.textContent = issue;
                                    issuesElement.appendChild(issueItem);
                                });
                                li.appendChild(issuesElement);
                            }

                            // Personagens
                            const characters = item.attributes?.characters || item.characters || [];
                            if (characters.length > 0) {
                                const charactersElement = document.createElement('ul');
                                charactersElement.innerHTML = '<strong>Personagens:</strong>';
                                characters.forEach(character => {
                                    const characterItem = document.createElement('li');
                                    characterItem.textContent = character;
                                    charactersElement.appendChild(characterItem);
                                });
                                li.appendChild(charactersElement);
                            }

                            // Localizações
                            const locations = item.attributes?.locations || item.locations || [];
                            if (locations.length > 0) {
                                const locationsElement = document.createElement('ul');
                                locationsElement.innerHTML = '<strong>Localizações:</strong>';
                                locations.forEach(location => {
                                    const locationItem = document.createElement('li');
                                    locationItem.textContent = location;
                                    locationsElement.appendChild(locationItem);
                                });
                                li.appendChild(locationsElement);
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