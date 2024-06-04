$(document).ready(function() {
    // Função para carregar os cards
    function loadCards() {
        $.ajax({
            url: 'https://664cba55ede9a2b5565160ad.mockapi.io/Cliente', // Substituído com o URL correto do backend
            method: 'GET',
            success: function(data) {
                $('#cards-container').empty();
                data.forEach(function(item) {
                    let card = `
                    <div class="col-md-4">
                        <div class="card mb-4">
                            <div class="card-body">
                                <h5 class="card-title">${item.name}</h5>
                                <a href="cadastrar.html?id=${item.id}" class="btn btn-primary">Editar</a>
                                <button class="btn btn-danger" onclick="deleteItem(${item.id})">Excluir</button>
                            </div>
                        </div>
                    </div>`;
                    $('#cards-container').append(card);
                });
            }
        });
    }

    // Função para excluir um item
    window.deleteItem = function(id) {
        if(confirm('Tem certeza que deseja excluir este item?')) {
            $.ajax({
                url: `https://664cba55ede9a2b5565160ad.mockapi.io/Cliente/${id}`, // Substituído com o URL correto do backend
                method: 'DELETE',
                success: function() {
                    loadCards();
                }
            });
        }
    }

    // Carregar cards ao carregar a página
    if($('#cards-container').length) {
        loadCards();
    }

    // Submeter o formulário de cadastro/edição
    $('#item-form').submit(function(event) {
        event.preventDefault();
        let itemId = new URLSearchParams(window.location.search).get('id');
        let itemName = $('#item-name').val();
        let method = itemId ? 'PUT' : 'POST';
        let url = itemId ? `https://664cba55ede9a2b5565160ad.mockapi.io/Cliente/${itemId}` : 'https://664cba55ede9a2b5565160ad.mockapi.io/Cliente';

        $.ajax({
            url: url,
            method: method,
            contentType: 'application/json',
            data: JSON.stringify({ name: itemName }),
            success: function() {
                window.location.href = 'index.html';
            }
        });
    });

    // Se estiver editando, carregar dados do item no formulário
    if(window.location.pathname.endsWith('cadastrar.html')) {
        let itemId = new URLSearchParams(window.location.search).get('id');
        if(itemId) {
            $('#form-title').text('Editar Item');
            $.ajax({
                url: `https://664cba55ede9a2b5565160ad.mockapi.io/Cliente/${itemId}`,
                method: 'GET',
                success: function(data) {
                    $('#item-name').val(data.name);
                }
            });
        }
    }
});
