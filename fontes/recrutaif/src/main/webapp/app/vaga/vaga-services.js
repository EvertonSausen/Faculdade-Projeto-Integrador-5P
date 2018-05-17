angular.module('vagaServices', ['ngResource'])
    //módulo que configura o caminho para acessar os recursos rest da aplicação TODA

    //cria uma fabrica de recursos
    .factory('recursoVaga', function ($resource) {

        //retorna um recurso
        return $resource('rest/vagas/:vagaId', null, {
            update: {
                method: 'PUT' //Estudar 
            }
        });
    })

    .factory('cadastroDeVaga', function (recursoVaga, $q) {

        var servico = {};

        servico.cadastrar = function (vaga) {
            //retornando promessa na mão
            return $q(function (resolve, reject) {

                //verifica se o setor informado possui id
                if (vaga.id) {

                    recursoVaga.update({ vagaId: vaga.id }, vaga, function () {
                        resolve({
                            mensagem: '[INFO] Vaga ' + vaga.titulo + ' atualizado com sucesso!',
                            inclusao: false
                        });
                    }, function (erro) {
                        console.log(erro);
                        reject({
                            mensagem: '[ERRO] Não foi possível altera ' + vaga.titulo
                        });
                    });

                } else {

                    recursoVaga.save(vaga, function () {
                        resolve({
                            mensagem: '[INFO]Setor' + vaga.titulo + 'Adicionado com sucesso!',
                            inclusao: true
                        });
                    }, function (erro) {
                        reject({
                            mensagem: '[ERRO] Não foi possível incluir  ' + vaga.titulo
                        });
                    });
                }
            });
        };
        return servico;
    })
    ;
