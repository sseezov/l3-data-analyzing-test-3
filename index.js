export default function solution(content) {
  // BEGIN
  let array = content.split('\n').slice(2);
  const plantsList = array.map(el=>el.split('|')[1].trim())

  const upperPlantsList = plantsList.map((el)=> {
    const firstLetterUp = el[0].toUpperCase()
    return firstLetterUp + el.slice(1)
  })

  const sortedPlants = upperPlantsList.sort()
  console.log(sortedPlants)

  const saveOrNot = array.map(row=>row.split('|')[5].trim())

  const savePlantsCount = saveOrNot.reduce((acc, curr) => (curr === 'Нет' ? acc + 1 : acc), 0)
  const dangerousPlantsCount = saveOrNot.reduce((acc, curr) => (curr === 'Да' ? acc + 1 : acc), 0)
  
  const savePlantsPercentage = savePlantsCount * 100 / plantsList.length ;
  const dangerousPlantsPercentage = dangerousPlantsCount * 100 / plantsList.length;

  console.log(`Общее количество растений: ${plantsList.length}`);
  console.log(`Процент безопасных растений: ${savePlantsPercentage}%`)
  console.log(`Процент опасных растений: ${dangerousPlantsPercentage}%`)
  
  const forestPlants = array.filter((el)=>el.includes('Леса'))
  const lifeTimeOfForestPlants = forestPlants.map(el=>el.split('|')[4].trim())
  const lifeTimeOfForestPlantsCount = lifeTimeOfForestPlants.map(el=>el.slice(0, el.indexOf(' ')))

  const average = lifeTimeOfForestPlantsCount.map(el=>el.split('-'))
  
  function averageInInterval(average) {
    let numbers = average.map(Number);
    let sum = numbers.reduce((acc, val) => acc + val, 0);
    return sum / numbers.length;
  }
  
  let avgOfAverages = average.map(averageInInterval).reduce((acc, val) => acc + val, 0) / average.length;
  
  console.log(`Cреднее время жизни всех лесных растений ${Math.round(avgOfAverages)} лет`);

  const dangerousPlants = array.filter(el=>el.includes('Да'))

  const habitats = dangerousPlants.map(row=>row.split('|')[2].trim())
  
  function findMostFrequent(arr) {
    let freq = {};
    let maxFreq = 0;
    let mostFreqItem;
  
    for (let i = 0; i < arr.length; i++) {
      let currentItem = arr[i];
      if (freq[currentItem] == null) {
        freq[currentItem] = 1;
      } else {
        freq[currentItem]++;
      }
      if (freq[currentItem] > maxFreq) {
        maxFreq = freq[currentItem];
        mostFreqItem = currentItem;
      }
    }
  
    return mostFreqItem;
  }
 
  console.log(`${findMostFrequent(habitats)} - самая опасная среда обитания для человека`);
  // END
}