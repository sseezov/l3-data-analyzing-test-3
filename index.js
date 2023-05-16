export default function solution(content) {
  // BEGIN

  // Task 1
  const [, , ...plants] = content.split('\n').map((plant) => plant.split('|').map((cell) => cell.trim()).slice(1, -1));
  const numberOfPlants = plants.length;
  console.log('Number of plants: ', numberOfPlants, '\n');

  // Task 2
  const renamedPlants = plants.map((plant) => {
    plant[0] = plant[0][0].toUpperCase() + plant[0].slice(1);
    return plant;
  });
  renamedPlants.sort()
  console.log('Plants sorted by name:', renamedPlants, '\n');

  // Task 3
  const numberOfDangerous = plants.filter((plant) => plant[4] === 'Да').length;
  const numberOfSafe = plants.filter((plant) => plant[4] === 'Нет').length;
  const percentOfDangerous = (numberOfDangerous / numberOfPlants) * 100;
  const percentOfSafe = (numberOfSafe / numberOfPlants) * 100;
  
  console.log('Percent of safe plants: ', percentOfSafe);
  console.log('Percent of dangerous plants: ', percentOfDangerous, '\n');

  // Task 4
  const lifeYears = plants.map((plant) => plant[3].replace('-', ' ').split(' ').filter((item) => {
    return item !== 'лет' 
        && item !== 'года' 
        && item !== 'день' 
        && item !== 'год'
  }));

  const midForPlants = lifeYears.map((years) => years.length === 2 ? years[0] + years[1] / 2 : years[0]);

  let acc = 0;
  for (let num in midForPlants) {
    acc += num;
  }
  const midForAll = acc / numberOfPlants;

  console.log('Average life of all plants: ', midForAll);

  // Task 5
  // END
}