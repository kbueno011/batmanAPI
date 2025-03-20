document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');
    const randomButton = document.getElementById('randomButton');
    const searchInput = document.getElementById('searchInput');
    const listElement = document.getElementById('locationsList');

    const apiUrl = 'https://api.batmanapi.com/v1/locations';

    // Função para buscar locais por nome
    searchButton.addEventListener('click', function() {
        const searchTerm = searchInput.value.trim().toLowerCase(); // Remove espaços em branco e converte para minúsculas

        if (searchTerm) {
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    listElement.innerHTML = ''; // Limpa a lista antes de adicionar novos itens

                    if (data.data && Array.isArray(data.data)) {
                        const filteredResults = data.data.filter(item => {
                            const name = item.attributes.name.toLowerCase();
                            return name.includes(searchTerm);
                        });

                        if (filteredResults.length > 0) {
                            filteredResults.forEach(item => {
                                const li = document.createElement('li');

                                // Título do local
                                const titleElement = document.createElement('h3');
                                titleElement.textContent = item.attributes.name;
                                li.appendChild(titleElement);

                                // Descrição
                                const descriptionElement = document.createElement('p');
                                descriptionElement.textContent = item.attributes.description;
                                li.appendChild(descriptionElement);

                                // Eventos notáveis
                                if (item.attributes.notable_events && item.attributes.notable_events.length > 0) {
                                    const eventsElement = document.createElement('ul');
                                    eventsElement.innerHTML = '<strong>Eventos Notáveis:</strong>';
                                    item.attributes.notable_events.forEach(event => {
                                        const eventItem = document.createElement('li');
                                        eventItem.textContent = event;
                                        eventsElement.appendChild(eventItem);
                                    });
                                    li.appendChild(eventsElement);
                                }

                                // Adiciona o item à lista
                                listElement.appendChild(li);
                            });
                        } else {
                            const noResultsElement = document.createElement('li');
                            noResultsElement.textContent = 'Nenhum resultado encontrado.';
                            listElement.appendChild(noResultsElement);
                        }
                    } else {
                        console.error('A resposta da API não contém um array válido:', data);
                    }
                })
                .catch(error => console.error('Erro ao buscar dados:', error));
        } else {
            alert('Por favor, insira um nome válido.');
        }
    });

    // Função para buscar um local aleatório
    randomButton.addEventListener('click', function() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.data && Array.isArray(data.data)) {
                    const randomIndex = Math.floor(Math.random() * data.data.length);
                    const randomLocation = data.data[randomIndex];

                    listElement.innerHTML = ''; // Limpa a lista antes de adicionar novos itens

                    const li = document.createElement('li');

                    // Título do local
                    const titleElement = document.createElement('h3');
                    titleElement.textContent = randomLocation.attributes.name;
                    li.appendChild(titleElement);

                    // Descrição
                    const descriptionElement = document.createElement('p');
                    descriptionElement.textContent = randomLocation.attributes.description;
                    li.appendChild(descriptionElement);

                    // Eventos notáveis
                    if (randomLocation.attributes.notable_events && randomLocation.attributes.notable_events.length > 0) {
                        const eventsElement = document.createElement('ul');
                        eventsElement.innerHTML = '<strong>Eventos Notáveis:</strong>';
                        randomLocation.attributes.notable_events.forEach(event => {
                            const eventItem = document.createElement('li');
                            eventItem.textContent = event;
                            eventsElement.appendChild(eventItem);
                        });
                        li.appendChild(eventsElement);
                    }

                    // Adiciona o item à lista
                    listElement.appendChild(li);
                } else {
                    console.error('A resposta da API não contém um array válido:', data);
                }
            })
            .catch(error => console.error('Erro ao buscar dados:', error));
    });
});