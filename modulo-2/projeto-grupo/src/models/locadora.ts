import { Aluguel } from "./aluguel";
import { Cliente } from "./cliente";
import { Veiculo } from "./veiculo";

const prompt = require("prompt-sync")();
const fs = require("fs");

export class Locadora {
    menu() {
        console.log(`
        1. Cadastrar veículo
        2. Cadastrar cliente
        3. Alugar veículo
        4. Devolver veículo
        5. Listar veículos disponíveis
        6. Listar veículos alugados
        7. Mostrar fatura do cliente
        8. Sair do sistema

        `)

        const opcao = prompt("Escolha uma opção: ")
        let sair = false;
        switch (opcao) {
            case "1":
                this.adicionarVeiculo();
                break;
            case "2":
                this.adicionarCliente();
                break;
            case "3":
                this.alugarVeiculo();
                break;
            case "4":
                this.devolverVeiculo();
                break;
            case "5":
                this.listarVeiculosDisponiveis();
                break;
            case "6":
                this.listarVeiculosAlugados();
                break;
            case "7":
                this.faturamento();
                break;
            case "8":
                sair = true;
                break;
            default:
                console.log("Digite uma opção válida!")
                break;
        }

        if (!sair) {
            prompt("Pressione ENTER para continuar")

            this.menu()
        };

    }

// Fiz o switch, porém tive que dar um log antes pois o terminal bagunça se entrar com as informações diretamente no prompt
    // Mensagem de sucesso adicionado
    adicionarVeiculo() {
        const placa = prompt("Digite a placa do veículo: ").toUpperCase();
        console.log(`
Tipo de Veículo:
Digite 1 se o tipo do Veículo for uma moto OU 
Digite 2 se o tipo do Veículo for um carro: `);
        
        let tipoVeiculo = prompt("").toLowerCase();
        switch (tipoVeiculo) {
            case "1":
                tipoVeiculo = "moto";
                break;
            case "2":
                tipoVeiculo = "carro";
                break
            default:
                console.log("Digite um valor válido!");
                break;
        }
        const modelo = prompt("Digite o modelo: ");
        const horaAluguel = +(prompt("Digite o valor da hora de aluguel: "));

        const novoVeiculo = new Veiculo({ placa, tipoVeiculo, modelo, valorHora: horaAluguel });

        novoVeiculo.adicionarVeiculo()
        console.log(`\nVeículo ${modelo} de placa ${placa} adicionado com sucesso!\n`);
    }

    // Fiz o switch, porém tive que dar um log antes pois o terminal bagunça se entrar com as informações diretamente no prompt
    // Mensagem de sucesso adicionado
    adicionarCliente() {
        const cpf = prompt("Digite o CPF do cliente: ")
        const nome = prompt("Digite o nome do cliente: ")
        console.log(`
Tipo de carteira:
Digite 1 para habilitação tipo A OU
Digite 2 para habilitação tipo B: `);
        let tipoCarteira = prompt("").toUpperCase()
        switch (tipoCarteira) {
            case "1":
                tipoCarteira = "A";
                break;
            case "2":
                tipoCarteira = "B";
                break;
            default:
                console.log("Digite um valor válido para tipo de carteira!");
                break;
        }

        const novoCliente = new Cliente({ cpf, nome, tipoCarteira });

        novoCliente.adicionarCliente()
        console.log(`\nCliente ${nome} adicionado com sucesso!\n`);
    }

    listarVeiculosDisponiveis() {
        Veiculo.listarVeiculosDisponiveis()
    }

    listarVeiculosAlugados() {
        Veiculo.listarVeiculosAlugados()
    }

    //Feita a validação de CPF antes de concluir o aluguel do veículo.
    alugarVeiculo() {
        const cpfCliente = prompt("Digite cpf do cliente: ");

        const clienteEncontrado = Cliente.buscarClientePorCpf(cpfCliente)
        if (clienteEncontrado) {

            const placaVeiculo = prompt("Digite a placa do veículo desejado: ").toUpperCase();
            const nomeCliente = prompt("Digite o nome do cliente: ");
            const tipoCarteiraCliente = prompt("Digite o tipo da carteira do cliente: ").toUpperCase();
            const dataInicio = new Date(prompt("Digite a data de retirada do veículo (AAAA/MM/DD HH:MM): "));
            const dataFim = new Date(prompt("Digite a data de devolução do veículo (AAAA/MM/DD HH:MM): "));
            
            Aluguel.alugarVeiculo(cpfCliente, placaVeiculo, nomeCliente, tipoCarteiraCliente, dataInicio, dataFim)
            
        } else{
            console.log("CPF não existe no nosso Banco de Dados. Digite um CPF válido!");
            this.alugarVeiculo();
        }
    }

    devolverVeiculo() {
        const cpfCliente = prompt("Digite cpf do cliente: ");
        const placaVeiculo = prompt("Digite a placa do veículo: ").toUpperCase();

        Aluguel.devolverVeiculo(placaVeiculo, cpfCliente);
    }

    faturamento() {
        const placaVeiculo = prompt("Digite a placa do veículo: ").toUpperCase();
        const dataInicio = new Date(prompt("Digite a data de retirada do veículo (AAAA/MM/DD HH:MM): "));
        const dataFim = new Date(prompt("Digite a data de devolução do veículo (AAAA/MM/DD HH:MM): "));

        Aluguel.faturamento(placaVeiculo, dataInicio, dataFim)
    }
}
