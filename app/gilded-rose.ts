export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const ITEM = {
  // Item type constants
  AGED_BRIE: 'Aged Brie',
  BACKSTAGE_PASSES: 'Backstage passes to a TAFKAL80ETC concert',
  SULFURAS: 'Sulfuras, Hand of Ragnaros',
  CONJURED: 'Conjured',
  
  // Quality constant
  MAX_QUALITY: 50,
  
  // Threshold constants
  BACKSTAGE_PASS_THRESHOLD_1: 11,
  BACKSTAGE_PASS_THRESHOLD_2: 6
};

function updateAgedBrie(item: { sellIn: number; quality: number; }) {
  item.sellIn--;
  if (item.quality < ITEM.MAX_QUALITY) {
    item.quality++;
    if (item.sellIn < 0 && item.quality < ITEM.MAX_QUALITY) {
      item.quality++;
    }
  }
}
function updateBackStagePass(item: { quality: number; name: string; sellIn: number; }){
    if (item.quality < ITEM.MAX_QUALITY) {
      item.quality++;
      if (item.name == ITEM.BACKSTAGE_PASSES) {
        if (item.sellIn < ITEM.BACKSTAGE_PASS_THRESHOLD_1 && item.quality < ITEM.MAX_QUALITY) {
            item.quality++;
        }
        if (item.sellIn < ITEM.BACKSTAGE_PASS_THRESHOLD_2 && item.quality < ITEM.MAX_QUALITY) {
            item.quality++;
        }
      }
    }
    item.sellIn--;
    if (item.sellIn < 0) {
          item.quality = 0
    }
}
function updateSulfuras(item: any){
 //As per the requirements, Sulfuras neither decreases in quality nor requires a sell-in date update, so no changes are needed.
}
function updateConjured(item: { sellIn: number; quality: number; }){
    item.sellIn--;
    let degradation = item.sellIn < 0 ? 4 : 2;
    item.quality = Math.max(0, item.quality - degradation);
  }

function updateNormal(item: { sellIn: number; quality: number; }) {
  item.sellIn--;
  if (item.quality > 0) {
    item.quality--;
    if (item.sellIn < 0 && item.quality > 0) {
      item.quality--;
    }
  }
}


export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }
  updateItemRules = [
    { match: (name: string) => name === ITEM.BACKSTAGE_PASSES, update: updateBackStagePass },
    { match: (name: string) => name === ITEM.AGED_BRIE, update: updateAgedBrie },
    { match: (name: string) => name === ITEM.SULFURAS, update: updateSulfuras },
    { match: (name: string | string[]) => name.includes(ITEM.CONJURED), update: updateConjured }
  ];
  updateQuality() {
    for (const item of this.items) {
      const rule = this.updateItemRules.find(rule => rule.match(item.name));
      const updater = rule ? rule.update : updateNormal;
      updater(item);
    }

    return this.items;
  }
}
