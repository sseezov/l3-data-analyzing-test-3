export default function solution(content) {
  // BEGIN
  const presentContent = parse(content);
  console.log(`Всего растений: ${presentContent.count}`);
  console.log(
    `Список растений в алфавитном порядке: ${presentContent.sorted.join(", ")}`
  );
  console.log(
    `Количество опасных и безопасных для человека растений: ${presentContent.dangeriousRelation["Не опастных"]}/${presentContent.dangeriousRelation["Опастных"]}`
  );
  console.log(
    `среднее время жизни всех лесных растений: ${presentContent.middleLiftime}`
  );
  console.log(
    `место обитания больше всего свойственно опасным для человека растениям: ${presentContent.mostDangeriousLocation.loc}`
  );
  // END
}

const parseRowFn = (row) => {
  return row
    .split("|")
    .filter((columnName) => columnName !== "")
    .map((columnName) => columnName.trim());
};

const makeTable = (columnNames, columnValues) => {
  const result = [];

  for (let i = 0; i < columnValues.length; i++) {
    const currentRow = columnValues[i];
    const row = {};

    for (let j = 0; j < columnNames.length; j++) {
      row[columnNames[j]] = currentRow[j];
    }
    result.push(row);
  }

  return result;
};

const makePresentContent = (table) => {
  const count = table.length;
  const makeDangeriousPercentRelation = (table) => {
    const dangeriousLen = table.filter((row) => row.dangerious === "Да").length;
    const nonDangeriousLen = table.filter(
      (row) => row.dangerious === "Нет"
    ).length;

    return {
      "Не опастных": (nonDangeriousLen * 100) / count,
      Опастных: (dangeriousLen * 100) / count,
    };
  };

  const mostDangeriousLocation = (table) => {
    const mostDangeriousLocation = table
      .filter((row) => row.dangerious === "Да")
      .reduce((acc, row) => {
        if (acc[row.location] !== undefined) {
          acc[row.location] += 1;
        } else {
          acc[row.location] = 1;
        }

        return acc;
      }, {});

    const result = Object.entries(mostDangeriousLocation).sort((a, b) => {
      return a[1] > b[1] ? -1 : 0;
    })[0];

    return {
      loc: result[0],
      count: result[1],
    };
  };

  const middleLifeTime = (table) => {
    const onlyForestLocationsLifeTime = table
      .filter((row) => row.location.indexOf("Леса") !== -1)
      .map((row) => {
        const years = row.lifeTime.split(" ")[0];
        if (years.includes("-")) {
          const [start, end] = years.split("-");
          return (Number(start) + Number(end)) / 2;
        }

        return Number(years);
      });

    return (
      onlyForestLocationsLifeTime.reduce((sum, current) => sum + current, 0) /
      onlyForestLocationsLifeTime.length
    );
  };

  return {
    count: count,
    sorted: table
      .map((row) => {
        return row.name[0].toUpperCase() + row.name.slice(1);
      })
      .sort(),
    dangeriousRelation: makeDangeriousPercentRelation(table),
    mostDangeriousLocation: mostDangeriousLocation(table),
    middleLiftime: middleLifeTime(table),
  };
};

const parse = (fileContent) => {
  const parsedContent = fileContent.split("\n");

  const columnNames = ["name", "location", "type", "lifeTime", "dangerious"];
  const columnValues = parsedContent.slice(2).map((row) => parseRowFn(row));

  const table = makeTable(columnNames, columnValues);
  const presentContent = makePresentContent(table);

  return presentContent;
};
