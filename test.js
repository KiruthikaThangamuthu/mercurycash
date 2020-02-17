const amount = 5;
const coins = [1, 2, 3, 4];

function getCoinsCount() {
	let possibilityCounts = [];
	if(coins.includes(amount)) {
		console.log('A coin has the amount value. So minimum one coin.');
		console.log(`${amount} ( 1 * ${amount})`);
		return 1;
	}
	let divisableCoinValues = [];
	let nonDivisableCoinValues = [];
	coins.map(value => { // check coin values
		let count = amount/value;
		if (Number.isInteger(count)){
			divisableCoinValues.push(value);
			possibilityCounts.push({ count, coins: [ { coinValue: value, count: count } ] }); // same coins count
			console.log(`${count} times of ${value} coins`);
		} else {
			nonDivisableCoinValues.push(value)
		}
	});
	// console.log('Non divisable coin values: ', nonDivisableCoinValues);

	if (coins.length > 1) {
		let sumCoins = 2;
		do {
			let sum = 0;
			let coinList = []
			for (let coinIndex= 0; coinIndex < sumCoins; coinIndex++) {
				console.log('coinIndex: ', coinIndex);
				sum += coins[coinIndex];
				coinList.push({ coinValue: coins[coinIndex], count: 1 })
			}
			console.log('Sum: ', sum);
			if (Number.isInteger(amount/sum)) {
				possibilityCounts.push({ count: sumCoins + 1, coins: coinList });
			}
			sumCoins += 1;
		} while (sumCoins < coins.length)

		coins.map((currentCoin, currentCoinIndex) => {
			let sumCoins = 2;
			do {
				let sum = currentCoin;
				let coinList = []
				for (let coinIndex= 0; coinIndex < sumCoins; coinIndex++) {
					console.log('coinIndex: ', coinIndex);
					sum += coins[coinIndex];
					coinList.push({ coinValue: coins[coinIndex], count: currentCoinIndex === coinIndex ? 2 : 1 })
				}
				console.log('Sum: ', sum);
				if (Number.isInteger(amount/sum)) {
					possibilityCounts.push({ count: sumCoins, coins: coinList });
				}
				sumCoins += 1;
			} while (sumCoins < coins.length)
		})
	}
	


	let minCount = {
		count: -1,
		coins: []
	};
	possibilityCounts.map((value, i) => {
		if (possibilityCounts[i+1]) {
			if (possibilityCounts[i].count < possibilityCounts[i+1].count) {
				minCount.count = possibilityCounts[i].count;
				minCount.coins = possibilityCounts[i].coins

			} else {
				minCount.count = possibilityCounts[i+1].count;
				minCount.coins = possibilityCounts[i+1].coins;
			}
		} else {
			minCount.count = possibilityCounts[i].count;
			minCount.coins = possibilityCounts[i].coins;
		}
	})
	
	// console.log('Minimum count of coins:', minCount.count, JSON.stringify(minCount.coins));
	let totalCount = 0;
	let string = '(';

	minCount.coins.map((coin, i) => {
		totalCount += coin.count;
		string += `${coin.count} * ${coin.coinValue} ${i < (minCount.coins.length -1) ? '+ ': ')'}`;
	})
	console.log(`${totalCount == 0 ? '-1': totalCount} ${string}`);
	return minCount;

}
getCoinsCount();
