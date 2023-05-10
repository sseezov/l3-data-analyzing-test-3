export default function solution(content) {
  // Task 1
  const data = content.split("\n").map(line => line.split('|').map(word => word.trim()).slice(1, -1)).slice(2);
  const dataLength = data.length;
  console.log(`Всего растений: ${dataLength}`);

  // Task 2
  const plants = data.map(item => `${item[0][0].toUpperCase()}${item[0].slice(1)}`).sort();
  console.log(`Список растений в алфавитном порядке: ${plants}`);

  // Task 3
  const dangerousPlants = data.filter(item => item[4] === 'Да');
  const dangerousPlantsShare = (dangerousPlants.length / data.length) * 100;
  const notDangerousPlantsShare = 100 - dangerousPlantsShare;
  console.log(`Доля опасных растений: ${dangerousPlantsShare}%, доля безопасных: ${notDangerousPlantsShare}%`);

  // Task 4
  const forestPlants = data.filter(item => item[1].toLowerCase().includes('леса'));
  const plantAverageLifeSpan = forestPlants.map(item => item[3].match(/[0-9]+/g).reduce((acc, value) => acc + Number(value), 0) / 2);
  const totalAverageLifeSpan = (plantAverageLifeSpan.reduce((acc, value) => acc + value, 0) / forestPlants.length).toFixed(2);
  console.log(`Среднее время жизни лесных растений: ${totalAverageLifeSpan}`);

  // Task 5
  const areas = {};
  const areasArr = dangerousPlants.map(item => item[1].toLowerCase().split(", ")).flat();
  areasArr.forEach(item => {
    areas[item] = (areas[item] ?? 0) + 1;
  });
  const mainArea = Object.entries(areas).sort((a, b) => a[1] - b[1]).at(-1)[0];
  console.log(`Место, где больше всего опасных растений: ${mainArea}`);
}