![](https://seeklogo.com/images/J/javascript-js-logo-2949701702-seeklogo.com.png)

# Sistema de Banco em JavaScript

Este é um sistema de banco simples implementado em JavaScript. Ele permite realizar operações bancárias básicas, como criar contas, depositar dinheiro, sacar dinheiro e verificar o saldo, extratos e transferências.

## Funcionalidades

- Criar conta bancária
- Listar contas bancárias
- Atualizar os dados do usuário da conta bancária
- Excluir uma conta bancária
- Depósitar em uma conta bancária
- Sacar de uma conta bancária
- Transferir valores entre contas bancárias
- Consultar saldo da conta bancária
- Emitir extrato bancário

## Como Usar

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/jonatanfragoso/Sistema-Bancario-em-JavaScript.git
   ```
2. **Instale as dependências do node:**
   
   ```
   npm install
   ```
   
3. **Utilize o Insomnia para fazer as requisições HTTP**
   
   ```
   https://insomnia.rest/download
   ```
 

4. **End Points:**
   
   ```
   - (GET) http://localhost:8000/contas
   - (POST) http://localhost:8000/contas
   - (PUT) http://localhost:8000/contas/3/usuario
   - (DELETE) http://localhost:8000/contas/1
   - (POST) http://localhost:8000/transacoes/depositar
   - (POST) http://localhost:8000/transacoes/sacar
   - (POST) http://localhost:8000/transacoes/transferir
   - (GET) http://localhost:8000/contas/extrato?numero_conta=1&senha=123
   ```

5. **Criar Conta Bancária:**
- Utilizando o método POST, acesse o end point "http://localhost:8000/contas" e no corpo da requisição passe um JSON. Exemplo:
  
   ```
      {
          "nome": "Jonatan",
          "cpf": "012345678910",
          "data_nascimento": "2021-03-15",
          "telefone": "68999998888",
          "email": "jonatan@email.com",
          "senha": "123"
      }
   ```

6. **Listar todas as contas:**
- Utilizando o método GET, acesse o end point "http://localhost:8000/contas" e acrescente um parâmetro de consulta na URL com a senha do banco correta. Exemplo:
  
   ```
   http://localhost:8000/contas?senha_banco=Cubos123Bank
   ```
    
7. **Atualizar uma conta:**
- Utilizando o método PUT, acesse o end point "http://localhost:8000/contas" e acrescente parâmetros de rota na URL com o id do usuário seguido de "/usuario", e, passe no corpo da requisição m JSON com o objeto completo com os atributos que deseja trocar. Exemplo:
  
   ```
   http://localhost:8000/contas/3/usuario
   ```

  JSON do objeto:
  
   ```
      {
         "nome": "Ciclano",
         "cpf": "16452224200",
         "data_nascimento": "2021-03-15",
         "telefone": "68999100811",
         "email": "ciclano@gmail.com",
         "senha": "123"
      }
   ```

8. **Deletar uma conta:**
- Para deletar uma conta utilizand o método DELETE, acesse o end point "http://localhost:8000/contas" e acrescente à url o parâmetro de rota com o ID da conta. Exemplo:
  
   ```
   http://localhost:8000/contas/2
   ```

9. **Depositar em uma conta:**
- Para depositar um valor em uma conta existente, utilize o método POST, acesse o end point "http://localhost:8000/transacoes/depositar" e passe como corpo da requisição um objeto contendo o número da conta e o valor. Exemplo:

   ```
      {
         "numero_conta": "1",
         "valor": 1900
      }
   ```

10. **Sacar valor de um conta:**
- Para sacar um valor em uma conta existente, utilize o método POST, acesse o end point "http://localhost:8000/transacoes/sacar" e passe como corpo da requisição um objeto contendo o número da conta, valor e senha da conta bancária. Exemplo:
  
   ```
      {
         "numero_conta": "1",
         "valor": 1900,
         "senha": "123"
      }
   ```

11. **Tranferência entre contas:**
- Para transferir um valor em uma conta para outra, utilize o método POST, acesse o end point "http://localhost:8000/transacoes/transferir" e passe como corpo da requisição um objeto contendo o número da conta de origem, número da conta destino, o valor e a senha da conta bancária de origem. Exemplo:
  
   ```
      {
         "numero_conta_origem": "1",
         "numero_conta_destino": "2",
         "valor": 10,
         "senha": "123"
      }
   ```

12. **Extrato bancário:**
- Para imprimir o extrato de uma conta, utilize o método GET, acesse o end point "http://localhost:8000/contas/extrato" e passe como parâmetros de consulta o número da conta e senha. Exemplo:
  
   ```
   http://localhost:8000/contas/extrato?numero_conta=1&senha=123
   ```


