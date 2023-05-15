export default function solution(content) {
  // BEGIN
  console.log(content)

  const rows = content.trim().split('\r\n').slice(2);
  console.log(`Всего растений: ${rows.length}`)
  const data = rows.map((row) => row.split('|').filter(row => row)).map(row => row.map(el => el.trim()));
  const names = data.map(name => name[0]);
  const sortNameWithUp = names.map((name) => name[0].toUpperCase() + name.slice(1)).sort();
  console.log(`Список растений: ${sortNameWithUp.join(', ')}`);

  const dengForPeople = data.map(row => row[4]).filter((plant) => plant === 'Да').length;
  const notDengerous = data.map(row => row[4]).filter((plant) => plant === 'Нет').length;

  console.log(`Соотношение опасных растений и неопасных: ${dengForPeople / rows.length * 100}/${notDengerous / rows.length * 100}`);

  const forestPlants = data.filter((row) => row[1].split(',')[0] === 'Леса');
  const calcAverage = (years) => {
    if (years.includes('-')) {
      return (Number(years.split('-')[0]) + Number(years.split('-')[1].split(' ')[0])) / 2;
    }
    return Number(years.split(' ')[0]);
  }
  const forestYears = forestPlants.map((row) => calcAverage(row[3]));
  const resAgerageyears = forestYears.reduce((acc, elem) => acc + elem);
  console.log(`Средний возраст лесных растрений: ${Math.round(resAgerageyears / forestYears.length)}`);

  const dengPlants = data.filter(row => row[4] === 'Да');
  const dengerestHabitats = dengPlants.map((row) => row[1].split(', ').map(place => place[0].toUpperCase() + place.slice(1))).flat();

  const objWithPlaces = {};
  dengerestHabitats.map(place => objWithPlaces[place] = 0);
  dengerestHabitats.map(place => objWithPlaces[place] += 1);
  const keys = Object.keys(objWithPlaces);
  const values = Object.values(objWithPlaces);
  const indexOfDeng = values.indexOf(Math.max(...values));
  console.log(`Самое опасное место: ${keys[indexOfDeng]}`);
  // END
}