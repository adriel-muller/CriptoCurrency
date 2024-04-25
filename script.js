// Função para obter a cotação atual do Bitcoin e Ethereum
async function getCryptoPrices() {
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd';
    const response = await fetch(url);
    const data = await response.json();
    return {
        btcPrice: data.bitcoin.usd,
        ethPrice: data.ethereum.usd
    };
}

// Função para exibir as cotações atuais na tela
async function displayCurrentPrices() {
    const { btcPrice, ethPrice } = await getCryptoPrices();
    document.getElementById('btc-price').innerText = `Bitcoin: USD ${btcPrice.toFixed(2)}`;
    document.getElementById('eth-price').innerText = `Ethereum: USD ${ethPrice.toFixed(2)}`;
}

// Função para calcular o lucro ou prejuízo com base no investimento, nas cotações de compra e nas cotações atuais
async function calculateProfitOrLoss() {
    // Obter os valores de investimento do usuário
    const investmentBTC = parseFloat(document.getElementById('investmentBTC').value);
    const investmentETH = parseFloat(document.getElementById('investmentETH').value);
    
    // Obter as cotações de compra fornecidas pelo usuário
    const btcBuyPrice = parseFloat(document.getElementById('btcBuyPrice').value);
    const ethBuyPrice = parseFloat(document.getElementById('ethBuyPrice').value);
    
    // Obter preços atuais do Bitcoin e Ethereum
    const { btcPrice, ethPrice } = await getCryptoPrices();
    
    // Calcular quantidade de BTC e ETH comprada com os investimentos e as cotações de compra fornecidas
    const btcOwned = investmentBTC / btcBuyPrice;
    const ethOwned = investmentETH / ethBuyPrice;
    
    // Calcular o valor atual dos investimentos
    const currentValueBTC = btcOwned * btcPrice;
    const currentValueETH = ethOwned * ethPrice;
    
    // Calcular lucro ou prejuízo para cada moeda
    const profitOrLossBTC = currentValueBTC - investmentBTC;
    const profitOrLossETH = currentValueETH - investmentETH;
    
    // Exibir os resultados formatados com 2 casas decimais
    document.getElementById('btcResult').innerText = `Bitcoin: USD ${profitOrLossBTC.toFixed(2)}`;
    document.getElementById('ethResult').innerText = `Ethereum: USD ${profitOrLossETH.toFixed(2)}`;
    
    // Mostrar a seção de resultados
    document.getElementById('result').style.display = 'block';
}

// Executar a função para exibir as cotações atuais quando a página carregar
window.onload = function() {
    displayCurrentPrices();
};
