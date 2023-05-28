export default function solution(content) {
  // 1. Сколько всего растений содержится в файле?
var rows = content.split('\n');
var totalPlants = rows.length - 2; // Вычитаем 2 строки заголовка и разделителя
console.log('Всего растений: ' + totalPlants);

// 2. Отсортируйте список растений в алфавитном порядке
var plants = [];
for (var i = 3; i < rows.length; i++) {
  var columns = rows[i].split('|');
  var plantName = columns[1].trim();
  plants.push(`${plantName[0].toUpperCase()}${plantName.slice(1)}`); // Имя растения с заглавной буквы
}
plants.sort();
console.log('Список растений в алфавитном порядке:');
console.log(plants);

// 3. Выведите количество опасных и безопасных для человека растений в данной таблице в процентном соотношении
var totalPlantsWithDanger = 0;
var totalPlantsWithoutDanger = 0;

for (var i = 2; i < rows.length; i++) {
  var columns = rows[i].split('|');
  var danger = columns[5].trim();
  if (danger === 'Да') {
    totalPlantsWithDanger += 1;
  } else {
    totalPlantsWithoutDanger += 1;
  }
}

var percentPlantsWithDanger = (totalPlantsWithDanger / totalPlants) * 100;
var percentPlantsWithoutDanger = (totalPlantsWithoutDanger / totalPlants) * 100;

console.log('Опасных растений: ' + totalPlantsWithDanger + ' (' + percentPlantsWithDanger.toFixed(2) + '%)');
console.log('Безопасных растений: ' + totalPlantsWithoutDanger + ' (' + percentPlantsWithoutDanger.toFixed(2) + '%)');

// 4. Выведите среднее время жизни всех лесных растений
var totalForestPlants = 0;
var sumForestPlantsLife = 0;

for (var i = 3; i < rows.length; i++) {
  var columns = rows[i].split('|');
  var habitat = columns[2].trim().toLowerCase();
  var life = columns[4].trim();
  if (habitat.includes('леса')) {
    totalForestPlants += 1;
    var lifeRange = life.split('-');
    // Тут баг!
    var minLife = parseInt(lifeRange[0]);
    var maxLife = parseInt(lifeRange[1]);
    sumForestPlantsLife += (minLife + maxLife) / 2;
  }
}

var averageForestPlantsLife = sumForestPlantsLife / totalForestPlants;
console.log('Среднее время жизни лесных растений: ' + averageForestPlantsLife.toFixed(2) + ' лет');

// 5.  Определите какое место обитания больше всего свойственно опасным для человека растениям
var habitats = {};
for (var i = 2; i < rows.length; i++) {
  var columns = rows[i].split('|');
  var habitatList = columns[2].trim().split(',');
  var danger = columns[5].trim();
  
  if (danger === 'Да') {
    for (var j = 0; j < habitatList.length; j++) {
      var habitat = habitatList[j].trim();
      if (habitats.hasOwnProperty(habitat)) {
        habitats[habitat]++;
      } else {
        habitats[habitat] = 1;
      }
    }
  }
}

var mostCommonHabitat = '';
var mostCommonHabitatCount = 0;

for (var habitat in habitats) {
  if (habitats[habitat] > mostCommonHabitatCount) {
    mostCommonHabitat = habitat;
    mostCommonHabitatCount = habitats[habitat];
  }
}

console.log('Самое распространенное место обитания опасных растений: ' + mostCommonHabitat);
}