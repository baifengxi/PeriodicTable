const categoryInfo = {
  'alkali metal': { label: '碱金属', color: '#ff7b72' },
  'alkaline earth metal': { label: '碱土金属', color: '#ffb86b' },
  lanthanide: { label: '镧系元素', color: '#7ee787' },
  actinide: { label: '锕系元素', color: '#64d2ff' },
  'transition metal': { label: '过渡金属', color: '#58a6ff' },
  'post-transition metal': { label: '后过渡金属', color: '#79c0ff' },
  metalloid: { label: '类金属', color: '#c297ff' },
  'reactive nonmetal': { label: '活泼非金属', color: '#00d5be' },
  halogen: { label: '卤素', color: '#2de0a7' },
  'noble gas': { label: '稀有气体', color: '#f2cc60' },
  unknown: { label: '待定性质', color: '#8b949e' },
}

const elementRows = [
  ['H', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'He'],
  ['Li', 'Be', '', '', '', '', '', '', '', '', '', '', 'B', 'C', 'N', 'O', 'F', 'Ne'],
  ['Na', 'Mg', '', '', '', '', '', '', '', '', '', '', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar'],
  ['K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr'],
  ['Rb', 'Sr', 'Y', 'Zr', 'Nb', 'Mo', 'Tc', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd', 'In', 'Sn', 'Sb', 'Te', 'I', 'Xe'],
  ['Cs', 'Ba', '*La', 'Hf', 'Ta', 'W', 'Re', 'Os', 'Ir', 'Pt', 'Au', 'Hg', 'Tl', 'Pb', 'Bi', 'Po', 'At', 'Rn'],
  ['Fr', 'Ra', '*Ac', 'Rf', 'Db', 'Sg', 'Bh', 'Hs', 'Mt', 'Ds', 'Rg', 'Cn', 'Nh', 'Fl', 'Mc', 'Lv', 'Ts', 'Og'],
]

const lanthanides = ['La', 'Ce', 'Pr', 'Nd', 'Pm', 'Sm', 'Eu', 'Gd', 'Tb', 'Dy', 'Ho', 'Er', 'Tm', 'Yb', 'Lu']
const actinides = ['Ac', 'Th', 'Pa', 'U', 'Np', 'Pu', 'Am', 'Cm', 'Bk', 'Cf', 'Es', 'Fm', 'Md', 'No', 'Lr']

const rawElements = [
  [1, 'H', 'Hydrogen', '氢', 'reactive nonmetal', 1.008],
  [2, 'He', 'Helium', '氦', 'noble gas', 4.0026],
  [3, 'Li', 'Lithium', '锂', 'alkali metal', 6.94],
  [4, 'Be', 'Beryllium', '铍', 'alkaline earth metal', 9.0122],
  [5, 'B', 'Boron', '硼', 'metalloid', 10.81],
  [6, 'C', 'Carbon', '碳', 'reactive nonmetal', 12.011],
  [7, 'N', 'Nitrogen', '氮', 'reactive nonmetal', 14.007],
  [8, 'O', 'Oxygen', '氧', 'reactive nonmetal', 15.999],
  [9, 'F', 'Fluorine', '氟', 'halogen', 18.998],
  [10, 'Ne', 'Neon', '氖', 'noble gas', 20.18],
  [11, 'Na', 'Sodium', '钠', 'alkali metal', 22.99],
  [12, 'Mg', 'Magnesium', '镁', 'alkaline earth metal', 24.305],
  [13, 'Al', 'Aluminium', '铝', 'post-transition metal', 26.982],
  [14, 'Si', 'Silicon', '硅', 'metalloid', 28.085],
  [15, 'P', 'Phosphorus', '磷', 'reactive nonmetal', 30.974],
  [16, 'S', 'Sulfur', '硫', 'reactive nonmetal', 32.06],
  [17, 'Cl', 'Chlorine', '氯', 'halogen', 35.45],
  [18, 'Ar', 'Argon', '氩', 'noble gas', 39.948],
  [19, 'K', 'Potassium', '钾', 'alkali metal', 39.098],
  [20, 'Ca', 'Calcium', '钙', 'alkaline earth metal', 40.078],
  [21, 'Sc', 'Scandium', '钪', 'transition metal', 44.956],
  [22, 'Ti', 'Titanium', '钛', 'transition metal', 47.867],
  [23, 'V', 'Vanadium', '钒', 'transition metal', 50.942],
  [24, 'Cr', 'Chromium', '铬', 'transition metal', 51.996],
  [25, 'Mn', 'Manganese', '锰', 'transition metal', 54.938],
  [26, 'Fe', 'Iron', '铁', 'transition metal', 55.845],
  [27, 'Co', 'Cobalt', '钴', 'transition metal', 58.933],
  [28, 'Ni', 'Nickel', '镍', 'transition metal', 58.693],
  [29, 'Cu', 'Copper', '铜', 'transition metal', 63.546],
  [30, 'Zn', 'Zinc', '锌', 'transition metal', 65.38],
  [31, 'Ga', 'Gallium', '镓', 'post-transition metal', 69.723],
  [32, 'Ge', 'Germanium', '锗', 'metalloid', 72.63],
  [33, 'As', 'Arsenic', '砷', 'metalloid', 74.922],
  [34, 'Se', 'Selenium', '硒', 'reactive nonmetal', 78.971],
  [35, 'Br', 'Bromine', '溴', 'halogen', 79.904],
  [36, 'Kr', 'Krypton', '氪', 'noble gas', 83.798],
  [37, 'Rb', 'Rubidium', '铷', 'alkali metal', 85.468],
  [38, 'Sr', 'Strontium', '锶', 'alkaline earth metal', 87.62],
  [39, 'Y', 'Yttrium', '钇', 'transition metal', 88.906],
  [40, 'Zr', 'Zirconium', '锆', 'transition metal', 91.224],
  [41, 'Nb', 'Niobium', '铌', 'transition metal', 92.906],
  [42, 'Mo', 'Molybdenum', '钼', 'transition metal', 95.95],
  [43, 'Tc', 'Technetium', '锝', 'transition metal', 98],
  [44, 'Ru', 'Ruthenium', '钌', 'transition metal', 101.07],
  [45, 'Rh', 'Rhodium', '铑', 'transition metal', 102.91],
  [46, 'Pd', 'Palladium', '钯', 'transition metal', 106.42],
  [47, 'Ag', 'Silver', '银', 'transition metal', 107.87],
  [48, 'Cd', 'Cadmium', '镉', 'transition metal', 112.41],
  [49, 'In', 'Indium', '铟', 'post-transition metal', 114.82],
  [50, 'Sn', 'Tin', '锡', 'post-transition metal', 118.71],
  [51, 'Sb', 'Antimony', '锑', 'metalloid', 121.76],
  [52, 'Te', 'Tellurium', '碲', 'metalloid', 127.6],
  [53, 'I', 'Iodine', '碘', 'halogen', 126.9],
  [54, 'Xe', 'Xenon', '氙', 'noble gas', 131.29],
  [55, 'Cs', 'Caesium', '铯', 'alkali metal', 132.91],
  [56, 'Ba', 'Barium', '钡', 'alkaline earth metal', 137.33],
  [57, 'La', 'Lanthanum', '镧', 'lanthanide', 138.91],
  [58, 'Ce', 'Cerium', '铈', 'lanthanide', 140.12],
  [59, 'Pr', 'Praseodymium', '镨', 'lanthanide', 140.91],
  [60, 'Nd', 'Neodymium', '钕', 'lanthanide', 144.24],
  [61, 'Pm', 'Promethium', '钷', 'lanthanide', 145],
  [62, 'Sm', 'Samarium', '钐', 'lanthanide', 150.36],
  [63, 'Eu', 'Europium', '铕', 'lanthanide', 151.96],
  [64, 'Gd', 'Gadolinium', '钆', 'lanthanide', 157.25],
  [65, 'Tb', 'Terbium', '铽', 'lanthanide', 158.93],
  [66, 'Dy', 'Dysprosium', '镝', 'lanthanide', 162.5],
  [67, 'Ho', 'Holmium', '钬', 'lanthanide', 164.93],
  [68, 'Er', 'Erbium', '铒', 'lanthanide', 167.26],
  [69, 'Tm', 'Thulium', '铥', 'lanthanide', 168.93],
  [70, 'Yb', 'Ytterbium', '镱', 'lanthanide', 173.05],
  [71, 'Lu', 'Lutetium', '镥', 'lanthanide', 174.97],
  [72, 'Hf', 'Hafnium', '铪', 'transition metal', 178.49],
  [73, 'Ta', 'Tantalum', '钽', 'transition metal', 180.95],
  [74, 'W', 'Tungsten', '钨', 'transition metal', 183.84],
  [75, 'Re', 'Rhenium', '铼', 'transition metal', 186.21],
  [76, 'Os', 'Osmium', '锇', 'transition metal', 190.23],
  [77, 'Ir', 'Iridium', '铱', 'transition metal', 192.22],
  [78, 'Pt', 'Platinum', '铂', 'transition metal', 195.08],
  [79, 'Au', 'Gold', '金', 'transition metal', 196.97],
  [80, 'Hg', 'Mercury', '汞', 'transition metal', 200.59],
  [81, 'Tl', 'Thallium', '铊', 'post-transition metal', 204.38],
  [82, 'Pb', 'Lead', '铅', 'post-transition metal', 207.2],
  [83, 'Bi', 'Bismuth', '铋', 'post-transition metal', 208.98],
  [84, 'Po', 'Polonium', '钋', 'post-transition metal', 209],
  [85, 'At', 'Astatine', '砹', 'halogen', 210],
  [86, 'Rn', 'Radon', '氡', 'noble gas', 222],
  [87, 'Fr', 'Francium', '钫', 'alkali metal', 223],
  [88, 'Ra', 'Radium', '镭', 'alkaline earth metal', 226],
  [89, 'Ac', 'Actinium', '锕', 'actinide', 227],
  [90, 'Th', 'Thorium', '钍', 'actinide', 232.04],
  [91, 'Pa', 'Protactinium', '镤', 'actinide', 231.04],
  [92, 'U', 'Uranium', '铀', 'actinide', 238.03],
  [93, 'Np', 'Neptunium', '镎', 'actinide', 237],
  [94, 'Pu', 'Plutonium', '钚', 'actinide', 244],
  [95, 'Am', 'Americium', '镅', 'actinide', 243],
  [96, 'Cm', 'Curium', '锔', 'actinide', 247],
  [97, 'Bk', 'Berkelium', '锫', 'actinide', 247],
  [98, 'Cf', 'Californium', '锎', 'actinide', 251],
  [99, 'Es', 'Einsteinium', '锿', 'actinide', 252],
  [100, 'Fm', 'Fermium', '镄', 'actinide', 257],
  [101, 'Md', 'Mendelevium', '钔', 'actinide', 258],
  [102, 'No', 'Nobelium', '锘', 'actinide', 259],
  [103, 'Lr', 'Lawrencium', '铹', 'actinide', 266],
  [104, 'Rf', 'Rutherfordium', '𬬻', 'transition metal', 267],
  [105, 'Db', 'Dubnium', '𬭊', 'transition metal', 268],
  [106, 'Sg', 'Seaborgium', '𬭳', 'transition metal', 269],
  [107, 'Bh', 'Bohrium', '𬭛', 'transition metal', 270],
  [108, 'Hs', 'Hassium', '𬭶', 'transition metal', 269],
  [109, 'Mt', 'Meitnerium', '鿏', 'unknown', 278],
  [110, 'Ds', 'Darmstadtium', '𫟼', 'unknown', 281],
  [111, 'Rg', 'Roentgenium', '錀', 'unknown', 282],
  [112, 'Cn', 'Copernicium', '鎶', 'post-transition metal', 285],
  [113, 'Nh', 'Nihonium', '鉨', 'unknown', 286],
  [114, 'Fl', 'Flerovium', '鈇', 'post-transition metal', 289],
  [115, 'Mc', 'Moscovium', '镆', 'unknown', 290],
  [116, 'Lv', 'Livermorium', '鉝', 'unknown', 293],
  [117, 'Ts', 'Tennessine', '鿬', 'halogen', 294],
  [118, 'Og', 'Oganesson', '鿫', 'noble gas', 294],
]

const elementMap = new Map(rawElements.map((item) => [item[1], item]))

const descriptions = {
  'alkali metal': '高反应活性金属，常用于电池、储能与材料化学。',
  'alkaline earth metal': '稳定性高于碱金属，常见于轻量结构材料与矿物体系。',
  lanthanide: '稀土核心成员，在磁性、光学和能源器件中非常关键。',
  actinide: '重元素族群，与核能、放射化学和前沿材料研究紧密相关。',
  'transition metal': '过渡轨道活跃，广泛用于催化、合金和工业制造。',
  'post-transition metal': '兼具金属特征与较强可塑性，常见于电子工业与合金体系。',
  metalloid: '兼具金属与非金属属性，常见于半导体与功能材料。',
  'reactive nonmetal': '构成生命与化学体系的关键骨架，化学反应活跃。',
  halogen: '强氧化性元素，常用于消毒、化工与有机合成。',
  'noble gas': '最稳定的元素族之一，常用于照明、低温与保护气氛。',
  unknown: '超重元素区，宏观性质仍在持续验证与研究中。',
}

function assignGridPosition(symbol, period, group) {
  return {
    period,
    group,
    gridColumn: group,
    gridRow: period,
  }
}

const positionedElements = []

elementRows.forEach((row, periodIndex) => {
  row.forEach((entry, groupIndex) => {
    if (!entry) {
      return
    }

    if (entry.startsWith('*')) {
      return
    }

    const raw = elementMap.get(entry)
    if (!raw) {
      return
    }

    const [number, symbol, name, chineseName, category, atomicMass] = raw
    positionedElements.push({
      number,
      symbol,
      name,
      chineseName,
      category,
      atomicMass,
      ...assignGridPosition(symbol, periodIndex + 1, groupIndex + 1),
    })
  })
})

lanthanides.forEach((symbol, index) => {
  const [number, currentSymbol, name, chineseName, category, atomicMass] = elementMap.get(symbol)
  positionedElements.push({
    number,
    symbol: currentSymbol,
    name,
    chineseName,
    category,
    atomicMass,
    period: 8,
    group: index + 4,
    gridColumn: index + 4,
    gridRow: 8,
    series: 'lanthanides',
  })
})

actinides.forEach((symbol, index) => {
  const [number, currentSymbol, name, chineseName, category, atomicMass] = elementMap.get(symbol)
  positionedElements.push({
    number,
    symbol: currentSymbol,
    name,
    chineseName,
    category,
    atomicMass,
    period: 9,
    group: index + 4,
    gridColumn: index + 4,
    gridRow: 9,
    series: 'actinides',
  })
})

export const categories = Object.entries(categoryInfo).map(([value, meta]) => ({
  value,
  ...meta,
}))

export const elements = positionedElements.map((element) => {
  const meta = categoryInfo[element.category] ?? categoryInfo.unknown
  return {
    ...element,
    categoryLabel: meta.label,
    accent: meta.color,
    electronShellHint: `${Math.min(7, element.period)}s / d-f shell`,
    discoveryEra: element.number <= 36 ? '古典与近代化学' : element.number <= 86 ? '现代化学体系' : '高能实验合成',
    useCase: descriptions[element.category] ?? descriptions.unknown,
  }
})

export const stats = {
  total: 118,
  stableGroups: categories.length,
  reactive: elements.filter((item) => ['alkali metal', 'halogen', 'reactive nonmetal'].includes(item.category)).length,
}
